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
  CheckCircle2,
  Sprout,
  GraduationCap,
  ShieldPlus,
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
  // 8 distinct client photographs for the 8 specialized rehabilitation & care visual cards (no duplicate photos)
  const servicePhotoGallery = [
    {
      title: 'Psychosocial Rehabilitation',
      subtitle: 'Group Therapy & Social Reintegration',
      photo: images.psychosocialRehab,
    },
    {
      title: 'Mental Health Support & Counselling',
      subtitle: 'Individual Assessment & Psychological Care',
      photo: images.mentalHealthCounselling,
    },
    {
      title: 'Vocational Training & Life Skills',
      subtitle: 'Handicrafts, Rosary Making & Occupational Therapy',
      photo: images.vocationalTraining,
    },
    {
      title: 'Medical Care',
      subtitle: 'Regular Clinical & Psychiatric Check-ups',
      photo: images.medicalNursing,
    },
    {
      title: 'Recreational & Cultural Activities',
      subtitle: 'Music, Dance & Joyful Community Fellowship',
      photo: images.recreationalActivities,
    },
    {
      title: 'Organic Farming & Culinary Skills',
      subtitle: 'Sustainable Kitchen Preparation & Life Skills',
      photo: images.sustainabilityKitchen,
    },
    {
      title: 'Nutritious Diet & Annadanam',
      subtitle: 'Freshly Prepared Wholesome Daily Meals',
      photo: images.nutritiousMeals,
    },
    {
      title: 'Health & Safety Monitoring',
      subtitle: '24/7 Nursing Supervision & Vital Checks',
      photo: images.clinicalCheckup,
    },
  ];

  return (
    <section id="services" className="scroll-mt-16 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
              PSYCHOSOCIAL REHABILITATION &amp; HOLISTIC CARE
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#1B5E20] sm:text-3xl lg:text-4xl">
              Our Services &amp; Facilities
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#607D66]">
              Dedicated to comprehensive mental health recovery, medical care, vocational skill
              building, and dignified community living at Snehatheeram Kidangara.
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

        {/* 8 Separate Client Photographs Showcasing Services & Facilities */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicePhotoGallery.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-2xl border border-[#2E7D32]/20 bg-white shadow-2xs"
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
                <p className="mt-1 text-xs text-[#607D66]">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 7 Detailed Service Cards + 8th Annadanam Action Card */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SITE_CONFIG.services.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || HeartHandshake;
            return (
              <article
                key={service.id}
                className="flex flex-col justify-between rounded-2xl border border-[#2E7D32]/20 bg-white p-6 transition-colors hover:border-[#43A047]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#43A047] tabular-nums">
                      {service.number}.
                    </span>
                  </div>

                  <h3 className="font-display mt-4 text-lg font-bold text-[#1B5E20]">
                    {service.number}. {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#607D66]">
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
                residents at Snehatheeram.
              </p>
            </div>
            <button
              type="button"
              onClick={onSponsorMealClick}
              className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#43A047] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white hover:text-[#1B5E20] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Sponsor a Day&apos;s Meal</span>
            </button>
          </div>
        </div>

        {/* REHABILITATION PRINCIPLES */}
        <div className="mt-10 rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
              CLINICAL &amp; SOCIAL FRAMEWORK
            </p>
            <h3 className="font-display mt-1 text-xl font-bold text-[#1B5E20] sm:text-2xl">
              Our Rehabilitation Principles
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#607D66]">
              Every woman at Snehatheeram follows a structured, compassionate pathway from crisis
              care to confidence and social reintegration.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SITE_CONFIG.rehabilitationPrinciples.map((principle) => (
              <div
                key={principle.step}
                className="rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9]/60 p-5"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#2E7D32] font-mono text-xs font-bold text-white">
                  {principle.step}
                </span>
                <h4 className="font-display mt-3 text-base font-bold text-[#1B5E20]">
                  {principle.title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#607D66]">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* HEALTH & SAFETY, ORGANIC SUSTAINABILITY & COMMUNITY TRAINING */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card 1: Health & Safety Measures */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#2E7D32]/20 bg-white p-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                  <ShieldPlus className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                    PROTECTION &amp; HYGIENE
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#1B5E20]">
                    Health &amp; Safety Measures
                  </h3>
                </div>
              </div>

              <ul className="mt-4 space-y-2.5">
                {SITE_CONFIG.healthAndSafety.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-[#263238]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#43A047]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Location & Sustainability Efforts */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#2E7D32]/20 bg-white p-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                  <Sprout className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                    GREEN KUTTANAD CAMPUS
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#1B5E20]">
                    Organic Farming &amp; Sustainability
                  </h3>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {SITE_CONFIG.sustainabilityEfforts.map((effort) => (
                  <div
                    key={effort.title}
                    className="rounded-2xl border border-[#2E7D32]/15 bg-[#E8F5E9]/60 p-4"
                  >
                    <h4 className="font-display text-sm font-bold text-[#1B5E20]">
                      {effort.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#607D66]">
                      {effort.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Community & Training Opportunities */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#2E7D32]/20 bg-white p-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#1B5E20]">
                    {SITE_CONFIG.communityAndTraining.title}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#263238]">
                {SITE_CONFIG.communityAndTraining.description}
              </p>

              <p className="mt-4 text-sm font-semibold text-[#1B5E20]">
                {SITE_CONFIG.communityAndTraining.lead}
              </p>

              <ul className="mt-2.5 space-y-2">
                {SITE_CONFIG.communityAndTraining.programs.map((prog) => (
                  <li key={prog} className="flex items-start gap-2 text-sm leading-relaxed text-[#263238]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#43A047]" aria-hidden="true" />
                    <span>{prog}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
