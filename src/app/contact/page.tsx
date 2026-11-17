import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/forms/ContactForm';
import Badge from '@/components/ui/Badge';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Instagram,
  Linkedin,
  Phone,
  Building2,
} from 'lucide-react';
import {
  createPageMetadata,
  OFFICIAL_EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  WHATSAPP_CHANNEL_URL,
  COMPANY_NAME,
  OFFICE_ADDRESS,
  OFFICIAL_PHONES,
} from '@/lib/seo/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact SoulfulI | SOULFULL Collective LLP',
  description:
    'Contact SoulfulI (SOULFULL Collective LLP) in East of Kailash, New Delhi, India. Reach us by phone, email, or direct message regarding workshops, corporate training, and retreats.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-surface px-6 lg:px-16 pt-12 lg:pt-20 pb-24">
      <div className="max-w-[1240px] mx-auto space-y-12 lg:space-y-14">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="sage" dot>
            Contact Us
          </Badge>
          <h1 className="font-serif text-display-lg-mobile lg:text-display-lg text-primary tracking-tight font-normal">
            Start a deliberate conversation.
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed">
            We treat every dispatch with personal care. You will receive a thoughtful human reply within two business days. Zero automated marketing drip campaigns.
          </p>
        </div>

        {/* Official Contact Us Details */}
        <section
          aria-labelledby="contact-us-details-heading"
          className="bg-surface-alt p-6 sm:p-8 lg:p-10 rounded-2xl border border-border-alt shadow-sm"
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-11 h-11 rounded-full bg-surface border border-border-alt flex items-center justify-center text-secondary shrink-0 mt-0.5">
                <Phone className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-sans text-xs uppercase tracking-[0.16em] text-secondary font-semibold block">
                    Official Contact Details
                  </span>
                  <h2
                    id="contact-us-details-heading"
                    className="font-serif text-headline-md text-primary font-normal"
                  >
                    Contact Us
                  </h2>
                </div>

                <div className="space-y-2.5 text-sm sm:text-base font-sans text-on-surface-variant">
                  <div className="flex items-start gap-2.5">
                    <Building2 className="w-4 h-4 text-secondary shrink-0 mt-1" aria-hidden="true" />
                    <span className="font-semibold text-primary">{COMPANY_NAME}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-secondary shrink-0 mt-1" aria-hidden="true" />
                    <address className="not-italic leading-relaxed">
                      {OFFICE_ADDRESS}
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:min-w-[260px] pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border-alt lg:pl-8 space-y-3">
              <span className="font-sans text-xs uppercase tracking-[0.16em] text-secondary font-semibold block">
                Mobile Numbers
              </span>
              <div className="flex flex-col gap-2.5">
                {OFFICIAL_PHONES.map((phone) => (
                  <a
                    key={phone.display}
                    href={`tel:${phone.tel}`}
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-surface border border-border-alt text-primary font-sans text-sm font-semibold hover:border-primary/60 hover:bg-border-alt/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Phone className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                    <span>{phone.display}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-surface-alt p-6 lg:p-10 rounded-2xl border border-border-alt shadow-sm">
            <Suspense
              fallback={
                <div className="py-12 text-center font-sans text-sm text-on-surface-variant">
                  Loading contact form&hellip;
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          {/* Right: Context & Physical Presence */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-surface-alt p-8 rounded-2xl border border-border-alt space-y-6 shadow-sm">
              <span className="font-sans text-xs uppercase tracking-widest text-secondary font-semibold block">
                Correspondence Commitments
              </span>

              <div className="space-y-4 text-sm font-sans text-on-surface-variant">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-secondary shrink-0 pt-0.5" />
                  <div>
                    <strong className="text-primary block font-medium">Response Cadence</strong>
                    <span>Personal replies within 48 business hours.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-secondary shrink-0 pt-0.5" />
                  <div>
                    <strong className="text-primary block font-medium">Complete Confidentiality</strong>
                    <span>Your inquiries and reflective context remain strictly private.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary shrink-0 pt-0.5" />
                  <div>
                    <strong className="text-primary block font-medium">Office Location</strong>
                    <span>New Delhi, India</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface-alt rounded-xl border border-border-alt space-y-2">
              <h2 className="font-serif text-lg text-primary font-normal">
                Direct Electronic Mail
              </h2>
              <p className="font-sans text-xs text-on-surface-variant">
                For direct press, publishing, or institutional correspondence:
              </p>
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="font-sans text-sm font-semibold text-on-tertiary-fixed-variant hover:underline block pt-1 break-all"
              >
                {OFFICIAL_EMAIL}
              </a>
            </div>

            <div className="p-6 bg-surface-alt rounded-xl border border-border-alt space-y-3">
              <h2 className="font-serif text-lg text-primary font-normal">
                Follow Our Journey
              </h2>
              <p className="font-sans text-xs text-on-surface-variant">
                Follow our ongoing reflections, contemplative dispatches, and community updates:
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-border-alt text-xs font-sans text-on-surface hover:text-primary hover:border-primary/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                  aria-label="Follow Soulfuli on Instagram"
                >
                  <Instagram className="w-4 h-4 text-secondary transition-transform duration-200 group-hover:scale-110" />
                  <span>Instagram</span>
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-border-alt text-xs font-sans text-on-surface hover:text-primary hover:border-primary/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                  aria-label="Connect with Soulfuli on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-secondary transition-transform duration-200 group-hover:scale-110" />
                  <span>LinkedIn</span>
                </a>
                {WHATSAPP_CHANNEL_URL ? (
                  <a
                    href={WHATSAPP_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-border-alt text-xs font-sans text-on-surface hover:text-primary hover:border-primary/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                    aria-label="Follow Soulfuli on WhatsApp Channel"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-secondary transition-transform duration-200 group-hover:scale-110" />
                    <span>WhatsApp Channel</span>
                  </a>
                ) : (
                  <Link
                    href="/community#social-channels"
                    prefetch={true}
                    className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface border border-border-alt text-xs font-sans text-on-surface hover:text-primary hover:border-primary/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                    aria-label="WhatsApp Channel — pending official channel link"
                    title="WhatsApp Channel link pending official URL"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-secondary transition-transform duration-200 group-hover:scale-110" />
                    <span>WhatsApp Channel</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
