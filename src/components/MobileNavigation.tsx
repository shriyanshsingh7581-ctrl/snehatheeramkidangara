import React from 'react';
import { Home, HeartHandshake, Stethoscope, HandHeart, PhoneCall } from 'lucide-react';

interface MobileNavigationProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home', Icon: Home },
  { id: 'about', label: 'About', href: '#about', Icon: HeartHandshake },
  { id: 'services', label: 'Services', href: '#services', Icon: Stethoscope },
  { id: 'support', label: 'Support', href: '#support', Icon: HandHeart },
  { id: 'contact', label: 'Contact', href: '#contact', Icon: PhoneCall },
];

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeSection }) => {
  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#2E7D32]/20 bg-white/95 backdrop-blur-md md:hidden"
    >
      <div className="mx-auto grid h-14 max-w-md grid-cols-5 items-center px-1">
        {NAV_ITEMS.map(({ id, label, href, Icon }) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-[44px] min-w-[44px] flex-col items-center justify-center rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#E8F5E9] text-[#1B5E20] font-semibold'
                  : 'text-[#607D66] hover:text-[#2E7D32] font-medium'
              }`}
            >
              <Icon
                className={`h-5 w-5 transition-transform duration-150 ${
                  isActive ? 'scale-105 text-[#2E7D32]' : 'text-[#607D66]'
                }`}
                aria-hidden="true"
              />
              <span className="mt-0.5 text-[10px] tracking-tight whitespace-nowrap shrink-0">
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
