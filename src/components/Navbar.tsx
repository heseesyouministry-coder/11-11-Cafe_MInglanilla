import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [manilaTimeStr, setManilaTimeStr] = useState<string>('');
  const [isOpenNow, setIsOpenNow] = useState<boolean>(true);
  const [is1111, setIs1111] = useState<boolean>(false);

  // Live Asia/Manila Clock & Status
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Formatter for 12-hour display: e.g. "03:17 PM"
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      // 24-hour extraction
      const partsFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      });

      const parts = partsFormatter.formatToParts(now);
      const h24 = parseInt(parts.find((p) => p.type === 'hour')?.value || '12', 10);
      const min = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);

      // Open: 7:00 AM – 1:00 AM
      const open = h24 >= 7 || h24 === 0;
      setIsOpenNow(open);

      // Check if current 12-hr time is exactly 11:11 (AM or PM)
      const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
      const wishTime = h12 === 11 && min === 11;
      setIs1111(wishTime);

      setManilaTimeStr(timeFormatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener for subtle header elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Story', href: '#story' },
    { label: 'Customer Snapshots', href: '#gallery' },
    { label: 'Visit Us', href: '#visit-us' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5EFE6]/90 backdrop-blur-md border-b border-[#3B2A20]/10 py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="group flex flex-col items-start leading-tight select-none"
        >
          <span className="font-heading font-bold text-lg sm:text-xl text-[#2D1F17] tracking-tight group-hover:text-[#C9A227] transition-colors">
            11:11 Cafe
          </span>
          <span className="text-[11px] font-medium tracking-wide text-[#5C4433]/80">
            Minglanilla, Cebu
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#5C4433]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="hover:text-[#2D1F17] transition-colors tracking-wide relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C9A227] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Live Manila Clock Detail + Visit Us CTA */}
        <div className="hidden sm:flex items-center gap-5">
          {/* Subtle Live Manila Clock */}
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
              is1111
                ? 'bg-[#C9A227]/20 text-[#2D1F17] font-bold border border-[#C9A227]/50 shadow-sm'
                : 'bg-black/5 text-[#5C4433] border border-[#3B2A20]/10'
            }`}
            title="Asia/Manila Local Time (Open Daily 7:00 AM – 1:00 AM)"
          >
            {is1111 ? (
              <span className="flex items-center gap-1.5 text-[#2D1F17]">
                <Sparkles size={13} className="text-[#C9A227]" />
                <span>11:11 · Make a wish ✦</span>
              </span>
            ) : (
              <>
                <span>{manilaTimeStr || '07:00 AM'}</span>
                <span className="text-[#3B2A20]/30">•</span>
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isOpenNow ? 'bg-emerald-600' : 'bg-stone-400'
                    }`}
                  />
                  <span className="font-sans text-[11px] font-medium text-[#2D1F17]">
                    {isOpenNow ? 'Open' : 'Closed'}
                  </span>
                </span>
              </>
            )}
          </div>

          {/* Visit Us CTA Button */}
          <button
            onClick={() => handleLinkClick('#visit-us')}
            className="px-5 py-2 rounded-full bg-[#2D1F17] text-[#F5EFE6] text-xs font-bold tracking-wide hover:bg-[#3B2A20] active:scale-95 transition-all shadow-sm"
          >
            Visit Us
          </button>
        </div>

        {/* Mobile: Clock badge + Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 text-[11px] font-mono text-[#5C4433]">
            {is1111 ? (
              <span className="text-[#C9A227] font-semibold">11:11 ✦</span>
            ) : (
              <>
                <span>{manilaTimeStr}</span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isOpenNow ? 'bg-emerald-600' : 'bg-stone-400'
                  }`}
                />
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#2D1F17] hover:bg-black/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#F5EFE6] border-b border-[#3B2A20]/10 px-6 py-5 shadow-lg space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-left font-heading text-base font-bold text-[#2D1F17] hover:text-[#C9A227] transition-colors py-1"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#3B2A20]/10 flex items-center justify-between">
            <span className="text-xs text-[#5C4433]">
              Daily 7:00 AM – 1:00 AM
            </span>
            <button
              onClick={() => handleLinkClick('#visit-us')}
              className="px-4 py-2 rounded-full bg-[#2D1F17] text-[#F5EFE6] text-xs font-bold"
            >
              Visit Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
