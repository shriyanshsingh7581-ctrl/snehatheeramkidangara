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
    <figure className={`relative overflow-hidden bg-[#1B5E20] ${aspectRatioClass} ${className}`}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover object-center transition-transform duration-500"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] p-6 text-center text-white"
        >
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F5E9]/15 text-[#E8F5E9]">
            <HeartHandshake className="h-7 w-7" aria-hidden="true" />
          </div>
          <p className="font-display text-sm font-semibold tracking-tight text-white">
            Snehatheeram Kidangara
          </p>
          <p className="mt-1 max-w-xs text-xs text-[#E8F5E9]/85">
            Pope John XXIII Rehabilitation &amp; Old Age Women Care Center
          </p>
        </div>
      )}
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1B5E20]/90 via-[#1B5E20]/60 to-transparent px-4 pt-6 pb-2.5 text-[11px] font-medium text-white">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
