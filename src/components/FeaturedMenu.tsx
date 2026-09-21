import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
import { FEATURED_ITEMS } from '../data/menuData';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedMenu: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.menu-item-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#3B2A20]/10"
    >
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles size={13} className="text-[#C9A227]" />
          <span>Curated Highlights</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#2D1F17] tracking-tight mb-4">
          Made for your moment.
        </h2>
        <p className="text-[#5C4433] text-base sm:text-lg leading-relaxed">
          Crafted slowly with high-grade beans, fresh whisked ceremonial teas, and daily oven bakes.
        </p>
      </div>

      {/* 4 Clean Presentation Cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        {FEATURED_ITEMS.map((item) => (
          <div
            key={item.id}
            className="menu-item-card group flex flex-col bg-white/70 hover:bg-white rounded-3xl overflow-hidden border border-[#3B2A20]/10 hover:border-[#C9A227]/40 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative h-60 w-full overflow-hidden bg-stone-100">
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {item.tag && (
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#2D1F17]/80 text-[#F5EFE6] text-[11px] font-semibold backdrop-blur-md border border-white/10 shadow-sm">
                  {item.tag}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-heading text-lg font-bold text-[#2D1F17] group-hover:text-[#C9A227] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <span className="font-heading font-bold text-base text-[#2D1F17] shrink-0 font-mono">
                    ₱{item.price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C4433] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Note */}
              <div className="mt-5 pt-3 border-t border-[#3B2A20]/10 flex items-center justify-between text-[11px] text-[#5C4433]/70">
                <span>Handcrafted Fresh</span>
                <span className="text-[#C9A227]">11:11 Specialty</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
