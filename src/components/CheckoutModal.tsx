import React, { useState } from 'react';
import { X, ShieldCheck, MapPin, Phone, User, CreditCard, Wallet, Banknote, ArrowRight } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedPromo: string;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedPromo,
  onOrderPlaced
}) => {
  const [name, setName] = useState('Marcus Lim');
  const [phone, setPhone] = useState('+65 9123 4567');
  const [address, setAddress] = useState('28 Orchard Boulevard');
  const [unit, setUnit] = useState('#14-02, Tower 2');
  const [deliveryNotes, setDeliveryNotes] = useState('Contactless dropoff outside door on shoe rack. Please ring bell.');
  const [paymentMethod, setPaymentMethod] = useState<'GrabPay' | 'Credit Card' | 'Cash on Delivery'>('GrabPay');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || items.length === 0) return null;

  const subtotal = items.reduce((sum, item) => {
    let itemPrice = item.dish.price;
    if (item.selectedOptions && item.dish.options) {
      item.dish.options.forEach((opt) => {
        const choice = item.selectedOptions?.[opt.name];
        const match = opt.choices.find((c) => c.label === choice);
        if (match) itemPrice += match.priceDelta;
      });
    }
    return sum + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = 2.5;
  const discount = appliedPromo === 'GRABFAST' ? 5.0 : appliedPromo === 'FREEDELIVERY' ? deliveryFee : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate swift network dispatch
    setTimeout(() => {
      const orderNumber = Math.floor(10000 + Math.random() * 90000);
      const trackingCode = `GF-${orderNumber}`;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newOrder: Order = {
        id: trackingCode,
        trackingCode: trackingCode,
        customerName: name,
        customerPhone: phone,
        deliveryAddress: address,
        unitNumber: unit,
        deliveryNotes: deliveryNotes,
        restaurant: {
          id: items[0].restaurantId,
          name: items[0].restaurantName,
          address: '425 River Valley Rd, Singapore',
          coords: { x: 22, y: 72 }
        },
        customerCoords: { x: 80, y: 28 },
        driverCoords: { x: 30, y: 65 }, // Initial driver position
        items: [...items],
        subtotal,
        deliveryFee,
        discount,
        total,
        promoCode: appliedPromo,
        paymentMethod,
        status: 'cooking',
        createdAt: timeStr,
        estimatedArrivalMinutes: 18,
        driver: {
          id: 'drv-new-1',
          name: 'Tan Wei Ming',
          phone: '+65 8234 9812',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          rating: 4.95,
          totalTrips: 3412,
          vehicleType: 'Motorcycle',
          vehiclePlate: 'FBF 4920 S',
          vehicleModel: 'Yamaha NMAX 155 (GrabFood Green)',
          vaccinatedAndVerified: true
        },
        timeline: [
          {
            status: 'placed',
            title: 'Order Placed & Authorized',
            description: `Payment authorized via ${paymentMethod}. Kitchen notified.`,
            timestamp: timeStr,
            isCompleted: true,
            isCurrent: false
          },
          {
            status: 'cooking',
            title: `${items[0].restaurantName} Confirmed`,
            description: 'Wok chefs are preparing your hot meal with care.',
            timestamp: timeStr,
            isCompleted: false,
            isCurrent: true
          },
          {
            status: 'picked_up',
            title: 'Courier Dispatch',
            description: 'Rider Tan is heading to the pickup station.',
            timestamp: 'Est. in 5 mins',
            isCompleted: false,
            isCurrent: false
          },
          {
            status: 'on_the_way',
            title: 'On the Way to Your Doorstep',
            description: `Rider en route to ${address}.`,
            timestamp: 'Est. in 12 mins',
            isCompleted: false,
            isCurrent: false
          },
          {
            status: 'delivered',
            title: 'Delivered Safely',
            description: 'Contactless proof-of-delivery confirmation.',
            timestamp: 'Est. in 18 mins',
            isCompleted: false,
            isCurrent: false
          }
        ]
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-neutral-900">Secure Delivery Checkout</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-6 space-y-5">
          {/* Customer & Address Form */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              1. Customer & Delivery Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                  Street Address
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                  Unit / Floor
                </label>
                <input
                  type="text"
                  required
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="#12-04"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                Dropoff Instructions for Courier
              </label>
              <textarea
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Leave at door, call when arrived, gate access code..."
                className="w-full p-2.5 text-xs rounded-xl border border-neutral-300 focus:border-emerald-500 focus:outline-hidden"
              ></textarea>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              2. Payment Method
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('GrabPay')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'GrabPay'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <Wallet className={`w-5 h-5 ${paymentMethod === 'GrabPay' ? 'text-emerald-600' : 'text-neutral-500'}`} />
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">GrabPay</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Balance: $128.50</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Credit Card')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'Credit Card'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <CreditCard className={`w-5 h-5 ${paymentMethod === 'Credit Card' ? 'text-emerald-600' : 'text-neutral-500'}`} />
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">Credit Card</span>
                  <span className="text-[10px] text-neutral-500 font-mono">•••• 4021</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <Banknote className={`w-5 h-5 ${paymentMethod === 'Cash on Delivery' ? 'text-emerald-600' : 'text-neutral-500'}`} />
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">Cash</span>
                  <span className="text-[10px] text-neutral-500">Exact change</span>
                </div>
              </button>
            </div>
          </div>

          {/* Price Summary & Submit */}
          <div className="pt-3 border-t border-neutral-200 bg-neutral-50 -mx-6 -mb-6 p-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-600">
              <span>{items.length} items from {items[0]?.restaurantName}</span>
              <span className="font-bold text-neutral-900 tabular-nums">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-sm font-black text-neutral-900">
              <span>Grand Total</span>
              <span className="text-lg text-emerald-600 tabular-nums">${total.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-extrabold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Dispatching Order to Kitchen...</span>
              ) : (
                <>
                  <span>Confirm & Track Live Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
