import React from 'react';
import { MapPin, PhoneCall, MessageCircle, Mail, Navigation } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { useLiveConfig } from '../../hooks/useLiveSiteData';
import { buildWhatsAppUrl } from '../../lib/whatsapp';
import { MapSection } from './MapSection';

export const ContactSection: React.FC = () => {
  const live = useLiveConfig();
  const whatsappContactUrl = buildWhatsAppUrl(
    `Namaskaram, I would like to get in touch with ${SITE_CONFIG.contactOrganization} (${live.name}) in Kidangara.`
  );

  return (
    <section id="contact" className="scroll-mt-16 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#1B5E20] sm:text-3xl lg:text-4xl">
            Contact Us
          </h2>
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
                  <h3 className="font-display text-lg font-bold text-[#1B5E20]">
                    John Paul XXIII Rehabilitation Centre
                  </h3>
                  <p className="mt-3 text-xs font-bold tracking-wider text-[#2E7D32]">
                    Address:
                  </p>
                  <address className="mt-1 not-italic text-sm font-medium leading-relaxed text-[#263238]">
                    <span className="block">Kidangara P.O., Kuttanad Taluk,</span>
                    <span className="block">Alappuzha District, Kerala – 686107</span>
                  </address>
                </div>
              </div>

              {/* Phone Numbers (Click to Call) */}
              <div className="border-t border-[#E8F5E9] pt-5">
                <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                  Phone:
                </p>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <a
                    href="tel:+919400272087"
                    className="flex min-h-[52px] items-center gap-2.5 rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9] px-4 py-3 transition-colors hover:border-[#43A047]"
                  >
                    <PhoneCall className="h-4 w-4 shrink-0 text-[#2E7D32]" aria-hidden="true" />
                    <span className="font-display text-sm font-bold text-[#1B5E20] tabular-nums">
                      +91 9400272087
                    </span>
                  </a>

                  <a
                    href="tel:+917511133810"
                    className="flex min-h-[52px] items-center gap-2.5 rounded-2xl border border-[#2E7D32]/20 bg-[#E8F5E9] px-4 py-3 transition-colors hover:border-[#43A047]"
                  >
                    <PhoneCall className="h-4 w-4 shrink-0 text-[#2E7D32]" aria-hidden="true" />
                    <span className="font-display text-sm font-bold text-[#1B5E20] tabular-nums">
                      +91 7511133810
                    </span>
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="border-t border-[#E8F5E9] pt-5">
                <p className="text-sm font-semibold text-[#263238]">
                  <span className="font-bold text-[#2E7D32]">Email: </span>
                  <a
                    href="mailto:kidangarasnehatheeram@gmail.com"
                    className="inline-flex items-center gap-1.5 font-semibold text-[#1B5E20] underline-offset-4 hover:text-[#2E7D32] hover:underline break-all"
                  >
                    <Mail className="h-4 w-4 text-[#43A047] shrink-0" aria-hidden="true" />
                    <span>kidangarasnehatheeram@gmail.com</span>
                  </a>
                </p>
              </div>
            </div>

            {/* Functional Action Bar */}
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#E8F5E9] pt-6 sm:grid-cols-4">
              <a
                href="tel:+919400272087"
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
                href="mailto:kidangarasnehatheeram@gmail.com"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9] px-3 py-2.5 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#43A047] hover:text-white whitespace-nowrap shrink-0"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Email</span>
              </a>

              <a
                href={SITE_CONFIG.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9] px-3 py-2.5 text-xs font-semibold text-[#1B5E20] transition-colors hover:bg-[#43A047] hover:text-white whitespace-nowrap shrink-0"
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
