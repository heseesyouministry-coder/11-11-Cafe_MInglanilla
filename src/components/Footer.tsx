import React from 'react';
import { ArrowUp, ExternalLink, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D1F17] text-[#F5EFE6] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800 items-start">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#C9A227] flex items-center justify-center text-[#2D1F17] font-bold shadow-md">
                <span className="font-script text-2xl font-bold">11</span>
              </div>
              <span className="font-heading text-2xl font-bold text-white tracking-tight">
                11:11 Cafe
              </span>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed max-w-md">
              A cozy sanctuary in Minglanilla, Cebu for coffee, quiet, and everything in between. Handcrafted espresso, matcha clouds, and warm study corners.
            </p>

            <div className="flex items-center gap-3 text-xs text-[#C9A227] font-medium pt-1">
              <span>✦ Sangi, Minglanilla, Cebu</span>
              <span>•</span>
              <span>7:00 AM – 1:00 AM Daily</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <a href="#menu" className="hover:text-[#C9A227] transition-colors">
                  Featured Menu
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#C9A227] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C9A227] transition-colors">
                  Atmosphere & Gallery
                </a>
              </li>
              <li>
                <a href="#visit-us" className="hover:text-[#C9A227] transition-colors">
                  Visit Us in Minglanilla
                </a>
              </li>
            </ul>
          </div>

          {/* Location link & Scroll to top */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between h-full">
            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-2">
                Directions
              </h4>
              <a
                href="https://maps.app.goo.gl/wCtHoDFNsX2t4tDw9"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-[#C9A227] transition-colors"
              >
                <MapPin size={13} className="text-[#C9A227]" />
                <span>Open in Google Maps</span>
                <ExternalLink size={11} className="opacity-70" />
              </a>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-mono">
                It's 11:11. Make it count.
              </span>
              <button
                id="footer-scroll-top-btn"
                onClick={scrollToTop}
                className="p-2.5 rounded-full bg-white/10 hover:bg-[#C9A227] hover:text-[#2D1F17] text-white transition-all shadow-sm"
                title="Scroll back to top"
                aria-label="Scroll back to top"
              >
                <ArrowUp size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p className="text-center sm:text-left">
            Concept design by <span className="text-stone-300 font-medium">Clint Aldwin Maurin</span> — unofficial fan reference for 11:11 Cafe Minglanilla.
          </p>
          <p className="text-center sm:text-right text-stone-500 font-mono text-[11px]">
            © {new Date().getFullYear()} 11:11 Cafe • Minglanilla, Cebu
          </p>
        </div>
      </div>
    </footer>
  );
};
