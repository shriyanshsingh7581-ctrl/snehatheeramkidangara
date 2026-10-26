import React from 'react';
import { useLiveConfig } from '../hooks/useLiveSiteData';

interface HeaderProps {
  logoUrl?: string;
  onDonateClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  logoUrl = '/assets/aistudio/logo_extracted_f3521143.png',
  onDonateClick,
}) => {
  const live = useLiveConfig();

  return (
    <header className="sticky top-0 z-30 border-b border-[#2E7D32]/20 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Official Emblem Logo + Organization Name */}
        <a
          href="#home"
          className="flex items-center gap-3 font-display text-base font-bold tracking-tight text-[#1B5E20] transition-colors hover:text-[#2E7D32] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2E7D32] sm:text-lg whitespace-nowrap shrink-0"
        >
          <img
            src={logoUrl}
            alt={`${live.name} official logo`}
            className="h-11 w-11 rounded-full object-contain shrink-0"
          />
          <span>{live.name}</span>
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#607D66]"
        >
          <a
            href="#home"
            className="py-2 text-[#1B5E20] underline-offset-8 hover:text-[#2E7D32] hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Home
          </a>
          <a
            href="#about"
            className="py-2 hover:text-[#2E7D32] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            About Us
          </a>
          <a
            href="#services"
            className="py-2 hover:text-[#2E7D32] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Services
          </a>
          <a
            href="#support"
            className="py-2 hover:text-[#2E7D32] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Support
          </a>
          <a
            href="#contact"
            className="py-2 hover:text-[#2E7D32] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onDonateClick}
            className="min-h-[40px] rounded-xl bg-[#2E7D32] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#1B5E20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E20] sm:text-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            Donate Now
          </button>
        </div>
      </div>
    </header>
  );
};
