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
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1B5E20]/70 p-0 backdrop-blur-xs sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-[#2E7D32]/25 bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E8F5E9] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1B5E20] text-white">
              <Image className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider text-[#2E7D32]">
                CONTENT &amp; MEDIA CONFIGURATION
              </p>
              <h2
                id="media-modal-title"
                className="font-display text-lg font-bold text-[#1B5E20]"
              >
                Replace Logo &amp; Sanctuary Photos
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-[#2E7D32] hover:bg-[#E8F5E9] hover:text-[#1B5E20] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[#1B5E20]/80">
          Update image URLs below to preview custom organization photographs or logos. You can also
          permanently update URLs in <code className="font-mono text-[#1B5E20]">src/config/siteConfig.ts</code>.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1B5E20]">
              Organization Logo URL
            </label>
            <input
              type="text"
              value={draft.logoUrl}
              onChange={(e) => setDraft({ ...draft, logoUrl: e.target.value })}
              className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/60 px-3.5 py-2 text-xs text-[#1B5E20]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B5E20]">
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
              className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/60 px-3.5 py-2 text-xs text-[#1B5E20]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B5E20]">
              &ldquo;Every Mother Deserves Love&rdquo; (About Us) Image URL
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
              className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/60 px-3.5 py-2 text-xs text-[#1B5E20]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B5E20]">
              Care Home / Kuttanad Campus Image URL
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
              className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/60 px-3.5 py-2 text-xs text-[#1B5E20]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B5E20]">
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
              className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9]/60 px-3.5 py-2 text-xs text-[#1B5E20]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E8F5E9] pt-4">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[#2E7D32]/25 bg-[#E8F5E9] px-4 py-2 text-xs font-semibold text-[#1B5E20] hover:bg-[#2E7D32] hover:text-white cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset to Defaults</span>
            </button>

            <button
              type="submit"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#2E7D32] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1B5E20] cursor-pointer"
            >
              <Check className="h-4 w-4 text-[#E8F5E9]" aria-hidden="true" />
              <span>Save Media Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
