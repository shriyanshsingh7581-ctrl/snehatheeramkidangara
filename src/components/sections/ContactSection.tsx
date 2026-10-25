import React from 'react';
import { MapPin, PhoneCall, MessageCircle, Mail, Navigation, Compass } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { buildWhatsAppUrl } from '../../lib/whatsapp';
import { MapSection } from './MapSection';

export const ContactSection: React.FC = () => {
  const whatsappContactUrl = buildWhatsAppUrl(
    `Namaskaram, I would like to get in touch with ${SITE_CONFIG.shortReferenceName} in Kidangara.`
  );

  return (
    <section id="contact" className="scroll-mt-16 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
            REACH US IN KUTTANAD
          </p>
          <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#1B5E20] sm:text-3xl lg:text-4xl">
            Contact &amp; Location
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#1B5E20]/80">
            Located near Kidangara along the Changanassery-Alappuzha (AC) Road. Feel free to call or
            visit us.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Address & Direct Contact Details */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#2E7D32]/20 bg-white p-6 sm:p-8 lg:col-span-6">
            <div className="space-y-6">
              {/* Organization & Postal Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                  <MapPin className="h-5 w-5 text-[#2E7D32]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider text-[#2E7D32]">ORGANIZATION</p>
                  <h3 className="font-display mt-0.5 text-lg font-bold text-[#1B5E20]">
                    {SITE_CONFIG.shortReferenceName}
                  </h3>
                  <address className="mt-2 not-italic text-sm leading-relaxed text-[#1B5E20]/90">
                    {SITE_CONFIG.location.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <p className="mt-2 text-xs font-semibold text-[#2E7D32]">
                    {SITE_CONFIG.location.landmark}
                  </p>
                </div>
              </div>

              {/* Phone Numbers (Click to Call) */}
              <div className="border-t border-[#E8F5E9] pt-5">
                <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                  PHONE NUMBERS (CLICK TO CALL)
                </p>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <a
                    href={`tel:${SITE_CONFIG.contact.primaryPhoneTel}`}
                    className="flex min-h-[56px] flex-col justify-center rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9] px-4 py-3 transition-colors hover:border-[#2E7D32]"
                  >
                    <span className="text-[11px] font-medium text-[#2E7D32]">
                      Primary &amp; WhatsApp
                    </span>
                    <span className="font-display mt-0.5 text-sm font-bold text-[#1B5E20] tabular-nums">
                      {SITE_CONFIG.contact.whatsappDisplay}
                    </span>
                  </a>

                  <a
                    href={`tel:${SITE_CONFIG.contact.landlineTel}`}
                    className="flex min-h-[56px] flex-col justify-center rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9] px-4 py-3 transition-colors hover:border-[#2E7D32]"
                  >
                    <span className="text-[11px] font-medium text-[#2E7D32]">Landline</span>
                    <span className="font-display mt-0.5 text-sm font-bold text-[#1B5E20] tabular-nums">
                      {SITE_CONFIG.contact.landlineDisplay}
                    </span>
                  </a>

                  <a
                    href={`tel:${SITE_CONFIG.contact.provinceTel}`}
                    className="flex min-h-[56px] flex-col justify-center rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9] px-4 py-3 transition-colors hover:border-[#2E7D32]"
                  >
                    <span className="text-[11px] font-medium text-[#2E7D32]">Province</span>
                    <span className="font-display mt-0.5 text-sm font-bold text-[#1B5E20] tabular-nums">
                      {SITE_CONFIG.contact.provinceDisplay}
                    </span>
                  </a>
                </div>
              </div>

              {/* Email & GPS Coordinates */}
              <div className="grid grid-cols-1 gap-4 border-t border-[#E8F5E9] pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold tracking-wider text-[#2E7D32]">EMAIL ADDRESS</p>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="mt-1.5 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#1B5E20] underline-offset-4 hover:text-[#2E7D32] hover:underline"
                  >
                    <Mail className="h-4 w-4 text-[#2E7D32] shrink-0" aria-hidden="true" />
                    <span>{SITE_CONFIG.contact.email}</span>
                  </a>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-wider text-[#2E7D32]">GPS COORDINATES</p>
                  <p className="mt-1.5 inline-flex min-h-[44px] items-center gap-2 font-mono text-sm font-semibold text-[#1B5E20] tabular-nums">
                    <Compass className="h-4 w-4 text-[#2E7D32] shrink-0" aria-hidden="true" />
                    <span>{SITE_CONFIG.location.coordinates.display}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Functional Action Bar */}
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#E8F5E9] pt-6 sm:grid-cols-4">
              <a
                href={`tel:${SITE_CONFIG.contact.primaryPhoneTel}`}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#1B5E20] px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2E7D32] whitespace-nowrap shrink-0"
              >
                <PhoneCall className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Call Now</span>
              </a>

              <a
                href={whatsappContactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#2E7D32] px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1B5E20] whitespace-nowrap shrink-0"
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9] px-3 py-2.5 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#2E7D32] hover:text-white whitespace-nowrap shrink-0"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Email</span>
              </a>

              <a
                href={SITE_CONFIG.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9] px-3 py-2.5 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#2E7D32] hover:text-white whitespace-nowrap shrink-0"
              >
                <Navigation className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Map with Graceful Fallback */}
          <div className="lg:col-span-6">
            <MapSection />
          </div>
        </div>
      </div>
    </section>
  );
};
