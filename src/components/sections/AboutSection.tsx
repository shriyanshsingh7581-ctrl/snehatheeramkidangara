import React from 'react';
import { Clock, Heart, Trees, Sparkles, PhoneCall } from 'lucide-react';
import { SITE_CONFIG, SiteImagesConfig } from '../../config/siteConfig';
import { SmartImage } from '../SmartImage';

interface AboutSectionProps {
  images: SiteImagesConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ images }) => {
  const cardIcons = [Heart, Trees, Sparkles];

  return (
    <section id="about" className="scroll-mt-16 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
            ABOUT OUR SANCTUARY
          </p>
          <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#1B5E20] sm:text-3xl lg:text-4xl">
            Who We Are
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#1B5E20]/90">
            Snehatheeram (Pope John XXIII Rehabilitation Centre) is a charitable old age home and
            rehabilitation center located in Kidangara, Kuttanad Taluk, Alappuzha District, Kerala.
            Run with the dedicated service of the Sisters (St. Joseph Province, Changanassery /
            Sisters of St. Charles Borromeo), our center serves as a beacon of hope for elderly
            women who are destitute, abandoned, or facing physical and mental challenges.
          </p>
        </div>

        {/* Three Informational Highlight Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {SITE_CONFIG.aboutHighlights.map((item, index) => {
            const Icon = cardIcons[index] || Heart;
            return (
              <div
                key={item.title}
                className="flex flex-col justify-between rounded-2xl border border-[#2E7D32]/20 bg-white p-6"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                    <Icon className="h-5 w-5 text-[#2E7D32]" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-bold text-[#1B5E20]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#1B5E20]/80">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Campus Visual & Visiting Hours Card */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          <div className="overflow-hidden rounded-3xl border border-[#2E7D32]/20 bg-white lg:col-span-7">
            <SmartImage
              src={images.kuttanadCampus.url}
              alt={images.kuttanadCampus.alt}
              caption={images.kuttanadCampus.caption}
              aspectRatioClass="aspect-video h-full"
            />
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-[#1B5E20] bg-[#1B5E20] p-6 text-white sm:p-8 lg:col-span-5">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#1B5E20]">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wider text-[#E8F5E9]">
                    WELCOMING WELL-WISHERS
                  </p>
                  <h3 className="font-display text-xl font-bold text-white">
                    {SITE_CONFIG.visitingHours.title}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/90">
                {SITE_CONFIG.visitingHours.description}
              </p>

              <div className="mt-5 rounded-2xl border border-white/20 bg-[#2E7D32]/50 p-4">
                <p className="text-xs font-medium text-[#E8F5E9]">Daily Visiting Schedule</p>
                <p className="font-display mt-1 text-xl font-bold tracking-tight text-white tabular-nums">
                  {SITE_CONFIG.visitingHours.schedule}
                </p>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#E8F5E9]/90">
                {SITE_CONFIG.visitingHours.note}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#E8F5E9]">
                Confirm your visit by phone:
              </span>
              <a
                href={`tel:${SITE_CONFIG.contact.landlineTel}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#E8F5E9] whitespace-nowrap shrink-0"
              >
                <PhoneCall className="h-3.5 w-3.5 text-[#2E7D32]" aria-hidden="true" />
                <span className="tabular-nums">{SITE_CONFIG.contact.landlineDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
