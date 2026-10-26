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
          <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
            SUPPORT &amp; GENEROSITY
          </p>
          <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#1B5E20] sm:text-3xl lg:text-4xl">
            How You Can Help
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#607D66]">
            Snehatheeram relies on the generosity of kind-hearted individuals and well-wishers to
            meet the daily nutritional, psychiatric, and rehabilitation needs of our residents.
            Every contribution brings healing and dignity to a sister or mother in need.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* CARD 1 — MOST POPULAR */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#1B5E20] bg-[#1B5E20] p-6 text-white sm:p-8">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold tracking-wider text-[#E8F5E9]">
                  MOST POPULAR · ANNADANAM
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2E7D32] text-white">
                  <Utensils className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="font-display mt-4 text-xl font-bold text-white sm:text-2xl">
                Sponsor a Day&apos;s Meal (Annadanam)
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#E8F5E9]/90">
                Celebrate your birthdays, wedding anniversaries, or remember your loved ones by
                sponsoring breakfast, lunch, tea, or dinner for our residents.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/15">
              <button
                type="button"
                onClick={onBookMealClick}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#1B5E20] transition-colors hover:bg-[#E8F5E9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Book a Meal Below</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#2E7D32]" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* CARD 2 — ESSENTIAL CARE */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold tracking-wider text-[#2E7D32]">
                  ESSENTIAL CARE · HEALTHCARE
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                  <Stethoscope className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="font-display mt-4 text-xl font-bold text-[#1B5E20] sm:text-2xl">
                Medical &amp; Psychiatric Sponsorship
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#607D66]">
                Help cover the monthly expenses for essential psychiatric and general medicines,
                counselling sessions, and regular clinical check-ups for our residents.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#E8F5E9]">
              <button
                type="button"
                onClick={onSponsorMedicinesClick}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[#2E7D32] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B5E20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E20] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Sponsor Medicines</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* CARD 3 — DIRECT SUPPORT */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold tracking-wider text-[#1B5E20]">
                  DIRECT SUPPORT · REHABILITATION
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#1B5E20]">
                  <Landmark className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="font-display mt-4 text-xl font-bold text-[#1B5E20] sm:text-2xl">
                General Donation
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#607D66]">
                Contribute towards vocational training materials, clothing, bedding, and daily
                rehabilitation centre operations via Bank Transfer or UPI.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#E8F5E9]">
              <button
                type="button"
                onClick={onViewBankDetailsClick}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-[#2E7D32] bg-transparent px-5 py-3 text-sm font-semibold text-[#1B5E20] transition-colors hover:bg-[#43A047] hover:border-[#43A047] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E20] whitespace-nowrap shrink-0 cursor-pointer"
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
