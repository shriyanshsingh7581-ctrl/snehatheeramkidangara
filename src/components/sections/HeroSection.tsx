import React from 'react';
import { Utensils, PhoneCall, ShieldCheck, HeartHandshake, MapPin, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG, SiteImagesConfig } from '../../config/siteConfig';
import { useLiveConfig } from '../../hooks/useLiveSiteData';
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
  const live = useLiveConfig();
  const highlightIcons = [ShieldCheck, HeartHandshake, MapPin];

  return (
    <section id="home" className="scroll-mt-16 pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pt-12 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* SECTION B — HERO CARD */}
        <div className="overflow-hidden rounded-3xl border border-[#2E7D32]/25 bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] text-white shadow-sm">
          <div className="grid grid-cols-1 items-stretch gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-12">
            {/* Left Copy Column */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#E8F5E9] sm:text-sm">
                  {live.fullName}
                </p>

                <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {live.name}
                </h1>

                <p className="mt-1.5 text-xs font-semibold text-[#E8F5E9]/90 sm:text-sm">
                  {SITE_CONFIG.organizationType} · {SITE_CONFIG.managingOrganization}
                </p>

                <p className="font-display mt-3 text-lg font-semibold leading-snug text-[#E8F5E9] sm:text-xl">
                  {live.tagline}
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/95 sm:text-base">
                  {live.description}
                </p>

                {/* Supporting Quote & Scripture Banner */}
                <blockquote className="mt-5 rounded-2xl border border-white/20 bg-[#1B5E20]/55 p-4 text-xs sm:text-sm italic text-[#E8F5E9]">
                  <p className="font-display text-sm font-bold text-white not-italic mb-1">
                    {SITE_CONFIG.supportingQuote}
                  </p>
                  <span>{live.bibleVerse}</span>
                  <footer className="mt-1 not-italic font-bold text-white">
                    — {live.bibleReference}
                  </footer>
                </blockquote>
              </div>

              {/* Primary Buttons */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={onSponsorMealClick}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-[#1B5E20] shadow-xs transition-colors hover:bg-[#E8F5E9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Utensils className="h-4 w-4 shrink-0 text-[#2E7D32]" aria-hidden="true" />
                  <span>Sponsor a Meal</span>
                </button>

                <button
                  type="button"
                  onClick={onContactClick}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl border border-white/35 bg-[#43A047] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B5E20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <PhoneCall className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  <span>Contact Us</span>
                </button>
              </div>
            </div>

            {/* Right Visual Column — Client Photo 1 */}
            <div className="flex flex-col justify-center lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-white/20 bg-[#1B5E20]">
                <SmartImage
                  src={images.heroSanctuary.url}
                  alt={images.heroSanctuary.alt}
                  caption={images.heroSanctuary.caption}
                  aspectRatioClass="aspect-[4/3] lg:aspect-[16/11]"
                  priority={true}
                />
              </div>
            </div>
          </div>

          {/* Three Compact Trust / Descriptive Highlight Cards */}
          <div className="border-t border-white/15 bg-[#1B5E20]/90 px-6 py-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {SITE_CONFIG.heroHighlights.map((item, idx) => {
                const IconComponent = highlightIcons[idx] || ShieldCheck;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3.5 rounded-2xl border border-white/15 bg-[#2E7D32]/40 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#1B5E20]">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-sm font-bold text-white">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-[#E8F5E9]/90">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION C — INTRODUCTION TO MENTAL HEALTH & OUR FOCUS */}
        <div className="mt-10 rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:mt-12 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#2E7D32]">
                <span>INTRODUCTION TO MENTAL HEALTH</span>
                <span aria-hidden="true">·</span>
                <span>OUR FOCUS</span>
              </div>

              <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#1B5E20] sm:text-3xl">
                {live.mentalHealthHeading}
              </h2>

              <p className="mt-3 text-base font-medium leading-relaxed text-[#263238]">
                {live.mentalHealthLead}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[#607D66] sm:text-base">
                {live.mentalHealthBody}
              </p>

              {/* Our Focus List */}
              <div className="mt-5 space-y-2.5">
                <p className="text-xs font-bold tracking-wider text-[#1B5E20]">
                  OUR CORE FOCUS AREAS:
                </p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {SITE_CONFIG.ourFocus.map((focusItem) => (
                    <li
                      key={focusItem}
                      className="flex items-start gap-2 rounded-xl border border-[#2E7D32]/15 bg-[#E8F5E9]/60 p-3 text-xs leading-relaxed text-[#263238]"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#43A047]"
                        aria-hidden="true"
                      />
                      <span>{focusItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dedicated-Service Information Card */}
              <div className="mt-6 rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9] p-5 sm:p-6">
                <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                  ADMINISTERED &amp; DEDICATED SERVICE BY
                </p>
                <p className="font-display mt-1.5 text-lg font-bold text-[#1B5E20] sm:text-xl">
                  {SITE_CONFIG.management.province}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#607D66]">
                  {SITE_CONFIG.management.congregation} · {SITE_CONFIG.memorialTitle}
                </p>
              </div>
            </div>

            {/* Client Photo 2 */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[#2E7D32]/20">
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
