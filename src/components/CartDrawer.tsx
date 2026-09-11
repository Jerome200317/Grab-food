import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

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

  const deliveryFee = items.length > 0 ? 2.5 : 0;
  const discount = appliedPromo === 'GRABFAST' ? 5.0 : appliedPromo === 'FREEDELIVERY' ? deliveryFee : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    const ok = onApplyPromo(code);
    if (ok) {
      setPromoSuccess(`Voucher '${code}' applied!`);
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try GRABFAST or FREEDELIVERY');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-neutral-900">Your GrabFood Basket</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-neutral-800">Your basket is empty</h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs">
              Explore your favorite local dishes, Hainanese chicken rice, smash burgers, or fresh bubble tea!
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-neutral-100">
              {items.map((item, index) => {
                let unitPrice = item.dish.price;
                if (item.selectedOptions && item.dish.options) {
                  item.dish.options.forEach((opt) => {
                    const choice = item.selectedOptions?.[opt.name];
                    const match = opt.choices.find((c) => c.label === choice);
                    if (match) unitPrice += match.priceDelta;
                  });
                }

                return (
                  <div key={index} className="pt-3 first:pt-0 flex gap-3 items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-neutral-900 leading-snug">
                        {item.dish.name}
                      </h4>
                      <span className="text-[11px] text-emerald-700 font-medium block">
                        {item.restaurantName}
                      </span>

                      {/* Options breakdown */}
                      {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                        <div className="text-[10px] text-neutral-500 mt-0.5 space-y-0.5">
                          {Object.entries(item.selectedOptions).map(([k, v]) => (
                            <div key={k}>• {v}</div>
                          ))}
                        </div>
                      )}

                      {item.specialInstructions && (
                        <div className="text-[10px] italic text-neutral-500 mt-0.5">
                          Note: {item.specialInstructions}
                        </div>
                      )}

                      <div className="text-xs font-bold text-neutral-900 mt-1 tabular-nums">
                        ${(unitPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-white text-xs font-bold text-neutral-700 flex items-center justify-center hover:bg-neutral-50 cursor-pointer shadow-2xs"
                      >
                        -
                      </button>
                      <span className="w-4 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-white text-xs font-bold text-neutral-700 flex items-center justify-center hover:bg-neutral-50 cursor-pointer shadow-2xs"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="p-1 text-neutral-400 hover:text-red-600 transition-colors ml-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promo Code & Summary */}
            <div className="p-4 border-t border-neutral-200 bg-neutral-50/80 space-y-3">
              {/* Promo input */}
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Voucher (GRABFAST)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-neutral-200 uppercase font-mono placeholder:normal-case focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoSuccess && (
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>{promoSuccess}</span>
                </div>
              )}

              {promoError && (
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-700 bg-red-50 p-2 rounded-lg border border-red-200">
                  <AlertCircle className="w-3 h-3 text-red-600" />
                  <span>{promoError}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">${deliveryFee.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({appliedPromo})</span>
                    <span className="tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-neutral-900 border-t border-neutral-200 pt-2">
                  <span>Total Amount</span>
                  <span className="text-base text-emerald-600 tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
