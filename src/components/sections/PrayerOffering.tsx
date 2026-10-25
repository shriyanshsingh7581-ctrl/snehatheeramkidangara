import React from 'react';
import { Sparkles, PhoneCall, MessageCircle, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, SiteImagesConfig } from '../../config/siteConfig';
import { SmartImage } from '../SmartImage';

interface PrayerOfferingProps {
  images: SiteImagesConfig;
  onPrayerInquiryClick: () => void;
}

export const PrayerOffering: React.FC<PrayerOfferingProps> = ({
  images,
  onPrayerInquiryClick,
}) => {
  return (
    <section aria-label="Special Prayer Offering" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#E8F5E9]/90 sm:text-base">
                On the date you select, the Sisters and resident mothers at Snehatheeram will offer
                special prayers for your intention, family, or departed loved ones during the daily
                prayer service.
              </p>

              {/* Contact Numbers within Prayer Offering */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${SITE_CONFIG.contact.primaryPhoneTel}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20 whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="h-4 w-4 text-[#E8F5E9]" aria-hidden="true" />
                  <span className="tabular-nums">{SITE_CONFIG.contact.whatsappDisplay}</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.contact.landlineTel}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20 whitespace-nowrap shrink-0"
                >
                  <PhoneCall className="h-4 w-4 text-[#E8F5E9]" aria-hidden="true" />
                  <span className="tabular-nums">{SITE_CONFIG.contact.landlineDisplay}</span>
                </a>
              </div>

              <div className="mt-6 max-w-md rounded-2xl border border-white/20 bg-[#1B5E20]/50 p-5 text-left">
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

            {/* Spiritual Support Chapel Photo */}
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
