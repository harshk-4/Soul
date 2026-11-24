import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import SectionHeading from '@/components/shared/SectionHeading';
import SchoolEnquiryForm from '@/components/forms/SchoolEnquiryForm';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { createPageMetadata } from '@/lib/seo/metadata';
import { getBlurProps } from '@/lib/media/imagePlaceholders';

export const metadata: Metadata = createPageMetadata({
  title: 'Emotional Intelligence Workshops for Schools & Colleges | SoulfulI',
  description:
    'Nurturing Emotionally Intelligent Minds through experiential workshops for schools and colleges. SoulfulI brings emotional literacy, self-awareness, and mindful communication into classrooms.',
  path: '/schools-colleges',
});

const curricularThreads = [
  {
    number: '01',
    category: 'RECOGNITION',
    title: 'Emotional Intelligence',
    description:
      'Developing the quiet capacity to recognize and name internal emotional states before they harden into reactive behavior or persistent anxiety.',
  },
  {
    number: '02',
    category: 'OBSERVATION',
    title: 'Self-Awareness',
    description:
      'Creating non-evaluative space to observe personal habits, coping mechanisms, and unspoken internal pressures without fear of institutional judgment.',
  },
  {
    number: '03',
    category: 'DISCOURSE',
    title: 'Mindful Communication',
    description:
      'Learning to speak with clarity, listen without immediate defense, and navigate disagreements with relational care and intellectual humility.',
  },
  {
    number: '04',
    category: 'RESILIENCE',
    title: 'Nervous System Regulation',
    description:
      'Equipping youth and educators with daily somatic and reflective tools to mitigate performance pressure and chronic exam stress.',
  },
];

export default function SchoolsCollegesPage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* SECTION 1: HERO */}
      <section className="w-full px-4 sm:px-6 lg:px-16 pt-8 sm:pt-12 lg:pt-20 pb-12 sm:pb-16 lg:pb-24 bg-surface border-b border-outline-variant/60">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <Badge variant="sand" dot>
              Schools &amp; Colleges
            </Badge>
            <div className="space-y-3">
              <h1 className="font-serif text-[30px] sm:text-[40px] lg:text-display-lg leading-[1.12] text-primary tracking-tight font-normal">
                Nurturing Emotionally Intelligent Minds
              </h1>
              <p className="font-serif text-lg sm:text-xl lg:text-2xl text-secondary italic font-normal leading-snug">
                Experiential Workshops for Schools &amp; Colleges
              </p>
            </div>
            <p className="font-sans text-body-md sm:text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              Academic institutions train critical thinking and technical acumen, yet students and faculty frequently navigate acute emotional overwhelm in silence. Soulfuli brings grounded self-awareness and emotional literacy into the classroom.
            </p>
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Button href="#consultation" variant="primary" size="lg" className="w-full sm:w-auto rounded-full text-center">
                Discuss an Academic Program
              </Button>
              <Button href="#threads" variant="secondary" size="lg" className="w-full sm:w-auto rounded-full text-center">
                Explore Curriculum
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 relative w-full">
            <div className="relative w-full aspect-[4/5] max-w-[480px] mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-[0_24px_64px_-16px_rgba(31,42,36,0.20)] border border-border-alt/80 bg-surface-alt group">
              <Image
                src="/image/grp.jpeg"
                alt="Young Indian peers engaged in calm, thoughtful dialogue outdoors in golden sunlight"
                fill
                priority
                quality={82}
                sizes="(max-width: 1024px) 92vw, 480px"
                {...getBlurProps('/image/grp.jpeg')}
                className="object-cover object-[54%_center] transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent pointer-events-none" />

              {/* Floating Editorial Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-10 bg-[#1F2A24]/60 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-white/15 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/80 font-medium">
                    Human-Centred Pedagogy
                  </span>
                </div>
                <p className="font-serif text-[15px] sm:text-[16px] text-[#FDFBF7] italic leading-snug">
                  &ldquo;Cultivating emotional literacy alongside intellectual aptitude.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 4 CURRICULAR THREADS */}
      <section id="threads" className="w-full py-16 sm:py-20 lg:py-32 bg-surface-alt-gradient border-b border-border-alt scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16 space-y-12 sm:space-y-16">
          <SectionHeading
            eyebrow="Core Competencies"
            title="Four Pillars of Student Well-being"
            subtitle="Modular curriculum tailored for high school seniors, undergraduates, and educator development."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {curricularThreads.map((thread) => (
              <div
                key={thread.number}
                className="bg-surface p-8 rounded-xl border border-border-alt space-y-4 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-widest text-secondary font-semibold">
                      {thread.number} / {thread.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-headline-md text-primary font-normal">
                    {thread.title}
                  </h3>
                  <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                    {thread.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-border-alt/60 text-xs font-sans text-outline uppercase tracking-wider">
                  Curricular Practice Module
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: INSTITUTIONAL INQUIRY FORM */}
      <section id="consultation" className="w-full py-20 lg:py-32 bg-surface scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-16">
          <div className="max-w-2xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <Badge variant="sand" dot>
                Institutional Partnership
              </Badge>
              <h2 className="font-serif text-headline-lg lg:text-display-lg text-primary tracking-tight font-normal">
                Discuss a Program for Your Institution
              </h2>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                Connect with our academic lead to explore guest workshops, semester curriculums, or educator retreats.
              </p>
            </div>

            <div className="bg-surface-alt p-6 lg:p-10 rounded-2xl border border-border-alt shadow-sm">
              <SchoolEnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
