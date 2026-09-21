import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedMenu } from './components/FeaturedMenu';
import { StorySection } from './components/StorySection';
import { GallerySection } from './components/GallerySection';
import { VisitUsSection } from './components/VisitUsSection';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll + GSAP ticker synchronization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#5C4433] selection:bg-[#C9A227]/30 selection:text-[#2D1F17] relative">
      {/* Sticky Header with subtle Asia/Manila live clock */}
      <Navbar />

      {/* Main Single-Page Editorial Flow */}
      <main id="top">
        {/* 1. Hero with 3D Centerpiece */}
        <HeroSection />

        {/* 2. Featured Menu ("Made for your moment.") */}
        <FeaturedMenu />

        {/* 3. Story / About ("Where Minglanilla comes to slow down.") */}
        <StorySection />

        {/* 4. Atmosphere / Gallery (Editorial grid with minimal lightbox) */}
        <GallerySection />

        {/* 5. Visit Us ("Come spend a little time with us.") */}
        <VisitUsSection />
      </main>

      {/* 6. Minimal Footer */}
      <Footer />
    </div>
  );
}
