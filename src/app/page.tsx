import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Compass, Feather } from 'lucide-react';
import OfferingsSection from '@/components/home/OfferingsSection';
import QuietBloomFeature from '@/components/home/QuietBloomFeature';
import HeroVideo from '@/components/shared/HeroVideo';
import {
  ImageSection,
  ImageEyebrow,
  ImageHeading,
  ImageParagraph,
} from '@/components/shared/ImageSection';
import {
  createPageMetadata,
  HOMEPAGE_TITLE,
  HOMEPAGE_DESCRIPTION,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  WHATSAPP_CHANNEL_URL,
} from '@/lib/seo/metadata';

export const metadata: Metadata = createPageMetadata({
  title: HOMEPAGE_TITLE,
  description: HOMEPAGE_DESCRIPTION,
  path: '/',
});

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">

      {/* =================================================== */}
      {/* SECTION 1: HERO (THE INVITATION)                     */}
      {/* =================================================== */}
      <section className="relative w-full overflow-hidden bg-surface pt-8 sm:pt-12 lg:pt-20 pb-16 sm:pb-20 lg:pb-32 border-b border-outline-variant/60">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6 z-10">
              <Badge variant="sand" dot>
                An Invitation to Return
              </Badge>

              <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[62px] leading-[1.12] lg:leading-[70px] text-primary tracking-tight font-normal">
                Understand yourself deeply enough to <span className="italic font-normal">live differently</span>.
              </h1>

              <p className="font-sans text-body-md sm:text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                The space between knowing and becoming. SoulfulI integrates emotional intelligence, holistic wellbeing, mindfulness, and conscious living into one grounded, unhurried journey.
              </p>

              <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Button href="/eq-audit" variant="primary" size="lg" className="w-full sm:w-auto rounded-full text-center">
                  Take the EQ Audit
                </Button>
                <Button href="/our-story" variant="secondary" size="lg" className="w-full sm:w-auto rounded-full text-center">
                  Explore Our Story
                </Button>
              </div>

              <div className="pt-5 sm:pt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-on-surface-variant/80 border-t border-outline-variant/40 w-full">
                <div className="flex items-center gap-2">
                  <Feather className="w-4 h-4 text-secondary shrink-0" />
                  <span>A mirror, not a verdict</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-secondary shrink-0" />
                  <span>Soulful Intelligence EQ Audit · 48 reflective dimensions</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative w-full">
              <div className="relative w-full aspect-[4/5] max-w-[480px] mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-[0_24px_64px_-16px_rgba(31,42,36,0.22)] border border-border-alt/80 bg-surface-alt group">
                <div className="relative h-full min-h-[340px] sm:min-h-[460px] lg:min-h-[520px] w-full overflow-hidden">
                  <HeroVideo
                    videoSrc="/video/tree.mp4"
                    posterSrc="/images/t1.webp"
                    alt="Quiet Contemplation beside ancient tree"
                    sizes="(max-width: 1024px) 92vw, 480px"
                    imageClassName="transition-transform duration-1000 ease-out group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/25 to-transparent pointer-events-none" />
                </div>

                {/* Editorial Glass Caption Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-10 bg-[#1F2A24]/60 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-white/15 text-white shadow-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                    <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/80 font-medium">
                      Quiet Contemplation
                    </span>
                  </div>
                  <p className="font-serif text-[15px] sm:text-[17px] text-[#FDFBF7] italic leading-snug">
                    &ldquo;When the external noise quiets, your real life begins.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* SECTION 2: AN OLD IDEA, MADE PRACTICAL AGAIN        */}
      {/* =================================================== */}
      <ImageSection
        src="/image/phili.webp"
        alt="Serene person meditating beside calm water at dusk"
        objectPosition="center 62%"
        overlayVariant="warm-sunset"
        enableSubtleZoom={true}
        className="border-b border-border-alt text-white"
        containerClassName="py-20 sm:py-24 lg:py-36"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start text-white">
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32 text-white">
              <ImageEyebrow className="text-white">
                Our Philosophy
              </ImageEyebrow>

              <ImageHeading as="h2" className="text-[28px] sm:text-[38px] lg:text-[48px] lg:leading-[1.12] text-white">
                An Old Idea, Made Practical Again
              </ImageHeading>

              <div className="w-16 h-0.5 bg-white/80 rounded-full" aria-hidden="true" />
            </div>

            <div className="lg:col-span-7 space-y-6 sm:space-y-7 pt-2 lg:pt-3 text-white">
              <p className="font-serif text-lg sm:text-xl lg:text-[21px] leading-[1.65] text-white font-normal italic editorial-shadow max-w-[58ch]">
                None of this is new. Traditions far older than the modern wellness
                industry already understood that the mind, the heart, and the spirit
                were never separate departments. What has changed is how disconnected
                our daily lives have become from that understanding.
              </p>

              <ImageParagraph className="text-base sm:text-lg text-white/95 leading-[1.8] max-w-[58ch]">
                We are not introducing a new philosophy. We are translating an old one
                into a language that fits a Monday morning, a difficult conversation,
                a leadership decision, a classroom, a quiet evening alone with your
                own thoughts.
              </ImageParagraph>

              <ImageParagraph className="text-base sm:text-lg text-white/95 leading-[1.8] max-w-[58ch]">
                This is what we mean when we say SoulfulI sits at the intersection of
                Emotional Intelligence, holistic wellbeing, spirituality, and mindfulness. Not
                separate offerings stacked side by side, but one continuous practice
                of conscious living—paying attention first to yourself, then to the people around you,
                then to whatever it is you are here to do.
              </ImageParagraph>
            </div>
          </div>
        </div>
      </ImageSection>

      {/* =================================================== */}
      {/* SECTION 3: WHAT WE OFFER                            */}
      {/* =================================================== */}
      <OfferingsSection />

      {/* =================================================== */}
      {/* SECTION 3.5: FEATURED RETREAT (QUIET BLOOM)         */}
      {/* =================================================== */}
      <QuietBloomFeature />

      {/* =================================================== */}
      {/* SECTION 4: BEYOND THE ORDINARY                      */}
      {/* =================================================== */}
      <section className="w-full bg-surface-alt-gradient border-b border-border-alt">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="sand" dot>
                Beyond the Ordinary
              </Badge>

              <h2 className="font-serif text-[28px] sm:text-[36px] lg:text-display-md text-primary font-normal leading-tight">
                Beyond the Ordinary
              </h2>

              <div className="pt-2">
                <Button
                  href="/what-makes-us-different"
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto rounded-full text-center"
                >
                  Explore Beyond the Ordinary
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 sm:space-y-6 font-sans text-body-md sm:text-body-lg text-on-surface-variant leading-relaxed">
              <p>
                We do not treat spirituality as a mood board, mindfulness as a
                five-minute app notification, or emotional intelligence as a
                productivity hack for the workplace.
              </p>

              <p>
                We treat all three as disciplines, practical, learnable, and grounded
                in real life rather than performance.
              </p>

              <p>
                Every framework we teach has been lived before it was taught. Every
                practice we offer is meant to be carried home, not left behind in the
                workshop room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* SECTION 5: COMMUNITY / CLOSING INVITATION            */}
      {/* =================================================== */}
      <ImageSection
        src="/images/buddha-forest.webp"
        alt="Buddha statue nestled peacefully within lush forest canopy with sunbeams and misty waterfall"
        objectPosition="center 30%"
        overlayVariant="forest-sanctuary"
        enableSubtleZoom={true}
        blendEdges={true}
        className="border-b border-outline-variant/30 text-white"
        containerClassName="py-20 sm:py-24 lg:py-36"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            {/* Left Column: Heading, Eyebrow & Pull Quote */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-7 lg:sticky lg:top-28">
              <ImageEyebrow dot className="text-[#F6F0E5] border-white/25 bg-white/[0.12] backdrop-blur-md">
                Join Our Community
              </ImageEyebrow>

              <ImageHeading as="h2" className="text-[32px] sm:text-[40px] lg:text-[50px] leading-[1.12] text-[#F6F0E5] font-normal tracking-tight">
                Be Part of
                <br />
                <span className="italic font-normal">What Comes Next</span>
              </ImageHeading>

              <div className="w-16 h-0.5 bg-[#B8C7B9]/70 rounded-full" aria-hidden="true" />

              {/* Italic Quotation Callout */}
              <div className="pt-2 pl-4 border-l-2 border-[#B8C7B9]/50">
                <p className="font-serif text-base sm:text-xl lg:text-[21px] text-[#F6F0E5] italic leading-[1.45] editorial-shadow max-w-[34ch]">
                  &ldquo;The gap between where you are and where you can be is not a flaw.
                  It is an invitation.&rdquo;
                </p>
              </div>
            </div>

            {/* Right Column: Narrative Copy, Reflection & Actions */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 pt-1 lg:pt-3">
              <div className="space-y-5 sm:space-y-6">
                <ImageParagraph className="text-base sm:text-lg text-[#F6F0E5]/95 leading-[1.8] max-w-[56ch]">
                  SoulfulI is growing into a community, not just a company. As our tools,
                  experiential workshops, corporate training, and retreats go live, we want the people who
                  believe in this work to be the first to know, the first to join, and
                  eventually, the first to help shape it.
                </ImageParagraph>

                <ImageParagraph className="text-base sm:text-lg text-[#F6F0E5]/85 leading-[1.8] max-w-[56ch]">
                  So we will leave you with the question we keep asking ourselves. If
                  your mind, your heart, and your spirit were finally allowed to grow in
                  the same direction at the same time, what might change first?
                </ImageParagraph>
              </div>

              {/* Calls to Action */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  href="/community"
                  variant="ivory"
                  size="lg"
                  className="w-full sm:w-auto rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-medium text-center"
                >
                  Join the Community
                </Button>
              </div>

              {/* Follow Along / Social Links */}
              <p className="font-sans text-xs sm:text-sm text-[#F6F0E5]/75 max-w-[54ch] pt-1">
                Follow along on{' '}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-[#F6F0E5] text-[#F6F0E5]/90 transition-colors"
                  aria-label="Follow Soulfuli on Instagram"
                >
                  Instagram
                </a>
                ,{' '}
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-[#F6F0E5] text-[#F6F0E5]/90 transition-colors"
                  aria-label="Connect with Soulfuli on LinkedIn"
                >
                  LinkedIn
                </a>
                , and{' '}
                {WHATSAPP_CHANNEL_URL ? (
                  <a
                    href={WHATSAPP_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-[#F6F0E5] text-[#F6F0E5]/90 transition-colors"
                    aria-label="Follow Soulfuli on WhatsApp Channel"
                  >
                    WhatsApp Channel
                  </a>
                ) : (
                  <Link
                    href="/contact?program=community"
                    className="underline underline-offset-2 hover:text-[#F6F0E5] text-[#F6F0E5]/90 transition-colors"
                    aria-label="WhatsApp Channel — request channel invite via Contact Us"
                  >
                    WhatsApp Channel
                  </Link>
                )}
                . Join the community when the doors open.
              </p>
            </div>
          </div>
        </div>
      </ImageSection>

    </div>
  );
}