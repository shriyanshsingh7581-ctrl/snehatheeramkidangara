import React, { useState, useEffect } from 'react';
import { HeartHandshake } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  aspectRatioClass?: string;
  className?: string;
  priority?: boolean;
  caption?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  aspectRatioClass = 'aspect-video',
  className = '',
  priority = false,
  caption,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <figure className={`relative overflow-hidden bg-[#183153] ${aspectRatioClass} ${className}`}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover transition-transform duration-500"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#183153] via-[#1C3F66] to-[#159A91] p-6 text-center text-[#FAF8F2]"
        >
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF8F2]/10 text-[#D8AD62]">
            <HeartHandshake className="h-7 w-7" aria-hidden="true" />
          </div>
          <p className="font-display text-sm font-semibold tracking-tight text-[#FAF8F2]">
            Snehatheeram Kidangara
          </p>
          <p className="mt-1 max-w-xs text-xs text-[#FAF8F2]/75">
            Pope John XXIII Rehabilitation &amp; Old Age Women Care Center
          </p>
        </div>
      )}
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#183153]/90 via-[#183153]/60 to-transparent px-4 pt-6 pb-2.5 text-[11px] font-medium text-[#FAF8F2]/90">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
