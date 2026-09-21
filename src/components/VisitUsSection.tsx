import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  Calendar,
  Bus,
  Car,
  Wifi,
  ExternalLink,
  Copy,
  Check,
  Compass,
  Layers,
} from 'lucide-react';

interface VisitUsSectionProps {
  onOpenReservation: () => void;
}

export const VisitUsSection: React.FC<VisitUsSectionProps> = ({ onOpenReservation }) => {
  const [mapMode, setMapMode] = useState<'live' | 'schematic'>('live');
  const [copied, setCopied] = useState(false);

  const exactAddress = '11:11 Cafe, Brgy. Sangi, Minglanilla, Cebu, 6046, Philippines';
  const googleMapsUrl = 'https://maps.app.goo.gl/wCtHoDFNsX2t4tDw9';
  const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=10.2483176,123.8022913';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(exactAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="visit-us" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-semibold tracking-wider uppercase mb-3 border border-[#C9A227]/30">
          <MapPin size={13} className="text-[#C9A227]" />
          <span>Find Our Table</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2D1F17] tracking-tight mb-4">
          Visit Us in Minglanilla
        </h2>
        <p className="text-[#5C4433] text-base sm:text-lg">
          Located in Brgy. Sangi, Minglanilla, Cebu (across Tri-J Marketing Bridgestone and near Chowking). A warm cafe haven along the South National Highway.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Map & Landmark Guide */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-[#3B2A20]/10 shadow-xl shadow-[#3B2A20]/5 space-y-6"
        >
          {/* Map Header with View Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#3B2A20]/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#C9A227]/20 text-[#786017] flex items-center justify-center">
                <Compass size={16} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-[#2D1F17]">
                  11:11 Cafe Location Pin
                </h3>
                <span className="text-[11px] text-[#5C4433]">10.2483° N, 123.8023° E</span>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F5EFE6] border border-[#3B2A20]/10 text-xs">
              <button
                type="button"
                id="map-mode-live-btn"
                onClick={() => setMapMode('live')}
                className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  mapMode === 'live'
                    ? 'bg-[#2D1F17] text-white shadow-sm'
                    : 'text-[#5C4433] hover:text-[#2D1F17]'
                }`}
              >
                <Layers size={12} />
                <span>Live Google Map</span>
              </button>
              <button
                type="button"
                id="map-mode-schematic-btn"
                onClick={() => setMapMode('schematic')}
                className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  mapMode === 'schematic'
                    ? 'bg-[#2D1F17] text-white shadow-sm'
                    : 'text-[#5C4433] hover:text-[#2D1F17]'
                }`}
              >
                <Compass size={12} />
                <span>Cozy Compass</span>
              </button>
            </div>
          </div>

          {/* Visual Interactive Map Graphic */}
          <div className="h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-[#3B2A20]/15 shadow-inner relative bg-[#EAE2D5]">
            {mapMode === 'live' ? (
              <div className="relative w-full h-full">
                <iframe
                  title="11:11 Cafe Minglanilla Google Map"
                  src="https://maps.google.com/maps?q=10.2483176,123.8022913&hl=en&z=17&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#3B2A20]/10 shadow-md text-xs font-bold text-[#2D1F17] flex items-center gap-1.5 pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227] animate-ping" />
                  <span>11:11 Cafe • Sangi, Minglanilla</span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full p-4 flex flex-col justify-between relative overflow-hidden">
                {/* Map Roads & Stylized Grid */}
                <div className="absolute inset-0 opacity-40">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B2A20" strokeWidth="0.8" opacity="0.3" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {/* Highway Curve */}
                    <path
                      d="M -20 180 Q 200 120, 500 240"
                      fill="none"
                      stroke="#C9A227"
                      strokeWidth="14"
                      opacity="0.6"
                    />
                    <path
                      d="M 220 0 L 220 350"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="8"
                      opacity="0.8"
                    />
                  </svg>
                </div>

                {/* Landmark Badges */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-white/95 shadow-sm border border-[#3B2A20]/10 text-xs font-semibold text-[#2D1F17] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Across Tri-J Marketing Bridgestone</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-white/95 shadow-sm border border-[#3B2A20]/10 text-xs font-semibold text-[#2D1F17] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Near Chowking Minglanilla</span>
                  </div>
                </div>

                {/* Cafe Pin Point Center */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#2D1F17] border-4 border-[#C9A227] flex items-center justify-center text-white shadow-2xl animate-bounce">
                      <span className="font-script text-xl font-bold text-[#C9A227]">11:11</span>
                    </div>
                    <div className="w-4 h-4 bg-[#C9A227]/40 rounded-full blur-sm absolute -bottom-1 left-4" />
                  </div>
                  <div className="mt-2 px-3 py-1 rounded-full bg-[#2D1F17] text-white text-xs font-bold shadow-lg">
                    11:11 Cafe • Sangi Minglanilla
                  </div>
                </div>

                {/* Subtitle */}
                <div className="relative z-10">
                  <span className="text-[11px] font-semibold text-[#5C4433] bg-white/90 px-2.5 py-1 rounded-lg">
                    📍 Located at AKD Carwash Compound
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Row: Open Link in Google Maps, Get Directions, Copy Address */}
          <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#3B2A20]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D1F17]">
                <MapPin size={14} className="text-[#C9A227]" />
                <span>Brgy. Sangi, Minglanilla, Cebu, Philippines</span>
              </div>
              <p className="text-[11px] text-[#5C4433]">
                Official Google Maps Place • Across Tri-J Bridgestone
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="px-3 py-2 rounded-xl bg-white hover:bg-stone-100 text-[#2D1F17] text-xs font-semibold border border-[#3B2A20]/15 flex items-center gap-1.5 transition-all"
                title="Copy Address to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} className="text-[#5C4433]" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                id="google-maps-directions-btn"
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-white hover:bg-stone-100 text-[#2D1F17] text-xs font-semibold border border-[#3B2A20]/15 flex items-center gap-1.5 transition-all"
              >
                <Navigation size={13} className="text-[#C9A227]" />
                <span>Directions</span>
              </a>

              <a
                id="google-maps-link-btn"
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#2D1F17] hover:bg-[#3B2A20] text-[#F5EFE6] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95 whitespace-nowrap"
              >
                <ExternalLink size={13} className="text-[#C9A227]" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Commute & Directions Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#3B2A20]/10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2D1F17] mb-1">
                <Bus size={15} className="text-[#C9A227]" />
                <span>By Jeepney / Southbound Bus</span>
              </div>
              <p className="text-xs text-[#5C4433] leading-relaxed">
                Take any Southbound bus or modern jeepney towards Minglanilla / Naga. Drop off at Sangi across Tri-J Marketing Bridgestone and Chowking.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#3B2A20]/10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2D1F17] mb-1">
                <Car size={15} className="text-[#C9A227]" />
                <span>AKD Carwash & Parking</span>
              </div>
              <p className="text-xs text-[#5C4433] leading-relaxed">
                Spacious parking lot on-site. You can have your car or motorcycle washed at AKD Carwash while relaxing with coffee inside.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Operating Details & Table Booking */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Hours Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#2D1F17] text-[#F5EFE6] shadow-xl border border-stone-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-700">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#C9A227]" />
                <h3 className="font-heading font-bold text-lg text-white">Opening Hours</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                Open Daily
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-stone-300">Monday – Sunday</span>
                <span className="font-bold text-[#C9A227] font-mono">7:00 AM – 1:00 AM</span>
              </div>
              <div className="flex justify-between items-center text-xs text-stone-400">
                <span>Last Call for Espresso</span>
                <span>12:30 AM</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-stone-400 leading-relaxed">
              Quiet study focus hours recommended: 7 AM – 11 AM and 9 PM – 1 AM.
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-[#3B2A20]/10 shadow-md space-y-4">
            <h3 className="font-heading font-bold text-base text-[#2D1F17]">
              Contact & Inquiries
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-[#5C4433]">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#C9A227] shrink-0" />
                <span>+63 (032) 111-1100 / +63 917 111 1100</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#C9A227] shrink-0" />
                <span>hello@1111cafe-minglanilla.ph</span>
              </div>

              <div className="flex items-center gap-3">
                <Wifi size={16} className="text-[#C9A227] shrink-0" />
                <span>High-Speed Guest WiFi: 1111Cafe_Guest (Fast 300 Mbps)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="visit-reserve-table-btn"
                onClick={onOpenReservation}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#C9A227] hover:bg-[#B89220] text-[#2D1F17] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                <Calendar size={16} />
                <span>Reserve a Study Table / Nook</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
