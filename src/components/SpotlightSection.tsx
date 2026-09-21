import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Plus, Star } from 'lucide-react';
import { MenuItem, CartItem } from '../types';

interface SpotlightSectionProps {
  spotlightItem: MenuItem;
  onAddToCart: (item: CartItem) => void;
}

export const SpotlightSection: React.FC<SpotlightSectionProps> = ({
  spotlightItem,
  onAddToCart,
}) => {
  const layers = [
    {
      title: 'Top: Velvety Sweet Cold Foam',
      desc: 'Whipped cloud foam infused with fresh fruit essence (ripe mango / tart raspberry).',
      color: '#F4ECD8',
    },
    {
      title: 'Middle: First-Harvest Ceremonial Uji Matcha',
      desc: 'Shade-grown Japanese tencha whisked vigorously for rich jade color and umami depth.',
      color: '#4E7345',
    },
    {
      title: 'Base: Ice & Sweetened Cream / Oat Milk',
      desc: 'Subtle sweet milk poured over crystal clear ice to create the iconic floating gradient.',
      color: '#FAF6EE',
    },
  ];

  return (
    <section id="spotlight" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-br from-[#2D1F17] to-[#1E140F] text-[#F5EFE6] p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl border border-stone-800">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D9A79C]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C9A227]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Visual Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex flex-col items-center justify-center text-center"
          >
            {/* Artistic Layer Graphic Card */}
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#D9A79C]/30 text-[#F5EFE6] text-xs font-bold uppercase tracking-wider border border-[#D9A79C]/40">
                  Most Requested
                </span>
                <div className="flex items-center gap-1 text-[#C9A227] text-xs font-bold">
                  <Star size={14} className="fill-[#C9A227]" />
                  <span>4.9 / 5.0 (142 reviews)</span>
                </div>
              </div>

              {/* Photo + Anatomical Overlay */}
              <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-white/20 shadow-inner group">
                <img
                  src={spotlightItem.image}
                  alt="Iced Matcha Cloud"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-left">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#C9A227] uppercase tracking-wider">
                      ✦ Three-Tier Harmony
                    </span>
                    <p className="text-xs text-white/90 leading-tight">
                      Whipped fruit cloud + Stone-ground Uji matcha + Chilled milk
                    </p>
                  </div>
                </div>
              </div>

              <p className="font-script text-2xl text-[#C9A227] text-center mt-4">
                "It’s like sipping a sweet matcha cloud at sunset."
              </p>
            </div>
          </motion.div>

          {/* Right Detailed Copy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A79C]/20 text-[#D9A79C] text-xs font-bold tracking-wider uppercase border border-[#D9A79C]/30">
              <Sparkles size={13} />
              <span>Signature Spotlight</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              {spotlightItem.name}
            </h2>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#C9A227] font-heading">
                ₱{spotlightItem.price}
              </span>
              <span className="text-stone-300 text-sm">per 16oz serving</span>
            </div>

            <p className="text-stone-300 text-base leading-relaxed">
              {spotlightItem.description} Our most-asked-for pour in Minglanilla — crafted with authentic imported Japanese green tea whisked fresh per order, then topped with our proprietary velvety fruit cloud foam.
            </p>

            {/* Layer Anatomy */}
            <div className="space-y-3 pt-2">
              {layers.map((l) => (
                <div key={l.title} className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div
                    className="w-3.5 h-3.5 rounded-full mt-1 shrink-0 border border-white/30"
                    style={{ backgroundColor: l.color }}
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{l.title}</h4>
                    <p className="text-xs text-stone-300/80 leading-relaxed mt-0.5">{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Order CTA */}
            <div className="pt-2">
              <button
                id="order-spotlight-btn"
                onClick={() =>
                  onAddToCart({
                    item: spotlightItem,
                    quantity: 1,
                    temperature: 'Iced',
                    sweetness: '50%',
                    milkChoice: 'Whole Milk',
                  })
                }
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C9A227] hover:bg-[#B89220] text-[#2D1F17] font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#C9A227]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus size={18} />
                <span>Order Matcha Cloud • ₱{spotlightItem.price}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
