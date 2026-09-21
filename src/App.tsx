import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Coffee } from 'lucide-react';

import { MENU_ITEMS } from './data/menuData';
import { CartItem, MenuItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { DrinkShowcase } from './components/DrinkShowcase';
import { MenuSection } from './components/MenuSection';
import { SpotlightSection } from './components/SpotlightSection';
import { WishWall } from './components/WishWall';
import { AtmosphereGallery } from './components/AtmosphereGallery';
import { DriveGallerySection } from './components/DriveGallerySection';
import { VisitUsSection } from './components/VisitUsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll + GSAP ticker
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

  // Loading Screen simulation & asset prep
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 10;
      if (progress >= 100) {
        progress = 100;
        setLoadingProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } else {
        setLoadingProgress(progress);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Cart Management Handlers
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.item.id === newItem.item.id &&
          ci.temperature === newItem.temperature &&
          ci.sweetness === newItem.sweetness &&
          ci.milkChoice === newItem.milkChoice
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handlePreview3D = (item: MenuItem) => {
    const barEl = document.getElementById('drink-bar');
    if (barEl) {
      barEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#5C4433] selection:bg-[#C9A227]/30 selection:text-[#2D1F17] relative">
      {/* 11:11 Loading Screen Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-[#2D1F17] text-[#F5EFE6] flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 max-w-sm flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-[#C9A227] text-[#2D1F17] flex items-center justify-center shadow-2xl mb-2">
                <span className="font-script text-4xl font-bold">11</span>
              </div>
              <h1 className="font-script text-4xl sm:text-5xl font-bold text-white tracking-wide">
                11:11 Cafe
              </h1>
              <p className="text-xs sm:text-sm text-[#D9A79C] font-heading font-medium tracking-widest uppercase">
                Minglanilla, Cebu
              </p>
              <p className="font-script text-2xl text-[#C9A227]">
                Make a wish...
              </p>

              {/* Progress percentage bar */}
              <div className="w-56 h-1.5 bg-stone-800 rounded-full overflow-hidden mt-4">
                <div
                  className="h-full bg-[#C9A227] transition-all duration-150 rounded-full"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <span className="font-heading font-bold text-xs text-stone-400">
                {loadingProgress}%
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Navigation */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Sections Flow */}
      <main>
        <HeroSection
          onExploreMenu={() => scrollToSection('menu')}
          onMakeWish={() => scrollToSection('wish-wall')}
          onBookTable={() => setIsReservationOpen(true)}
        />

        <StorySection />

        <DrinkShowcase items={MENU_ITEMS} onAddToCart={handleAddToCart} />

        <MenuSection
          items={MENU_ITEMS}
          onAddToCart={handleAddToCart}
          onPreview3D={handlePreview3D}
        />

        <SpotlightSection
          spotlightItem={MENU_ITEMS[0]}
          onAddToCart={handleAddToCart}
        />

        <WishWall />

        <AtmosphereGallery />

        <DriveGallerySection />

        <VisitUsSection onOpenReservation={() => setIsReservationOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}
