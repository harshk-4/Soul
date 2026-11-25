import React from 'react';
import type { Metadata } from 'next';
import SectionHeading from '@/components/shared/SectionHeading';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import QuietBloomRegistrationForm from '@/components/forms/QuietBloomRegistrationForm';
import { Feather, Clock, MapPin, Users, Calendar, Download, ArrowDown } from 'lucide-react';
import {
  ImageSection,
  ImageEyebrow,
  ImageHeading,
} from '@/components/shared/ImageSection';
import { createPageMetadata, RETREAT_BROCHURE_URL } from '@/lib/seo/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Quiet Bloom Retreat – February 2027 | SoulfulI',
  description:
    'Join SoulfulI’s Quiet Bloom Retreat from 12 February – 17 February, 2027 in Dharamshala, Himachal Pradesh. Download the official brochure and register for our Himalayan gathering.',
  path: '/quiet-bloom',
});


export default function QuietBloomPage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* SECTION 1: CINEMATIC PANORAMIC HERO */}
      <ImageSection
        src="/image/mount.jpeg"
        alt="Lush misty green Himalayan hillside village overlooking terraced mountain slopes"
        objectPosition="center 45%"
        overlayVariant="mountain-dawn"
        enableSubtleZoom={true}
        blendEdges={true}
        priority
        className="min-h-[85vh] sm:min-h-[90vh] flex items-end justify-start -mt-20 pt-20 sm:pt-24"
        containerClassName="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16 pb-16 sm:pb-20 lg:pb-28 pt-28 sm:pt-36"
      >
        <div className="max-w-3xl space-y-5 sm:space-y-6 text-white">
          <ImageEyebrow className="text-white">
            Quiet Bloom Retreat · Dharamshala, Himachal Pradesh
          </ImageEyebrow>

          <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl sm:rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-sans font-medium text-[#FDFBF7] shadow-sm">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-tertiary-fixed shrink-0" aria-hidden="true" />
            <span>Upcoming Retreat: 12 February – 17 February, 2027</span>
          </div>

          <ImageHeading as="h1" className="text-[32px] leading-[38px] sm:text-[48px] sm:leading-[54px] lg:text-[66px] lg:leading-[74px]">
            Quiet Bloom Retreat
          </ImageHeading>

          <p className="font-serif text-lg sm:text-quote-lg text-white font-normal max-w-xl leading-relaxed italic editorial-shadow">
            Slow down without falling behind. A retreat for returning to conscious movement, grounded contemplation, and mountain silence.
          </p>

          <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Button href="#apply" variant="ivory" size="lg" className="w-full sm:w-auto rounded-full shadow-xl hover:shadow-2xl transition-all text-center">
              Register Now
            </Button>
            <a
              href={RETREAT_BROCHURE_URL}
              download="Soulfuli-Quiet-Bloom-Retreat-Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-[14px] sm:text-[15px] font-medium rounded-full bg-transparent text-white border border-white/60 hover:bg-white/15 hover:border-white backdrop-blur-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download Brochure</span>
            </a>
          </div>
        </div>
      </ImageSection>

      {/* SECTION 1.5: FEBRUARY 2027 RETREAT ANNOUNCEMENT */}
      <section
        aria-labelledby="retreat-announcement-heading"
        className="w-full py-12 sm:py-16 lg:py-24 bg-surface-alt-gradient border-b border-border-alt"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="rounded-2xl bg-surface border border-border-alt shadow-sm p-6 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <Badge variant="terracotta" dot>
                Upcoming Retreat Announcement
              </Badge>

              <h2
                id="retreat-announcement-heading"
                className="font-serif text-[26px] sm:text-[34px] lg:text-display-md text-primary font-normal leading-tight"
              >
                Quiet Bloom Retreat — February 2027
              </h2>

              <div className="inline-flex items-center gap-2.5 rounded-xl bg-surface-alt border border-border-alt px-3.5 py-2.5 sm:px-4 sm:py-3 text-primary font-sans text-xs sm:text-base font-semibold">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" aria-hidden="true" />
                <span>Retreat Dates: 12 February – 17 February, 2027</span>
              </div>

              <p className="font-sans text-body-sm sm:text-body-md text-on-surface-variant leading-relaxed max-w-2xl">
                Registrations are now open for our upcoming Himalayan gathering in Dharamshala. Download the official brochure for complete programme details, and submit your registration below so our facilitator team can personally connect with you.
              </p>
            </div>

            <div className="lg:col-span-5 bg-surface-alt rounded-xl border border-border-alt p-5 sm:p-6 lg:p-8 space-y-5">
              <div className="space-y-1.5">
                <span className="font-sans text-xs uppercase tracking-[0.16em] text-secondary font-semibold block">
                  Registration &amp; Brochure
                </span>
                <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Every registration is personally reviewed by our facilitators to preserve a quiet, deeply aligned cohort.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button href="#apply" variant="terracotta" size="lg" className="w-full rounded-full justify-center gap-2">
                  <span>Register Now</span>
                  <ArrowDown className="w-4 h-4" aria-hidden="true" />
                </Button>

                <a
                  href={RETREAT_BROCHURE_URL}
                  download="Soulfuli-Quiet-Bloom-Retreat-Brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-[14px] font-medium rounded-full bg-surface text-primary border border-outline-variant hover:border-primary hover:bg-border-alt/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Download className="w-4 h-4 text-secondary" aria-hidden="true" />
                  <span>Download Brochure (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE INVITATION & PROVOCATION */}
      <section id="experience" className="w-full py-16 sm:py-20 lg:py-32 bg-surface border-b border-outline-variant/60 scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <Badge variant="terracotta" dot>
                The Mountain Sanctuary
              </Badge>
              <h2 className="font-serif text-[26px] sm:text-[34px] lg:text-display-lg text-primary tracking-tight font-normal leading-tight">
                Stillness is not an indulgence. It is essential maintenance for the soul.
              </h2>
              <p className="font-sans text-body-md sm:text-body-lg text-on-surface-variant leading-relaxed">
                Quiet Bloom gathers 12 thoughtful individuals in the cedar-covered hills above Dharamshala. We step away from the velocity of screens and endless production to reconnect with what is steady.
              </p>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 sm:p-6 rounded-xl bg-surface-alt border border-border-alt space-y-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <h3 className="font-serif text-lg text-primary">Dharamshala, HP</h3>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Nestled in peaceful Himalayan pine and deodar forests overlooking the Kangra Valley.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-xl bg-surface-alt border border-border-alt space-y-2">
                  <Users className="w-5 h-5 text-secondary" />
                  <h3 className="font-serif text-lg text-primary">12 Participants Max</h3>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Intentionally small cohort to ensure privacy, spaciousness, and intimate conversation.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-xl bg-surface-alt border border-border-alt space-y-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  <h3 className="font-serif text-lg text-primary">6 Days &amp; 5 Nights</h3>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Unhurried schedule designed to allow deep nervous system down-regulation.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-xl bg-surface-alt border border-border-alt space-y-2">
                  <Feather className="w-5 h-5 text-secondary" />
                  <h3 className="font-serif text-lg text-primary">Contemplative Immersion</h3>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Guided morning stillness, village walking meditation, and tea pavilion inquiry circles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DAILY RHYTHM */}
      <section className="w-full py-16 sm:py-20 lg:py-32 bg-surface-alt-gradient border-b border-border-alt">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16 space-y-12 sm:space-y-16">
          <SectionHeading
            align="center"
            eyebrow="The Cadence of Presence"
            title="A Sample Day in the Valley"
            subtitle="No forced schedules. Everything is an invitation to listen to your natural rhythm."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-surface p-5 sm:p-6 rounded-xl border border-border-alt space-y-3 shadow-sm">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-secondary">
                06:30 — Morning
              </span>
              <h3 className="font-serif text-lg text-primary font-normal">Dawn Meditation &amp; Tea</h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Quiet sitting overlooking the valley mist followed by warm herbal infusions.
              </p>
            </div>

            <div className="bg-surface p-5 sm:p-6 rounded-xl border border-border-alt space-y-3 shadow-sm">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-secondary">
                10:00 — Mid-Morning
              </span>
              <h3 className="font-serif text-lg text-primary font-normal">Forest Contemplation</h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Guided walking practice through ancient deodar trails and stream crossings.
              </p>
            </div>

            <div className="bg-surface p-5 sm:p-6 rounded-xl border border-border-alt space-y-3 shadow-sm">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-secondary">
                15:00 — Afternoon
              </span>
              <h3 className="font-serif text-lg text-primary font-normal">Spacious Solitude</h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Dedicated unstructured time for journaling, reading, resting, or quiet dialogue.
              </p>
            </div>

            <div className="bg-surface p-5 sm:p-6 rounded-xl border border-border-alt space-y-3 shadow-sm">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-secondary">
                18:30 — Evening
              </span>
              <h3 className="font-serif text-lg text-primary font-normal">Fireside Inquiry Circle</h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Intimate shared evening reflections and nourishing locally sourced mountain dinner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: APPLICATION & INQUIRY FORM */}
      <section id="apply" className="w-full py-16 sm:py-20 lg:py-32 bg-surface scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
            <div className="text-center space-y-3">
              <Badge variant="terracotta" dot>
                12 February – 17 February, 2027 · Registration
              </Badge>
              <h2 className="font-serif text-[26px] sm:text-[34px] lg:text-display-lg text-primary tracking-tight font-normal">
                Register for Quiet Bloom Retreat
              </h2>
              <p className="font-sans text-body-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                Complete the registration form below to express your interest in the February 2027 gathering. Our facilitators personally review every submission and respond within two business days.
              </p>
            </div>

            <div className="w-full bg-surface-alt rounded-2xl border border-border-alt shadow-sm p-6 sm:p-8 lg:p-10">
              <QuietBloomRegistrationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


