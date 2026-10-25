import React from 'react';
import { Sparkles, PhoneCall, MessageCircle, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface PrayerOfferingProps {
  onPrayerInquiryClick: () => void;
}

export const PrayerOffering: React.FC<PrayerOfferingProps> = ({ onPrayerInquiryClick }) => {
  return (
    <section aria-label="Special Prayer Offering" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-[#D8AD62]/40 bg-gradient-to-br from-[#183153] via-[#1B395E] to-[#15304F] p-6 text-white sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2.5 text-xs font-bold tracking-wider text-[#D8AD62]">
                <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>DAILY PRAYER SERVICE · SPIRITUAL FELLOWSHIP</span>
              </div>

              <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Special Prayer Offering
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#FAF8F2]/85 sm:text-base">
                On the date you select, the Sisters and resident mothers at Snehatheeram will offer
                special prayers for your intention, family, or departed loved ones during the daily
                prayer service.
              </p>

              {/* Contact Numbers within Prayer Offering */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${SITE_CONFIG.contact.primaryPhoneTel}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20 whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="h-4 w-4 text-[#D8AD62]" aria-hidden="true" />
                  <span className="tabular-nums">{SITE_CONFIG.contact.whatsappDisplay}</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.contact.landlineTel}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20 whitespace-nowrap shrink-0"
                >
                  <PhoneCall className="h-4 w-4 text-[#159A91]" aria-hidden="true" />
                  <span className="tabular-nums">{SITE_CONFIG.contact.landlineDisplay}</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col items-stretch lg:col-span-4 lg:items-end">
              <div className="rounded-2xl border border-white/15 bg-white/8 p-5 text-left lg:w-full">
                <p className="text-xs font-medium text-[#FAF8F2]/80">
                  Submit your prayer intention and preferred date via the Support Desk form:
                </p>
                <button
                  type="button"
                  onClick={onPrayerInquiryClick}
                  className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#D8AD62] px-5 py-3 text-sm font-bold text-[#183153] transition-colors hover:bg-[#e3bc75] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8AD62] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Make a Prayer Offering Inquiry</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
