import React, { useState } from 'react';
import { X, Star, Clock, Bike, MapPin, Plus, Check, Flame } from 'lucide-react';
import { Restaurant, Dish } from '../types';

interface RestaurantModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number, options: Record<string, string>, instructions: string) => void;
}

export const RestaurantModal: React.FC<RestaurantModalProps> = ({
  restaurant,
  onClose,
  onAddToCart
}) => {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [instructions, setInstructions] = useState('');
  const [addedToast, setAddedToast] = useState(false);

  if (!restaurant) return null;

  const handleOpenDish = (dish: Dish) => {
    setSelectedDish(dish);
    setQuantity(1);
    setInstructions('');
    // Initialize default options
    const defaults: Record<string, string> = {};
    if (dish.options) {
      dish.options.forEach((opt) => {
        if (opt.choices.length > 0) {
          defaults[opt.name] = opt.choices[0].label;
        }
      });
    }
    setSelectedOptions(defaults);
  };

  const handleAddDishToCart = () => {
    if (!selectedDish) return;
    onAddToCart(selectedDish, quantity, selectedOptions, instructions);
    setSelectedDish(null);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  // Calculate current dish price with option delta
  const calculateDishPrice = () => {
    if (!selectedDish) return 0;
    let total = selectedDish.price;
    if (selectedDish.options) {
      selectedDish.options.forEach((opt) => {
        const chosen = selectedOptions[opt.name];
        const match = opt.choices.find((c) => c.label === chosen);
        if (match) total += match.priceDelta;
      });
    }
    return total * quantity;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-neutral-200">
        {/* Toast Alert */}
        {addedToast && (
          <div className="absolute top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 animate-in slide-in-from-top duration-200">
            <Check className="w-4 h-4" />
            <span>Item added to GrabFood basket!</span>
          </div>
        )}

        {/* Modal Header Bar with Close */}
        <div className="relative h-48 sm:h-60 w-full overflow-hidden shrink-0 bg-neutral-900">
          <img
            src={restaurant.heroImage}
            alt={restaurant.name}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <span>{restaurant.cuisine}</span>
              <span>·</span>
              <span>{restaurant.priceLevel}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">{restaurant.name}</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-200 mt-2 font-medium">
              <div className="flex items-center gap-1 font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{restaurant.rating}</span>
                <span className="text-neutral-300 font-normal">({restaurant.reviewCount}+)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{restaurant.deliveryTimeMin}-{restaurant.deliveryTimeMax} mins</span>
              </div>
              <div className="flex items-center gap-1">
                <Bike className="w-3.5 h-3.5 text-emerald-400" />
                <span>${restaurant.deliveryFee.toFixed(2)} delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{restaurant.distanceKm} km away</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body: Dishes List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 mb-1">Recommended & Popular Dishes</h3>
            <p className="text-xs text-neutral-500">Carefully prepared hot and packed with insulated seal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurant.dishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => handleOpenDish(dish)}
                className="group p-3.5 rounded-2xl border border-neutral-200/90 hover:border-emerald-500 bg-white hover:bg-emerald-50/20 transition-all cursor-pointer flex gap-3.5 justify-between"
              >
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {dish.isPopular && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm mb-1">
                        <Flame className="w-3 h-3 text-amber-500" />
                        Popular Choice
                      </span>
                    )}
                    <h4 className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                      {dish.name}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-black text-neutral-900 tabular-nums">
                      ${dish.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      className="w-7 h-7 rounded-lg bg-emerald-100 group-hover:bg-emerald-600 text-emerald-800 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="w-24 h-24 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Dish Customization Submodal */}
        {selectedDish && (
          <div className="absolute inset-0 z-50 bg-white/98 backdrop-blur-md flex flex-col animate-in fade-in duration-150">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-neutral-900">Customize Item</h3>
              <button
                onClick={() => setSelectedDish(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex gap-4 items-start">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  className="w-24 h-24 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-lg font-extrabold text-neutral-900">{selectedDish.name}</h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{selectedDish.description}</p>
                  <span className="text-base font-black text-emerald-600 mt-2 block tabular-nums">
                    ${selectedDish.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Options */}
              {selectedDish.options && selectedDish.options.map((option) => (
                <div key={option.name} className="space-y-2 border-t border-neutral-100 pt-4">
                  <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                    {option.name}
                  </span>
                  <div className="space-y-2">
                    {option.choices.map((choice) => (
                      <label
                        key={choice.label}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                          selectedOptions[option.name] === choice.label
                            ? 'border-emerald-500 bg-emerald-50/40 text-neutral-900 font-bold'
                            : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={option.name}
                            checked={selectedOptions[option.name] === choice.label}
                            onChange={() =>
                              setSelectedOptions({ ...selectedOptions, [option.name]: choice.label })
                            }
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>{choice.label}</span>
                        </div>
                        {choice.priceDelta > 0 && (
                          <span className="text-emerald-700 font-semibold tabular-nums">
                            +${choice.priceDelta.toFixed(2)}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Special Instructions */}
              <div className="border-t border-neutral-100 pt-4 space-y-2">
                <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                  Special Kitchen Instructions (Optional)
                </label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Less spicy, gravy separated, allergic to peanuts..."
                  rows={2}
                  className="w-full p-3 rounded-xl border border-neutral-200 text-xs text-neutral-800 focus:border-emerald-500 focus:outline-hidden"
                ></textarea>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Quantity</span>
                <div className="flex items-center gap-3 bg-neutral-100 p-1 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-2xs font-bold text-neutral-700 flex items-center justify-center hover:bg-neutral-50 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-neutral-900 tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-2xs font-bold text-neutral-700 flex items-center justify-center hover:bg-neutral-50 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Add Bar */}
            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-neutral-500 block">Total Item Price</span>
                <span className="text-lg font-black text-neutral-900 tabular-nums">
                  ${calculateDishPrice().toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleAddDishToCart}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Add to Basket</span>
                <span>·</span>
                <span className="tabular-nums">${calculateDishPrice().toFixed(2)}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
