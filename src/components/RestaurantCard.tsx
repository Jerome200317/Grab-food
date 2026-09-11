import React, { useState } from 'react';
import { Star, Clock, Bike, ShieldCheck, Utensils } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onSelect }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onSelect(restaurant)}
      className="group bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col h-full hover:-translate-y-1"
    >
      {/* Card Image Area */}
      <div className="relative aspect-16/10 w-full bg-neutral-100 overflow-hidden">
        {!imgError ? (
          <img
            src={restaurant.heroImage}
            alt={restaurant.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-800 p-4">
            <Utensils className="w-10 h-10 mb-2 opacity-80" />
            <span className="font-bold text-sm text-center">{restaurant.name}</span>
            <span className="text-xs text-neutral-500 mt-1">{restaurant.cuisine}</span>
          </div>
        )}

        {/* Grab Signature Tag */}
        {restaurant.isGrabSignature && (
          <div className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Grab Preferred</span>
          </div>
        )}

        {/* Promo tag */}
        {restaurant.promoText && (
          <div className="absolute bottom-2.5 left-2.5 bg-amber-500 text-neutral-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md shadow-xs">
            {restaurant.promoText}
          </div>
        )}

        {/* Time estimate overlay */}
        <div className="absolute bottom-2.5 right-2.5 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{restaurant.deliveryTimeMin}-{restaurant.deliveryTimeMax} min</span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base text-neutral-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <span className="text-xs font-semibold text-neutral-500 shrink-0">
              {restaurant.priceLevel}
            </span>
          </div>

          <p className="text-xs text-neutral-500 line-clamp-1 mt-1 font-medium">
            {restaurant.cuisine}
          </p>
        </div>

        {/* Meta row */}
        <div className="pt-3 border-t border-neutral-100 mt-3 flex items-center justify-between text-xs text-neutral-600">
          <div className="flex items-center gap-1 font-bold text-neutral-800">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{restaurant.rating}</span>
            <span className="text-neutral-400 font-normal">({restaurant.reviewCount})</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-neutral-400">·</span>
            <span>{restaurant.distanceKm} km</span>
            <span className="text-neutral-400">·</span>
            <div className="flex items-center gap-1">
              <Bike className="w-3 h-3 text-emerald-600" />
              <span className="font-semibold text-neutral-700">${restaurant.deliveryFee.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
