import { Restaurant, Order, ProfessionalProject } from '../types';

export const CATEGORIES = [
  { id: 'all', label: 'All Cuisines', icon: '🍽️' },
  { id: 'signatures', label: 'Grab Signatures', icon: '⭐' },
  { id: 'rice_noodles', label: 'Rice & Noodles', icon: '🍜' },
  { id: 'burgers', label: 'Burgers & Fast Food', icon: '🍔' },
  { id: 'boba_drinks', label: 'Boba & Beverages', icon: '🧋' },
  { id: 'ramen', label: 'Japanese & Ramen', icon: '🍱' },
  { id: 'healthy', label: 'Salads & Healthy', icon: '🥗' },
  { id: 'desserts', label: 'Desserts & Bakes', icon: '🍰' }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Boon Tong Kee Hainanese Heritage',
    cuisine: 'Singaporean · Chinese · Roast Delights',
    rating: 4.8,
    reviewCount: 3420,
    deliveryTimeMin: 20,
    deliveryTimeMax: 30,
    deliveryFee: 2.5,
    distanceKm: 1.4,
    heroImage: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=80',
    logo: 'BTK',
    address: '425 River Valley Rd, Singapore',
    isGrabSignature: true,
    isHalal: false,
    isPromo: true,
    promoText: '20% OFF min. $30',
    priceLevel: '$$',
    dishes: [
      {
        id: 'dish-101',
        name: 'Signature Poached Chicken Rice (Whole Set)',
        description: 'Tender, silky Cantonese-poached chicken served with fragrant jasmine rice cooked in ginger, garlic & chicken broth. Accompanied by homemade chili paste & dark sweet soy.',
        price: 11.5,
        image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80',
        category: 'rice_noodles',
        isPopular: true,
        prepTimeMinutes: 12,
        options: [
          {
            name: 'Chicken Portion',
            choices: [
              { label: 'Standard Breast & Wing', priceDelta: 0 },
              { label: 'Juicy Drumstick Cut (+ $1.80)', priceDelta: 1.8 }
            ]
          },
          {
            name: 'Chili & Sauce Level',
            choices: [
              { label: 'Normal Garlic Chili', priceDelta: 0 },
              { label: 'Extra Chili & Ginger Paste', priceDelta: 0.5 },
              { label: 'Chili on Side', priceDelta: 0 }
            ]
          }
        ]
      },
      {
        id: 'dish-102',
        name: 'Crispy Deep-Fried Beancurd with Sweet Mayo',
        description: 'Golden, paper-thin crispy skin with melt-in-mouth silken tofu center. Served with signature sweet sesame dip.',
        price: 8.8,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
        category: 'rice_noodles',
        isPopular: true,
        isVegetarian: true,
        prepTimeMinutes: 10
      },
      {
        id: 'dish-103',
        name: 'Imperial Braised Pork Belly & Shiitake',
        description: 'Slow-simmered pork belly in aged five-spice master broth with tender mushrooms and herbal hard-boiled egg.',
        price: 14.2,
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
        category: 'rice_noodles',
        prepTimeMinutes: 15
      },
      {
        id: 'dish-104',
        name: 'Fresh Calamansi Lime Juice with Plum',
        description: 'Tangy, ice-cold freshly pressed calamansi juice with salted sour plum for a refreshing finish.',
        price: 4.2,
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
        category: 'boba_drinks',
        prepTimeMinutes: 4
      }
    ]
  },
  {
    id: 'rest-2',
    name: 'Craft Burger Shack & Grill',
    cuisine: 'American · Smashed Burgers · Shakes',
    rating: 4.9,
    reviewCount: 4890,
    deliveryTimeMin: 25,
    deliveryTimeMax: 35,
    deliveryFee: 3.0,
    distanceKm: 2.1,
    heroImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    logo: 'CBS',
    address: '78 Airport Boulevard, #02-246, Singapore',
    isGrabSignature: true,
    isHalal: true,
    isPromo: true,
    promoText: 'Free Truffle Fries',
    priceLevel: '$$',
    dishes: [
      {
        id: 'dish-201',
        name: 'Double Truffle Smash Wagyu Burger',
        description: 'Two 100% Wagyu smashed patties, melted Monterey Jack cheese, wild sauteed mushrooms, and black summer truffle aioli on a toasted potato bun.',
        price: 16.9,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
        category: 'burgers',
        isPopular: true,
        prepTimeMinutes: 14,
        options: [
          {
            name: 'Patty Doneness',
            choices: [
              { label: 'Medium Well (Juicy & Tender)', priceDelta: 0 },
              { label: 'Well Done (Charred Crisp Edge)', priceDelta: 0 }
            ]
          },
          {
            name: 'Cheese Add-On',
            choices: [
              { label: 'Standard Jack', priceDelta: 0 },
              { label: 'Double Aged White Cheddar (+ $2.00)', priceDelta: 2.0 }
            ]
          }
        ]
      },
      {
        id: 'dish-202',
        name: 'Smoky Chipotle BBQ Bacon Stack',
        description: 'Single wagyu patty, crispy applewood smoked beef bacon, beer-battered onion rings, cheddar, and sweet chipotle BBQ sauce.',
        price: 15.4,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
        category: 'burgers',
        prepTimeMinutes: 12
      },
      {
        id: 'dish-203',
        name: 'Crinkle-Cut Parmesan Truffle Fries',
        description: 'Crisp hot crinkle fries dusted with grated 24-month Grana Padano, fresh rosemary, and white truffle essence.',
        price: 7.5,
        image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80',
        category: 'burgers',
        isPopular: true,
        prepTimeMinutes: 8
      },
      {
        id: 'dish-204',
        name: 'Artisan Salted Caramel Shake',
        description: 'Hand-spun Madagascar vanilla bean frozen custard blended with sea salt fleur de sel caramel.',
        price: 6.8,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
        category: 'boba_drinks',
        prepTimeMinutes: 5
      }
    ]
  },
  {
    id: 'rest-3',
    name: 'Ippudo Craft Tonkotsu Ramen',
    cuisine: 'Japanese · Hakata Ramen · Gyoza',
    rating: 4.8,
    reviewCount: 2980,
    deliveryTimeMin: 20,
    deliveryTimeMax: 30,
    deliveryFee: 2.8,
    distanceKm: 1.8,
    heroImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80',
    logo: 'IPP',
    address: '333A Orchard Rd, #04-02 Mandarin Gallery, Singapore',
    isGrabSignature: true,
    isHalal: false,
    priceLevel: '$$',
    dishes: [
      {
        id: 'dish-301',
        name: 'Special Shiromaru Motoaji Ramen',
        description: 'Ippudo original silky 18-hour tonkotsu broth served with thin handmade noodles, tender pork chashu, black fungus, spring onions, and half-boiled ajitsuke tamago.',
        price: 18.5,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
        category: 'ramen',
        isPopular: true,
        prepTimeMinutes: 15,
        options: [
          {
            name: 'Noodle Hardness',
            choices: [
              { label: 'Firm (Kata - Recommended)', priceDelta: 0 },
              { label: 'Normal (Futsu)', priceDelta: 0 },
              { label: 'Soft (Yawa)', priceDelta: 0 }
            ]
          }
        ]
      },
      {
        id: 'dish-302',
        name: 'Karaka Spicy Miso Tonkotsu',
        description: 'Rich pork broth enriched with spicy special miso paste, ground pork minced meat, aromatic chili oil, and crushed garlic.',
        price: 19.8,
        image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=600&auto=format&fit=crop&q=80',
        category: 'ramen',
        isSpicy: true,
        isPopular: true,
        prepTimeMinutes: 14
      },
      {
        id: 'dish-303',
        name: 'Hakata Pan-Fried Pork Gyoza (5 pcs)',
        description: 'Crispy lacy bottom pan-fried dumplings filled with seasoned juicy minced Berkshire pork, cabbage, and sesame oil.',
        price: 8.5,
        image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&auto=format&fit=crop&q=80',
        category: 'ramen',
        prepTimeMinutes: 10
      }
    ]
  },
  {
    id: 'rest-4',
    name: 'LiHO Tea & Boba Craft House',
    cuisine: 'Taiwanese · Boba · Artisanal Brews',
    rating: 4.7,
    reviewCount: 5210,
    deliveryTimeMin: 15,
    deliveryTimeMax: 25,
    deliveryFee: 1.9,
    distanceKm: 0.9,
    heroImage: 'https://images.unsplash.com/photo-1558857563-b37cb33355fb?w=800&auto=format&fit=crop&q=80',
    logo: 'LIHO',
    address: '180 Kitchener Rd, #01-14 City Square Mall, Singapore',
    isGrabSignature: false,
    isHalal: true,
    isPromo: true,
    promoText: 'Buy 1 Get 1 on Boba',
    priceLevel: '$',
    dishes: [
      {
        id: 'dish-401',
        name: 'Brown Sugar Pearl Tiger Fresh Milk',
        description: 'Warm, slow-cooked caramel brown sugar tapioca pearls paired with chilled creamy fresh milk and roasted cheese foam.',
        price: 6.2,
        image: 'https://images.unsplash.com/photo-1558857563-b37cb33355fb?w=600&auto=format&fit=crop&q=80',
        category: 'boba_drinks',
        isPopular: true,
        prepTimeMinutes: 5,
        options: [
          {
            name: 'Sugar Level',
            choices: [
              { label: 'Standard Sweetness (100%)', priceDelta: 0 },
              { label: 'Less Sweet (70%)', priceDelta: 0 },
              { label: 'Subtle Sweet (30%)', priceDelta: 0 }
            ]
          },
          {
            name: 'Ice Level',
            choices: [
              { label: 'Normal Cold Ice', priceDelta: 0 },
              { label: 'Less Ice', priceDelta: 0 },
              { label: 'Warm', priceDelta: 0 }
            ]
          }
        ]
      },
      {
        id: 'dish-402',
        name: 'Golden Oolong Milk Tea with Herbal Jelly',
        description: 'Fragrant mountain roasted high-altitude oolong tea brewed fresh, combined with silky grass jelly.',
        price: 5.4,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
        category: 'boba_drinks',
        prepTimeMinutes: 4
      },
      {
        id: 'dish-403',
        name: 'Fresh Mango Coconut Sago Freeze',
        description: 'Blended sweet Philippine carabao mango puree, coconut cream swirl, crystal boba, and chewy pomelo pulps.',
        price: 7.2,
        image: 'https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=600&auto=format&fit=crop&q=80',
        category: 'boba_drinks',
        prepTimeMinutes: 6
      }
    ]
  },
  {
    id: 'rest-5',
    name: 'SaladStop! Green Wellness Kitchen',
    cuisine: 'Healthy Bowls · Keto · Vegan Friendly',
    rating: 4.8,
    reviewCount: 1870,
    deliveryTimeMin: 20,
    deliveryTimeMax: 30,
    deliveryFee: 2.5,
    distanceKm: 1.5,
    heroImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    logo: 'SS!',
    address: '10 Collyer Quay, #01-03 Ocean Financial Centre, Singapore',
    isGrabSignature: false,
    isHalal: true,
    priceLevel: '$$',
    dishes: [
      {
        id: 'dish-501',
        name: 'Warm Iron Protein Grain Bowl',
        description: 'Sous-vide grilled Norwegian salmon, warm organic quinoa, roasted sweet potatoes, charred broccoli, baby spinach, and citrus miso vinaigrette.',
        price: 17.5,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
        category: 'healthy',
        isPopular: true,
        prepTimeMinutes: 12
      },
      {
        id: 'dish-502',
        name: 'Hail Caesar Wrap with Free-Range Chicken',
        description: 'Romaine lettuce, grilled herb chicken breast, shaved parmesan, sourdough croutons, poached egg wrapped in whole-wheat tortilla.',
        price: 13.8,
        image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&auto=format&fit=crop&q=80',
        category: 'healthy',
        prepTimeMinutes: 10
      },
      {
        id: 'dish-503',
        name: 'Cold-Pressed Vitality Greens Elixir',
        description: '100% pure cold-pressed celery, green apple, cucumber, kale, lemon, and ginger. Zero added water or refined sugar.',
        price: 6.9,
        image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&auto=format&fit=crop&q=80',
        category: 'healthy',
        prepTimeMinutes: 3
      }
    ]
  },
  {
    id: 'rest-6',
    name: 'Le Matin Patisserie & Boulangerie',
    cuisine: 'French Pastries · Specialty Coffee · Bakes',
    rating: 4.9,
    reviewCount: 2150,
    deliveryTimeMin: 25,
    deliveryTimeMax: 35,
    deliveryFee: 3.2,
    distanceKm: 2.3,
    heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    logo: 'LMP',
    address: '581 Orchard Road, ION Orchard #B2-49, Singapore',
    isGrabSignature: true,
    priceLevel: '$$$',
    dishes: [
      {
        id: 'dish-601',
        name: 'Signature Kouign Amann & Smoked Butter',
        description: 'Multi-layered caramelized puff pastry infused with Brittany fleur de sel butter, brittle amber crunchy sugar crust.',
        price: 8.5,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80',
        category: 'desserts',
        isPopular: true,
        prepTimeMinutes: 5
      },
      {
        id: 'dish-602',
        name: 'Pistachio Supreme Croissant Roll',
        description: 'Flaky circular laminated croissant pastry stuffed with luscious Bronte pistachio praline cream and roasted crushed pistachios.',
        price: 10.2,
        image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=600&auto=format&fit=crop&q=80',
        category: 'desserts',
        isPopular: true,
        prepTimeMinutes: 5
      },
      {
        id: 'dish-603',
        name: 'Double Shot Oat Milk Flat White',
        description: 'Single-origin Ethiopian Yirgacheffe espresso pulled over velvety steamed Minor Figures organic oat milk.',
        price: 6.5,
        image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop&q=80',
        category: 'boba_drinks',
        prepTimeMinutes: 4
      }
    ]
  }
];

export const INITIAL_ORDERS: Record<string, Order> = {
  'GF-88492': {
    id: 'GF-88492',
    trackingCode: 'GF-88492',
    customerName: 'Marcus Lim',
    customerPhone: '+65 9123 4567',
    deliveryAddress: '28 Orchard Boulevard',
    unitNumber: '#14-02, Tower 2',
    deliveryNotes: 'Please leave outside door on the shoe rack cabinet. Ring the video bell once.',
    restaurant: {
      id: 'rest-1',
      name: 'Boon Tong Kee Hainanese Heritage',
      address: '425 River Valley Rd, Singapore',
      coords: { x: 22, y: 72 }
    },
    customerCoords: { x: 80, y: 28 },
    driverCoords: { x: 58, y: 44 }, // Moving between restaurant and customer
    items: [
      {
        dish: RESTAURANTS[0].dishes[0],
        quantity: 2,
        selectedOptions: { 'Chicken Portion': 'Juicy Drumstick Cut (+ $1.80)' },
        restaurantId: 'rest-1',
        restaurantName: 'Boon Tong Kee Hainanese Heritage'
      },
      {
        dish: RESTAURANTS[0].dishes[1],
        quantity: 1,
        restaurantId: 'rest-1',
        restaurantName: 'Boon Tong Kee Hainanese Heritage'
      },
      {
        dish: RESTAURANTS[0].dishes[3],
        quantity: 2,
        restaurantId: 'rest-1',
        restaurantName: 'Boon Tong Kee Hainanese Heritage'
      }
    ],
    subtotal: 43.8,
    deliveryFee: 2.5,
    discount: 5.0,
    total: 41.3,
    promoCode: 'GRABFAST',
    paymentMethod: 'GrabPay',
    status: 'on_the_way',
    createdAt: '21:04',
    estimatedArrivalMinutes: 4,
    driver: {
      id: 'drv-409',
      name: 'Tan Wei Ming',
      phone: '+65 8234 9812',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      rating: 4.95,
      totalTrips: 3412,
      vehicleType: 'Motorcycle',
      vehiclePlate: 'FBF 4920 S',
      vehicleModel: 'Yamaha NMAX 155 (Green Thermal Bag)',
      vaccinatedAndVerified: true
    },
    timeline: [
      {
        status: 'placed',
        title: 'Order Placed & Authorized',
        description: 'Payment verified via GrabPay. Order sent to merchant POS.',
        timestamp: '21:04',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'cooking',
        title: 'Boon Tong Kee Confirmed Order',
        description: 'Chef is preparing chicken rice & golden beancurd in kitchen.',
        timestamp: '21:07',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'picked_up',
        title: 'Driver Tan Picked Up Order',
        description: 'Package checked with tamper-evident seal and placed in insulated box.',
        timestamp: '21:18',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'on_the_way',
        title: 'On the Way to Your Doorstep',
        description: 'Driver is traveling along Paterson Hill towards Orchard Boulevard.',
        timestamp: '21:22',
        isCompleted: false,
        isCurrent: true
      },
      {
        status: 'delivered',
        title: 'Delivered Safely',
        description: 'Proof of drop-off photo captured at #14-02.',
        timestamp: 'Est. 21:26',
        isCompleted: false,
        isCurrent: false
      }
    ]
  },
  'GF-92014': {
    id: 'GF-92014',
    trackingCode: 'GF-92014',
    customerName: 'Sarah Jenkins',
    customerPhone: '+65 9876 5432',
    deliveryAddress: '15 Grange Road',
    unitNumber: '#08-01',
    deliveryNotes: 'Building has security concierge, mention unit #08-01.',
    restaurant: {
      id: 'rest-2',
      name: 'Craft Burger Shack & Grill',
      address: '78 Airport Boulevard, Singapore',
      coords: { x: 30, y: 35 }
    },
    customerCoords: { x: 75, y: 65 },
    driverCoords: { x: 32, y: 38 },
    items: [
      {
        dish: RESTAURANTS[1].dishes[0],
        quantity: 1,
        restaurantId: 'rest-2',
        restaurantName: 'Craft Burger Shack & Grill'
      },
      {
        dish: RESTAURANTS[1].dishes[2],
        quantity: 1,
        restaurantId: 'rest-2',
        restaurantName: 'Craft Burger Shack & Grill'
      }
    ],
    subtotal: 24.4,
    deliveryFee: 3.0,
    discount: 0,
    total: 27.4,
    paymentMethod: 'Credit Card',
    status: 'cooking',
    createdAt: '21:16',
    estimatedArrivalMinutes: 18,
    driver: {
      id: 'drv-208',
      name: 'Nurul Huda Binte Ahmad',
      phone: '+65 8765 4321',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      rating: 4.91,
      totalTrips: 1820,
      vehicleType: 'Scooter',
      vehiclePlate: 'SLA 8129 G',
      vehicleModel: 'Honda Vario 160 (Thermal Case)',
      vaccinatedAndVerified: true
    },
    timeline: [
      {
        status: 'placed',
        title: 'Order Placed',
        description: 'Payment authorized via Visa ending in 4021.',
        timestamp: '21:16',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'cooking',
        title: 'Kitchen Prepping Wagyu Patties',
        description: 'Craft Burger Shack is grilling patties & frying parmesan fries.',
        timestamp: '21:19',
        isCompleted: false,
        isCurrent: true
      },
      {
        status: 'picked_up',
        title: 'Driver Arriving at Restaurant',
        description: 'Driver Nurul is 2 minutes away from kitchen pickup counter.',
        timestamp: 'Est. 21:24',
        isCompleted: false,
        isCurrent: false
      },
      {
        status: 'on_the_way',
        title: 'Dispatched on Road',
        description: 'Rider departing with heat-insulated bag.',
        timestamp: 'Est. 21:28',
        isCompleted: false,
        isCurrent: false
      },
      {
        status: 'delivered',
        title: 'Completed Delivery',
        description: 'Delivered to Grange Road.',
        timestamp: 'Est. 21:38',
        isCompleted: false,
        isCurrent: false
      }
    ]
  },
  'GF-73190': {
    id: 'GF-73190',
    trackingCode: 'GF-73190',
    customerName: 'Darren Koh',
    customerPhone: '+65 9456 1234',
    deliveryAddress: '39 Cairnhill Circle',
    unitNumber: '#03-05',
    deliveryNotes: 'Contactless dropoff successful.',
    restaurant: {
      id: 'rest-4',
      name: 'LiHO Tea & Boba Craft House',
      address: '180 Kitchener Rd, Singapore',
      coords: { x: 25, y: 50 }
    },
    customerCoords: { x: 70, y: 40 },
    driverCoords: { x: 70, y: 40 },
    items: [
      {
        dish: RESTAURANTS[3].dishes[0],
        quantity: 2,
        restaurantId: 'rest-4',
        restaurantName: 'LiHO Tea & Boba Craft House'
      },
      {
        dish: RESTAURANTS[3].dishes[2],
        quantity: 1,
        restaurantId: 'rest-4',
        restaurantName: 'LiHO Tea & Boba Craft House'
      }
    ],
    subtotal: 19.6,
    deliveryFee: 1.9,
    discount: 3.0,
    total: 18.5,
    paymentMethod: 'GrabPay',
    status: 'delivered',
    createdAt: '20:30',
    estimatedArrivalMinutes: 0,
    driver: {
      id: 'drv-512',
      name: 'Hafiz Bin Osman',
      phone: '+65 8901 2345',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      rating: 4.98,
      totalTrips: 4520,
      vehicleType: 'Electric Bicycle',
      vehiclePlate: 'EB-2041',
      vehicleModel: 'Fiido D11 City E-Bike',
      vaccinatedAndVerified: true
    },
    timeline: [
      {
        status: 'placed',
        title: 'Order Placed',
        description: 'Order confirmed by LiHO Tea.',
        timestamp: '20:30',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'cooking',
        title: 'Boba Freshly Brewed',
        description: 'Drinks sealed with insulated cold sleeve.',
        timestamp: '20:34',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'picked_up',
        title: 'Driver Collected',
        description: 'Courier collected and verified cup count.',
        timestamp: '20:41',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'on_the_way',
        title: 'In Transit',
        description: 'Courier arrived at Cairnhill Circle.',
        timestamp: '20:52',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'delivered',
        title: 'Delivered to Doorstep',
        description: 'Order placed securely on doorstep shoe bench. Customer notified via app push.',
        timestamp: '20:56',
        isCompleted: true,
        isCurrent: true
      }
    ]
  }
};

export const PROFESSIONAL_PROJECTS: ProfessionalProject[] = [
  {
    id: 'project-omniroute',
    title: 'OmniRoute: Dynamic Urban Courier Routing Engine',
    shortDescription: 'Sub-second real-time rider dispatch & multi-drop path optimization that cuts city food delivery ETA by 22.4%.',
    fullDescription: 'An enterprise-grade routing architecture engineered for high-density metropolitan food delivery. OmniRoute evaluates real-time traffic congestion, live weather storm fronts, and kitchen preparation velocities to calculate Pareto-optimal rider assignment within 85ms.',
    category: 'Routing & Optimization',
    techStack: ['TypeScript', 'Go', 'Redis Geospatial', 'OpenStreetMap', 'WebSockets', 'Graph Hopper'],
    metrics: [
      { label: 'ETA Reduction', value: '-22.4%' },
      { label: 'Dispatch Latency', value: '82 ms' },
      { label: 'On-Time Rate', value: '99.1%' },
      { label: 'Fuel Saved / Rider', value: '18%' }
    ],
    keyFeatures: [
      'Multi-drop batched routing with dynamic pickup time recalculation',
      'Hyperlocal rain radar integration diverting riders to covered arterial roads',
      'Sub-100ms algorithmic matching over 5,000 concurrent active couriers',
      'Real-time traffic sensor ingestion via Kalman smoothing'
    ],
    architectureHighlight: 'Distributed microservices architecture utilizing Redis Geo-indices for spatial k-nearest neighbor queries, paired with custom A* bidirectional graph traversal.',
    demoType: 'routing'
  },
  {
    id: 'project-pulsemap',
    title: 'PulseMap: 60 FPS Client-Side Courier GPS Telemetry',
    shortDescription: 'High-precision telemetry engine interpolating noisy GPS pings with zero jitter and dead reckoning during underpass signal loss.',
    fullDescription: 'Mobile and web telemetry framework that converts sparse 5-10 second GPS coordinates into silky smooth 60 FPS vehicle animations along real road geometries. Features client-side dead reckoning when couriers drive into tunnels or high-rise urban canyons.',
    category: 'Real-Time Telemetry',
    techStack: ['React', 'TypeScript', 'WebGL', 'WebWorkers', 'Kalman Filter', 'Turf.js'],
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Battery Overhead', value: '< 2.1%' },
      { label: 'Jitter Reduction', value: '94%' },
      { label: 'Offline Bridging', value: 'Up to 45s' }
    ],
    keyFeatures: [
      'Adaptive Kalman filter smoothing rapid coordinate oscillations',
      'Snap-to-road spline interpolation matching OpenStreetMap centrelines',
      'Off-thread computation inside WebWorker to prevent UI freezing',
      'Vector heading vector calculation with smooth motorcycle banking angles'
    ],
    architectureHighlight: 'Offloads mathematical spline fitting to an asynchronous WebWorker, passing typed Float64Arrays directly to WebGL canvas buffers for jitter-free rendering.',
    demoType: 'telemetry'
  },
  {
    id: 'project-kitchensync',
    title: 'KitchenSync: Machine Learning Kitchen Prep Forecasting',
    shortDescription: 'Predictive queue throttling and dish prep forecaster minimizing courier curb idle time outside merchant kitchens.',
    fullDescription: 'Logistics bottleneck eliminator that synchronizes courier arrival with the exact minute a hot dish leaves the wok. Uses historical kitchen load, dish complexity, and current order ticket velocity to trigger rider dispatch at the ideal time.',
    category: 'Kitchen Logistics',
    techStack: ['Python', 'FastAPI', 'LightGBM', 'PostgreSQL', 'Docker', 'Next.js'],
    metrics: [
      { label: 'Courier Wait Time', value: '-6.5 mins' },
      { label: 'Food Temperature', value: '+14°C at drop' },
      { label: 'Merchant Throughput', value: '+28%' },
      { label: 'Order Cancellation', value: '-41%' }
    ],
    keyFeatures: [
      'Dish-level complexity scoring (e.g., deep-fried vs. pre-batched)',
      'Dynamic ticket throttling during peak lunch and dinner rushes',
      'Kitchen station load balancing across fryers, woks, and packaging',
      'Automated dispatch delay triggers when kitchen queues spike'
    ],
    architectureHighlight: 'Gradient-boosted decision trees trained on over 2.4 million completed order tickets, re-calibrating live model weights every 15 minutes per merchant cluster.',
    demoType: 'kitchen'
  },
  {
    id: 'project-safedrop',
    title: 'SafeDrop AI: Geofenced Proof-of-Delivery Verification',
    shortDescription: 'Edge computer vision and geofencing pipeline validating doorstep dropoffs, bag seals, and zero-contact photo verification.',
    fullDescription: 'Customer confidence system guaranteeing verified contactless dropoffs. SafeDrop AI evaluates the courier drop-off photo on-device within 400ms, checking that the meal package is placed in a clean area, the tamper-proof seal is intact, and GPS matches the geofence perimeter.',
    category: 'Security & AI Verification',
    techStack: ['TensorFlow.js', 'React Native', 'AWS S3', 'Node.js', 'Geofence API'],
    metrics: [
      { label: 'False Claims Drop', value: '-78%' },
      { label: 'Validation Speed', value: '380 ms' },
      { label: 'Drop Accuracy', value: '99.7%' },
      { label: 'Customer Trust Score', value: '4.9 / 5.0' }
    ],
    keyFeatures: [
      'Client-side instant blur and lighting detection before courier leaves',
      'High-precision 15-meter doorstep geofence validation',
      'Automated tamper-evident label recognition on GrabFood paper bags',
      'One-tap customer push notification with high-res photo and timestamp'
    ],
    architectureHighlight: 'Quantized MobileNetV3 model running entirely in browser/client edge runtime with sub-second image validation before upload to cold storage.',
    demoType: 'safedrop'
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: 'INQ-901',
    orderId: 'GF-88492',
    customerName: 'Marcus Lim',
    email: 'marcus.lim@example.com',
    phone: '+65 9123 4567',
    topic: 'dietary_instruction' as const,
    message: 'Please ensure extra sweet soy sauce is packed for the chicken rice.',
    status: 'In Progress' as const,
    timestamp: '21:12'
  },
  {
    id: 'INQ-842',
    orderId: 'GF-73190',
    customerName: 'Darren Koh',
    email: 'darren.k@example.com',
    phone: '+65 9456 1234',
    topic: 'rider_feedback' as const,
    message: 'Driver Hafiz was very courteous and left the drinks safely in the shade. Excellent delivery!',
    status: 'Resolved' as const,
    timestamp: '20:58'
  }
];
