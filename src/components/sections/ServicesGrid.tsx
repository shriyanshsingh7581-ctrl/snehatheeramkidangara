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
  const servicePhotoGallery = [
    {
      title: 'Psychosocial rehabilitation',
      subtitle: 'Group therapy and psychoeducation',
      photo: images.psychosocialRehab,
    },
    {
      title: 'Mental health support & counselling',
      subtitle: 'Psycho Therapies (CBT, REBT, DBT, etc..)',
      photo: images.mentalHealthCounselling,
    },
    {
      title: 'Vocational training & Life skills training',
      subtitle: 'Tailoring, handicrafts, cooking, gardening',
      photo: images.vocationalTraining,
    },
    {
      title: 'Medical care and medication management',
      subtitle: 'Regular medical check-ups & nursing care',
      photo: images.medicalNursing,
    },
    {
      title: 'Recreational and cultural programs',
      subtitle: 'International Observance Day Celebrations',
      photo: images.recreationalActivities,
    },
    {
      title: 'Location & Sustainability Efforts',
      subtitle: '5 acres of paddy cultivation & organic vegetable gardens',
      photo: images.sustainabilityKitchen,
    },
    {
      title: 'Nutritious meals from organic farm produce',
      subtitle: 'Balanced diet for immunity support',
      photo: images.nutritiousMeals,
    },
    {
      title: 'Health & Safety Measures',
      subtitle: 'Psychological first aid and crisis intervention',
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
              Services &amp; Facilities
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#607D66]">
              Recovery-oriented psychosocial rehabilitation, therapeutic support, skill-building,
              and residential care at {SITE_CONFIG.brochureTitle}.
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

        {/* Complete 12 Services from Brochure */}
        <div className="mt-8 rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8">
          <h3 className="font-display text-xl font-bold text-[#1B5E20] sm:text-2xl">
            Services
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONFIG.services.map((service) => {
              const IconComponent = ICON_MAP[service.iconName] || HeartHandshake;
              return (
                <article
                  key={service.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9]/45 p-5 transition-colors hover:border-[#43A047]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2E7D32] shadow-2xs">
                        <IconComponent className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#43A047] tabular-nums">
                        {service.number}
                      </span>
                    </div>

                    <h4 className="font-display mt-3.5 text-base font-bold text-[#1B5E20]">
                      • {service.title}
                    </h4>

                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#607D66]">
                      {service.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* FACILITIES SECTION */}
        <div className="mt-8 rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
              RESIDENTIAL AMENITIES &amp; CARE
            </p>
            <h3 className="font-display mt-1 text-xl font-bold text-[#1B5E20] sm:text-2xl">
              Facilities
            </h3>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {SITE_CONFIG.facilities.map((facility) => (
              <div
                key={facility}
                className="flex items-start gap-2.5 rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9]/60 p-4 text-xs sm:text-sm font-semibold text-[#1B5E20]"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#43A047]" aria-hidden="true" />
                <span>{facility}</span>
              </div>
            ))}
          </div>
        </div>

        {/* REHABILITATION PRINCIPLES */}
        <div className="mt-8 rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
              RECOVERY-ORIENTED SUPPORT
            </p>
            <h3 className="font-display mt-1 text-xl font-bold text-[#1B5E20] sm:text-2xl">
              Rehabilitation Principles
            </h3>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONFIG.rehabilitationPrinciples.map((principle) => (
              <div
                key={principle.step}
                className="rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9]/60 p-5"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#2E7D32] font-mono text-xs font-bold text-white">
                  {principle.step}
                </span>
                <h4 className="font-display mt-3 text-base font-bold text-[#1B5E20]">
                  - {principle.title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#607D66]">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* HEALTH & SAFETY, LOCATION & SUSTAINABILITY EFFORTS, & COMMUNITY TRAINING */}
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
                    WELL-BEING &amp; PREPAREDNESS
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#1B5E20]">
                    Health &amp; Safety Measures
                  </h3>
                </div>
              </div>

              <ul className="mt-4 space-y-2.5">
                {SITE_CONFIG.healthAndSafety.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[#263238]">
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
                    ECO-CONSCIOUS CAMPUS
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#1B5E20]">
                    {SITE_CONFIG.locationAndSustainability.heading}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#263238]">
                {SITE_CONFIG.locationAndSustainability.description}
              </p>

              <ul className="mt-3 space-y-2">
                {SITE_CONFIG.locationAndSustainability.projects.map((proj) => (
                  <li
                    key={proj}
                    className="flex items-start gap-2 rounded-xl border border-[#2E7D32]/15 bg-[#E8F5E9]/60 p-2.5 text-xs sm:text-sm font-medium text-[#1B5E20]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#43A047]" aria-hidden="true" />
                    <span>{proj}</span>
                  </li>
                ))}
              </ul>
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
