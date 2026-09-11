import React, { useState } from 'react';
import { Coordinates, DeliveryStatus } from '../types';
import { Plus, Minus, RotateCcw, Navigation, Store, Home, Radio } from 'lucide-react';

interface InteractiveMapProps {
  restaurantCoords: Coordinates;
  customerCoords: Coordinates;
  driverCoords: Coordinates;
  restaurantName: string;
  customerAddress: string;
  status: DeliveryStatus;
  progressPercent: number; // 0 to 100
  driverName?: string;
  vehiclePlate?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  restaurantCoords,
  customerCoords,
  driverCoords,
  restaurantName,
  customerAddress,
  status,
  progressPercent,
  driverName = 'Tan Wei Ming',
  vehiclePlate = 'FBF 4920 S'
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  // Road waypoints forming a realistic urban delivery corridor
  // Restaurant is at (22, 72), Customer is at (80, 28)
  const waypoints = [
    { x: restaurantCoords.x, y: restaurantCoords.y },
    { x: 30, y: 72 }, // River Valley junction
    { x: 38, y: 56 }, // Paterson Hill turn
    { x: 50, y: 48 }, // Grange Road artery
    { x: 65, y: 38 }, // Orchard Boulevard roundabout
    { x: customerCoords.x, y: customerCoords.y } // Customer residence
  ];

  // Calculate rider position along path based on progressPercent
  const computePointOnPath = (t: number) => {
    // clamp t between 0 and 1
    const clampedT = Math.max(0, Math.min(1, t));
    const totalSegments = waypoints.length - 1;
    const segmentLength = 1 / totalSegments;
    const currentSegmentIndex = Math.min(
      Math.floor(clampedT / segmentLength),
      totalSegments - 1
    );
    const localT = (clampedT - currentSegmentIndex * segmentLength) / segmentLength;

    const p0 = waypoints[currentSegmentIndex];
    const p1 = waypoints[currentSegmentIndex + 1];

    return {
      x: p0.x + (p1.x - p0.x) * localT,
      y: p0.y + (p1.y - p0.y) * localT
    };
  };

  const currentRiderPos = status === 'cooking' || status === 'placed'
    ? { x: restaurantCoords.x, y: restaurantCoords.y }
    : status === 'delivered'
    ? { x: customerCoords.x, y: customerCoords.y }
    : computePointOnPath(progressPercent / 100);

  // SVG path definition
  const svgPathData = waypoints.reduce(
    (acc, pt, i) => (i === 0 ? `M ${pt.x * 6} ${pt.y * 4}` : `${acc} L ${pt.x * 6} ${pt.y * 4}`),
    ''
  );

  const remainingDist = Math.max(0, ((100 - progressPercent) * 0.022)).toFixed(1);
  const currentSpeed = status === 'on_the_way' ? (32 + Math.sin(progressPercent) * 6).toFixed(0) : '0';

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] bg-[#E5ECE7] rounded-3xl overflow-hidden border border-neutral-300/80 shadow-inner select-none">
      {/* City Map Background Grid & Roads (SVG Vector Layout) */}
      <svg
        viewBox="0 0 600 400"
        className="w-full h-full object-cover transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <defs>
          {/* Subtle urban city block pattern */}
          <pattern id="urban-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="38" height="38" fill="#DDE6DE" rx="4" />
          </pattern>
          <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Base map fill */}
        <rect width="600" height="400" fill="#E8EFEA" />
        <rect width="600" height="400" fill="url(#urban-grid)" opacity="0.65" />

        {/* Parks and green zones */}
        <rect x="20" y="20" width="140" height="110" rx="16" fill="#CDE7D5" opacity="0.9" />
        <text x="50" y="75" fill="#4B775A" fontSize="11" fontWeight="700" opacity="0.8">
          Fort Canning Park
        </text>

        <rect x="360" y="220" width="210" height="150" rx="20" fill="#CFEBD8" opacity="0.8" />
        <text x="410" y="300" fill="#4B775A" fontSize="11" fontWeight="700" opacity="0.8">
          Botanical Garden Reserve
        </text>

        {/* Major Avenue Arteries (light gray street grid) */}
        <path d="M 0 100 Q 300 120 600 100" stroke="#FFFFFF" strokeWidth="24" fill="none" opacity="0.95" />
        <path d="M 0 100 Q 300 120 600 100" stroke="#D1DED5" strokeWidth="1" fill="none" />
        <text x="30" y="94" fill="#718096" fontSize="9" fontWeight="600">ORCHARD BOULEVARD</text>

        <path d="M 120 0 L 120 400" stroke="#FFFFFF" strokeWidth="20" fill="none" opacity="0.95" />
        <path d="M 320 0 L 320 400" stroke="#FFFFFF" strokeWidth="22" fill="none" opacity="0.95" />
        <text x="325" y="40" fill="#718096" fontSize="9" fontWeight="600">PATERSON HILL</text>

        <path d="M 480 0 L 480 400" stroke="#FFFFFF" strokeWidth="18" fill="none" opacity="0.95" />

        <path d="M 0 280 L 600 280" stroke="#FFFFFF" strokeWidth="22" fill="none" opacity="0.95" />
        <text x="20" y="274" fill="#718096" fontSize="9" fontWeight="600">RIVER VALLEY ROAD</text>

        <path d="M 0 350 L 600 350" stroke="#FFFFFF" strokeWidth="14" fill="none" opacity="0.9" />
        <path d="M 220 180 L 500 180" stroke="#FFFFFF" strokeWidth="16" fill="none" opacity="0.9" />
        <text x="230" y="174" fill="#718096" fontSize="9" fontWeight="600">GRANGE CONNECTOR</text>

        {/* The Live Delivery Route Path Background Line */}
        <path
          d={svgPathData}
          stroke="#94A3B8"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.3"
        />

        {/* The Live Active Route Delivery Line (Emerald green with moving dashes) */}
        <path
          d={svgPathData}
          stroke="url(#route-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="animate-dash-route"
        />

        {/* 1. RESTAURANT PIN */}
        <g transform={`translate(${restaurantCoords.x * 6}, ${restaurantCoords.y * 4})`}>
          <circle r="22" fill="#FEF3C7" opacity="0.9" />
          <circle r="14" fill="#D97706" />
          {/* Store icon */}
          <path
            d="M -7 -4 L 7 -4 L 6 3 L -6 3 Z M -4 3 L -4 6 M 4 3 L 4 6"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
          />
          <rect x="-60" y="-38" width="120" height="20" rx="6" fill="#1E293B" />
          <text x="0" y="-24" fill="#FFFFFF" fontSize="9" fontWeight="700" textAnchor="middle">
            {restaurantName.length > 18 ? restaurantName.slice(0, 18) + '...' : restaurantName}
          </text>
        </g>

        {/* 2. CUSTOMER DESTINATION PIN */}
        <g transform={`translate(${customerCoords.x * 6}, ${customerCoords.y * 4})`}>
          <circle r="24" fill="#E0F2FE" opacity="0.9" />
          <circle r="15" fill="#0284C7" />
          {/* Home icon */}
          <path
            d="M -6 2 L 0 -5 L 6 2 L 4 2 L 4 6 L -4 6 L -4 2 Z"
            fill="#FFFFFF"
          />
          <rect x="-55" y="-38" width="110" height="20" rx="6" fill="#0369A1" />
          <text x="0" y="-24" fill="#FFFFFF" fontSize="9" fontWeight="700" textAnchor="middle">
            Dropoff Destination
          </text>
        </g>

        {/* 3. MOVING COURIER MOTORBIKE PIN */}
        <g
          transform={`translate(${currentRiderPos.x * 6}, ${currentRiderPos.y * 4})`}
          className="transition-all duration-300 ease-linear"
        >
          {/* Outer glowing pulsing beacon */}
          <circle r="26" fill="#10B981" opacity="0.25" className="animate-ping" />
          <circle r="18" fill="#00B14F" stroke="#FFFFFF" strokeWidth="3" />

          {/* Motorcycle silhouette */}
          <circle cx="-5" cy="3" r="3" fill="#FFFFFF" />
          <circle cx="5" cy="3" r="3" fill="#FFFFFF" />
          <path d="M -5 3 L -1 -3 L 3 -3 L 5 3 M -1 -3 L 1 1" stroke="#FFFFFF" strokeWidth="1.6" fill="none" />

          {/* Floating Driver Pill Tag */}
          <rect x="-50" y="24" width="100" height="22" rx="6" fill="#0F172A" opacity="0.95" />
          <text x="0" y="38" fill="#4ADE80" fontSize="9" fontWeight="800" textAnchor="middle">
            {driverName} ({vehiclePlate})
          </text>
        </g>
      </svg>

      {/* Top Left Live Telemetry HUD */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-neutral-200 shadow-md flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
              Telemetry Status
            </span>
            <span className="text-xs font-bold text-neutral-800">
              {status === 'on_the_way'
                ? 'Rider in Motion'
                : status === 'cooking'
                ? 'Awaiting Kitchen Pickup'
                : status === 'delivered'
                ? 'Arrived at Destination'
                : 'Order Verified'}
            </span>
          </div>
        </div>

        <div className="h-6 w-px bg-neutral-200"></div>

        <div>
          <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
            Live Speed
          </span>
          <span className="text-xs font-extrabold text-emerald-700 tabular-nums">
            {currentSpeed} km/h
          </span>
        </div>

        <div className="h-6 w-px bg-neutral-200"></div>

        <div>
          <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
            Remaining
          </span>
          <span className="text-xs font-extrabold text-neutral-900 tabular-nums">
            {remainingDist} km
          </span>
        </div>
      </div>

      {/* Top Right Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-neutral-200 shadow-md">
        <button
          onClick={() => setZoomLevel(Math.min(1.8, zoomLevel + 0.2))}
          className="w-7 h-7 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neutral-700 cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.2))}
          className="w-7 h-7 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neutral-700 cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          className="w-7 h-7 rounded-lg hover:bg-neutral-100 flex items-center justify-center text-neutral-700 cursor-pointer"
          title="Reset Zoom"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Right Live GPS Indicator */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-neutral-600 border border-neutral-200 flex items-center gap-1.5 shadow-xs">
        <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        <span>OmniRoute GPS 10Hz Feed</span>
      </div>
    </div>
  );
};
