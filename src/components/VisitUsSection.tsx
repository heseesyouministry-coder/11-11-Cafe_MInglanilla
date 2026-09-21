import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Car,
} from 'lucide-react';

export const VisitUsSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const exactAddress = '11:11 Cafe, Brgy. Sangi, Minglanilla, Cebu, Philippines';
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
      {/* Editorial Header */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/15 text-[#786017] text-xs font-semibold uppercase tracking-wider mb-3">
          <MapPin size={13} className="text-[#C9A227]" />
          <span>Location & Hours</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#2D1F17] tracking-tight mb-4">
          Visit Us
        </h2>
        <p className="text-[#5C4433] text-base sm:text-lg leading-relaxed">
          Open daily for coffee, study sessions, and quiet moments in Minglanilla.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Embedded Google Map & Direct Directions */}
        <div className="lg:col-span-7 bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#3B2A20]/10 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#3B2A20]/10">
              <div>
                <h3 className="font-heading font-bold text-lg text-[#2D1F17]">
                  11:11 Cafe
                </h3>
                <p className="text-xs text-[#5C4433]">
                  Brgy. Sangi, Minglanilla, Cebu
                </p>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#786017] hover:text-[#2D1F17] flex items-center gap-1 transition-colors"
              >
                <span>View on Google Maps</span>
                <ExternalLink size={12} />
              </a>
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
              <div className="absolute top-3 left-3 bg-[#2D1F17]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-md text-xs font-bold text-[#F5EFE6] flex items-center gap-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-ping" />
                <span>11:11 Cafe • Minglanilla</span>
              </div>
            </div>
          </div>

          {/* Action Strip: Get Directions & Copy */}
          <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#3B2A20]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-xs text-[#5C4433]">
              <span className="font-bold text-[#2D1F17] block">Brgy. Sangi, Minglanilla, Cebu</span>
              <span className="text-[11px] text-[#5C4433]/80">Inside AKD Compound • Across Bridgestone</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 text-[#2D1F17] text-xs font-semibold border border-[#3B2A20]/15 flex items-center gap-1.5 transition-all"
                title="Copy Address"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span className="text-emerald-700 font-medium">Copied</span>
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
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#2D1F17] hover:bg-[#3B2A20] text-[#F5EFE6] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                <Navigation size={13} className="text-[#C9A227]" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Key Visitor Details (Hours & Parking) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Hours Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#2D1F17] text-[#F5EFE6] shadow-xl border border-stone-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-700">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#C9A227]" />
                <h3 className="font-heading font-bold text-lg text-white">Opening Hours</h3>
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
              <p className="text-xs text-stone-400 leading-relaxed pt-1">
                Serving freshly poured coffee and warm drinks throughout the morning, afternoon, and late evening.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-800">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-[#C9A227] hover:bg-[#d8b030] text-[#2D1F17] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Navigation size={14} />
                <span>Get Directions to 11:11 Cafe</span>
              </a>
            </div>
          </div>

          {/* On-site Parking Note */}
          <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-[#3B2A20]/10 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A227]/20 text-[#786017] flex items-center justify-center shrink-0">
              <Car size={18} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#2D1F17] mb-1">
                Parking Available On-Site
              </h4>
              <p className="text-xs text-[#5C4433] leading-relaxed">
                Customer parking is available directly within the compound for both cars and motorcycles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
