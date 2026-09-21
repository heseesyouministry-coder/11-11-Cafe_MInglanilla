import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textColRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        imageColRef.current,
        { opacity: 0, scale: 0.95, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#3B2A20]/10 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Editorial Text Column */}
        <div ref={textColRef} className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-semibold uppercase tracking-wider">
            <span>Our Philosophy</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#2D1F17] tracking-tight leading-[1.15]">
            Where Minglanilla comes to{' '}
            <span className="font-script text-[#C9A227] font-semibold block sm:inline">
              slow down.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#5C4433] leading-relaxed">
            11:11 Cafe was created as a warm neighborhood space for good coffee, quiet study sessions, conversations, and little moments worth remembering.
          </p>

          <p className="text-sm sm:text-base text-[#5C4433]/85 leading-relaxed">
            Named after that fleeting minute when people pause and cast a wish into the universe, 11:11 offers an inviting corner away from the rush. Whether you are typing out the final pages of a paper, meeting an old friend, or simply watching the rain outside, there is always an open seat and a hot cup poured just for you.
          </p>

          {/* Minimalist Editorial Detail */}
          <div className="pt-4 border-t border-[#3B2A20]/15 flex items-center gap-8 text-xs font-mono text-[#5C4433]">
            <div>
              <span className="block font-bold text-[#2D1F17] text-sm">7:00 AM – 1:00 AM</span>
              <span className="opacity-75">Daily Sanctuary</span>
            </div>
            <div className="w-[1px] h-8 bg-[#3B2A20]/20" />
            <div>
              <span className="block font-bold text-[#2D1F17] text-sm">Sangi, Minglanilla</span>
              <span className="opacity-75">Cebu, Philippines</span>
            </div>
          </div>
        </div>

        {/* Photography Composition Column */}
        <div ref={imageColRef} className="lg:col-span-6 relative">
          <div className="relative">
            {/* Primary Large Image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#3B2A20]/10 h-80 sm:h-[420px] bg-stone-200">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85"
                alt="11:11 Cafe interior ambience"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Secondary Floating Supporting Photo */}
            <div className="hidden sm:block absolute -bottom-8 -left-8 w-56 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-[#F5EFE6] bg-stone-300">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=85"
                alt="Barista pouring latte art"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Subtle Brand Accent Stamp */}
            <div className="absolute top-4 right-4 bg-[#2D1F17]/85 backdrop-blur-md text-[#F5EFE6] px-4 py-2 rounded-2xl border border-white/10 text-xs font-heading font-medium shadow-md">
              <span>✦ Sangi Neighborhood Cafe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
