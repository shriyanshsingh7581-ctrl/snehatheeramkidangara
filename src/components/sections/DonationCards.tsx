import React from 'react';
import { Utensils, Stethoscope, Landmark, ArrowRight } from 'lucide-react';

interface DonationCardsProps {
  onBookMealClick: () => void;
  onSponsorMedicinesClick: () => void;
  onViewBankDetailsClick: () => void;
}

export const DonationCards: React.FC<DonationCardsProps> = ({
  onBookMealClick,
  onSponsorMedicinesClick,
  onViewBankDetailsClick,
}) => {
  return (
    <section id="support" className="scroll-mt-16 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-wider text-[#159A91]">
            SUPPORT &amp; GENEROSITY
          </p>
          <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#183153] sm:text-3xl lg:text-4xl">
            How You Can Help
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#263238]">
            Snehatheeram relies on the generosity of kind-hearted individuals and well-wishers to
            meet the daily needs of our residents. Every contribution brings a smile to a
            mother&apos;s face.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* CARD 1 — MOST POPULAR */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#183153] bg-[#183153] p-6 text-white sm:p-8">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold tracking-wider text-[#D8AD62]">
                  MOST POPULAR · ANNADANAM
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#D8AD62]">
                  <Utensils className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="font-display mt-4 text-xl font-bold text-white sm:text-2xl">
                Sponsor a Day&apos;s Meal (Annadanam)
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#FAF8F2]/85">
                Celebrate your birthdays, wedding anniversaries, or remember your loved ones by
                sponsoring breakfast, lunch, or dinner for our residents.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10">
              <button
                type="button"
                onClick={onBookMealClick}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[#D8AD62] px-5 py-3 text-sm font-bold text-[#183153] transition-colors hover:bg-[#e3bc75] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8AD62] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Book a Meal Below</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* CARD 2 — ESSENTIAL CARE */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#E7ECEB] bg-white p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold tracking-wider text-[#159A91]">
                  ESSENTIAL CARE · HEALTHCARE
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#159A91]/10 text-[#159A91]">
                  <Stethoscope className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="font-display mt-4 text-xl font-bold text-[#183153] sm:text-2xl">
                Medical Sponsorship
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#687780]">
                Help cover the monthly expenses for essential medicines, adult diapers, and regular
                medical check-ups for frail and bedridden mothers.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#E7ECEB]">
              <button
                type="button"
                onClick={onSponsorMedicinesClick}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[#159A91] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#11827a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#159A91] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Sponsor Medicines</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* CARD 3 — DIRECT SUPPORT */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#E7ECEB] bg-white p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold tracking-wider text-[#183153]">
                  DIRECT SUPPORT · OPERATIONS
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#183153]/8 text-[#183153]">
                  <Landmark className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="font-display mt-4 text-xl font-bold text-[#183153] sm:text-2xl">
                General Donation
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#687780]">
                Contribute towards building maintenance, clothing, bedding, and daily operational
                costs via Bank Transfer or UPI.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#E7ECEB]">
              <button
                type="button"
                onClick={onViewBankDetailsClick}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-[#183153] bg-transparent px-5 py-3 text-sm font-semibold text-[#183153] transition-colors hover:bg-[#183153] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183153] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>View Bank / UPI Details</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
