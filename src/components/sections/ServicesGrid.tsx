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
  // Each of these 4 service photos is unique and used ONLY ONCE on the entire website
  const serviceHighlights = [
    {
      title: 'Elderly Care',
      subtitle: '24/7 Attentive Support & Comfort',
      photo: images.elderlyCare,
    },
    {
      title: 'Medical & Nursing Care',
      subtitle: 'Regular Check-ups & 24-Hour Nursing',
      photo: images.medicalNursing,
    },
    {
      title: 'Digital Learning',
      subtitle: 'Rehabilitation & Active Engagement',
      photo: images.digitalLearning,
    },
    {
      title: 'Annadanam',
      subtitle: 'Freshly Prepared Nutritious Meals',
      photo: images.nutritiousMeals,
    },
  ];

  return (
    <section id="services" className="scroll-mt-16 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
              CARE &amp; COMPASSION
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#1B5E20] sm:text-3xl lg:text-4xl">
              Our Services &amp; Facilities
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#1B5E20]/80">
              Dedicated to holistic well-being, comfort, and dignity for every resident mother at
              Snehatheeram.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onSponsorMealClick}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-[#2E7D32] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B5E20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E20] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Sponsor a Day&apos;s Meal</span>
              <ArrowDownRight className="h-4 w-4 text-[#E8F5E9]" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 4 Unique Service Photos Row (Elderly Care, Medical & Nursing Care, Digital Learning, Annadanam) */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceHighlights.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-2xl border border-[#2E7D32]/20 bg-white"
            >
              <SmartImage
                src={item.photo.url}
                alt={item.photo.alt}
                aspectRatioClass="aspect-[4/3]"
              />
              <div className="p-4">
                <h3 className="font-display text-base font-bold text-[#1B5E20]">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs text-[#2E7D32]">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 7 Service Cards + 8th Annadanam Action Card (No duplicate images) */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SITE_CONFIG.services.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || HeartHandshake;
            return (
              <article
                key={service.id}
                className="flex flex-col justify-between rounded-2xl border border-[#2E7D32]/20 bg-white p-6 transition-colors hover:border-[#2E7D32]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#2E7D32] tabular-nums">
                      {service.number}.
                    </span>
                  </div>

                  <h3 className="font-display mt-4 text-lg font-bold text-[#1B5E20]">
                    {service.number}. {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#1B5E20]/80">
                    {service.description}
                  </p>
                </div>
              </article>
            );
          })}

          {/* 8th Slot: Annadanam Direct Action Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#1B5E20] bg-[#1B5E20] p-6 text-white">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#E8F5E9]">
                SHARE A MEAL WITH LOVE
              </p>
              <p className="font-display mt-2 text-lg font-bold text-white">
                Daily Annadanam Service
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#E8F5E9]/90">
                Honor special family occasions by sponsoring freshly prepared meals for our
                resident mothers.
              </p>
            </div>
            <button
              type="button"
              onClick={onSponsorMealClick}
              className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#1B5E20] transition-colors hover:bg-[#E8F5E9] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Sponsor a Day&apos;s Meal</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
