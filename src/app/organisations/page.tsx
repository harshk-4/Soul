import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import SectionHeading from '@/components/shared/SectionHeading';
import OrganisationEnquiryForm from '@/components/forms/OrganisationEnquiryForm';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getBlurProps } from '@/lib/media/imagePlaceholders';

export const metadata: Metadata = createPageMetadata({
  title: 'Corporate Emotional Intelligence Training | SoulfulI',
  description:
    'Corporate emotional intelligence training and conscious leadership programs by SoulfulI. Strengthen self-awareness, team wellbeing, and intentional workplace communication.',
  path: '/organisations',
  imagePath: '/images/og-soulfuli.png',
});

const corporatePillars = [
  {
    number: '01',
    category: 'RECOGNITION',
    title: 'Emotional Intelligence',
    description:
      'Building the capacity to recognize and name emotional states in oneself and others before they turn into reactive decisions or strained relationships.',
  },
  {
    number: '02',
    category: 'OBSERVATION',
    title: 'Self-Aware Leadership',
    description:
      'Creating reflective space to examine leadership habits, blind spots, and unspoken pressures without fear of judgment.',
  },
  {
    number: '03',
    category: 'DISCOURSE',
    title: 'Intentional Communication',
    description:
      'Learning to speak clearly, listen without defensiveness, and handle difficult conversations with care and honesty.',
  },
  {
    number: '04',
    category: 'CONNECTION',
    title: 'Team Dynamics',
    description:
      'Strengthening trust, empathy, and shared understanding so teams collaborate with less friction and more ease.',
  },
];

export default function OrganisationsPage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* SECTION 1: HERO */}
      <section className="w-full px-4 sm:px-6 lg:px-16 pt-8 sm:pt-12 lg:pt-20 pb-12 sm:pb-16 lg:pb-24 bg-surface border-b border-outline-variant/60">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <Badge variant="sand" dot>
              Corporate Training
            </Badge>
            <div className="space-y-3">
              <h1 className="font-serif text-[30px] sm:text-[40px] lg:text-display-lg leading-[1.12] text-primary tracking-tight font-normal">
                Corporate Training
              </h1>
              <p className="font-serif text-lg sm:text-xl lg:text-2xl text-secondary italic font-normal leading-snug">
                Leading with the heart, not just the numbers.
              </p>
            </div>
            <p className="font-sans text-body-md sm:text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              Organisations invest heavily in skills and strategy, yet leaders and teams often carry pressure, friction, and disconnection quietly. Soulfuli brings emotional intelligence, self-awareness, and human-centred communication into the way people work and lead.
            </p>
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Button href="#consultation" variant="primary" size="lg" className="w-full sm:w-auto rounded-full text-center">
                Discuss a Corporate Training Program
              </Button>
              <Button href="#threads" variant="secondary" size="lg" className="w-full sm:w-auto rounded-full text-center">
                Explore Our Approach
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 relative w-full">
            <div className="max-w-[560px] mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-[0_24px_64px_-16px_rgba(31,42,36,0.18)] border border-border-alt/80 bg-surface-alt group">
              <div className="relative w-full aspect-[3/2] overflow-hidden bg-surface-alt">
                <Image
                  src="/images/corporate-training.jpeg"
                  alt="Team members participating in a guided corporate wellness and mindfulness training session in a bright office space"
                  fill
                  priority
                  quality={85}
                  sizes="(max-width: 1024px) 92vw, 560px"
                  {...getBlurProps('/images/corporate-training.jpeg')}
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Editorial Caption Strip */}
              <div className="bg-primary px-4 sm:px-5 py-3 sm:py-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                  <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/80 font-medium">
                    Corporate Training &amp; Conscious Leadership
                  </span>
                </div>
                <p className="font-serif text-[15px] sm:text-[16px] text-[#FDFBF7] italic leading-snug">
                  &ldquo;Emotional agility and human-centred communication under pressure.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 4 CORE COMPETENCIES */}
      <section id="threads" className="w-full py-16 sm:py-20 lg:py-32 bg-surface-alt-gradient border-b border-border-alt scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16 space-y-12 sm:space-y-16">
          <SectionHeading
            eyebrow="Core Competencies"
            title="Four Pillars of Human-Centred Leadership"
            subtitle="Modular programs tailored for emerging leaders, managers, and whole teams."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {corporatePillars.map((pillar) => (
              <div
                key={pillar.number}
                className="bg-surface p-8 rounded-xl border border-border-alt space-y-4 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-widest text-secondary font-semibold">
                      {pillar.number} / {pillar.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-headline-md text-primary font-normal">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-border-alt/60 text-xs font-sans text-outline uppercase tracking-wider">
                  Program Module
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PARTNERSHIP FORM */}
      <section id="consultation" className="w-full py-20 lg:py-32 bg-surface scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-16">
          <div className="max-w-2xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <Badge variant="sand" dot>
                Corporate Training Inquiry
              </Badge>
              <h2 className="font-serif text-headline-lg lg:text-display-lg text-primary tracking-tight font-normal">
                Discuss a Corporate Training Program
              </h2>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                Connect with our team to explore workshops, leadership programs, or team development engagements.
              </p>
            </div>

            <div className="bg-surface-alt p-6 lg:p-10 rounded-2xl border border-border-alt shadow-sm">
              <OrganisationEnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
