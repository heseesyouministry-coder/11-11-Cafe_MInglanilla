import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Compass,
  Bus,
  Car,
} from 'lucide-react';

export const VisitUsSection: React.FC = () => {
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
    <section
      id="visit-us"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#3B2A20]/10"
    >
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-semibold uppercase tracking-wider mb-3">
          <MapPin size={13} className="text-[#C9A227]" />
          <span>Minglanilla Corner</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#2D1F17] tracking-tight mb-4">
          Come spend a little time with us.
        </h2>
        <p className="text-[#5C4433] text-base sm:text-lg leading-relaxed">
          Open daily from early mornings to late nights along the South National Highway.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Embedded Map & Location Pin */}
        <div className="lg:col-span-7 bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#3B2A20]/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-[#3B2A20]/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#C9A227]/20 text-[#786017] flex items-center justify-center">
                <Compass size={16} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-[#2D1F17]">
                  11:11 Cafe Minglanilla
                </h3>
                <span className="text-[11px] text-[#5C4433]">Sangi, Minglanilla, Cebu</span>
              </div>
            </div>

            <span className="text-xs font-mono text-[#786017] bg-[#C9A227]/15 px-2.5 py-1 rounded-full font-medium">
              10.2483° N, 123.8023° E
            </span>
          </div>

          {/* Embedded Google Map */}
          <div className="h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-[#3B2A20]/10 shadow-inner relative bg-stone-200">
            <iframe
              title="11:11 Cafe Minglanilla Google Map"
              src="https://maps.google.com/maps?q=10.2483176,123.8022913&hl=en&z=17&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
            <div className="absolute top-3 left-3 bg-[#2D1F17]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-md text-xs font-bold text-[#F5EFE6] flex items-center gap-1.5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-ping" />
              <span>11:11 Cafe • Sangi, Minglanilla</span>
            </div>
          </div>

          {/* Map Action Strip */}
          <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#3B2A20]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D1F17]">
                <MapPin size={14} className="text-[#C9A227]" />
                <span>Brgy. Sangi, Minglanilla, Cebu</span>
              </div>
              <p className="text-[11px] text-[#5C4433]">
                Across Tri-J Marketing Bridgestone • Inside AKD Carwash Compound
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="px-3 py-2 rounded-xl bg-white hover:bg-stone-100 text-[#2D1F17] text-xs font-semibold border border-[#3B2A20]/15 flex items-center gap-1.5 transition-all"
                title="Copy Address"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} className="text-[#5C4433]" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                id="get-directions-btn"
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#2D1F17] hover:bg-[#3B2A20] text-[#F5EFE6] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                <Navigation size={13} className="text-[#C9A227]" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Directions / Landmark hints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#3B2A20]/10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2D1F17] mb-1">
                <Bus size={15} className="text-[#C9A227]" />
                <span>Southbound Commute</span>
              </div>
              <p className="text-xs text-[#5C4433] leading-relaxed">
                Take any Southbound bus or modern jeepney to Minglanilla / Naga. Stop at Sangi across Tri-J Marketing Bridgestone and Chowking.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#3B2A20]/10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2D1F17] mb-1">
                <Car size={15} className="text-[#C9A227]" />
                <span>Parking On-Site</span>
              </div>
              <p className="text-xs text-[#5C4433] leading-relaxed">
                Ample customer parking within the AKD compound for both cars and motorcycles.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Hours & Visit Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Hours Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#2D1F17] text-[#F5EFE6] shadow-xl border border-stone-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-700">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#C9A227]" />
                <h3 className="font-heading font-bold text-lg text-white">Hours of Sanctuary</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                Open Daily
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-300">Monday – Sunday</span>
                <span className="font-bold text-[#C9A227] font-mono text-base">
                  7:00 AM – 1:00 AM
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-stone-400 pt-1">
                <span>Espresso Bar Last Call</span>
                <span className="font-mono">12:30 AM</span>
              </div>
            </div>

            <p className="pt-2 text-xs text-stone-400 leading-relaxed border-t border-stone-800">
              Quiet focus hours recommended for study and work: 7:00 AM – 11:00 AM and 9:00 PM – 1:00 AM.
            </p>
          </div>

          {/* Quick Info Card */}
          <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-[#3B2A20]/10 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-base text-[#2D1F17]">
              At 11:11 Cafe
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#5C4433]">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                <span>Specialty espresso & seasonal cold clouds</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                <span>Power outlets at study tables</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                <span>High-speed guest WiFi for thesis & remote work</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                <span>Warm atmosphere with mellow lo-fi acoustic playlists</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#3B2A20]/10">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-[#C9A227] hover:bg-[#d8b030] text-[#2D1F17] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <ExternalLink size={14} />
                <span>Open Google Maps Location</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
