import React from 'react';
import { Lock } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

interface HeaderProps {
  onDonateClick: () => void;
  onAdminClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDonateClick, onAdminClick }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-[#2E7D32]/20 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="font-display text-base font-bold tracking-tight text-[#1B5E20] transition-colors hover:text-[#2E7D32] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2E7D32] sm:text-lg whitespace-nowrap shrink-0"
        >
          {SITE_CONFIG.name}
        </a>

        {/* Zone 2: clean text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#607D66]"
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

        {/* Zone 3: Actions (Donate + Admin) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {onAdminClick && (
            <button
              type="button"
              onClick={onAdminClick}
              title="Admin Control Panel"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9] px-3 py-2 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#2E7D32] hover:text-white cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          )}

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
