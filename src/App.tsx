import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { RestaurantCard } from './components/RestaurantCard';
import { RestaurantModal } from './components/RestaurantModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LiveOrderTracker } from './components/LiveOrderTracker';
import { ProjectsSection } from './components/ProjectsSection';
import { CustomerInquiryForm } from './components/CustomerInquiryForm';
import { Footer } from './components/Footer';
import { RESTAURANTS, INITIAL_ORDERS } from './data/mockData';
import { CartItem, Dish, Restaurant, Order, DeliveryStatus } from './types';
import { ArrowRight, Bike, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'track' | 'projects' | 'support'>('explore');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      dish: RESTAURANTS[0].dishes[0],
      quantity: 1,
      selectedOptions: { 'Chicken Portion': 'Juicy Drumstick Cut (+ $1.80)' },
      restaurantId: 'rest-1',
      restaurantName: 'Boon Tong Kee Hainanese Heritage'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [appliedPromo, setAppliedPromo] = useState<string>('GRABFAST');
  
  // Restaurant Detail Modal
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Live Orders
  const [orders, setOrders] = useState<Record<string, Order>>(INITIAL_ORDERS);
  const [activeOrderId, setActiveOrderId] = useState<string>('GF-88492');

  // Filter restaurants by category and search
  const filteredRestaurants = RESTAURANTS.filter((r) => {
    const matchesCat =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'signatures'
        ? r.isGrabSignature
        : r.dishes.some((d) => d.category === selectedCategory);

    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.dishes.some((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  // Cart operations
  const handleAddToCart = (
    dish: Dish,
    quantity: number,
    options: Record<string, string>,
    instructions: string
  ) => {
    if (!selectedRestaurant) return;
    const newItem: CartItem = {
      dish,
      quantity,
      selectedOptions: options,
      specialInstructions: instructions,
      restaurantId: selectedRestaurant.id,
      restaurantName: selectedRestaurant.name
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleApplyPromo = (code: string) => {
    if (code === 'GRABFAST' || code === 'FREEDELIVERY') {
      setAppliedPromo(code);
      return true;
    }
    return false;
  };

  // Order Placement
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => ({
      ...prev,
      [newOrder.id]: newOrder
    }));
    setActiveOrderId(newOrder.id);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveTab('track');
  };

  // Stage advancement simulation
  const handleAdvanceStage = (orderId: string) => {
    setOrders((prev) => {
      const order = prev[orderId];
      if (!order) return prev;

      const stageProgression: DeliveryStatus[] = [
        'placed',
        'cooking',
        'picked_up',
        'on_the_way',
        'delivered'
      ];
      const currentIdx = stageProgression.indexOf(order.status);
      const nextIdx = Math.min(currentIdx + 1, stageProgression.length - 1);
      const nextStatus = stageProgression[nextIdx];

      const updatedTimeline = order.timeline.map((evt) => {
        const evtIdx = stageProgression.indexOf(evt.status);
        return {
          ...evt,
          isCompleted: evtIdx < nextIdx,
          isCurrent: evtIdx === nextIdx
        };
      });

      return {
        ...prev,
        [orderId]: {
          ...order,
          status: nextStatus,
          estimatedArrivalMinutes: nextStatus === 'delivered' ? 0 : Math.max(2, order.estimatedArrivalMinutes - 4),
          timeline: updatedTimeline
        }
      };
    });
  };

  // Reset demo order
  const handleResetOrder = (orderId: string) => {
    if (INITIAL_ORDERS[orderId]) {
      setOrders((prev) => ({
        ...prev,
        [orderId]: { ...INITIAL_ORDERS[orderId] }
      }));
    }
  };

  const orderList = Object.values(orders) as Order[];
  const activeOrder: Order | undefined = orders[activeOrderId] || orderList[0];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onQuickTrack={() => setActiveTab('track')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <div>
            {/* Hero Section */}
            <HeroBanner
              onQuickTrack={() => setActiveTab('track')}
              onExploreClick={() => {
                const el = document.getElementById('restaurants-catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Sticky/Floating Active Order Pill if customer is exploring */}
            {activeOrder && activeOrder.status === 'on_the_way' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div
                  onClick={() => setActiveTab('track')}
                  className="bg-emerald-950 text-white rounded-2xl p-3.5 sm:px-5 flex items-center justify-between shadow-lg border border-emerald-500/40 cursor-pointer hover:bg-emerald-900 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-neutral-950 shrink-0">
                      <Bike className="w-4 h-4 animate-bounce" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-400">
                          Active Order In Transit ({activeOrder.id})
                        </span>
                        <span className="text-[11px] text-neutral-300 hidden sm:inline">
                          · Courier {activeOrder.driver?.name} is {activeOrder.estimatedArrivalMinutes} mins away
                        </span>
                      </div>
                      <span className="text-xs text-white font-semibold">
                        {activeOrder.restaurant.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 shrink-0">
                    <span>Watch Live GPS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            )}

            {/* Catalog Container */}
            <div id="restaurants-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              {/* Category Filter bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-2">
                <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                  Featured Restaurants & Local Legends
                </h2>
                <span className="text-xs font-semibold text-neutral-500">
                  Showing {filteredRestaurants.length} top-rated merchants
                </span>
              </div>

              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              {/* Restaurant Grid */}
              {filteredRestaurants.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-neutral-200">
                  <p className="text-sm font-bold text-neutral-700">No restaurants found matching your filter.</p>
                  <p className="text-xs text-neutral-500 mt-1">Try resetting the category filter or searching for another dish.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRestaurants.map((rest) => (
                    <RestaurantCard
                      key={rest.id}
                      restaurant={rest}
                      onSelect={(r) => setSelectedRestaurant(r)}
                    />
                  ))}
                </div>
              )}

              {/* Featured Banner linking to Logistics Projects */}
              <div className="mt-12 bg-gradient-to-r from-neutral-900 via-neutral-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-neutral-700">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FoodTech Innovations</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">
                    Discover The Logistics Engineering Behind GrabFood
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Explore OmniRoute dispatch algorithms, 60fps WebGL telemetry smoothing, and edge computer vision proof-of-delivery projects built by our engineering team.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Engineering Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Order Tracking Tab */}
        {activeTab === 'track' && (
          <LiveOrderTracker
            orders={orders}
            activeOrderId={activeOrderId}
            onSelectOrderId={setActiveOrderId}
            onAdvanceStage={handleAdvanceStage}
            onResetOrder={handleResetOrder}
          />
        )}

        {/* Professional Projects Showcase Tab */}
        {activeTab === 'projects' && <ProjectsSection />}

        {/* Customer Support & Content Inquiry Tab */}
        {activeTab === 'support' && (
          <CustomerInquiryForm
            onSelectOrderForTracking={(id) => {
              if (orders[id]) {
                setActiveOrderId(id);
              }
              setActiveTab('track');
            }}
          />
        )}
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
      />

      {/* Restaurant Menu Modal */}
      <RestaurantModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Customer Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedPromo={appliedPromo}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Footer */}
      <Footer onNavigateTab={setActiveTab} />
    </div>
  );
}
