import React, { useState } from 'react';
import { Camera, Maximize2, X } from 'lucide-react';
import { SiteImagesConfig } from '../../config/siteConfig';
import { SmartImage } from '../SmartImage';

interface PhotoGallerySectionProps {
  images: SiteImagesConfig;
}

interface GalleryItem {
  id: string;
  title: string;
  category: 'Rehabilitation & Therapy' | 'Medical & Counselling' | 'Community & Daily Life' | 'Campus & Facilities';
  url: string;
  alt: string;
  caption: string;
}

const CATEGORIES = [
  'All',
  'Rehabilitation & Therapy',
  'Medical & Counselling',
  'Community & Daily Life',
  'Campus & Facilities',
] as const;

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ images }) => {
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'rehab-group-therapy',
      title: 'Psychosocial Rehabilitation & Group Therapy',
      category: 'Rehabilitation & Therapy',
      url: images.psychosocialRehab.url,
      alt: images.psychosocialRehab.alt,
      caption: 'Interactive group therapy and psychosocial rehabilitation sessions in the community hall.',
    },
    {
      id: 'counselling-support',
      title: 'Mental Health Support & Counselling',
      category: 'Medical & Counselling',
      url: images.mentalHealthCounselling.url,
      alt: images.mentalHealthCounselling.alt,
      caption: 'Individual psychological assessment and compassionate one-on-one counselling.',
    },
    {
      id: 'vocational-training',
      title: 'Vocational Training & Life Skills',
      category: 'Rehabilitation & Therapy',
      url: images.vocationalTraining.url,
      alt: images.vocationalTraining.alt,
      caption: 'Occupational therapy and handicraft training including rosary and bead making.',
    },
    {
      id: 'medical-checkup',
      title: 'Clinical & Psychiatric Medical Care',
      category: 'Medical & Counselling',
      url: images.medicalNursing.url,
      alt: images.medicalNursing.alt,
      caption: 'Regular blood pressure monitoring and medical supervision by our nursing team.',
    },
    {
      id: 'vital-signs-nursing',
      title: '24/7 Nursing & Health Monitoring',
      category: 'Medical & Counselling',
      url: images.clinicalCheckup.url,
      alt: images.clinicalCheckup.alt,
      caption: 'Dedicated clinical check-ups ensuring the physical and mental well-being of every resident.',
    },
    {
      id: 'recreational-cultural',
      title: 'Recreational & Cultural Activities',
      category: 'Community & Daily Life',
      url: images.recreationalActivities.url,
      alt: images.recreationalActivities.alt,
      caption: 'Music, clapping, dance, and joyful cultural gatherings that nurture fellowship.',
    },
    {
      id: 'kitchen-sustainability',
      title: 'Organic Farming & Culinary Life Skills',
      category: 'Rehabilitation & Therapy',
      url: images.sustainabilityKitchen.url,
      alt: images.sustainabilityKitchen.alt,
      caption: 'Sisters and residents preparing fresh local vegetables together in the community kitchen.',
    },
    {
      id: 'nutritious-dining',
      title: 'Nutritious Diet & Annadanam Fellowship',
      category: 'Community & Daily Life',
      url: images.nutritiousMeals.url,
      alt: images.nutritiousMeals.alt,
      caption: 'Wholesome, freshly cooked meals served daily with love in our community dining hall.',
    },
    {
      id: 'prayer-spiritual-life',
      title: 'Daily Prayer & Spiritual Renewal',
      category: 'Community & Daily Life',
      url: images.spiritualSupport.url,
      alt: images.spiritualSupport.alt,
      caption: 'Community prayer before meals fostering peace, gratitude, and spiritual strength.',
    },
    {
      id: 'accessible-facilities',
      title: 'Barrier-Free Residential Care & Mobility Support',
      category: 'Campus & Facilities',
      url: images.kuttanadCampus.url,
      alt: images.kuttanadCampus.alt,
      caption: 'Compassionate personal assistance and wheelchair-accessible residential facilities.',
    },
    {
      id: 'centre-inauguration-plaque',
      title: 'Rev. Fr. Francis Vaniapurakal Memorial Home',
      category: 'Campus & Facilities',
      url: images.everyMotherLove.url,
      alt: images.everyMotherLove.alt,
      caption: 'Sisters, Priest, and residents at our psychosocial rehabilitation centre in Kidangara.',
    },
    {
      id: 'snehatheeram-community',
      title: 'Pope John XXIII Rehabilitation Centre Trust Community',
      category: 'Campus & Facilities',
      url: '/assets/aistudio/IMG-20261026-WA0030_6233e329.jpg',
      alt: 'Residents, Sisters, Priest, and staff standing together in front of the Rehabilitation Centre in Kidangara',
      caption: 'Our dedicated care team and residents at Pope John XXIII Rehabilitation Centre Trust, Kidangara.',
    },
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="scroll-mt-16 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#2E7D32]">
              <Camera className="h-4 w-4 text-[#43A047]" aria-hidden="true" />
              <span>LIFE, RECOVERY &amp; COMMUNITY AT KIDANGARA</span>
            </div>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#1B5E20] sm:text-3xl lg:text-4xl">
              Photo Gallery
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#607D66]">
              Glimpses of psychosocial rehabilitation programs, medical and counselling care,
              vocational skill training, community celebrations, and daily life at Pope John XXIII
              Rehabilitation Centre Trust, Kidangara.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#1B5E20] text-white shadow-2xs'
                      : 'border border-[#2E7D32]/25 bg-white text-[#1B5E20] hover:bg-[#E8F5E9]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modern Responsive Image Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePhoto(item);
                }
              }}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2E7D32]/20 bg-white shadow-2xs transition-all hover:border-[#43A047] hover:shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32]"
            >
              <div className="relative overflow-hidden">
                <SmartImage
                  src={item.url}
                  alt={item.alt}
                  aspectRatioClass="aspect-[4/3] transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-lg bg-[#1B5E20]/85 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-xs">
                  {item.category}
                </div>
                <div className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-[#1B5E20] opacity-0 shadow-xs transition-opacity group-hover:opacity-100">
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="font-display text-sm font-bold text-[#1B5E20] sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#607D66]">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B5E20]/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-[#2E7D32]/30 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#E8F5E9] px-5 py-3.5 sm:px-6">
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#2E7D32]">
                  {activePhoto.category.toUpperCase()}
                </span>
                <h3 className="font-display text-base font-bold text-[#1B5E20] sm:text-lg">
                  {activePhoto.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                aria-label="Close photo preview"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5E9] text-[#1B5E20] transition-colors hover:bg-[#2E7D32] hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="bg-[#263238] flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={activePhoto.url}
                alt={activePhoto.alt}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="bg-white px-5 py-4 sm:px-6">
              <p className="text-xs leading-relaxed text-[#263238] sm:text-sm">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
