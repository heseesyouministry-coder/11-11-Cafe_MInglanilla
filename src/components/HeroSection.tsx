import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles, Coffee, Clock, MapPin, Wifi } from 'lucide-react';
import { ThreeCanvas } from './ThreeCanvas';
import { Drink3DConfig } from '../types';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onMakeWish: () => void;
  onBookTable: () => void;
}

const defaultHeroCupConfig: Drink3DConfig = {
  cupType: 'paper',
  cupColor: '#F5EFE6',
  sleeveColor: '#C9A227',
  liquidColor: '#6B4423',
  foamColor: '#F4ECD8',
  hasLatteArt: true,
  latteArtType: 'heart',
  hasIce: false,
  hasSteam: true,
  toppingType: 'cacao-dust',
  toppingColor: '#3E2723',
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onMakeWish,
  onBookTable,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-radial from-[#F1E7D3]/60 via-[#F5EFE6] to-[#F5EFE6]"
    >
      {/* Subtle background ambient circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D9A79C]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 z-10 space-y-6 text-center lg:text-left"
          >
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#3B2A20]/10 text-xs font-semibold text-[#786017] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse" />
              <span>Minglanilla, Cebu • Open 7:00 AM – 1:00 AM</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-[#2D1F17] tracking-tight leading-[1.12]">
              It’s <span className="font-script text-5xl sm:text-6xl md:text-7xl font-bold text-[#C9A227] inline-block px-1">11:11</span>.
              <br />
              Make it count.
            </h1>

            {/* Subtext with handwritten emphasis */}
            <p className="text-lg sm:text-xl text-[#5C4433] leading-relaxed max-w-xl mx-auto lg:mx-0 font-body">
              A warm sanctuary in Minglanilla for slow mornings, quiet study sessions, handcrafted espresso, and every wish in between.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-2xl bg-[#2D1F17] hover:bg-[#3B2A20] text-[#F5EFE6] font-bold text-sm flex items-center gap-2 shadow-xl shadow-[#2D1F17]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Coffee size={16} className="text-[#C9A227]" />
                <span>Explore Menu</span>
              </button>

              <button
                id="hero-make-wish-btn"
                onClick={onMakeWish}
                className="px-6 py-3.5 rounded-2xl bg-[#C9A227] hover:bg-[#B89220] text-[#2D1F17] font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#C9A227]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles size={16} />
                <span>Make a 11:11 Wish</span>
              </button>

              <button
                id="hero-book-table-btn"
                onClick={onBookTable}
                className="px-5 py-3.5 rounded-2xl bg-white/80 hover:bg-white text-[#2D1F17] font-semibold text-sm border border-[#3B2A20]/15 shadow-sm transition-all"
              >
                <span>Book Table</span>
              </button>
            </div>

            {/* Trust Indicators / Badges */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-[#3B2A20]/10 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col">
                <span className="text-xl font-heading font-extrabold text-[#2D1F17]">100%</span>
                <span className="text-xs text-[#5C4433]/80">Specialty Arabica</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-extrabold text-[#2D1F17]">300 Mbps</span>
                <span className="text-xs text-[#5C4433]/80">Fiber + Outlets</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-extrabold text-[#2D1F17]">1:00 AM</span>
                <span className="text-xs text-[#5C4433]/80">Late Night Hours</span>
              </div>
            </div>
          </motion.div>

          {/* Right 3D Coffee Cup Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-6 relative h-[420px] sm:h-[500px] w-full flex items-center justify-center"
          >
            {/* 3D WebGL Canvas */}
            <div className="w-full h-full relative">
              <ThreeCanvas activeConfig={defaultHeroCupConfig} drinkName="Spanish Latte (Hot)" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div className="w-full flex justify-center pt-8">
        <a
          href="#story"
          className="flex flex-col items-center gap-1.5 text-xs text-[#5C4433]/70 hover:text-[#2D1F17] transition-colors group"
        >
          <span className="font-semibold uppercase tracking-widest text-[10px]">Scroll to explore</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform text-[#C9A227]" />
        </a>
      </div>
    </section>
  );
};
