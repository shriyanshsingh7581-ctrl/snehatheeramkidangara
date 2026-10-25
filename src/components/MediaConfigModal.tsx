import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Check, Image } from 'lucide-react';
import { SiteImagesConfig } from '../config/siteConfig';

interface MediaConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: SiteImagesConfig;
  onSave: (next: SiteImagesConfig) => void;
  onReset: () => void;
}

export const MediaConfigModal: React.FC<MediaConfigModalProps> = ({
  isOpen,
  onClose,
  images,
  onSave,
  onReset,
}) => {
  const [draft, setDraft] = useState<SiteImagesConfig>(images);

  useEffect(() => {
    setDraft(images);
  }, [images, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(draft);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#183153]/70 p-0 backdrop-blur-xs sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-[#E7ECEB] bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E7ECEB] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#183153] text-[#D8AD62]">
              <Image className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider text-[#159A91]">
                CONTENT &amp; MEDIA CONFIGURATION
              </p>
              <h2
                id="media-modal-title"
                className="font-display text-lg font-bold text-[#183153]"
              >
                Replace Logo &amp; Sanctuary Photos
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-[#687780] hover:bg-[#FAF8F2] hover:text-[#183153] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[#687780]">
          Update image URLs below to preview custom organization photographs or logos. You can also
          permanently update URLs in <code className="font-mono text-[#183153]">src/config/siteConfig.ts</code>.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#183153]">
              Organization Logo URL
            </label>
            <input
              type="text"
              value={draft.logoUrl}
              onChange={(e) => setDraft({ ...draft, logoUrl: e.target.value })}
              className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#E7ECEB] bg-[#FAF8F2] px-3.5 py-2 text-xs text-[#263238]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#183153]">
              Hero Sanctuary Image URL
            </label>
            <input
              type="text"
              value={draft.heroSanctuary.url}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  heroSanctuary: { ...draft.heroSanctuary, url: e.target.value },
                })
              }
              className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#E7ECEB] bg-[#FAF8F2] px-3.5 py-2 text-xs text-[#263238]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#183153]">
              &ldquo;Every Mother Deserves Love&rdquo; Image URL
            </label>
            <input
              type="text"
              value={draft.everyMotherLove.url}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  everyMotherLove: { ...draft.everyMotherLove, url: e.target.value },
                })
              }
              className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#E7ECEB] bg-[#FAF8F2] px-3.5 py-2 text-xs text-[#263238]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#183153]">
              Kuttanad Sanctuary Campus Image URL
            </label>
            <input
              type="text"
              value={draft.kuttanadCampus.url}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  kuttanadCampus: { ...draft.kuttanadCampus, url: e.target.value },
                })
              }
              className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#E7ECEB] bg-[#FAF8F2] px-3.5 py-2 text-xs text-[#263238]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#183153]">
              Annadanam / Nutritious Meals Image URL
            </label>
            <input
              type="text"
              value={draft.nutritiousMeals.url}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  nutritiousMeals: { ...draft.nutritiousMeals, url: e.target.value },
                })
              }
              className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#E7ECEB] bg-[#FAF8F2] px-3.5 py-2 text-xs text-[#263238]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E7ECEB] pt-4">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[#E7ECEB] bg-[#FAF8F2] px-4 py-2 text-xs font-semibold text-[#687780] hover:text-[#183153] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset to Defaults</span>
            </button>

            <button
              type="submit"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#183153] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#159A91] cursor-pointer"
            >
              <Check className="h-4 w-4 text-[#D8AD62]" aria-hidden="true" />
              <span>Save Media Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
