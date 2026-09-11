import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ChefHat, 
  Bike, 
  PackageCheck, 
  MessageSquare, 
  Phone, 
  Play, 
  Pause, 
  RotateCcw, 
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Order, DeliveryStatus } from '../types';
import { InteractiveMap } from './InteractiveMap';
import { DriverChatModal } from './DriverChatModal';

interface LiveOrderTrackerProps {
  orders: Record<string, Order>;
  activeOrderId: string;
  onSelectOrderId: (orderId: string) => void;
  onAdvanceStage: (orderId: string) => void;
  onResetOrder: (orderId: string) => void;
}

export const LiveOrderTracker: React.FC<LiveOrderTrackerProps> = ({
  orders,
  activeOrderId,
  onSelectOrderId,
  onAdvanceStage,
  onResetOrder
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);
  const [isSimulatingMotion, setIsSimulatingMotion] = useState(true);
  const [simulatedProgress, setSimulatedProgress] = useState(62); // 0 to 100
  const [isChatOpen, setIsChatOpen] = useState(false);

  const orderList = Object.values(orders) as Order[];
  const currentOrder = orders[activeOrderId] || orderList[0];

  // Real-time animated movement effect when status is 'on_the_way'
  useEffect(() => {
    if (!isSimulatingMotion || currentOrder.status !== 'on_the_way') return;

    const interval = setInterval(() => {
      setSimulatedProgress((prev) => {
        if (prev >= 98) {
          return 98; // reached destination
        }
        return prev + 1.2;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isSimulatingMotion, currentOrder.status]);

  // Adjust default progress when order status changes
  useEffect(() => {
    if (currentOrder.status === 'placed') setSimulatedProgress(0);
    else if (currentOrder.status === 'cooking') setSimulatedProgress(5);
    else if (currentOrder.status === 'picked_up') setSimulatedProgress(15);
    else if (currentOrder.status === 'on_the_way') setSimulatedProgress(60);
    else if (currentOrder.status === 'delivered') setSimulatedProgress(100);
  }, [currentOrder.status]);

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFeedback(null);
    const code = searchInput.trim().toUpperCase();
    if (!code) return;

    if (orders[code]) {
      onSelectOrderId(code);
      setSearchFeedback(`Found order ${code}!`);
      setSearchInput('');
    } else {
      // Check by phone
      const match = orderList.find((o) => o.customerPhone.includes(code) || o.customerName.toLowerCase().includes(code.toLowerCase()));
      if (match) {
        onSelectOrderId(match.id);
        setSearchFeedback(`Matched order ${match.id} for ${match.customerName}!`);
        setSearchInput('');
      } else {
        setSearchFeedback(`No order found for '${code}'. Try GF-88492 or GF-92014.`);
      }
    }
  };

  // Status Milestones definition
  const milestones: { status: DeliveryStatus; label: string; icon: React.ReactNode }[] = [
    { status: 'placed', label: 'Placed', icon: <CheckCircle2 className="w-4 h-4" /> },
    { status: 'cooking', label: 'Preparing', icon: <ChefHat className="w-4 h-4" /> },
    { status: 'picked_up', label: 'Courier Picked Up', icon: <Bike className="w-4 h-4" /> },
    { status: 'on_the_way', label: 'On The Way', icon: <Bike className="w-4 h-4" /> },
    { status: 'delivered', label: 'Delivered', icon: <PackageCheck className="w-4 h-4" /> }
  ];

  const getMilestoneIndex = (status: DeliveryStatus) => {
    switch (status) {
      case 'placed': return 0;
      case 'confirmed': return 0;
      case 'cooking': return 1;
      case 'picked_up': return 2;
      case 'on_the_way': return 3;
      case 'arriving': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = getMilestoneIndex(currentOrder.status);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Bar & Demo Order Quick Switcher */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-lg sm:text-xl font-black text-neutral-900">
                Track Customer Order & Live Telemetry
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Enter your GrabFood tracking ID or phone number to inspect real-time courier coordinates.
            </p>
          </div>

          {/* Search form */}
          <form onSubmit={handleSearchOrder} className="flex gap-2 max-w-md w-full">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Enter Order Code (e.g. GF-88492) or Phone"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-emerald-500 focus:outline-hidden font-mono text-neutral-800"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              Track Order
            </button>
          </form>
        </div>

        {searchFeedback && (
          <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{searchFeedback}</span>
          </div>
        )}

        {/* Quick Demo Switcher Tabs */}
        <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-neutral-500 mr-1">Demo Orders:</span>
          {orderList.map((order) => {
            const isSelected = order.id === currentOrder.id;
            return (
              <button
                key={order.id}
                onClick={() => onSelectOrderId(order.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                <span>{order.id}</span>
                <span className="text-[10px] opacity-75 font-normal">
                  ({order.status === 'on_the_way' ? '🛵 In Transit' : order.status === 'cooking' ? '🍳 Prepping' : '✅ Delivered'})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Order Tracking Stage Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Interactive Map & Live Milestone Progress */}
        <div className="lg:col-span-8 space-y-6">
          {/* Milestone Step Indicator */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-neutral-100">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                  Order Reference: {currentOrder.trackingCode}
                </span>
                <h3 className="text-xl font-black text-neutral-900 mt-0.5">
                  {currentOrder.restaurant.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 text-emerald-800">
                <Clock className="w-4 h-4 text-emerald-600 animate-spin" />
                <span className="text-xs font-black">
                  {currentOrder.status === 'delivered' ? 'Completed' : `Estimated Arrival: ~${currentOrder.estimatedArrivalMinutes} mins`}
                </span>
              </div>
            </div>

            {/* Stepper Progression Bar */}
            <div className="pt-6 pb-2">
              <div className="relative flex justify-between">
                {/* Connecting background progress line */}
                <div className="absolute top-4 left-6 right-6 h-1 bg-neutral-200 -z-0">
                  <div
                    className="h-1 bg-emerald-500 transition-all duration-500"
                    style={{
                      width: `${(currentStepIdx / (milestones.length - 1)) * 100}%`
                    }}
                  ></div>
                </div>

                {milestones.map((step, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={step.label} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                          isCurrent
                            ? 'bg-emerald-600 text-white shadow-md ring-4 ring-emerald-100 scale-110'
                            : isDone
                            ? 'bg-emerald-500 text-white'
                            : 'bg-neutral-200 text-neutral-500'
                        }`}
                      >
                        {step.icon}
                      </div>
                      <span
                        className={`text-[11px] mt-2 font-bold text-center max-w-[80px] leading-tight ${
                          isCurrent
                            ? 'text-emerald-700'
                            : isDone
                            ? 'text-neutral-800'
                            : 'text-neutral-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simulation Toolbar for Live Demo */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSimulatingMotion(!isSimulatingMotion)}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {isSimulatingMotion ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isSimulatingMotion ? 'Pause GPS Ping' : 'Resume GPS Ping'}</span>
                </button>

                <button
                  onClick={() => onResetOrder(currentOrder.id)}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer"
                  title="Reset stages"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo</span>
                </button>
              </div>

              <button
                onClick={() => onAdvanceStage(currentOrder.id)}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Advance Next Stage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Live GPS Map */}
          <div className="bg-white rounded-3xl p-3 border border-neutral-200/80 shadow-xs">
            <InteractiveMap
              restaurantCoords={currentOrder.restaurant.coords}
              customerCoords={currentOrder.customerCoords}
              driverCoords={currentOrder.driverCoords}
              restaurantName={currentOrder.restaurant.name}
              customerAddress={currentOrder.deliveryAddress}
              status={currentOrder.status}
              progressPercent={simulatedProgress}
              driverName={currentOrder.driver?.name}
              vehiclePlate={currentOrder.driver?.vehiclePlate}
            />
          </div>

          {/* Real-Time Event Audit Timeline */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
            <h4 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
              Real-Time Status Milestones
            </h4>

            <div className="space-y-4 relative pl-4 border-l-2 border-neutral-200">
              {currentOrder.timeline.map((event, i) => (
                <div key={i} className="relative group">
                  {/* Dot */}
                  <span
                    className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${
                      event.isCurrent
                        ? 'bg-emerald-500 ring-4 ring-emerald-100 animate-pulse'
                        : event.isCompleted
                        ? 'bg-emerald-600'
                        : 'bg-neutral-300'
                    }`}
                  ></span>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5
                        className={`text-xs font-bold ${
                          event.isCurrent ? 'text-emerald-700 font-extrabold' : 'text-neutral-800'
                        }`}
                      >
                        {event.title}
                      </h5>
                      <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400 shrink-0">
                      {event.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Driver Profile & Order Receipt */}
        <div className="lg:col-span-4 space-y-6">
          {/* Driver Card */}
          {currentOrder.driver && (
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Assigned Delivery Partner
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Safe
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <img
                  src={currentOrder.driver.avatar}
                  alt={currentOrder.driver.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xs"
                />
                <div>
                  <h4 className="font-extrabold text-base text-neutral-900">
                    {currentOrder.driver.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                    <span className="text-amber-500 font-bold">★ {currentOrder.driver.rating}</span>
                    <span>·</span>
                    <span>{currentOrder.driver.totalTrips.toLocaleString()} trips</span>
                  </div>
                  <span className="text-[11px] text-neutral-600 font-medium block mt-0.5">
                    {currentOrder.driver.vehicleModel}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-neutral-100 px-1.5 py-0.5 rounded">
                    {currentOrder.driver.vehiclePlate}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Chat & Call */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat Driver</span>
                </button>

                <button
                  onClick={() => setIsChatOpen(true)}
                  className="py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Call Rider</span>
                </button>
              </div>
            </div>
          )}

          {/* Delivery Location Card */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Delivery Destination
            </h4>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-neutral-900 block">
                  {currentOrder.customerName} ({currentOrder.customerPhone})
                </span>
                <p className="text-neutral-600 mt-0.5 font-medium">
                  {currentOrder.deliveryAddress}, {currentOrder.unitNumber}
                </p>
                {currentOrder.deliveryNotes && (
                  <div className="mt-2 p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 text-neutral-600 italic">
                    Note: "{currentOrder.deliveryNotes}"
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Order Items ({currentOrder.items.length})
              </h4>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {currentOrder.paymentMethod}
              </span>
            </div>

            <div className="space-y-3 divide-y divide-neutral-100 text-xs">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="pt-2 first:pt-0 flex justify-between gap-2">
                  <div>
                    <span className="font-bold text-neutral-900">
                      {item.quantity}x {item.dish.name}
                    </span>
                    {item.selectedOptions && (
                      <span className="block text-[10px] text-neutral-500">
                        {Object.values(item.selectedOptions).join(', ')}
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-neutral-800 tabular-nums">
                    ${(item.dish.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold">${currentOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Delivery Fee</span>
                <span className="tabular-nums font-semibold">${currentOrder.deliveryFee.toFixed(2)}</span>
              </div>
              {currentOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount ({currentOrder.promoCode})</span>
                  <span className="tabular-nums">-${currentOrder.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-neutral-900 border-t border-neutral-100 pt-2">
                <span>Total Paid</span>
                <span className="text-base text-emerald-600 tabular-nums">
                  ${currentOrder.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Chat Modal */}
      {currentOrder.driver && (
        <DriverChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          driver={currentOrder.driver}
          customerName={currentOrder.customerName}
        />
      )}
    </div>
  );
};
