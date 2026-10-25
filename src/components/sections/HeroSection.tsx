import React from 'react';
import { Utensils, PhoneCall, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import { SITE_CONFIG, SiteImagesConfig } from '../../config/siteConfig';
import { SmartImage } from '../SmartImage';

interface HeroSectionProps {
  images: SiteImagesConfig;
  onSponsorMealClick: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  images,
  onSponsorMealClick,
  onContactClick,
}) => {
  const highlightIcons = [ShieldCheck, HeartHandshake, MapPin];

  return (
    <section id="home" className="scroll-mt-16 pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pt-12 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* SECTION B — HERO CARD */}
        <div className="overflow-hidden rounded-3xl border border-[#E7ECEB] bg-gradient-to-br from-[#183153] via-[#1B3A61] to-[#132844] text-white shadow-sm">
          <div className="grid grid-cols-1 items-stretch gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-12">
            {/* Left Copy Column */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                {/* Institutional Heading — Clean unboxed typography */}
                <p className="text-xs font-semibold tracking-wide text-[#D8AD62] sm:text-sm">
                  {SITE_CONFIG.fullName}
                </p>

                <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {SITE_CONFIG.name}
                </h1>

                <p className="font-display mt-3 text-lg font-semibold leading-snug text-[#FAF8F2]/95 sm:text-xl">
                  “{SITE_CONFIG.tagline}”
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#FAF8F2]/80 sm:text-base">
                  {SITE_CONFIG.description}
                </p>
              </div>

              {/* Primary Buttons */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={onSponsorMealClick}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl bg-[#D8AD62] px-6 py-3 text-sm font-bold text-[#183153] shadow-xs transition-colors hover:bg-[#e3bc75] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8AD62] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Utensils className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Sponsor a Meal</span>
                </button>

                <button
                  type="button"
                  onClick={onContactClick}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <PhoneCall className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Contact Us</span>
                </button>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="flex flex-col justify-center lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#122640]">
                <SmartImage
                  src={images.heroSanctuary.url}
                  alt={images.heroSanctuary.alt}
                  caption={images.heroSanctuary.caption}
                  aspectRatioClass="aspect-video lg:aspect-[16/11]"
                  priority={true}
                />
              </div>
            </div>
          </div>

          {/* Three Compact Trust / Descriptive Highlight Cards */}
          <div className="border-t border-white/10 bg-[#132742]/80 px-6 py-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {SITE_CONFIG.heroHighlights.map((item, idx) => {
                const IconComponent = highlightIcons[idx] || ShieldCheck;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#159A91]/25 text-[#D8AD62]">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-sm font-bold text-white">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-[#FAF8F2]/75">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION C — EVERY MOTHER DESERVES LOVE */}
        <div className="mt-10 rounded-3xl border border-[#E7ECEB] bg-white p-6 sm:mt-12 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#159A91]">
                <span>DIGNITY IN EVERY SEASON OF LIFE</span>
                <span aria-hidden="true">·</span>
                <span>KIDANGARA SANCTUARY</span>
              </div>

              <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#183153] sm:text-3xl">
                Every Mother Deserves Love
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#263238]">
                At Snehatheeram, no mother is left behind. Managed with unwavering devotion by the
                Sisters, we provide a warm family where elderly women live with dignity, peace, and
                joy.
              </p>

              {/* Dedicated-Service Information Card */}
              <div className="mt-6 rounded-2xl border border-[#E7ECEB] bg-[#FAF8F2] p-5 sm:p-6">
                <p className="text-xs font-bold tracking-wider text-[#687780]">
                  DEDICATED SERVICE BY
                </p>
                <p className="font-display mt-1.5 text-lg font-bold text-[#183153] sm:text-xl">
                  {SITE_CONFIG.management.province}
                </p>
                <p className="mt-1 text-sm font-medium text-[#159A91]">
                  {SITE_CONFIG.management.congregation}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[#E7ECEB]">
                <SmartImage
                  src={images.everyMotherLove.url}
                  alt={images.everyMotherLove.alt}
                  caption={images.everyMotherLove.caption}
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
