import React from 'react';
import { Sparkles, Heart, Instagram, Facebook, MapPin, Clock, Coffee, ArrowUp, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D1F17] text-[#F5EFE6] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#C9A227] flex items-center justify-center text-[#2D1F17] font-bold shadow-md">
                <span className="font-script text-2xl font-bold">11</span>
              </div>
              <span className="font-script text-3xl font-bold text-white">11:11 Cafe</span>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
              A cozy sanctuary in Minglanilla, Cebu for coffee, quiet, and everything in between. Handcrafted espresso, matcha clouds, and warm study corners.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-[#C9A227] font-medium">
              <span>✦ Minglanilla, Cebu</span>
              <span>•</span>
              <span>7 AM – 1 AM Daily</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <a href="#hero" className="hover:text-[#C9A227] transition-colors">
                  Top Sanctuary
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#C9A227] transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#drink-bar" className="hover:text-[#C9A227] transition-colors">
                  Interactive 3D Drink Bar
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#C9A227] transition-colors">
                  Artisan Menu Highlights
                </a>
              </li>
              <li>
                <a href="#wish-wall" className="hover:text-[#C9A227] transition-colors">
                  11:11 Wish Wall
                </a>
              </li>
              <li>
                <a href="#visit-us" className="hover:text-[#C9A227] transition-colors">
                  Location & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Social & 11:11 Mantra */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-white">
              The 11:11 Mantra
            </h4>
            <p className="text-stone-300 text-xs leading-relaxed italic font-body">
              "Pause at eleven-eleven. Take a breath, savor the roast, and remember that good things unfold in good time."
            </p>

            <div className="pt-2 flex items-center justify-between">
              <a
                href="https://maps.app.goo.gl/wCtHoDFNsX2t4tDw9"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-stone-400 hover:text-[#C9A227] transition-colors flex items-center gap-1.5"
                title="Open 11:11 Cafe on Google Maps"
              >
                <MapPin size={13} className="text-[#C9A227]" />
                <span>Brgy. Sangi, Minglanilla, Cebu</span>
                <ExternalLink size={11} className="opacity-70" />
              </a>
              <button
                id="footer-scroll-top-btn"
                onClick={scrollToTop}
                className="p-2 rounded-xl bg-white/10 hover:bg-[#C9A227] hover:text-[#2D1F17] text-white transition-all"
                title="Scroll to Top"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Attribution & Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p className="text-center sm:text-left">
            Concept design by <strong className="text-stone-300">Clint Aldwin Maurin</strong> — not an official 11:11 Cafe website.
          </p>
          <p className="text-center sm:text-right flex items-center gap-1.5 justify-center">
            <span>Brewed with</span>
            <Heart size={13} className="text-[#D9A79C] fill-[#D9A79C]" />
            <span>React • Three.js • GSAP • Lenis • Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
