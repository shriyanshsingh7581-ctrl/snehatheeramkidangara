import React from 'react';
import { Compass, Eye } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const MissionVision: React.FC = () => {
  return (
    <section aria-label="Mission and Vision" className="py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* OUR MISSION */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#E7ECEB] bg-white p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#183153] text-[#D8AD62]">
                  <Compass className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider text-[#159A91]">
                    PURPOSE &amp; DEVOTION
                  </p>
                  <h2 className="font-display text-xl font-bold text-[#183153] sm:text-2xl">
                    OUR MISSION
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-base leading-relaxed text-[#263238]">
                {SITE_CONFIG.mission}
              </p>
            </div>

            <div className="mt-6 border-t border-[#E7ECEB] pt-4 text-xs font-medium text-[#687780]">
              <span>Shelter</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Nutritious Food</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Medical Attention</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Spiritual Support</span>
            </div>
          </div>

          {/* OUR VISION */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#E7ECEB] bg-white p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#159A91] text-white">
                  <Eye className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider text-[#183153]">
                    DIGNITY FOR EVERY MOTHER
                  </p>
                  <h2 className="font-display text-xl font-bold text-[#183153] sm:text-2xl">
                    OUR VISION
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-base leading-relaxed text-[#263238]">
                {SITE_CONFIG.vision}
              </p>
            </div>

            <div className="mt-6 border-t border-[#E7ECEB] pt-4 text-xs font-medium text-[#687780]">
              <span>Valued</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Loved</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Cared For</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Zero Neglect</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
