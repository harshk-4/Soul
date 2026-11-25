import React from 'react';
import Badge from '@/components/ui/Badge';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';
import { ExternalLink, BellRing, Sparkles, Compass } from 'lucide-react';
import {
  QUIET_BLOOM_WHATSAPP_CHANNEL_URL,
  QUIET_BLOOM_WHATSAPP_CHANNEL_NAME,
} from '@/lib/seo/metadata';

export function QuietBloomWhatsAppSection() {
  return (
    <section
      id="whatsapp-channel"
      aria-labelledby="whatsapp-channel-heading"
      className="w-full py-16 sm:py-20 lg:py-24 bg-surface-alt-gradient border-t border-border-alt scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="relative overflow-hidden rounded-3xl bg-surface border border-border-alt shadow-sm p-6 sm:p-10 lg:p-14">
          {/* Subtle nature-inspired ambient glow */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#25D366]/5 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6 sm:space-y-7">
            {/* Badge & WhatsApp Emblem */}
            <div className="flex flex-col items-center gap-3">
              <Badge variant="sage" dot>
                {QUIET_BLOOM_WHATSAPP_CHANNEL_NAME}
              </Badge>

              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center text-[#228B52] shadow-sm">
                <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#228B52]" />
              </div>
            </div>

            {/* Required Editorial Heading and Supporting Text */}
            <div className="space-y-3">
              <h2
                id="whatsapp-channel-heading"
                className="font-serif text-[26px] sm:text-[34px] lg:text-[42px] text-primary font-normal leading-tight tracking-tight"
              >
                Stay Connected with Quiet Bloom
              </h2>
              <p className="font-sans text-body-sm sm:text-body-md lg:text-body-lg text-on-surface-variant leading-relaxed max-w-xl mx-auto">
                Follow our WhatsApp channel for retreat updates, announcements, important information, and moments from our Quiet Bloom journey.
              </p>
            </div>

            {/* Subtle feature cards for retreat participants */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-left sm:text-center">
              <div className="rounded-xl bg-surface-alt/70 border border-border-alt/70 p-3.5 space-y-1">
                <div className="flex items-center sm:justify-center gap-2 text-primary font-serif text-sm">
                  <BellRing className="w-3.5 h-3.5 text-[#228B52] shrink-0" aria-hidden="true" />
                  <span>Retreat Updates</span>
                </div>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                  Announcements, logistical details, and gathering timelines.
                </p>
              </div>

              <div className="rounded-xl bg-surface-alt/70 border border-border-alt/70 p-3.5 space-y-1">
                <div className="flex items-center sm:justify-center gap-2 text-primary font-serif text-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#228B52] shrink-0" aria-hidden="true" />
                  <span>Journey Moments</span>
                </div>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                  Quiet reflections, nature vignettes, and stories from the valley.
                </p>
              </div>

              <div className="rounded-xl bg-surface-alt/70 border border-border-alt/70 p-3.5 space-y-1">
                <div className="flex items-center sm:justify-center gap-2 text-primary font-serif text-sm">
                  <Compass className="w-3.5 h-3.5 text-[#228B52] shrink-0" aria-hidden="true" />
                  <span>Noise-Free Space</span>
                </div>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                  Intentional channel broadcasts with zero group chat noise.
                </p>
              </div>
            </div>

            {/* Prominent CTA button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={QUIET_BLOOM_WHATSAPP_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-full bg-[#1F3D2B] text-white hover:bg-[#162D20] transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base font-medium font-sans group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                aria-label="Follow Our WhatsApp Channel (opens in a new tab)"
              >
                <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span>Follow Our WhatsApp Channel</span>
                <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
              </a>
            </div>

            <p className="text-xs text-on-surface-variant/70 font-sans">
              Channel: <span className="font-semibold text-primary">{QUIET_BLOOM_WHATSAPP_CHANNEL_NAME}</span> · Opens directly in WhatsApp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuietBloomWhatsAppSection;
