import React from 'react';
import {
  Home,
  Stethoscope,
  HeartHandshake,
  Utensils,
  Sparkles,
  ChefHat,
  Activity,
  ArrowDownRight,
} from 'lucide-react';
import { SITE_CONFIG, ServiceItem, SiteImagesConfig } from '../../config/siteConfig';
import { SmartImage } from '../SmartImage';

interface ServicesGridProps {
  images: SiteImagesConfig;
  onSponsorMealClick: () => void;
}

const ICON_MAP: Record<ServiceItem['iconName'], React.FC<{ className?: string }>> = {
  Home,
  Stethoscope,
  HeartHandshake,
  Utensils,
  Sparkles,
  ChefHat,
  Activity,
};

export const ServicesGrid: React.FC<ServicesGridProps> = ({ images, onSponsorMealClick }) => {
  return (
    <section id="services" className="scroll-mt-16 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wider text-[#159A91]">
              CARE &amp; COMPASSION
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#183153] sm:text-3xl lg:text-4xl">
              Our Services &amp; Facilities
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#687780]">
              Dedicated to holistic well-being, comfort, and dignity for every resident mother at
              Snehatheeram.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onSponsorMealClick}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-[#183153] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#159A91] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183153] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Sponsor a Day&apos;s Meal</span>
              <ArrowDownRight className="h-4 w-4 text-[#D8AD62]" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Services Bento / Responsive Grid (7 Services + 1 Visual Feature Card = 8 balanced slots on 4-col/2-col grid) */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SITE_CONFIG.services.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || HeartHandshake;
            return (
              <article
                key={service.id}
                className="flex flex-col justify-between rounded-2xl border border-[#E7ECEB] bg-white p-6 transition-colors hover:border-[#159A91]/50"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF8F2] text-[#159A91]">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#687780] tabular-nums">
                      {service.number}.
                    </span>
                  </div>

                  <h3 className="font-display mt-4 text-lg font-bold text-[#183153]">
                    {service.number}. {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#687780]">
                    {service.description}
                  </p>
                </div>
              </article>
            );
          })}

          {/* 8th Slot: Annadanam Visual & Direct Action Card */}
          <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E7ECEB] bg-[#183153] text-white">
            <SmartImage
              src={images.nutritiousMeals.url}
              alt={images.nutritiousMeals.alt}
              aspectRatioClass="aspect-[16/10]"
            />
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <p className="text-xs font-semibold tracking-wider text-[#D8AD62]">
                  SHARE A MEAL WITH LOVE
                </p>
                <p className="font-display mt-1 text-base font-bold text-white">
                  Daily Annadanam Service
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#FAF8F2]/80">
                  Honor special family occasions by sponsoring freshly prepared meals for our
                  resident mothers.
                </p>
              </div>
              <button
                type="button"
                onClick={onSponsorMealClick}
                className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#D8AD62] px-4 py-2.5 text-xs font-bold text-[#183153] transition-colors hover:bg-[#e3bc75] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Sponsor a Day&apos;s Meal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
