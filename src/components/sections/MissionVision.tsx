import React from 'react';
import { Compass, Eye, ShieldCheck, Network, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const MissionVision: React.FC = () => {
  return (
    <section aria-label="Mission, Vision, Core Values and Organogram" className="py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* MISSION & VISION CARDS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* MISSION */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1B5E20] text-white">
                  <Compass className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                    PURPOSE &amp; DEVOTION
                  </p>
                  <h2 className="font-display text-xl font-bold text-[#1B5E20] sm:text-2xl">
                    Mission
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-base leading-relaxed text-[#263238]">
                {SITE_CONFIG.mission}
              </p>
            </div>

            <div className="mt-6 border-t border-[#E8F5E9] pt-4 text-xs font-medium text-[#607D66]">
              <span>Compassionate Care</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Therapeutic Support</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Skill-Building</span>
            </div>
          </div>

          {/* VISION */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2E7D32] text-white">
                  <Eye className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                    DIGNITY FOR EVERY WOMAN
                  </p>
                  <h2 className="font-display text-xl font-bold text-[#1B5E20] sm:text-2xl">
                    Vision
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-base leading-relaxed text-[#263238]">
                {SITE_CONFIG.vision}
              </p>
            </div>

            <div className="mt-6 border-t border-[#E8F5E9] pt-4 text-xs font-medium text-[#607D66]">
              <span>Respected</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Supported</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Empowered</span>
            </div>
          </div>
        </div>

        {/* CORE VALUES & ORGANOGRAM / DEPARTMENTS */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Core Values */}
          <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8 lg:col-span-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                  GUIDING ETHOS
                </p>
                <h3 className="font-display text-xl font-bold text-[#1B5E20]">
                  Core Values
                </h3>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SITE_CONFIG.coreValues.map((val) => (
                <div
                  key={val.title}
                  className="rounded-2xl border border-[#2E7D32]/15 bg-[#E8F5E9]/60 p-4"
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#43A047]" aria-hidden="true" />
                    <div>
                      <h4 className="font-display text-sm font-bold text-[#1B5E20]">
                        {val.title}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-[#607D66]">
                        {val.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organogram */}
          <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8 lg:col-span-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                <Network className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#1B5E20]">
                  {SITE_CONFIG.organogram.title}
                </h3>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              {SITE_CONFIG.organogram.levels.map((level, index) => (
                <div
                  key={level}
                  className={
                    index === 0
                      ? 'rounded-2xl border border-[#1B5E20] bg-[#1B5E20] px-4 py-3 text-white'
                      : 'rounded-xl border border-[#2E7D32]/20 bg-[#E8F5E9]/60 px-4 py-3'
                  }
                >
                  <p
                    className={
                      index === 0
                        ? 'font-display text-xs font-bold text-white sm:text-sm'
                        : 'font-display text-xs font-bold text-[#1B5E20] sm:text-sm'
                    }
                  >
                    {level}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="font-display text-xs font-bold text-[#1B5E20] sm:text-sm">
                {SITE_CONFIG.organogram.departmentsHeading}
              </p>

              <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {SITE_CONFIG.organogram.departments.map((dept) => (
                  <div
                    key={dept.name}
                    className="rounded-xl border border-[#2E7D32]/20 bg-[#E8F5E9]/45 px-4 py-3"
                  >
                    <h4 className="font-display text-xs font-bold text-[#1B5E20] sm:text-sm">
                      • {dept.name}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#263238]">
                      {dept.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
