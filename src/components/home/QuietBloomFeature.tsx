import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users, Download, ArrowRight, Feather } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getBlurProps } from '@/lib/media/imagePlaceholders';
import { RETREAT_BROCHURE_URL } from '@/lib/seo/metadata';

export default function QuietBloomFeature() {
  const retreatImageSrc = '/image/mount.jpeg';

  return (
    <section
      aria-labelledby="featured-quiet-bloom-heading"
      className="relative w-full bg-surface-alt-gradient border-b border-border-alt py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Announcement & Invitation */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6">
            <Badge variant="terracotta" dot>
              Upcoming Retreat Announcement
            </Badge>

            <div className="space-y-2">
              <h2
                id="featured-quiet-bloom-heading"
                className="font-serif text-[28px] sm:text-[38px] lg:text-[46px] lg:leading-[1.15] text-primary font-normal tracking-tight"
              >
                Quiet Bloom Retreat
              </h2>
              <p className="font-serif text-xl sm:text-[26px] lg:text-[32px] text-terracotta italic font-normal leading-snug">
                12 February – 17 February, 2027
              </p>
            </div>

            {/* Quick Context Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-surface border border-border-alt text-xs sm:text-sm font-sans font-medium text-primary shadow-xs">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-terracotta shrink-0" aria-hidden="true" />
                <span>6 Days / 5 Nights</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-surface border border-border-alt text-xs sm:text-sm font-sans font-medium text-primary shadow-xs">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary shrink-0" aria-hidden="true" />
                <span>Dharamshala, Himachal Pradesh</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-surface border border-border-alt text-xs sm:text-sm font-sans font-medium text-primary shadow-xs">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary shrink-0" aria-hidden="true" />
                <span>Intimate 12-Seeker Gathering</span>
              </div>
            </div>

            {/* Editorial Narrative */}
            <div className="space-y-4 font-sans text-body-md sm:text-body-lg text-on-surface-variant leading-relaxed max-w-xl">
              <p>
                Quiet Bloom Retreat is a sanctuary for conscious stillness in the serene Himalayan valley of Dharamshala. Designed as an unhurried restorative passage, this gathering brings together mindful movement, guided reflection, and mountain silence.
              </p>
              <p className="text-sm sm:text-base lg:text-lg">
                Slow down without falling behind. A space where your nervous system unwinds, habitual mental noise settles, and clarity returns naturally.
              </p>
            </div>

            {/* Retreat Outcomes Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 py-1 sm:py-2 w-full max-w-xl text-xs sm:text-sm font-sans text-on-surface">
              <div className="flex items-start gap-2.5">
                <Feather className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                <span>Deep nervous system restoration in nature</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Feather className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                <span>Guided contemplation &amp; walking silence</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Feather className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                <span>Intimate dialogue circles with fellow seekers</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Feather className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                <span>Space for unhurried journaling &amp; mountain air</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                href="/quiet-bloom#apply"
                variant="terracotta"
                size="lg"
                className="w-full sm:w-auto rounded-full shadow-md hover:shadow-lg transition-all"
              >
                Register Now
              </Button>

              <a
                href={RETREAT_BROCHURE_URL}
                download="Soulfuli-Quiet-Bloom-Retreat-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 sm:py-3.5 text-[14px] font-medium rounded-full bg-surface border border-border-alt text-primary hover:border-primary hover:bg-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
              >
                <Download className="w-4 h-4 text-secondary" aria-hidden="true" />
                <span>Download Brochure</span>
              </a>

              <Link
                href="/quiet-bloom"
                prefetch={true}
                className="group inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-secondary hover:text-primary transition-colors py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                <span>Explore Retreat Details</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] max-w-[520px] mx-auto lg:max-w-none rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_24px_64px_-16px_rgba(31,42,36,0.25)] border border-border-alt bg-surface-alt group">
              <Image
                src={retreatImageSrc}
                alt="Lush misty green Himalayan hillside village overlooking terraced mountain slopes"
                fill
                loading="lazy"
                quality={80}
                sizes="(max-width: 1024px) 92vw, 480px"
                {...getBlurProps(retreatImageSrc)}
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ objectPosition: 'center 45%' }}
              />

              {/* Ambient Calibrated Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A24]/90 via-[#1F2A24]/30 to-black/20 pointer-events-none" />

              {/* Top Location Pill */}
              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-[#1F2A24]/60 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs font-sans text-[#FDFBF7] shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-tertiary-fixed" aria-hidden="true" />
                <span>Dharamshala, Himachal Pradesh</span>
              </div>

              {/* Bottom Editorial Quote & Details Box */}
              <div className="absolute bottom-5 left-5 right-5 z-10 bg-[#1F2A24]/65 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-white shadow-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#B8C7B9] font-medium">
                    Himalayan Immersion
                  </span>
                  <span className="font-sans text-[11px] text-white/80">
                    12–17 Feb 2027
                  </span>
                </div>
                <p className="font-serif text-[17px] text-[#FDFBF7] italic leading-snug">
                  &ldquo;Slow down without falling behind. When the mountain quiets, your real pace begins.&rdquo;
                </p>
                <div className="pt-1 flex items-center justify-between text-[12px] font-sans text-white/80 border-t border-white/15">
                  <span>Intimate 12-Seeker Cohort</span>
                  <Link
                    href="/quiet-bloom"
                    className="text-white hover:text-white underline underline-offset-2 transition-colors font-medium"
                  >
                    View Schedule &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
