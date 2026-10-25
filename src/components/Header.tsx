import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

interface HeaderProps {
  onDonateClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDonateClick }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-[#E7ECEB] bg-[#FAF8F2]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="font-display text-base font-bold tracking-tight text-[#183153] transition-colors hover:text-[#159A91] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#159A91] sm:text-lg whitespace-nowrap shrink-0"
        >
          {SITE_CONFIG.name}
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#687780]"
        >
          <a
            href="#home"
            className="py-2 text-[#263238] underline-offset-8 hover:text-[#183153] hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Home
          </a>
          <a
            href="#about"
            className="py-2 hover:text-[#183153] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            About Us
          </a>
          <a
            href="#services"
            className="py-2 hover:text-[#183153] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Services
          </a>
          <a
            href="#support"
            className="py-2 hover:text-[#183153] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Support
          </a>
          <a
            href="#contact"
            className="py-2 hover:text-[#183153] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onDonateClick}
            className="min-h-[40px] rounded-xl bg-[#183153] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#159A91] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183153] sm:text-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            Donate Now
          </button>
        </div>
      </div>
    </header>
  );
};
