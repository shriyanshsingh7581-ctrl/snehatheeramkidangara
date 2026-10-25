import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../lib/whatsapp';

export const WhatsAppFloatingButton: React.FC = () => {
  const defaultEnquiry = buildWhatsAppUrl(
    `Namaskaram, I would like to connect with ${SITE_CONFIG.name} (${SITE_CONFIG.fullName}) regarding elderly care support / meal sponsorship.`
  );

  return (
    <div className="fixed right-4 bottom-18 z-20 md:right-6 md:bottom-6">
      <a
        href={defaultEnquiry}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${SITE_CONFIG.name} on WhatsApp at ${SITE_CONFIG.contact.whatsappDisplay}`}
        className="group flex min-h-[48px] items-center gap-2.5 rounded-2xl bg-[#2E7D32] px-4 py-3 text-white shadow-lg ring-1 ring-white/20 transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#1B5E20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5E20]"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#1B5E20] shrink-0">
          <MessageCircle className="h-4 w-4 fill-current" aria-hidden="true" />
        </span>
        <span className="hidden text-xs font-semibold tracking-tight sm:inline whitespace-nowrap shrink-0">
          WhatsApp Desk
        </span>
      </a>
    </div>
  );
};
