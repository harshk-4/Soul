import { NextResponse } from 'next/server';
import { enquiryPayloadSchema } from '@/lib/validation/schemas';
import { deliverSubmission } from '@/lib/server/delivery';
import { OFFICIAL_EMAIL } from '@/lib/seo/metadata';

const tableByType = {
  contact: 'program_enquiries',
  organisation: 'organization_enquiries',
  school: 'school_enquiries',
  retreat: 'retreat_enquiries',
} as const;

// In-memory deduplication store: prevents rapid double-clicks and repeated email sends
const recentSubmissions = new Map<string, number>();
const DEDUPLICATION_WINDOW_MS = 2 * 60 * 1000; // 2 minutes

function isDuplicateSubmission(
  type: string,
  email: string,
  phone?: string
): boolean {
  const cleanEmail = email.toLowerCase().trim();
  const cleanPhone = (phone || '').replace(/\D/g, '');
  const key = `${type}:${cleanEmail}:${cleanPhone}`;
  const now = Date.now();
  const previous = recentSubmissions.get(key);

  if (previous && now - previous < DEDUPLICATION_WINDOW_MS) {
    return true;
  }

  // Periodic pruning of stale keys
  if (recentSubmissions.size > 200) {
    for (const [k, time] of recentSubmissions.entries()) {
      if (now - time > 10 * 60 * 1000) {
        recentSubmissions.delete(k);
      }
    }
  }

  recentSubmissions.set(key, now);
  return false;
}

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

  // Deduplication check to prevent duplicate emails and double submissions
  const contactPhone = 'phone' in data ? (data.phone as string) : undefined;
  if (isDuplicateSubmission(type, data.email, contactPhone)) {
    return NextResponse.json(
      {
        ok: true,
        duplicate: true,
        message:
          type === 'retreat'
            ? 'Thank you for registering for the Quiet Bloom Retreat. Your registration details have already been received.'
            : 'Your inquiry has already been received.',
      },
      { status: 200 }
    );
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
        ? (data as Record<string, string | undefined>)
        : undefined,
  });

  if (!delivery.delivered) {
    return NextResponse.json(
      {
        ok: false,
        code: delivery.configured ? 'DELIVERY_FAILED' : 'DELIVERY_NOT_CONFIGURED',
        error: delivery.errorMessage,
      },
      { status: delivery.configured ? 502 : 503 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      channels: delivery.channels,
      message:
        type === 'retreat'
          ? 'Thank you for registering for the Quiet Bloom Retreat.'
          : 'Your inquiry has been delivered.',
    },
    { status: 200 }
  );
}

