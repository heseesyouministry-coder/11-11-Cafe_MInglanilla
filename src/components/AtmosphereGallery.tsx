import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Sparkles } from 'lucide-react';

export const AtmosphereGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'study' | 'bar' | 'lounge'>('all');

  const spaces = [
    {
      id: 'space-1',
      title: 'Dedicated Study & Laptop Nooks',
      category: 'study',
      tag: 'Quiet Zone',
      subtitle: 'Ergonomic seating, warm eye-friendly pendant lamps, and dedicated power sockets for prolonged deep work.',
      stat: '300 Mbps Fiber',
      emoji: '📚',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'space-2',
      title: 'The Artisanal Espresso Bar',
      category: 'bar',
      tag: 'Fresh Brews',
      subtitle: 'Watch our baristas pull calibrated double shots and pour delicate latte art with silky whole milk.',
      stat: '100% Arabica',
      emoji: '☕',
      image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'space-3',
      title: 'Greenery & Botanical Lounge',
      category: 'lounge',
      tag: 'Natural Light',
      subtitle: 'Bask in sunlight surrounded by lush plants. Ideal for casual conversation, reading, and savoring matcha.',
      stat: 'Pet Friendly',
      emoji: '🌿',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'space-4',
      title: 'The 11:11 Late Night Sanctuary',
      category: 'study',
      tag: 'Open till 1 AM',
      subtitle: 'When Minglanilla sleeps, 11:11 stays warm with soothing lo-fi beats and hot comforting beverages.',
      stat: '7 AM – 1 AM',
      emoji: '🌙',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const filteredSpaces = activeTab === 'all' ? spaces : spaces.filter((s) => s.category === activeTab);

  return (
    <section id="atmosphere" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-semibold tracking-wider uppercase mb-3 border border-[#C9A227]/30">
          <Camera size={13} className="text-[#C9A227]" />
          <span>Space & Vibe</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2D1F17] tracking-tight mb-4">
          Atmosphere & Study Sanctuary
        </h2>
        <p className="text-[#5C4433] text-base sm:text-lg">
          Designed intentionally for focus, conversation, and calm moments in Minglanilla.
        </p>

        {/* Filter buttons */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {(['all', 'study', 'bar', 'lounge'] as const).map((tab) => (
            <button
              key={tab}
              id={`atmosphere-tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-[#2D1F17] text-[#F5EFE6] shadow-sm'
                  : 'bg-white/80 text-[#5C4433] hover:bg-white border border-[#3B2A20]/10'
              }`}
            >
              {tab === 'all' ? 'All Spaces' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSpaces.map((space, idx) => (
          <motion.div
            key={space.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-8 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col justify-between group min-h-[340px] border border-white/10"
          >
            {/* Background photo + dark gradient overlays */}
            <img
              src={space.image}
              alt={space.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />

            {/* Top Bar */}
            <div className="flex items-center justify-between gap-2 relative z-10">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#F5EFE6] border border-white/30">
                {space.tag}
              </span>
              <span className="text-2xl drop-shadow-md">{space.emoji}</span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 mt-12">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#C9A227] font-bold mb-2 bg-black/40 px-2.5 py-0.5 rounded-md backdrop-blur-sm">
                <Sparkles size={13} />
                <span>{space.stat}</span>
              </div>

              <h3 className="text-2xl font-heading font-bold text-white mb-2">
                {space.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed max-w-lg">
                {space.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
