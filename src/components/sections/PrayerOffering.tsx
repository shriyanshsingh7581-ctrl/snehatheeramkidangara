import React from 'react';
import { Sparkles, PhoneCall, MessageCircle, ArrowUpRight, Sun, BookOpen, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG, SiteImagesConfig } from '../../config/siteConfig';
import { useLiveConfig } from '../../hooks/useLiveSiteData';
import { SmartImage } from '../SmartImage';

interface PrayerOfferingProps {
  images: SiteImagesConfig;
  onPrayerInquiryClick: () => void;
}

export const PrayerOffering: React.FC<PrayerOfferingProps> = ({
  images,
  onPrayerInquiryClick,
}) => {
  const live = useLiveConfig();

  return (
    <section aria-label="Life at Snehatheeram, Daily Routine and Prayer Offering" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* LIFE AT SNEHATHEERAM & DAILY ROUTINE */}
        <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#2E7D32]">
                <Sun className="h-4 w-4 text-[#43A047]" aria-hidden="true" />
                <span>ROUND-THE-CLOCK CARE FOR 40 WOMEN</span>
              </div>
              <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#1B5E20] sm:text-3xl">
                {SITE_CONFIG.lifeAtSnehatheeram.heading}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#263238] sm:text-base">
                {SITE_CONFIG.lifeAtSnehatheeram.description}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-display text-lg font-bold text-[#1B5E20]">
              Daily Routine:
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {SITE_CONFIG.dailyRoutine.map((slot) => (
                <div
                  key={slot.activity}
                  className="flex items-start gap-2.5 rounded-2xl border border-[#2E7D32]/15 bg-[#E8F5E9]/65 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#43A047]" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-xs font-bold text-[#2E7D32]">
                      {slot.time}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-relaxed text-[#1B5E20]">
                      - {slot.activity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SPECIAL PRAYER OFFERING & SPIRITUAL FELLOWSHIP (Client Photo 12) */}
        <div className="overflow-hidden rounded-3xl border border-[#1B5E20] bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] p-6 text-white sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5 text-xs font-bold tracking-wider text-[#E8F5E9]">
                <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>DAILY PRAYER SERVICE · SPIRITUAL FELLOWSHIP</span>
              </div>

              <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Special Prayer Offering
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#E8F5E9]/95 sm:text-base">
                On the date you select, the Priest, Sisters, and resident mothers at Snehatheeram
                will offer special prayers for your intention, family, or departed loved ones
                during the daily community prayer service.
              </p>

              {/* Bible Quotation Card from Brochure */}
              <div className="mt-5 rounded-2xl border border-white/20 bg-[#1B5E20]/50 p-4">
                <div className="flex items-start gap-2.5">
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[#E8F5E9]" aria-hidden="true" />
                  <div>
                    <p className="text-xs sm:text-sm italic text-white">
                      {SITE_CONFIG.bibleQuotation.verse}
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#E8F5E9]">
                      -{SITE_CONFIG.bibleQuotation.reference}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Numbers within Prayer Offering */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${live.primaryPhoneTel}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20 whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="h-4 w-4 text-[#E8F5E9]" aria-hidden="true" />
                  <span className="tabular-nums">{live.primaryPhone}</span>
                </a>

                <a
                  href={`tel:${live.secondaryPhoneTel}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20 whitespace-nowrap shrink-0"
                >
                  <PhoneCall className="h-4 w-4 text-[#E8F5E9]" aria-hidden="true" />
                  <span className="tabular-nums">{live.secondaryPhone}</span>
                </a>
              </div>

              <div className="mt-6 max-w-md rounded-2xl border border-white/20 bg-[#1B5E20]/60 p-5 text-left">
                <p className="text-xs font-medium text-[#E8F5E9]">
                  Submit your prayer intention and preferred date via the Support Desk form:
                </p>
                <button
                  type="button"
                  onClick={onPrayerInquiryClick}
                  className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#1B5E20] transition-colors hover:bg-[#E8F5E9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Make a Prayer Offering Inquiry</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#2E7D32]" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Client Photo 12 — Priest, Sister & Residents Praying Together */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-white/20 bg-[#1B5E20]">
                <SmartImage
                  src={images.spiritualSupport.url}
                  alt={images.spiritualSupport.alt}
                  caption={images.spiritualSupport.caption}
                  aspectRatioClass="aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
