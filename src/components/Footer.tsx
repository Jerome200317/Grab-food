import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'explore' | 'track' | 'projects' | 'support') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-800 text-xs">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white">
                Grab<span className="text-emerald-500">Food</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Southeast Asia's leading on-demand food delivery platform, engineered with real-time GPS telemetry, sub-second routing algorithms, and tamper-proof safety standards.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Food Safety Certified</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigateTab('explore')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Featured Restaurants & Menus
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('track')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Live Order Telemetry & GPS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('projects')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Logistics & Routing Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('support')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Customer Support & Tickets
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Delivery Zones */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Central Coverage Zones
            </h4>
            <div className="text-neutral-400 space-y-1">
              <p>• Orchard Boulevard & Paterson Hill</p>
              <p>• River Valley & Clarke Quay</p>
              <p>• Marina Bay Financial District</p>
              <p>• Tanjong Pagar & Chinatown</p>
              <p>• Changi Airport Transit Clusters</p>
            </div>
          </div>

          {/* Col 4: Engineering Specs */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Core Engineering Stack
            </h4>
            <p className="text-neutral-400 leading-relaxed">
              Built with React 19, TypeScript, Tailwind CSS, WebGL Vector maps, and custom asynchronous Kalman smoothing for zero-jitter telemetry tracking.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 pt-1">
              Vite + TSX · 60fps Map Canvas
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© 2026 GrabFood Delivery Ecosystem. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Notice</span>
            <span>·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Courier Safety Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
