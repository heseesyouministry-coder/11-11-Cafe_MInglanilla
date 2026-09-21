import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Camera, ExternalLink, X, Eye, Heart, Info } from 'lucide-react';
import { DRIVE_REFERENCE_IMAGES, DriveReferenceImage } from '../data/driveImages';
import { SafeImage } from './SafeImage';

export const DriveGallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<DriveReferenceImage | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, number>>({});

  const categories = [
    { id: 'all', label: 'All Customer Snaps (13)' },
    { id: 'vibes', label: 'Atmosphere & Vibe' },
    { id: 'coffee', label: 'Drinks & Coffee POV' },
    { id: 'study', label: 'Study Tables & Space' },
    { id: 'food', label: 'Food & Pastry Snaps' },
    { id: 'details', label: 'Barista & Cup Details' },
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? DRIVE_REFERENCE_IMAGES
      : DRIVE_REFERENCE_IMAGES.filter((img) => img.category === selectedCategory);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="gallery-references" className="py-24 bg-[#F5EFE6] relative overflow-hidden border-t border-[#3B2A20]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-bold uppercase tracking-wider mb-3 border border-[#C9A227]/30 shadow-sm">
            <Camera size={13} />
            <span>Community Snaps & Guest References</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#2D1F17] tracking-tight mb-4">
            Customer POV <span className="font-script text-[#C9A227] font-bold text-4xl sm:text-6xl">Moments</span>
          </h2>

          <p className="text-sm sm:text-base text-[#5C4433] leading-relaxed max-w-2xl mx-auto">
            Candid customer snapshots and real visitor reference photos captured inside 11:11 Cafe Minglanilla. These reflect genuine everyday guest experiences and table vibes.
          </p>

          {/* Transparent Disclaimer Box */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#786017] text-xs font-medium">
            <Info size={14} className="shrink-0 text-[#C9A227]" />
            <span>Visitor photo references for aesthetic vibes — not official staged catalog items.</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-gallery-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#2D1F17] text-[#F5EFE6] shadow-md scale-105'
                  : 'bg-white/80 text-[#5C4433] hover:bg-white border border-[#3B2A20]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image Grid with SafeImage and Direct Google Drive Links */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence>
            {filteredImages.map((img, idx) => {
              const currentLikes = (likedPhotos[img.id] || 0) + (14 + (idx * 5) % 23);
              return (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  onClick={() => setActivePhoto(img)}
                  className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl border border-[#3B2A20]/10 bg-stone-900 transition-all duration-300 flex flex-col justify-between"
                >
                  <SafeImage
                    src={img.directUrl}
                    driveThumbnailSrc={img.thumbnailUrl}
                    fallbackSrc={img.fallbackUrl}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 pointer-events-none"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 opacity-75 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Top Bar: Category Pill + Direct Drive Link */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 capitalize">
                      {img.category}
                    </span>

                    <a
                      href={img.driveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 hover:bg-[#C9A227] hover:text-[#2D1F17] text-white/90 backdrop-blur-md text-[11px] font-semibold transition-colors border border-white/20 shadow-sm"
                      title="View original photo link in Google Drive"
                    >
                      <ExternalLink size={11} />
                      <span>Drive Link</span>
                    </a>
                  </div>

                  {/* Bottom Info Card */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white z-10">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-heading font-bold text-sm text-white group-hover:text-[#C9A227] transition-colors truncate">
                        {img.title}
                      </h4>
                      <button
                        type="button"
                        onClick={(e) => toggleLike(e, img.id)}
                        className="flex items-center gap-1 text-xs text-white/80 hover:text-red-400 shrink-0 transition-colors"
                      >
                        <Heart size={13} className={likedPhotos[img.id] ? 'fill-red-500 text-red-500' : ''} />
                        <span className="text-[11px]">{currentLikes}</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-300 line-clamp-2 leading-snug">
                      {img.caption}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-stone-400">
                      <span className="flex items-center gap-1 text-[#C9A227]">
                        <Sparkles size={11} />
                        <span>Customer Snap #{idx + 1}</span>
                      </span>
                      <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                        <Eye size={11} />
                        <span>View Details</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner with Reference Note & All Links */}
        <div className="mt-12 p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-[#3B2A20]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A227]/20 text-[#786017] flex items-center justify-center shrink-0">
              <Camera size={20} />
            </div>
            <div>
              <h5 className="font-heading font-bold text-sm text-[#2D1F17]">
                13 Customer Reference Photos Linked
              </h5>
              <p className="text-xs text-[#5C4433]">
                Real guest captures from 11:11 Cafe Minglanilla linked directly to Google Drive storage.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#5C4433] hidden md:inline">Have a photo to share?</span>
            <a
              href="#wish-wall"
              className="px-4 py-2 rounded-xl bg-[#2D1F17] hover:bg-[#3B2A20] text-[#F5EFE6] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Leave a Note on Wish Wall</span>
            </a>
          </div>
        </div>
      </div>

      {/* High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-3xl w-full bg-[#2D1F17] text-white rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/20"
            >
              {/* Close button */}
              <button
                id="close-lightbox-btn"
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-[#C9A227] hover:text-[#2D1F17] text-white transition-colors z-20"
                aria-label="Close photo preview"
              >
                <X size={18} />
              </button>

              {/* Main Photo View */}
              <div className="relative max-h-[58vh] w-full bg-black flex items-center justify-center overflow-hidden">
                <SafeImage
                  src={activePhoto.directUrl}
                  driveThumbnailSrc={activePhoto.thumbnailUrl}
                  fallbackSrc={activePhoto.fallbackUrl}
                  alt={activePhoto.title}
                  className="max-h-[58vh] w-full object-contain"
                />
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-1 block">
                      ✦ Guest POV Reference • {activePhoto.category}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      {activePhoto.title}
                    </h3>
                  </div>

                  <a
                    href={activePhoto.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#C9A227] hover:bg-[#B89220] text-[#2D1F17] text-xs font-bold flex items-center gap-2 transition-all shadow-md"
                  >
                    <ExternalLink size={14} />
                    <span>Open Reference in Google Drive</span>
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-stone-300 leading-relaxed">
                  <p className="font-semibold text-stone-200 mb-1">Customer Perspective Note:</p>
                  <p>{activePhoto.caption}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400">
                  <span>11:11 Cafe • Sangi, Minglanilla, Cebu</span>
                  <span className="font-mono text-[11px] text-stone-400">
                    Drive ID: {activePhoto.driveId.slice(0, 12)}...
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
