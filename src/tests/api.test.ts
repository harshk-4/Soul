import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST as enquiryPost } from '@/app/api/enquiries/route';
import { POST as newsletterPost } from '@/app/api/newsletter/route';
import { POST as auditScorePost } from '@/app/api/audit/score/route';
import { auditQuestions } from '@/content/auditQuestions';
import {
  clearStoredRegistrations,
  getRegistration,
  getAllStoredRegistrations,
} from '@/lib/server/registrationStore';

function buildFullAnswers(value = 4): Record<string, number> {
  const answers: Record<string, number> = {};
  for (const q of auditQuestions) {
    answers[String(q.id)] = value;
  }
  return answers;
}

describe('API Endpoints Verification', () => {
  const originalEnv = { ...process.env };

  beforeEach(async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.ENQUIRY_WEBHOOK_URL;
    delete process.env.SOULFULI_CONTACT_EMAIL;
    await clearStoredRegistrations();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  it('rejects invalid contact enquiry payload with 400', async () => {
    const req = new Request('http://localhost/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'contact',
        data: {
          name: 'A',
          email: 'bad-email',
          pathway: 'general',
          message: 'short',
        },
      }),
    });

    const res = await enquiryPost(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
  });

  it('returns 503 instead of fake success when delivery credentials are absent', async () => {
    const req = new Request('http://localhost/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'contact',
        data: {
          name: 'Maya Patel',
          email: 'maya@example.com',
          pathway: 'community',
          message: 'Interested in upcoming community reflections and dialogues.',
        },
      }),
    });

    const res = await enquiryPost(req);
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.code).toBe('DELIVERY_NOT_CONFIGURED');
  });

  it('delivers valid enquiry to connect@soulfuli.org when Resend is configured', async () => {
    process.env.RESEND_API_KEY = 're_test_key_123';
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 'email_1' }), { status: 200 })
    );
    vi.stubGlobal('fetch', fetchMock);

    const req = new Request('http://localhost/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'school',
        data: {
          name: 'Dr. Kavita Rao',
          institution: 'National Liberal Arts College',
          role: 'Dean of Academics',
          email: 'k.rao@college.edu',
          targetCohort: 'undergraduate-students',
          cohortSize: '50-150',
          message: 'Exploring semester emotional intelligence workshops for sophomores.',
        },
      }),
    });

    const res = await enquiryPost(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const sentPayload = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(sentPayload.to).toEqual(['connect@soulfuli.org']);
    expect(sentPayload.reply_to).toBe('k.rao@college.edu');
  });

  it('validates newsletter email and delivers to connect@soulfuli.org when configured', async () => {
    process.env.RESEND_API_KEY = 're_test_key_123';
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 'email_2' }), { status: 200 })
    );
    vi.stubGlobal('fetch', fetchMock);

    const badReq = new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'invalid' }),
    });
    const badRes = await newsletterPost(badReq);
    expect(badRes.status).toBe(400);

    const goodReq = new Request('http://localhost/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'reader@example.com' }),
    });
    const goodRes = await newsletterPost(goodReq);
    expect(goodRes.status).toBe(200);
    const sentPayload = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(sentPayload.to).toEqual(['connect@soulfuli.org']);
  });

  it('rejects incomplete EQ audit answers and calculates server-side result when complete', async () => {
    const incompleteReq = new Request('http://localhost/api/audit/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: { '1': 3 } }),
    });
    const incompleteRes = await auditScorePost(incompleteReq);
    expect(incompleteRes.status).toBe(400);

    const completeReq = new Request('http://localhost/api/audit/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: buildFullAnswers(4),
        email: 'seeker@example.com',
      }),
    });
    const completeRes = await auditScorePost(completeReq);
    expect(completeRes.status).toBe(200);
    const body = await completeRes.json();
    expect(body.ok).toBe(true);
    expect(body.result.overallScore).toBe(75);
    expect(body.emailDelivered).toBe(false);
    expect(body.emailNote).toContain('not configured');
  });

  it('rejects invalid retreat registration email address with 400', async () => {
    const badReq = new Request('http://localhost/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'retreat',
        data: {
          name: 'Ananya Sharma',
          email: 'invalid-email-address',
          phone: '+919876543210',
          preferredSeason: 'february-2027',
          roomPreference: 'single-cottage',
          intention: 'Seeking silence, meditation, and mindful living in Dharamshala.',
        },
      }),
    });

    const res = await enquiryPost(badReq);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.fieldErrors?.email).toBeDefined();
  });

  it('successfully delivers retreat registration to Google Form', async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (String(url).includes('docs.google.com')) {
        return Promise.resolve(new Response('ok', { status: 200 }));
      }
      return Promise.resolve(new Response('not found', { status: 404 }));
    });
    vi.stubGlobal('fetch', fetchMock);

    const req = new Request('http://localhost/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'retreat',
        data: {
          name: 'Rohit Verma',
          email: 'rohit.verma@example.com',
          phone: '+919876500001',
          preferredSeason: 'february-2027',
          roomPreference: 'single-cottage',
          intention: 'Seeking deep reflection and conscious living during the Himalayan gathering.',
        },
      }),
    });

    const res = await enquiryPost(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.channels).toContain('google_forms');
    expect(fetchMock).toHaveBeenCalled();
    const calledUrl = fetchMock.mock.calls[0][0];
    expect(calledUrl).toContain('docs.google.com/forms');
  });

  it('sends participant confirmation email with exact required subject when Resend is configured', async () => {
    process.env.RESEND_API_KEY = 're_test_key_123';
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (String(url).includes('docs.google.com')) {
        return Promise.resolve(new Response('ok', { status: 200 }));
      }
      if (String(url).includes('api.resend.com')) {
        return Promise.resolve(
          new Response(JSON.stringify({ id: 'resend_email_id' }), { status: 200 })
        );
      }
      return Promise.resolve(new Response('ok', { status: 200 }));
    });
    vi.stubGlobal('fetch', fetchMock);

    const req = new Request('http://localhost/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'retreat',
        data: {
          name: 'Pooja Iyer',
          email: 'pooja.iyer@example.com',
          phone: '+919876500002',
          preferredSeason: 'february-2027',
          roomPreference: 'shared-slate-suite',
          intention: 'Looking forward to emotional stillness and intentional breathing.',
        },
      }),
    });

    const res = await enquiryPost(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.channels).toContain('participant_confirmation_email');

    // Find the participant confirmation email call
    const resendCalls = fetchMock.mock.calls.filter(([url]) =>
      String(url).includes('api.resend.com')
    );
    expect(resendCalls.length).toBeGreaterThanOrEqual(1);
    const participantEmailCall = resendCalls.find((call) => {
      const payload = JSON.parse(String(call[1]?.body));
      return payload.to.includes('pooja.iyer@example.com');
    });
    expect(participantEmailCall).toBeDefined();
    const emailPayload = JSON.parse(String(participantEmailCall[1]?.body));
    expect(emailPayload.subject).toBe(
      'Registration Received – Quiet Bloom Retreat | Soulfuli 🌿'
    );
    expect(emailPayload.text).toContain('Dear Participant,');
    expect(emailPayload.text).toContain('12–17 February 2027');
    expect(emailPayload.text).toContain('Dharamshala, India');
    expect(emailPayload.text).toContain('connect@soulfuli.org');
  });

  it('handles duplicate registrations correctly without re-triggering delivery', async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(new Response('ok', { status: 200 }))
    );
    vi.stubGlobal('fetch', fetchMock);

    const duplicatePayload = {
      type: 'retreat',
      data: {
        name: 'Aarav Mehta',
        email: 'aarav.mehta@example.com',
        phone: '+919876500003',
        preferredSeason: 'february-2027',
        roomPreference: 'flexible',
        intention: 'Participating in the retreat for personal alignment and mindfulness.',
      },
    };

    // First submission
    const res1 = await enquiryPost(
      new Request('http://localhost/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicatePayload),
      })
    );
    expect(res1.status).toBe(200);
    const initialFetchCount = fetchMock.mock.calls.length;

    // Duplicate submission within short window
    const res2 = await enquiryPost(
      new Request('http://localhost/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicatePayload),
      })
    );
    expect(res2.status).toBe(200);
    const body2 = await res2.json();
    expect(body2.ok).toBe(true);
    expect(body2.duplicate).toBe(true);
    // Ensure no additional network calls were made for the duplicate
    expect(fetchMock.mock.calls.length).toBe(initialFetchCount);
  });

  it('handles failed Google Form submission gracefully and returns error', async () => {
    process.env.GOOGLE_FORM_RETREAT_URL = 'http://invalid.endpoint/failure';
    const fetchMock = vi.fn().mockResolvedValue(
      new Response('Form Error', { status: 500 })
    );
    vi.stubGlobal('fetch', fetchMock);

    const req = new Request('http://localhost/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'retreat',
        data: {
          name: 'Failed Submission Test',
          email: 'failed.test@example.com',
          phone: '+919876500004',
          preferredSeason: 'february-2027',
          roomPreference: 'single-cottage',
          intention: 'Testing resilience when upstream delivery experiences failure.',
        },
      }),
    });

    const res = await enquiryPost(req);
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.code).toBe('DELIVERY_FAILED');
  });

  it('accepts exact full payload from QuietBloomRegistrationForm without 400', async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (String(url).includes('docs.google.com')) {
        return Promise.resolve(new Response('ok', { status: 200 }));
      }
      return Promise.resolve(new Response('ok', { status: 200 }));
    });
    vi.stubGlobal('fetch', fetchMock);

    const fullFrontendPayload = {
      type: 'retreat',
      data: {
        name: 'Sunita Mehra',
        email: 'sunita.mehra@example.com',
        phone: '+91 (987) 654-3210',
        age: '35',
        residence: 'Jaipur, Rajasthan, India',
        accommodation: 'Yes',
        transportation: true,
        dietary: 'Vegetarian, strictly no peanuts',
        medical: 'Mild asthma, carries inhaler',
        emergencyContact: 'Rajesh Mehra (Husband) — +91 98111 55667',
        intention: 'Hoping to experience silence and reconnect with conscious breath in the mountains.',
        consent: true,
        preferredSeason: '12–17 February 2027 · Dharamshala',
        roomPreference: 'Private Stone Cottage',
      },
      honeypot: '',
    };

    const req = new Request('http://localhost/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullFrontendPayload),
    });

    const res = await enquiryPost(req);
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.channels).toContain('google_forms');
  });

  it('retries Google Forms synchronization on duplicate submission if previous sync failed', async () => {
    let shouldFail = true;
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (String(url).includes('docs.google.com')) {
        if (shouldFail) {
          return Promise.resolve(new Response('Error in Google Forms', { status: 500 }));
        }
        return Promise.resolve(
          new Response(
            '<html><body><div class="freebirdFormviewerViewResponseConfirmationMessage">Your response has been recorded.</div></body></html>',
            { status: 200 }
          )
        );
      }
      return Promise.resolve(new Response('ok', { status: 200 }));
    });
    vi.stubGlobal('fetch', fetchMock);

    const payload = {
      type: 'retreat',
      data: {
        name: 'Retry Sync Tester',
        email: 'retry.tester@example.com',
        phone: '+919999988888',
        preferredSeason: 'february-2027',
        roomPreference: 'single-cottage',
        intention: 'Testing that synchronization retries when previous sync attempt failed.',
      },
    };

    // First attempt fails at Google Forms
    const res1 = await enquiryPost(
      new Request('http://localhost/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    );
    expect(res1.status).toBe(502);

    // Verify it was still safely saved locally in registrationStore
    const stored = await getRegistration('retreat', 'retry.tester@example.com');
    expect(stored).toBeDefined();
    expect(stored?.googleForms.synced).toBe(false);
    expect(stored?.googleForms.status).toBe('failed');

    // Second attempt: Google Forms is now operational
    shouldFail = false;
    const res2 = await enquiryPost(
      new Request('http://localhost/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    );
    expect(res2.status).toBe(200);
    const body2 = await res2.json();
    expect(body2.ok).toBe(true);
    expect(body2.duplicate).toBe(true);
    expect(body2.googleFormsSynced).toBe(true);

    // Verify local record is now marked as synced
    const updatedStored = await getRegistration('retreat', 'retry.tester@example.com');
    expect(updatedStored?.googleForms.synced).toBe(true);
    expect(updatedStored?.googleForms.status).toBe('synced');
  });

  it('persists registrations locally with all 14 fields stored safely', async () => {
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(
        new Response(
          '<html><body><div>Your response has been recorded.</div></body></html>',
          { status: 200 }
        )
      )
    );
    vi.stubGlobal('fetch', fetchMock);

    const fullPayload = {
      type: 'retreat',
      data: {
        name: 'Deepak Chopra',
        email: 'deepak@example.com',
        phone: '+91 98100 12345',
        age: '42',
        residence: 'Bengaluru, India',
        accommodation: 'Yes',
        transportation: false,
        dietary: 'Satvic / No onions',
        medical: 'None',
        emergencyContact: 'Priya Chopra +91 98100 54321',
        intention: 'Deepening meditation and quiet stillness.',
        consent: true,
        preferredSeason: '12–17 February 2027 · Dharamshala',
        roomPreference: 'Private Stone Cottage',
      },
    };

    const res = await enquiryPost(
      new Request('http://localhost/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullPayload),
      })
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.googleFormsSynced).toBe(true);

    const records = await getAllStoredRegistrations();
    const deepakRecord = records.find((r) => r.email === 'deepak@example.com');
    expect(deepakRecord).toBeDefined();
    expect(deepakRecord?.data.age).toBe('42');
    expect(deepakRecord?.data.residence).toBe('Bengaluru, India');
    expect(deepakRecord?.data.emergencyContact).toBe('Priya Chopra +91 98100 54321');
    expect(deepakRecord?.googleForms.synced).toBe(true);
  });
});

