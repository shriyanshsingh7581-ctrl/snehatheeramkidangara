import React, { useState } from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const MapSection: React.FC = () => {
  const [mapFailed, setMapFailed] = useState(false);
  const { lat, lng, display } = SITE_CONFIG.location.coordinates;

  // Standard OpenStreetMap embed centered at 9.42055° N, 76.49025° E (Kidangara, Kuttanad)
  const bbox = `${lng - 0.015},${lat - 0.01},${lng + 0.015},${lat + 0.01}`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox
  )}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[#E7ECEB] bg-white">
      <div className="relative min-h-[300px] w-full flex-1 bg-[#FAF8F2]">
        {!mapFailed ? (
          <iframe
            title="Location Map for Snehatheeram Kidangara, Kuttanad, Alappuzha"
            src={osmEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onError={() => setMapFailed(true)}
            className="h-full min-h-[300px] w-full border-0"
          />
        ) : (
          <div className="flex h-full min-h-[300px] flex-col items-center justify-center p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#183153]/10 text-[#183153]">
              <MapPin className="h-6 w-6 text-[#159A91]" aria-hidden="true" />
            </div>
            <p className="font-display mt-3 text-base font-bold text-[#183153]">
              {SITE_CONFIG.shortReferenceName}
            </p>
            <p className="mt-1 text-xs text-[#687780]">{SITE_CONFIG.location.landmark}</p>
            <p className="mt-1 font-mono text-xs text-[#183153] tabular-nums">{display}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between gap-4 border-t border-[#E7ECEB] bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-sm font-bold text-[#183153]">
            {SITE_CONFIG.location.landmark}
          </p>
          <p className="mt-0.5 text-xs text-[#687780]">
            Coordinates: <span className="font-mono tabular-nums">{display}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={SITE_CONFIG.location.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#183153] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#159A91] whitespace-nowrap shrink-0"
          >
            <Navigation className="h-3.5 w-3.5 text-[#D8AD62]" aria-hidden="true" />
            <span>Open in Google Maps</span>
            <ExternalLink className="h-3 w-3 opacity-80" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
