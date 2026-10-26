import React from 'react';
import { Clock, Heart, Trees, Sparkles, PhoneCall, Award, CalendarCheck } from 'lucide-react';
import { SITE_CONFIG, SiteImagesConfig } from '../../config/siteConfig';
import { useLiveConfig } from '../../hooks/useLiveSiteData';
import { SmartImage } from '../SmartImage';

interface AboutSectionProps {
  images: SiteImagesConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ images }) => {
  const live = useLiveConfig();
  const cardIcons = [Heart, Trees, Sparkles];

  return (
    <section id="about" className="scroll-mt-16 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header — About Us & History */}
        <div className="max-w-4xl">
          <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
            ABOUT US &amp; OUR HISTORY (SINCE {SITE_CONFIG.aboutHistory.establishedYear})
          </p>
          <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#1B5E20] sm:text-3xl lg:text-4xl">
            Who We Are &amp; Our Journey Since 2012
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#263238]">
            {SITE_CONFIG.aboutHistory.story}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#607D66] sm:text-base">
            {SITE_CONFIG.aboutHistory.growth}
          </p>

          {/* Historical Milestone Strip */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#1B5E20]">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#2E7D32]/25 bg-white px-3.5 py-2">
              <CalendarCheck className="h-4 w-4 text-[#43A047]" aria-hidden="true" />
              <span>Established: {SITE_CONFIG.aboutHistory.establishedYear}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#2E7D32]/25 bg-white px-3.5 py-2">
              <Award className="h-4 w-4 text-[#43A047]" aria-hidden="true" />
              <span>Inaugurated by: {SITE_CONFIG.aboutHistory.inauguratedBy}</span>
            </span>
          </div>
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
                  <p className="mt-2 text-sm leading-relaxed text-[#607D66]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* IMPACT SINCE 2012 */}
        <div className="mt-8 rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                MEASURABLE COMPASSION
              </p>
              <h3 className="font-display mt-1 text-xl font-bold text-[#1B5E20] sm:text-2xl">
                Our Impact Since 2012
              </h3>
            </div>
            <p className="text-xs font-medium text-[#607D66]">
              {live.fullName}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SITE_CONFIG.impactSince2012.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9]/70 p-5"
              >
                <p className="font-display text-2xl font-extrabold text-[#1B5E20] sm:text-3xl">
                  {stat.metric}
                </p>
                <p className="mt-1 text-sm font-bold text-[#2E7D32]">{stat.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#607D66]">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities & Accommodation Visual (Client Photo 3) & Visiting Hours Card */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          <div className="overflow-hidden rounded-3xl border border-[#2E7D32]/20 bg-white lg:col-span-7">
            <SmartImage
              src={images.kuttanadCampus.url}
              alt={images.kuttanadCampus.alt}
              caption={images.kuttanadCampus.caption}
              aspectRatioClass="aspect-[4/3] h-full"
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

              <div className="mt-5 rounded-2xl border border-white/20 bg-[#2E7D32]/60 p-4">
                <p className="text-xs font-medium text-[#E8F5E9]">Daily Visiting Schedule</p>
                <p className="font-display mt-1 text-xl font-bold tracking-tight text-white tabular-nums">
                  {live.visitingHoursSchedule}
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
              <div className="flex flex-wrap gap-2">
                <a
                  href={`tel:${live.primaryPhoneTel}`}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#E8F5E9] whitespace-nowrap shrink-0"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-[#2E7D32]" aria-hidden="true" />
                  <span className="tabular-nums">{live.primaryPhone}</span>
                </a>
                <a
                  href={`tel:${live.secondaryPhoneTel}`}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-[#43A047] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#2E7D32] whitespace-nowrap shrink-0"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                  <span className="tabular-nums">{live.secondaryPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
