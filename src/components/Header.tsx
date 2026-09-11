import React from 'react';
import { ShoppingBag, Search, Compass, Package, Code2, Headphones, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  activeTab: 'explore' | 'track' | 'projects' | 'support';
  setActiveTab: (tab: 'explore' | 'track' | 'projects' | 'support') => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onQuickTrack: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartItems,
  onOpenCart,
  onQuickTrack,
  searchQuery,
  setSearchQuery
}) => {
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-1.5 text-left group focus:outline-hidden"
          >
            <span className="text-2xl font-black tracking-tight text-neutral-900 group-hover:text-emerald-600 transition-colors">
              Grab<span className="text-emerald-600">Food</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
          </button>
        </div>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-neutral-600">
          <button
            onClick={() => setActiveTab('explore')}
            className={`transition-colors flex items-center gap-1.5 py-1 ${
              activeTab === 'explore'
                ? 'text-emerald-600 border-b-2 border-emerald-600 font-bold'
                : 'hover:text-neutral-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Explore Menu</span>
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className={`transition-colors flex items-center gap-1.5 py-1 ${
              activeTab === 'track'
                ? 'text-emerald-600 border-b-2 border-emerald-600 font-bold'
                : 'hover:text-neutral-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Live Order Tracking</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`transition-colors flex items-center gap-1.5 py-1 ${
              activeTab === 'projects'
                ? 'text-emerald-600 border-b-2 border-emerald-600 font-bold'
                : 'hover:text-neutral-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Logistics Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`transition-colors flex items-center gap-1.5 py-1 ${
              activeTab === 'support'
                ? 'text-emerald-600 border-b-2 border-emerald-600 font-bold'
                : 'hover:text-neutral-900'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>Customer Support</span>
          </button>
        </nav>

        {/* Search Bar in Desktop */}
        <div className="hidden lg:flex items-center flex-1 max-w-xs relative mx-2">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search restaurants or dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-100 hover:bg-neutral-100/80 focus:bg-white rounded-lg border border-transparent focus:border-emerald-500 focus:outline-hidden transition-all text-neutral-800 placeholder-neutral-400"
          />
        </div>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onQuickTrack}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-lg transition-colors whitespace-nowrap"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Track Delivery</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs active:scale-95"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-amber-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs border-2 border-white tabular-nums">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-neutral-100 bg-neutral-50/90 px-2 py-2 text-xs font-semibold text-neutral-600">
        <button
          onClick={() => setActiveTab('explore')}
          className={`px-3 py-1 rounded-md transition-colors ${
            activeTab === 'explore' ? 'bg-white text-emerald-700 shadow-xs font-bold' : ''
          }`}
        >
          Menu
        </button>
        <button
          onClick={() => setActiveTab('track')}
          className={`px-3 py-1 rounded-md transition-colors ${
            activeTab === 'track' ? 'bg-white text-emerald-700 shadow-xs font-bold' : ''
          }`}
        >
          Live Tracking
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-3 py-1 rounded-md transition-colors ${
            activeTab === 'projects' ? 'bg-white text-emerald-700 shadow-xs font-bold' : ''
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`px-3 py-1 rounded-md transition-colors ${
            activeTab === 'support' ? 'bg-white text-emerald-700 shadow-xs font-bold' : ''
          }`}
        >
          Support
        </button>
      </div>
    </header>
  );
};
