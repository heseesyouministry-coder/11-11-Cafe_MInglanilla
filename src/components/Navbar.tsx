import React, { useState, useEffect } from 'react';
import { Coffee, Clock, ShoppingBag, Calendar, Menu as MenuIcon, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AmbientSoundPlayer } from './AmbientSoundPlayer';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cart, onOpenCart, onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [is1111, setIs1111] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update Minglanilla Time (UTC+8)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Philippines timezone (Asia/Manila)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      setCurrentTime(timeString);

      // Check if 11:11
      const hourMinute = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }).format(now);
      const isGolden = hourMinute === '11:11' || hourMinute === '23:11';
      setIs1111(isGolden);

      // Check opening hours: 7 AM (07:00) to 1 AM (01:00 next day)
      const parts = hourMinute.split(':');
      const hourNum = parseInt(parts[0], 10);
      const open = hourNum >= 7 || hourNum < 1;
      setIsOpenNow(open);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: 'Story', href: '#story' },
    { label: '3D Drink Bar', href: '#drink-bar' },
    { label: 'Menu', href: '#menu' },
    { label: 'Spotlight', href: '#spotlight' },
    { label: 'Wish Wall', href: '#wish-wall' },
    { label: 'Atmosphere', href: '#atmosphere' },
    { label: 'Gallery', href: '#gallery-references' },
    { label: 'Visit Us', href: '#visit-us' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5EFE6]/90 backdrop-blur-md shadow-md shadow-[#3B2A20]/5 border-b border-[#3B2A20]/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo & Minglanilla Clock */}
          <div className="flex items-center gap-4">
            <a href="#" className="group flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#2D1F17] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span className="font-script text-2xl font-bold text-[#C9A227]">11</span>
              </div>
              <div>
                <span className="font-script text-2xl sm:text-3xl font-bold text-[#2D1F17] leading-none block">
                  11:11 Cafe
                </span>
                <span className="text-[10px] font-heading font-semibold tracking-widest text-[#786017] uppercase">
                  Minglanilla, Cebu
                </span>
              </div>
            </a>

            {/* Live Time Indicator with 11:11 Wish trigger */}
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[#3B2A20]/15">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-[#3B2A20]/10 text-[11px] font-medium text-[#2D1F17]">
                <Clock size={12} className={is1111 ? 'text-[#C9A227] animate-spin' : 'text-[#5C4433]'} />
                <span className="font-mono">{currentTime || '7:00 AM'}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isOpenNow ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <span className="text-[10px] text-[#5C4433]/80">{isOpenNow ? 'Open' : 'Opens 7 AM'}</span>
              </div>

              {is1111 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C9A227] text-[#2D1F17] text-[11px] font-bold animate-bounce shadow-sm">
                  <Sparkles size={11} />
                  <span>11:11 Wish Time!</span>
                </span>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-[#5C4433] hover:text-[#2D1F17] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C9A227] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Ambient Sound Player */}
            <AmbientSoundPlayer />

            {/* Book Table Button */}
            <button
              id="nav-book-table-btn"
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/80 hover:bg-white text-[#2D1F17] text-xs font-bold border border-[#3B2A20]/15 shadow-sm transition-all active:scale-95"
            >
              <Calendar size={14} className="text-[#C9A227]" />
              <span>Book Table</span>
            </button>

            {/* Cart Tray Button */}
            <button
              id="nav-cart-tray-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-[#2D1F17] hover:bg-[#3B2A20] text-[#F5EFE6] transition-all shadow-md active:scale-95 flex items-center justify-center"
              aria-label="View Order Tray"
            >
              <ShoppingBag size={17} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#C9A227] text-[#2D1F17] text-[11px] font-extrabold flex items-center justify-center shadow-md">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/70 text-[#2D1F17] border border-[#3B2A20]/10"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-[#F5EFE6]/98 backdrop-blur-xl border-b border-[#3B2A20]/15 p-6 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#3B2A20]/10">
                <span className="text-xs font-semibold text-[#5C4433]">Minglanilla Local Time</span>
                <span className="font-mono text-xs font-bold text-[#2D1F17]">{currentTime}</span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-[#2D1F17] py-2 border-b border-[#3B2A20]/5 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#C9A227]">→</span>
                </a>
              ))}

              <div className="pt-2 flex flex-col gap-2">
                <button
                  id="mobile-book-table-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full py-3 rounded-xl bg-[#2D1F17] text-[#F5EFE6] font-bold text-sm flex items-center justify-center gap-2"
                >
                  <Calendar size={16} className="text-[#C9A227]" />
                  <span>Reserve a Table</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
