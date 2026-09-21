import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Maximize2, Sparkles, ExternalLink, Heart, Eye } from 'lucide-react';
import { DRIVE_REFERENCE_IMAGES, DriveReferenceImage } from '../data/driveImages';
import { SafeImage } from './SafeImage';

gsap.registerPlugin(ScrollTrigger);

export const GallerySection: React.FC = () => {
  const [activeModalImage, setActiveModalImage] = useState<DriveReferenceImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hearts, setHearts] = useState<Record<string, { count: number; liked: boolean }>>(() => {
    const init: Record<string, { count: number; liked: boolean }> = {};
    DRIVE_REFERENCE_IMAGES.forEach((img) => {
      init[img.id] = { count: img.initialHearts, liked: false };
    });
    return init;
  });

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Toggle Heart
  const toggleHeart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setHearts((prev) => {
      const current = prev[id] || { count: 0, liked: false };
      return {
        ...prev,
        [id]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked,
        },
      };
    });
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // GSAP animation for gallery cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.drive-photo-tile');
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const categories = [
    { id: 'all', label: 'All Snapshots' },
    { id: 'vibes', label: 'Space & Ambience' },
    { id: 'coffee', label: 'Coffee & Drinks' },
    { id: 'study', label: 'Study Table' },
    { id: 'food', label: 'Bakes & Plates' },
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? DRIVE_REFERENCE_IMAGES
      : DRIVE_REFERENCE_IMAGES.filter((img) => img.category === selectedCategory);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#3B2A20]/10"
    >
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#C9A227]/30">
          <Sparkles size={13} className="text-[#C9A227]" />
          <span>Customer Snapshots</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#2D1F17] tracking-tight mb-4">
          Atmosphere through your lens.
        </h2>
        <p className="text-[#5C4433] text-base sm:text-lg leading-relaxed">
          Unfiltered customer photos captured at 11:11 Cafe in Sangi, Minglanilla.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#2D1F17] text-[#FAF7F2] shadow-sm font-semibold'
                  : 'bg-white/80 text-[#5C4433] hover:bg-white border border-[#3B2A20]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Responsive Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        {filteredImages.map((img, idx) => {
          const isLarge = idx === 0 || idx === 7;
          const heartState = hearts[img.id] || { count: img.initialHearts, liked: false };

          return (
            <div
              key={img.id}
              onClick={() => setActiveModalImage(img)}
              className={`drive-photo-tile group relative rounded-3xl overflow-hidden cursor-pointer bg-stone-100 border border-[#3B2A20]/10 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                isLarge ? 'sm:col-span-2 md:col-span-2 h-80 sm:h-96' : 'h-72 sm:h-80'
              }`}
            >
              {/* Image with resilient multi-fallback for Google Drive images */}
              <SafeImage
                src={img.directUrl}
                driveThumbnailSrc={img.thumbnailUrl}
                fallbackSrc={img.fallbackUrl}
                alt={img.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Sophisticated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1F17]/90 via-[#2D1F17]/35 to-black/10 opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Bar: Snapshot Number + Category Label */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FAF7F2] text-[11px] font-mono font-semibold border border-white/15">
                  #{img.snapshotNumber}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#FAF7F2] text-[11px] font-semibold border border-white/20 uppercase tracking-wider">
                  {img.category}
                </span>
              </div>

              {/* Top Right: Heart Count Button */}
              <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                <button
                  onClick={(e) => toggleHeart(e, img.id)}
                  className={`px-2.5 py-1 rounded-full backdrop-blur-md text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                    heartState.liked
                      ? 'bg-rose-500 text-white'
                      : 'bg-black/40 text-white/90 hover:bg-black/60'
                  }`}
                  aria-label="Heart photo"
                >
                  <Heart
                    size={12}
                    className={heartState.liked ? 'fill-white text-white' : 'text-white/80'}
                  />
                  <span>{heartState.count}</span>
                </button>

                <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={12} />
                </div>
              </div>

              {/* Bottom Caption and Customer Note */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-[#FAF7F2]">
                <h3 className="font-heading font-bold text-base sm:text-lg text-white mb-1 group-hover:text-[#F4ECE1] transition-colors leading-snug">
                  {img.title}
                </h3>
                <p className="text-xs text-[#FAF7F2]/85 line-clamp-2 leading-relaxed">
                  {img.caption}
                </p>

                {/* Footer with Customer Note + View Details prompt */}
                <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-[#C9A227]">
                  <span className="truncate max-w-[210px] text-white/80 italic">
                    "{img.customerNote}"
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#C9A227] font-medium shrink-0 group-hover:underline">
                    <Eye size={11} />
                    <span>View Details</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal with Full Details & Drive Link */}
      {activeModalImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#2D1F17] rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-[#FAF7F2]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors shadow-md"
              aria-label="Close image preview"
            >
              <X size={20} />
            </button>

            {/* High-res Photo */}
            <div className="max-h-[68vh] overflow-hidden bg-black flex items-center justify-center">
              <SafeImage
                src={activeModalImage.directUrl}
                driveThumbnailSrc={activeModalImage.thumbnailUrl}
                fallbackSrc={activeModalImage.fallbackUrl}
                alt={activeModalImage.title}
                className="w-full h-auto max-h-[68vh] object-contain"
              />
            </div>

            {/* Caption & Metadata Footer */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-[#2D1F17]">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C9A227]/20 text-[#C9A227] text-[11px] font-mono font-semibold">
                    Snapshot #{activeModalImage.snapshotNumber}
                  </span>
                  <span className="text-xs text-[#C9A227] font-semibold uppercase tracking-wider">
                    {activeModalImage.category.toUpperCase()} • 11:11 Cafe Minglanilla
                  </span>
                </div>

                <h4 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                  {activeModalImage.title}
                </h4>
                <p className="text-sm text-[#FAF7F2]/90 max-w-xl leading-relaxed mb-1.5">
                  {activeModalImage.caption}
                </p>
                <p className="text-xs text-[#C9A227]/90 italic">
                  "{activeModalImage.customerNote}"
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={(e) => toggleHeart(e, activeModalImage.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors border ${
                    hearts[activeModalImage.id]?.liked
                      ? 'bg-rose-500 border-rose-500 text-white'
                      : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                  }`}
                >
                  <Heart
                    size={14}
                    className={hearts[activeModalImage.id]?.liked ? 'fill-white' : ''}
                  />
                  <span>{hearts[activeModalImage.id]?.count || 0} Likes</span>
                </button>

                <a
                  href={activeModalImage.driveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
                >
                  <ExternalLink size={13} />
                  <span>Drive Link</span>
                </a>

                <button
                  onClick={() => setActiveModalImage(null)}
                  className="px-5 py-2.5 rounded-full bg-[#C9A227] text-[#2D1F17] text-xs font-bold hover:bg-[#d8b030] transition-colors shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
