export type DeliveryStatus = 
  | 'placed'
  | 'confirmed'
  | 'cooking'
  | 'picked_up'
  | 'on_the_way'
  | 'arriving'
  | 'delivered';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  prepTimeMinutes: number;
  options?: {
    name: string;
    choices: { label: string; priceDelta: number }[];
  }[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  deliveryFee: number;
  distanceKm: number;
  heroImage: string;
  logo: string;
  address: string;
  isGrabSignature?: boolean;
  isHalal?: boolean;
  isPromo?: boolean;
  promoText?: string;
  priceLevel: '$' | '$$' | '$$$';
  dishes: Dish[];
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  selectedOptions?: Record<string, string>;
  specialInstructions?: string;
  restaurantId: string;
  restaurantName: string;
}

export interface DriverInfo {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  rating: number;
  totalTrips: number;
  vehicleType: string;
  vehiclePlate: string;
  vehicleModel: string;
  vaccinatedAndVerified: boolean;
}

export interface Coordinates {
  x: number; // 0 - 100 percentage relative to map canvas
  y: number;
}

export interface StatusTimelineEvent {
  status: DeliveryStatus;
  title: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface Order {
  id: string;
  trackingCode: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  unitNumber: string;
  deliveryNotes?: string;
  restaurant: {
    id: string;
    name: string;
    address: string;
    coords: Coordinates;
  };
  customerCoords: Coordinates;
  driverCoords: Coordinates;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  promoCode?: string;
  paymentMethod: 'GrabPay' | 'Credit Card' | 'Cash on Delivery';
  status: DeliveryStatus;
  createdAt: string;
  estimatedArrivalMinutes: number;
  driver?: DriverInfo;
  timeline: StatusTimelineEvent[];
}

export interface ProfessionalProject {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Routing & Optimization' | 'Real-Time Telemetry' | 'Kitchen Logistics' | 'Security & AI Verification';
  techStack: string[];
  metrics: { label: string; value: string }[];
  keyFeatures: string[];
  architectureHighlight: string;
  demoType: 'routing' | 'telemetry' | 'kitchen' | 'safedrop';
}

export interface CustomerInquiry {
  id: string;
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  topic: 'delivery_delay' | 'modify_address' | 'missing_item' | 'dietary_instruction' | 'rider_feedback' | 'other';
  message: string;
  status: 'Received' | 'In Progress' | 'Resolved';
  timestamp: string;
}
