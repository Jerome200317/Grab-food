import React from 'react';
import { MapPin, Clock, ShieldCheck, Flame, ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  onQuickTrack: () => void;
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onQuickTrack, onExploreClick }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-700/50">
      {/* Subtle geometric background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-md backdrop-blur-xs">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Singapore & Southeast Asia Fast Dispatch</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Hot meals delivered fresh, tracked with <span className="text-emerald-400 underline decoration-emerald-500/50 underline-offset-8">real-time GPS precision</span>.
            </h1>

            <p className="text-neutral-200 text-sm sm:text-base max-w-2xl leading-relaxed">
              Experience the GrabFood ecosystem: explore top culinary legends, follow your courier bike live on an interactive map, and explore the logistics routing engineering behind it.
            </p>

            {/* Address Location Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 sm:p-4 max-w-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-semibold block">
                    Delivering To Your Doorstep
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    Orchard Boulevard #14-02 · Central District
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onQuickTrack}
                  className="w-full sm:w-auto px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Track Live Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-neutral-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Avg. 22 mins delivery speed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Tamper-proof safety seals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold">★ 4.9</span>
                <span>Rated by 120k+ foodies</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Tracking Simulation Teaser Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-5 text-neutral-900 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                    Live Dispatch Telemetry
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">Order #GF-88492</span>
              </div>

              <div className="py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-neutral-900">Boon Tong Kee Chicken Rice</h2>
                    <p className="text-xs text-neutral-500">Driver Tan Wei Ming is on the way</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-600 tabular-nums">4</span>
                    <span className="text-xs font-semibold text-neutral-500 block -mt-1">mins away</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full w-4/5 animate-pulse"></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-500 font-medium">
                    <span>Order Placed</span>
                    <span>Cooking</span>
                    <span className="text-emerald-600 font-bold">In Transit</span>
                    <span>Delivered</span>
                  </div>
                </div>

                {/* Mini courier badge */}
                <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                      🛵
                    </div>
                    <div>
                      <span className="text-xs font-bold text-neutral-800 block">Yamaha NMAX 155</span>
                      <span className="text-[11px] text-neutral-500 font-mono">Plate: FBF 4920 S</span>
                    </div>
                  </div>
                  <button
                    onClick={onQuickTrack}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
                  >
                    View Live GPS →
                  </button>
                </div>
              </div>

              <button
                onClick={onExploreClick}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg transition-colors text-center block"
              >
                Order Your Food Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
