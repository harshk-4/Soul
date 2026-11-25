'use client';

import React, { useState } from 'react';
import { OFFICIAL_EMAIL } from '@/lib/seo/metadata';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { CheckCircle2, AlertCircle, Loader2, Sparkles, ShieldCheck } from 'lucide-react';

interface QuietBloomFormState {
  name: string;
  email: string;
  phone: string;
  age: string;
  residence: string;
  accommodation: 'Yes' | 'No';
  transportation: boolean;
  dietary: string;
  medical: string;
  emergencyContact: string;
  intention: string;
  consent: boolean;
}

export function QuietBloomRegistrationForm() {
  const [formData, setFormData] = useState<QuietBloomFormState>({
    name: '',
    email: '',
    phone: '',
    age: '',
    residence: '',
    accommodation: 'Yes',
    transportation: false,
    dietary: '',
    medical: '',
    emergencyContact: '',
    intention: '',
    consent: false,
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof QuietBloomFormState, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationMeta, setRegistrationMeta] = useState<{
    duplicate?: boolean;
    googleFormsSynced?: boolean;
    syncError?: string;
    message?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setSubmitError(null);
    if (errors[name as keyof QuietBloomFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof QuietBloomFormState, string>> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || phoneDigits.length < 7) {
      newErrors.phone = 'Please provide an active WhatsApp number with country code.';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Please enter your age.';
    }

    if (!formData.residence.trim() || formData.residence.trim().length < 2) {
      newErrors.residence = 'Please provide your city and country of residence.';
    }

    if (!formData.emergencyContact.trim() || formData.emergencyContact.trim().length < 3) {
      newErrors.emergencyContact = 'Please provide an emergency contact (Name, Relationship & Phone Number).';
    }

    if (!formData.intention.trim() || formData.intention.trim().length < 10) {
      newErrors.intention = 'Please share your hope or intention for this retreat (at least 10 characters).';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must confirm the accuracy of information and communication consent to proceed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError(null);
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    const requestPayload = {
      type: 'retreat',
      data: {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        age: formData.age.trim(),
        residence: formData.residence.trim(),
        accommodation: formData.accommodation,
        transportation: formData.transportation,
        dietary: formData.dietary.trim() || 'None specified',
        medical: formData.medical.trim() || 'None specified',
        emergencyContact: formData.emergencyContact.trim(),
        intention: formData.intention.trim(),
        consent: formData.consent,
        preferredSeason: '12–17 February 2027 · Dharamshala',
        roomPreference:
          formData.accommodation === 'Yes'
            ? 'Private Stone Cottage'
            : 'Self-arranged',
      },
      honeypot,
    };

    console.log('[QuietBloomRegistration] Submitting payload structure:', {
      type: requestPayload.type,
      fieldsCount: Object.keys(requestPayload.data).length,
      accommodation: formData.accommodation,
      transportation: formData.transportation,
      consentConfirmed: formData.consent,
    });

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        message?: string;
        code?: string;
        duplicate?: boolean;
        googleFormsSynced?: boolean;
        syncError?: string;
        fieldErrors?: Record<string, string>;
      } | null;

      if (!response.ok || !payload?.ok) {
        console.error('[QuietBloomRegistration] Submission returned error status:', {
          status: response.status,
          statusText: response.statusText,
          backendMessage: payload?.error || payload?.message,
          fieldErrors: payload?.fieldErrors,
        });

        if (payload?.fieldErrors) {
          setErrors((prev) => ({
            ...prev,
            ...payload.fieldErrors,
          }));
        }

        const specificError =
          payload?.fieldErrors && Object.keys(payload.fieldErrors).length > 0
            ? `Please review the following fields: ${Object.values(payload.fieldErrors).join('; ')}`
            : payload?.error || payload?.message;

        setSubmitError(
          specificError ||
            `We could not submit your retreat registration right now. Please email ${OFFICIAL_EMAIL} directly.`
        );
        return;
      }

      console.log('[QuietBloomRegistration] Registration succeeded:', payload);
      setRegistrationMeta({
        duplicate: payload.duplicate,
        googleFormsSynced: payload.googleFormsSynced,
        syncError: payload.syncError,
        message: payload.message,
      });
      setIsSubmitted(true);
    } catch (networkError) {
      console.error('[QuietBloomRegistration] Network error during submission:', networkError);
      setSubmitError(
        `A network connection error prevented registration. Please try again or email ${OFFICIAL_EMAIL} directly.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    const isSynced = registrationMeta?.googleFormsSynced === true;
    const isDuplicate = registrationMeta?.duplicate === true;

    return (
      <div
        role="status"
        className="bg-surface-alt border border-border-alt rounded-2xl p-8 sm:p-10 lg:p-12 text-center space-y-4 animate-in fade-in-50 duration-300 shadow-sm"
      >
        <div className="w-14 h-14 rounded-full bg-secondary-fixed/50 text-secondary mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-secondary" />
        </div>
        <h3 className="font-serif text-[24px] sm:text-headline-md text-primary font-normal leading-snug">
          {isDuplicate
            ? 'Registration Confirmed 🌿'
            : 'Thank you for registering for the Quiet Bloom Retreat. 🌿'}
        </h3>
        <p className="font-sans text-body-md text-on-surface-variant max-w-lg mx-auto leading-relaxed">
          {registrationMeta?.message ||
            'Your registration details have been received. Our team will contact you on WhatsApp with further information regarding confirmation, accommodation, transportation and the retreat schedule.'}
        </p>

        {isSynced && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/40 text-secondary text-xs font-sans font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            <span>Synchronized with Google Forms Responses</span>
          </div>
        )}

        <div className="pt-2 text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase text-tertiary">
          12–17 February 2027 | Dharamshala, India
        </div>
        <p className="font-serif text-sm text-primary/80 italic">
          Soulfuli Team
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Honeypot field for bot protection */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {submitError && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-xl bg-error-container/50 border border-error/40 text-on-error-container text-sm font-sans"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-error" />
          <div className="space-y-1">
            <p className="font-medium">{submitError}</p>
            <p className="text-xs text-on-error-container/80">
              You can also write to us at{' '}
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="underline underline-offset-2 hover:opacity-80 font-semibold"
              >
                {OFFICIAL_EMAIL}
              </a>
            </p>
          </div>
        </div>
      )}

      {/* SECTION 1: PARTICIPANT INFORMATION */}
      <div className="space-y-5">
        <div className="border-b border-border-alt pb-3">
          <h3 className="font-serif text-xl sm:text-2xl text-primary font-normal">
            1. Participant Information
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
            Details required for retreat coordination and official participant registration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <Input
            id="participant-name"
            name="name"
            label="Full Name"
            required
            autoComplete="name"
            placeholder="e.g. Anandita Sen"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <Input
            id="participant-email"
            name="email"
            type="email"
            label="Email Address"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <Input
            id="participant-phone"
            name="phone"
            type="tel"
            label="WhatsApp Number (with country code)"
            required
            autoComplete="tel"
            placeholder="e.g. +91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <Input
            id="participant-age"
            name="age"
            type="text"
            label="Age"
            required
            placeholder="e.g. 34"
            value={formData.age}
            onChange={handleChange}
            error={errors.age}
          />
        </div>

        <Input
          id="participant-residence"
          name="residence"
          label="City & Country of Residence"
          required
          autoComplete="address-level2"
          placeholder="e.g. New Delhi, India or London, United Kingdom"
          value={formData.residence}
          onChange={handleChange}
          error={errors.residence}
        />
      </div>

      {/* SECTION 2: RETREAT PREFERENCES & CARE */}
      <div className="space-y-5 pt-4">
        <div className="border-b border-border-alt pb-3">
          <h3 className="font-serif text-xl sm:text-2xl text-primary font-normal">
            2. Retreat Preferences &amp; Stay
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
            Helping our retreat team prepare comfortable arrangements for your Himalayan gathering.
          </p>
        </div>

        {/* Accommodation Preference Radio Group */}
        <div className="space-y-2">
          <label className="block font-sans text-label-md uppercase tracking-wider text-on-surface-variant">
            Accommodation Preference <span className="text-tertiary">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <label
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                formData.accommodation === 'Yes'
                  ? 'border-primary bg-surface shadow-sm'
                  : 'border-border-alt bg-surface-alt/70 hover:bg-surface'
              }`}
            >
              <input
                type="radio"
                name="accommodation"
                value="Yes"
                checked={formData.accommodation === 'Yes'}
                onChange={() => setFormData((prev) => ({ ...prev, accommodation: 'Yes' }))}
                className="mt-1 h-4 w-4 text-primary accent-primary focus:ring-primary"
              />
              <div className="text-sm">
                <span className="font-medium text-primary block">Yes — Retreat Accommodation</span>
                <span className="text-xs text-on-surface-variant mt-0.5 block leading-relaxed">
                  I would like retreat accommodation arranged by SoulfulI in Dharamshala.
                </span>
              </div>
            </label>

            <label
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                formData.accommodation === 'No'
                  ? 'border-primary bg-surface shadow-sm'
                  : 'border-border-alt bg-surface-alt/70 hover:bg-surface'
              }`}
            >
              <input
                type="radio"
                name="accommodation"
                value="No"
                checked={formData.accommodation === 'No'}
                onChange={() => setFormData((prev) => ({ ...prev, accommodation: 'No' }))}
                className="mt-1 h-4 w-4 text-primary accent-primary focus:ring-primary"
              />
              <div className="text-sm">
                <span className="font-medium text-primary block">No — Self-arranged Lodging</span>
                <span className="text-xs text-on-surface-variant mt-0.5 block leading-relaxed">
                  I will arrange my own local lodging or accommodation in Dharamshala.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Transportation Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-border-alt bg-surface-alt/50 hover:bg-surface-alt cursor-pointer transition-colors">
            <input
              type="checkbox"
              name="transportation"
              checked={formData.transportation}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-primary accent-primary rounded focus:ring-primary"
            />
            <div className="text-sm">
              <span className="font-medium text-primary">Transportation Arrangement</span>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Check this if: <strong className="font-medium text-primary">I will arrange my own transportation</strong> to Dharamshala.
              </p>
            </div>
          </label>
        </div>

        {/* Dietary Preferences (Optional) */}
        <Textarea
          id="participant-dietary"
          name="dietary"
          label="Dietary Preferences, Allergies or Food Restrictions (Optional)"
          rows={3}
          placeholder="e.g. Vegetarian, vegan, gluten-free, nut allergy, lactose intolerance..."
          value={formData.dietary}
          onChange={handleChange}
        />

        {/* Medical / Accessibility (Optional) */}
        <Textarea
          id="participant-medical"
          name="medical"
          label="Medical, Accessibility or Other Requirements (Optional)"
          rows={3}
          placeholder="Please mention any health considerations, mobility requirements, or notes our team should be aware of."
          value={formData.medical}
          onChange={handleChange}
        />

        {/* Emergency Contact */}
        <Input
          id="participant-emergency"
          name="emergencyContact"
          label="Emergency Contact (Name + Relationship + Phone Number)"
          required
          placeholder="e.g. Priya Sen (Sister) — +91 98111 22334"
          value={formData.emergencyContact}
          onChange={handleChange}
          error={errors.emergencyContact}
        />

        {/* Intention / Seeking */}
        <Textarea
          id="participant-intention"
          name="intention"
          label="What are you hoping to experience or gain from the Quiet Bloom Retreat?"
          required
          rows={4}
          placeholder="Share what calls you to Dharamshala at this juncture of your journey. What would you like to pause, understand, or explore?"
          value={formData.intention}
          onChange={handleChange}
          error={errors.intention}
        />
      </div>

      {/* SECTION 3: PARTICIPANT CONSENT */}
      <div className="space-y-3 pt-3 border-t border-border-alt">
        <label className="flex items-start gap-3 p-4 rounded-xl border border-border-alt bg-surface-alt/70 hover:bg-surface cursor-pointer transition-colors">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1 h-4 w-4 text-primary accent-primary rounded focus:ring-primary shrink-0"
          />
          <span className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            I confirm that the information provided above is accurate, and I agree to receive retreat-related communication and updates through WhatsApp. I understand that photographs/videos may be taken during the retreat for documentation and communication purposes. <span className="text-tertiary">*</span>
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="text-xs text-error pl-1">
            {errors.consent}
          </p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="terracotta"
          size="lg"
          className="w-full sm:w-auto min-w-[240px] rounded-xl shadow-md hover:shadow-lg transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting Registration...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              Submit Registration
              <Sparkles className="w-4 h-4" />
            </span>
          )}
        </Button>
        <p className="text-xs text-on-surface-variant/75 mt-3 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
          <span>Your information is held in strict confidence and sent directly to the SoulfulI Retreat Facilitator team.</span>
        </p>
      </div>
    </form>
  );
}

export default QuietBloomRegistrationForm;
