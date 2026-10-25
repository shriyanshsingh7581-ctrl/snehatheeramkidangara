import React from 'react';
import { PhoneCall, Mail, MapPin, MessageCircle, Navigation, Clock, Image } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { buildWhatsAppUrl } from '../lib/whatsapp';

interface FooterProps {
  logoUrl: string;
  onOpenBankModal: () => void;
  onOpenMediaModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  logoUrl,
  onOpenBankModal,
  onOpenMediaModal,
}) => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(
    `Namaskaram, I would like to connect with ${SITE_CONFIG.name} regarding support and visiting hours.`
  );

  return (
    <footer className="border-t border-[#183153] bg-[#183153] pb-20 text-[#FAF8F2] md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Organization Identity */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt={`${SITE_CONFIG.name} emblem`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/favicon.svg';
                }}
                className="h-10 w-10 rounded-xl border border-white/15 bg-white/10 object-cover shrink-0"
              />
              <div>
                <p className="font-display text-lg font-bold tracking-tight text-white">
                  {SITE_CONFIG.name}
                </p>
                <p className="text-xs font-medium text-[#D8AD62]">
                  {SITE_CONFIG.fullName}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#FAF8F2]/80">
              {SITE_CONFIG.description}
            </p>

            <div className="mt-4 text-xs text-[#FAF8F2]/75">
              <span>{SITE_CONFIG.management.province}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>{SITE_CONFIG.management.congregation}</span>
            </div>

            <div className="mt-5 flex items-center gap-2.5 text-xs text-[#D8AD62]">
              <Clock className="h-4 w-4 shrink-0 text-[#159A91]" aria-hidden="true" />
              <span>Visiting Hours: 9:30 AM – 5:00 PM daily</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xs font-bold tracking-wider text-[#D8AD62]">
              QUICK LINKS
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#FAF8F2]/85">
              <li>
                <a href="#home" className="hover:text-[#D8AD62] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D8AD62] transition-colors">
                  About Our Sanctuary
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D8AD62] transition-colors">
                  Services &amp; Facilities
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-[#D8AD62] transition-colors">
                  How You Can Help
                </a>
              </li>
              <li>
                <a href="#annadanam-desk" className="hover:text-[#D8AD62] transition-colors">
                  Sponsor a Meal (Annadanam)
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenBankModal}
                  className="text-left hover:text-[#D8AD62] transition-colors cursor-pointer"
                >
                  Bank / UPI Details
                </button>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D8AD62] transition-colors">
                  Contact &amp; Location
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Links */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-xs font-bold tracking-wider text-[#D8AD62]">
              OUR CARE SERVICES
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#FAF8F2]/85">
              {SITE_CONFIG.services.map((service) => (
                <li key={service.id}>
                  <a href="#services" className="hover:text-[#D8AD62] transition-colors">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Address */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-xs font-bold tracking-wider text-[#D8AD62]">
              CONTACT &amp; ADDRESS
            </h3>

            <div className="mt-4 space-y-3 text-sm text-[#FAF8F2]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#159A91]" aria-hidden="true" />
                <address className="not-italic text-xs leading-relaxed">
                  {SITE_CONFIG.location.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="mt-1 block text-[#D8AD62]">
                    {SITE_CONFIG.location.landmark}
                  </span>
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <PhoneCall className="h-4 w-4 shrink-0 text-[#159A91]" aria-hidden="true" />
                <div className="text-xs tabular-nums">
                  <a
                    href={`tel:${SITE_CONFIG.contact.primaryPhoneTel}`}
                    className="hover:text-[#D8AD62] transition-colors"
                  >
                    {SITE_CONFIG.contact.whatsappDisplay}
                  </a>
                  <span className="mx-1.5 text-white/40">·</span>
                  <a
                    href={`tel:${SITE_CONFIG.contact.landlineTel}`}
                    className="hover:text-[#D8AD62] transition-colors"
                  >
                    {SITE_CONFIG.contact.landlineDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <PhoneCall className="h-4 w-4 shrink-0 text-[#D8AD62]" aria-hidden="true" />
                <a
                  href={`tel:${SITE_CONFIG.contact.provinceTel}`}
                  className="text-xs tabular-nums hover:text-[#D8AD62] transition-colors"
                >
                  Province: {SITE_CONFIG.contact.provinceDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#159A91]" aria-hidden="true" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-xs hover:text-[#D8AD62] transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-[#128C7E] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0e7266] whitespace-nowrap shrink-0"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <a
                href={SITE_CONFIG.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-white/20 bg-white/8 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/15 whitespace-nowrap shrink-0"
              >
                <Navigation className="h-3.5 w-3.5 text-[#D8AD62]" aria-hidden="true" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Media Configuration Bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#FAF8F2]/70 sm:flex-row sm:items-center">
          <p>
            &copy; {currentYear} {SITE_CONFIG.name} ({SITE_CONFIG.fullName}). All rights reserved.
          </p>

          <button
            type="button"
            onClick={onOpenMediaModal}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#FAF8F2]/85 transition-colors hover:bg-white/12 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Image className="h-3.5 w-3.5 text-[#D8AD62]" aria-hidden="true" />
            <span>Media &amp; Logo Settings</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
