import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Star, Coffee, Sparkles, Filter } from 'lucide-react';
import { MenuItem, DrinkCategory, CartItem } from '../types';

interface MenuSectionProps {
  items: MenuItem[];
  onAddToCart: (item: CartItem) => void;
  onPreview3D: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onAddToCart,
  onPreview3D,
}) => {
  const [activeCategory, setActiveCategory] = useState<DrinkCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all' as DrinkCategory, label: 'All Items' },
    { id: 'espresso' as DrinkCategory, label: 'Espresso Based' },
    { id: 'blended-coffee' as DrinkCategory, label: 'Blended Coffee' },
    { id: 'blended-non-coffee' as DrinkCategory, label: 'Blended Non-Coffee' },
    { id: 'savory' as DrinkCategory, label: 'Sandwiches & Savory' },
    { id: 'pastries' as DrinkCategory, label: 'Fresh Pastries' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-semibold tracking-wider uppercase mb-3 border border-[#C9A227]/30">
          <Coffee size={13} className="text-[#C9A227]" />
          <span>Artisanal Offerings</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2D1F17] tracking-tight mb-4">
          The 11:11 Menu Highlights
        </h2>
        <p className="text-[#5C4433] text-base sm:text-lg">
          Crafted with care in Minglanilla. Every drink and bite is made fresh using high-grade ingredients.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#2D1F17] text-[#F5EFE6] shadow-md'
                  : 'bg-white/70 text-[#5C4433] hover:bg-white hover:text-[#2D1F17] border border-[#3B2A20]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C4433]/60" />
          <input
            id="menu-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search latte, matcha, croissant..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/80 border border-[#3B2A20]/15 text-xs sm:text-sm text-[#2D1F17] placeholder:text-[#5C4433]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all"
          />
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="rounded-3xl bg-white/90 backdrop-blur-md border border-[#3B2A20]/10 hover:border-[#C9A227]/60 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Product Reference Image Header */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Top Floating Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  {item.tag ? (
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#2D1F17]/90 text-[#C9A227] backdrop-blur-md border border-[#C9A227]/40 shadow-sm">
                      {item.tag}
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full capitalize">
                      {item.category.replace('-', ' ')}
                    </span>
                  )}

                  <span className="text-sm font-heading font-extrabold text-white bg-[#2D1F17]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
                    ₱{item.price}
                  </span>
                </div>

                {/* Rating & Temperature over image */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                  <div className="flex items-center gap-1">
                    <Star size={13} className="text-[#C9A227] fill-[#C9A227]" />
                    <span className="font-bold">{item.rating}</span>
                    <span className="text-white/70 text-[11px]">({item.reviewsCount})</span>
                  </div>
                  {item.calories && (
                    <span className="text-[11px] text-white/80 bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {item.calories}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#2D1F17] group-hover:text-[#C9A227] transition-colors mb-1.5">
                    {item.name}
                  </h3>

                  <p className="text-xs text-[#5C4433] leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {/* Tasting Notes */}
                  {item.tastingNotes && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tastingNotes.map((note) => (
                        <span
                          key={note}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F5EFE6] text-[#5C4433] border border-[#3B2A20]/5"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-[#3B2A20]/10 flex items-center justify-between gap-2">
                  {item.category !== 'savory' && item.category !== 'pastries' ? (
                    <button
                      id={`preview-3d-${item.id}`}
                      type="button"
                      onClick={() => onPreview3D(item)}
                      className="text-xs font-semibold text-[#786017] hover:text-[#2D1F17] flex items-center gap-1 transition-colors py-1"
                    >
                      <Sparkles size={13} className="text-[#C9A227]" />
                      <span>3D Preview</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-[#5C4433]/70 font-medium">Fresh Baked</span>
                  )}

                  <button
                    id={`add-menu-item-${item.id}`}
                    onClick={() =>
                      onAddToCart({
                        item,
                        quantity: 1,
                        temperature: item.temperature ? item.temperature[0] : 'Hot',
                        sweetness: '50%',
                        milkChoice: 'Whole Milk',
                      })
                    }
                    className="px-4 py-2 rounded-xl bg-[#2D1F17] hover:bg-[#3B2A20] text-[#F5EFE6] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                  >
                    <Plus size={14} className="text-[#C9A227]" />
                    <span>Add to Tray</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white/50 rounded-3xl border border-[#3B2A20]/10">
          <p className="text-[#5C4433] font-medium text-sm">No items found matching "{searchQuery}".</p>
        </div>
      )}
    </section>
  );
};
