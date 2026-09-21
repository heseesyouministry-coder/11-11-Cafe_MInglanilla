import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Compass } from 'lucide-react';
import { ThreeHero } from './ThreeHero';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const threeWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.0 } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, delay: 0.1 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          threeWrapperRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
          '-=0.9'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center overflow-hidden"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Editorial Typography & CTAs */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start z-10">
          {/* Subtle location kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-semibold tracking-wider uppercase mb-6 border border-[#C9A227]/30">
            <span>Minglanilla, Cebu</span>
            <span className="opacity-40">•</span>
            <span>Open 7 AM – 1 AM</span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-heading text-4xl sm:text-6xl xl:text-7xl font-bold text-[#2D1F17] leading-[1.08] tracking-tight mb-6"
          >
            It’s 11:11.{' '}
            <span className="font-script text-[#C9A227] font-semibold block sm:inline">
              Make it count.
            </span>
          </h1>

          {/* Supporting Text */}
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg lg:text-xl text-[#5C4433] leading-relaxed max-w-xl mb-10 font-normal"
          >
            A warm cafe in Minglanilla for good coffee, quiet moments, and every wish in between.
          </p>

          {/* Buttons */}
          <div
            ref={actionsRef}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-explore-menu-btn"
              onClick={() => scrollTo('#menu')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#2D1F17] text-[#F5EFE6] text-sm font-bold hover:bg-[#3B2A20] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 group"
            >
              <span>Explore Menu</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>

            <button
              id="hero-visit-us-btn"
              onClick={() => scrollTo('#visit-us')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/70 hover:bg-white text-[#2D1F17] text-sm font-bold border border-[#3B2A20]/15 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Compass size={16} className="text-[#C9A227]" />
              <span>Visit Us</span>
            </button>
          </div>
        </div>

        {/* Right Column: Three.js Signature Visual Centerpiece */}
        <div
          ref={threeWrapperRef}
          className="lg:col-span-6 xl:col-span-5 flex items-center justify-center relative"
        >
          {/* Ambient Warm Radial Glow */}
          <div className="absolute inset-0 bg-radial from-[#C9A227]/20 via-transparent to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* 3D Canvas */}
          <ThreeHero />
        </div>
      </div>
    </section>
  );
};
