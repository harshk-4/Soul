import { OFFICIAL_EMAIL } from '@/lib/seo/metadata';

export interface DeliveryResult {
  delivered: boolean;
  configured: boolean;
  channels: string[];
  errorMessage?: string;
}

interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export const DEFAULT_GOOGLE_FORM_RETREAT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf9T4EK78MCKn26Wzabu-PfdLgJUrrhJc_bLaC3cbMl5wQU3Q/formResponse';

export const RETREAT_CONFIRMATION_SUBJECT =
  'Registration Received – Quiet Bloom Retreat | Soulfuli 🌿';

export const RETREAT_CONFIRMATION_TEXT = [
  'Dear Participant,',
  '',
  'Thank you for registering for the Quiet Bloom Retreat! 🌿',
  '',
  'We are delighted to receive your registration.',
  '',
  'Your registration details have been successfully received. Our team will contact you on WhatsApp with further information regarding confirmation, accommodation, transportation and the retreat schedule.',
  '',
  'Retreat Details:',
  'Quiet Bloom Retreat',
  '12–17 February 2027',
  'Dharamshala, India',
  '',
  'We look forward to connecting with you and sharing this meaningful experience.',
  '',
  'Warm regards,',
  'Soulfuli Team',
  'connect@soulfuli.org',
].join('\n');

export const RETREAT_CONFIRMATION_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Registration Received – Quiet Bloom Retreat | Soulfuli</title>
</head>
<body style="margin: 0; padding: 24px 16px; background-color: #fdf9f1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1c1c17; line-height: 1.6;">
  <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ddd6c8; border-radius: 12px; padding: 32px 28px;">
    <div style="padding-bottom: 20px; border-bottom: 1px solid #ede4e8; margin-bottom: 24px;">
      <h2 style="font-family: Georgia, serif; font-size: 24px; color: #1f2a24; margin: 0 0 6px 0; font-weight: normal;">SoulfulI</h2>
      <p style="font-size: 13px; color: #556251; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">Quiet Bloom Retreat · Dharamshala</p>
    </div>

    <p style="font-size: 16px; margin: 0 0 16px 0;">Dear Participant,</p>
    <p style="font-size: 16px; margin: 0 0 16px 0;">Thank you for registering for the <strong>Quiet Bloom Retreat! 🌿</strong></p>
    <p style="font-size: 15px; margin: 0 0 16px 0; color: #434844;">We are delighted to receive your registration.</p>
    <p style="font-size: 15px; margin: 0 0 20px 0; color: #434844;">Your registration details have been successfully received. Our team will contact you on WhatsApp with further information regarding confirmation, accommodation, transportation and the retreat schedule.</p>

    <div style="background-color: #fbf5f6; border: 1px solid #ede4e8; border-radius: 8px; padding: 18px 20px; margin: 24px 0;">
      <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #c86d51; margin: 0 0 8px 0;">Retreat Details</h3>
      <p style="font-family: Georgia, serif; font-size: 18px; color: #1f2a24; margin: 0 0 4px 0;">Quiet Bloom Retreat</p>
      <p style="font-size: 14px; color: #556251; margin: 0 0 2px 0;">12–17 February 2027</p>
      <p style="font-size: 14px; color: #556251; margin: 0;">Dharamshala, India</p>
    </div>

    <p style="font-size: 15px; margin: 0 0 24px 0; color: #434844;">We look forward to connecting with you and sharing this meaningful experience.</p>

    <div style="padding-top: 16px; border-top: 1px solid #ede4e8; font-size: 14px; color: #1f2a24;">
      <p style="margin: 0 0 4px 0;">Warm regards,</p>
      <p style="margin: 0 0 6px 0; font-weight: 600;">Soulfuli Team</p>
      <a href="mailto:connect@soulfuli.org" style="color: #c86d51; text-decoration: underline;">connect@soulfuli.org</a>
    </div>
  </div>
</body>
</html>
`.trim();

function getContactEmail(): string {
  return process.env.SOULFULI_CONTACT_EMAIL?.trim() || OFFICIAL_EMAIL;
}

export async function sendResendEmail(message: EmailMessage): Promise<{
  configured: boolean;
  sent: boolean;
  error?: string;
}> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey || apiKey === 're_your_resend_api_key') {
    return { configured: false, sent: false };
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() || 'Soulfuli <connect@soulfuli.org>';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [message.to],
        subject: message.subject,
        text: message.text,
        ...(message.html ? { html: message.html } : {}),
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
    });

    if (!response.ok) {
      return {
        configured: true,
        sent: false,
        error: `Email service rejected delivery (${response.status}).`,
      };
    }

    return { configured: true, sent: true };
  } catch {
    return {
      configured: true,
      sent: false,
      error: 'Unable to reach the email delivery service.',
    };
  }
}

export async function sendRetreatConfirmationEmail(
  toEmail: string
): Promise<{ configured: boolean; sent: boolean; error?: string }> {
  return sendResendEmail({
    to: toEmail,
    subject: RETREAT_CONFIRMATION_SUBJECT,
    text: RETREAT_CONFIRMATION_TEXT,
    html: RETREAT_CONFIRMATION_HTML,
    replyTo: OFFICIAL_EMAIL,
  });
}

export async function submitToGoogleForm(
  data: Record<string, string | undefined>
): Promise<{ configured: boolean; saved: boolean; error?: string }> {
  const formUrl =
    process.env.GOOGLE_FORM_RETREAT_URL?.trim() ||
    DEFAULT_GOOGLE_FORM_RETREAT_URL;

  if (!formUrl) {
    return { configured: false, saved: false };
  }

  const roomLabels: Record<string, string> = {
    'single-cottage': 'Private Stone Cottage (Single Occupancy)',
    'shared-slate-suite': 'Shared Suite with Fellow Seeker (Twin Beds)',
    flexible: 'Flexible / Either is Welcome',
  };

  const seasonLabels: Record<string, string> = {
    'february-2027':
      'Quiet Bloom Retreat (12 February – 17 February, 2027 · Dharamshala)',
    'autumn-gathering': 'Autumn Solitude (October · Dharamshala)',
    'spring-gathering': 'Spring Awakening (March · Dharamshala)',
    'summer-monsoon': 'Monsoon Stillness (July · Dharamshala)',
    'future-waitlist': 'General Waitlist for Upcoming Dates',
  };

  const roomText =
    (data.roomPreference && roomLabels[data.roomPreference]) ||
    data.roomPreference ||
    'Private Stone Cottage';
  const seasonText =
    (data.preferredSeason && seasonLabels[data.preferredSeason]) ||
    data.preferredSeason ||
    '12–17 February 2027';

  const combinedDetails = [
    `Accommodation Preference: ${roomText}`,
    `Target Gathering: ${seasonText}`,
    '',
    'Intention / Seeking:',
    data.intention || '',
  ].join('\n');

  const consentText =
    'I confirm that the information provided above is accurate, and I agree to receive retreat-related communication and updates through WhatsApp. I understand that photographs/videos may be taken during the retreat for documentation and communication purposes.';

  const params = new URLSearchParams();
  params.append('entry.1537024228', data.name || '');
  params.append('entry.1118734426', data.email || '');
  params.append('entry.155397330', data.phone || '');
  params.append('entry.634756868', 'Yes'); // Accommodation Preference accepted choice
  params.append('entry.496576007', combinedDetails);
  params.append('entry.1951149613', consentText);

  try {
    const response = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (
      response.status === 200 ||
      response.status === 302 ||
      response.status === 303
    ) {
      return { configured: true, saved: true };
    }

    return {
      configured: true,
      saved: false,
      error: `Google Form response status ${response.status}`,
    };
  } catch (err) {
    return {
      configured: true,
      saved: false,
      error:
        err instanceof Error ? err.message : 'Google Form request failed.',
    };
  }
}

async function insertSupabaseRow(
  table: string,
  row: Record<string, unknown>
): Promise<{ configured: boolean; saved: boolean; error?: string }> {
  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (
    !supabaseUrl ||
    !serviceKey ||
    serviceKey === 'your_supabase_service_role_key' ||
    supabaseUrl === 'https://your-project.supabase.co'
  ) {
    return { configured: false, saved: false };
  }

  try {
    const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${encodeURIComponent(table)}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });

    if (!response.ok) {
      return {
        configured: true,
        saved: false,
        error: `Database persistence failed (${response.status}).`,
      };
    }

    return { configured: true, saved: true };
  } catch {
    return {
      configured: true,
      saved: false,
      error: 'Unable to reach the database service.',
    };
  }
}

async function postWebhook(
  payload: Record<string, unknown>
): Promise<{ configured: boolean; sent: boolean; error?: string }> {
  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return { configured: false, sent: false };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      return {
        configured: true,
        sent: false,
        error: `Webhook delivery failed (${response.status}).`,
      };
    }
    return { configured: true, sent: true };
  } catch {
    return {
      configured: true,
      sent: false,
      error: 'Unable to reach the configured webhook.',
    };
  }
}

export async function deliverSubmission({
  subject,
  bodyText,
  replyTo,
  supabaseTable,
  supabaseRow,
  webhookPayload,
  isRetreat,
  retreatData,
}: {
  subject: string;
  bodyText: string;
  replyTo?: string;
  supabaseTable: string;
  supabaseRow: Record<string, unknown>;
  webhookPayload: Record<string, unknown>;
  isRetreat?: boolean;
  retreatData?: Record<string, string | undefined>;
}): Promise<DeliveryResult> {
  const tasks: [
    Promise<{ configured: boolean; sent: boolean; error?: string }>,
    Promise<{ configured: boolean; saved: boolean; error?: string }>,
    Promise<{ configured: boolean; sent: boolean; error?: string }>,
    Promise<{ configured: boolean; saved: boolean; error?: string }>
  ] = [
    sendResendEmail({
      to: getContactEmail(),
      subject,
      text: bodyText,
      replyTo,
    }),
    insertSupabaseRow(supabaseTable, supabaseRow),
    postWebhook(webhookPayload),
    isRetreat && retreatData
      ? submitToGoogleForm(retreatData)
      : Promise.resolve({ configured: false, saved: false }),
  ];

  const [emailResult, dbResult, webhookResult, googleFormResult] =
    await Promise.all(tasks);

  const anyConfigured =
    emailResult.configured ||
    dbResult.configured ||
    webhookResult.configured ||
    googleFormResult.configured;

  if (!anyConfigured) {
    return {
      delivered: false,
      configured: false,
      channels: [],
      errorMessage: `Online submission delivery is not configured on this server yet. Please write directly to ${OFFICIAL_EMAIL}.`,
    };
  }

  const channels: string[] = [];
  if (emailResult.sent) channels.push('email');
  if (dbResult.saved) channels.push('database');
  if (webhookResult.sent) channels.push('webhook');
  if (googleFormResult.saved) channels.push('google_forms');

  // If this was a retreat registration and at least one destination saved, dispatch participant confirmation email
  if (
    isRetreat &&
    (googleFormResult.saved ||
      dbResult.saved ||
      webhookResult.sent ||
      emailResult.sent)
  ) {
    if (replyTo) {
      const confirmResult = await sendRetreatConfirmationEmail(replyTo);
      if (confirmResult.sent) {
        channels.push('participant_confirmation_email');
      }
    }
  }

  if (channels.length === 0) {
    const errorDetail =
      googleFormResult.error ||
      emailResult.error ||
      dbResult.error ||
      webhookResult.error;

    return {
      delivered: false,
      configured: true,
      channels: [],
      errorMessage:
        errorDetail ||
        `We could not deliver your submission right now. Please try again or email ${OFFICIAL_EMAIL} directly.`,
    };
  }

  return {
    delivered: true,
    configured: true,
    channels,
  };
}

