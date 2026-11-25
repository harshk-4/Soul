import { NextResponse } from 'next/server';
import { enquiryPayloadSchema } from '@/lib/validation/schemas';
import { deliverSubmission } from '@/lib/server/delivery';
import { OFFICIAL_EMAIL } from '@/lib/seo/metadata';
import {
  saveOrFindRegistration,
  updateGoogleFormsSyncStatus,
  updateDeliveryChannels,
} from '@/lib/server/registrationStore';

const tableByType = {
  contact: 'program_enquiries',
  organisation: 'organization_enquiries',
  school: 'school_enquiries',
  retreat: 'retreat_enquiries',
} as const;

function formatEnquiryText(
  type: string,
  data: Record<string, string | undefined>
): string {
  const lines = Object.entries(data)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}: ${value}`);

  return [
    `New Soulfuli ${type} submission`,
    `Recipient: ${OFFICIAL_EMAIL}`,
    `Submitted At: ${new Date().toISOString()}`,
    '',
    ...lines,
  ].join('\n');
}

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request payload.' },
      { status: 400 }
    );
  }

  const parsed = enquiryPayloadSchema.safeParse(rawBody);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[issue.path.length - 1] ?? 'form');
      if (!fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    console.warn('[EnquiriesAPI] 400 Bad Request - Validation failed:', {
      type: (rawBody as { type?: string })?.type,
      fieldErrors,
      rawIssues: parsed.error.issues.map((i) => ({
        path: i.path.join('.'),
        message: i.message,
      })),
    });
    return NextResponse.json(
      {
        ok: false,
        error: 'Please review the highlighted fields and try again.',
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const { type, data } = parsed.data;
  const contactPhone = 'phone' in data ? (data.phone as string) : undefined;

  // 1. Safely store or retrieve registration locally
  const { record, isDuplicate } = await saveOrFindRegistration({
    type,
    email: data.email,
    phone: contactPhone,
    data: data as Record<string, unknown>,
  });

  // 2. Duplicate handling with separate Google Forms synchronization awareness
  if (type === 'retreat') {
    // Only return early if the registration was ALREADY verified and synchronized to Google Forms
    if (isDuplicate && record.googleForms.synced) {
      console.log(
        '[EnquiriesAPI] Retreat registration is already synchronized with Google Forms:',
        record.email
      );
      return NextResponse.json(
        {
          ok: true,
          duplicate: true,
          googleFormsSynced: true,
          channels: record.channels,
          message:
            'Thank you for registering for the Quiet Bloom Retreat. Your registration details have already been received and verified.',
        },
        { status: 200 }
      );
    }
    // If isDuplicate is true but record.googleForms.synced is FALSE,
    // we DO NOT skip Google Forms. We proceed to retry synchronization.
    if (isDuplicate && !record.googleForms.synced) {
      console.log(
        '[EnquiriesAPI] Registration exists locally but Google Forms sync is pending/failed. Retrying sync for:',
        record.email
      );
    }
  } else {
    // For non-retreat enquiries, deduplicate rapid duplicate submissions (2-minute window)
    if (
      isDuplicate &&
      Date.now() - new Date(record.createdAt).getTime() < 2 * 60 * 1000
    ) {
      return NextResponse.json(
        {
          ok: true,
          duplicate: true,
          message: 'Your inquiry has already been received.',
        },
        { status: 200 }
      );
    }
  }

  const labelMap = {
    contact: 'Direct Dispatch',
    organisation: 'Organisation Program Enquiry',
    school: 'Schools & Colleges Enquiry',
    retreat: 'Quiet Bloom Retreat Application',
  } as const;

  const subject = `[Soulfuli] ${labelMap[type]} from ${data.name}`;
  const bodyText = formatEnquiryText(
    labelMap[type],
    data as Record<string, string | undefined>
  );

  const delivery = await deliverSubmission({
    subject,
    bodyText,
    replyTo: data.email,
    supabaseTable: tableByType[type],
    supabaseRow: {
      enquiry_type: type,
      ...data,
      created_at: new Date().toISOString(),
    },
    webhookPayload: {
      event: `enquiry.${type}`,
      submittedAt: new Date().toISOString(),
      recipient: OFFICIAL_EMAIL,
      data,
    },
    isRetreat: type === 'retreat',
    retreatData:
      type === 'retreat'
        ? (data as Record<string, unknown>)
        : undefined,
  });

  // 3. Update local registration store with Google Forms synchronization outcome
  if (type === 'retreat') {
    const formsResult = delivery.googleForms;
    if (formsResult) {
      await updateGoogleFormsSyncStatus(record.id, {
        synced: formsResult.saved,
        error: formsResult.error,
        responseSnippet: formsResult.responseSnippet,
      });
    }
  }

  if (delivery.channels.length > 0) {
    await updateDeliveryChannels(record.id, delivery.channels);
  }

  // 4. Return appropriate response
  if (!delivery.delivered) {
    const isRetreat = type === 'retreat';
    console.error('[EnquiriesAPI] Upstream delivery failed:', {
      type,
      configured: delivery.configured,
      error: delivery.errorMessage,
      googleFormsError: delivery.googleForms?.error,
    });

    return NextResponse.json(
      {
        ok: false,
        duplicate: isDuplicate,
        googleFormsSynced: false,
        code: delivery.configured ? 'DELIVERY_FAILED' : 'DELIVERY_NOT_CONFIGURED',
        error:
          delivery.errorMessage ||
          'Delivery failed. Your registration has been saved locally and will be synchronized.',
        syncError: delivery.googleForms?.error,
      },
      { status: delivery.configured ? 502 : 503 }
    );
  }

  const isGoogleFormsSynced =
    type === 'retreat' ? Boolean(delivery.googleForms?.saved) : undefined;

  return NextResponse.json(
    {
      ok: true,
      duplicate: isDuplicate,
      ...(type === 'retreat' ? { googleFormsSynced: isGoogleFormsSynced } : {}),
      channels: delivery.channels,
      message:
        type === 'retreat'
          ? isDuplicate
            ? 'Your registration details have now been synchronized with Google Forms.'
            : 'Thank you for registering for the Quiet Bloom Retreat.'
          : 'Your inquiry has been delivered.',
    },
    { status: 200 }
  );
}

