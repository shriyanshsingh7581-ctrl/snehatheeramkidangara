import React from 'react';
import { Compass, Eye, ShieldCheck, Network } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { useLiveConfig } from '../../hooks/useLiveSiteData';

export const MissionVision: React.FC = () => {
  const live = useLiveConfig();

  return (
    <section aria-label="Mission, Vision, Core Values and Organogram" className="py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* MISSION & VISION CARDS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* OUR MISSION */}
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
                    OUR MISSION
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-base leading-relaxed text-[#263238]">
                {live.mission}
              </p>
            </div>

            <div className="mt-6 border-t border-[#E8F5E9] pt-4 text-xs font-medium text-[#607D66]">
              <span>Safe Shelter</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Psychiatric Care</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Counselling</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Reintegration</span>
            </div>
          </div>

          {/* OUR VISION */}
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
                    OUR VISION
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-base leading-relaxed text-[#263238]">
                {live.vision}
              </p>
            </div>

            <div className="mt-6 border-t border-[#E8F5E9] pt-4 text-xs font-medium text-[#607D66]">
              <span>Valued</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Loved</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Empowered</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Zero Stigma</span>
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
                  Our Core Values
                </h3>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {SITE_CONFIG.coreValues.map((val) => (
                <div
                  key={val.title}
                  className="rounded-2xl border border-[#2E7D32]/15 bg-[#E8F5E9]/60 p-4"
                >
                  <h4 className="font-display text-sm font-bold text-[#1B5E20]">
                    {val.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#607D66]">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Organogram & Departments */}
          <div className="rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8 lg:col-span-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                <Network className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                  ORGANIZATIONAL STRUCTURE
                </p>
                <h3 className="font-display text-xl font-bold text-[#1B5E20]">
                  Organogram &amp; Departments
                </h3>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[#1B5E20] bg-[#1B5E20] p-4 text-white">
              <p className="text-[11px] font-bold tracking-wider text-[#E8F5E9]">
                GOVERNING BODY &amp; LEADERSHIP
              </p>
              <p className="font-display mt-1 text-sm font-bold text-white">
                {SITE_CONFIG.organogram.governingBody}
              </p>
              <p className="mt-0.5 text-xs text-[#E8F5E9]">
                Executive Leadership: {SITE_CONFIG.organogram.leadership}
              </p>
            </div>

            <div className="mt-4 space-y-2.5">
              {SITE_CONFIG.organogram.departments.map((dept, idx) => (
                <div
                  key={dept.name}
                  className="rounded-xl border border-[#2E7D32]/20 bg-[#E8F5E9]/45 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-display text-xs font-bold text-[#1B5E20] sm:text-sm">
                      {dept.name}
                    </h4>
                    <span className="rounded-md bg-[#43A047] px-2 py-0.5 text-[10px] font-bold text-white">
                      Dept 0{idx + 1}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#607D66]">
                    {dept.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
