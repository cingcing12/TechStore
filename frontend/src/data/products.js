// Products catalog strictly matching PDF Exercise 1:
// 1. Laptop - $650
// 2. Mouse - $15
// 3. Keyboard - $25
// 4. Monitor - $120

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Ultrabook Pro 15.6"',
    shortName: 'Laptop',
    category: 'Laptops',
    categoryId: 1,
    price: 650,
    originalPrice: 799,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    stockCount: 18,
    badge: 'Featured',
    description: 'Precision engineered ultra-slim laptop featuring 16GB high-speed memory, 512GB PCIe NVMe SSD, and 15.6-inch anti-glare IPS display. Optimized for all-day performance and seamless multitasking.',
    specs: {
      screen: '15.6" FHD IPS (1920x1080)',
      processor: 'Octa-Core 4.2GHz Turbo',
      memory: '16GB DDR5 4800MHz',
      storage: '512GB NVMe M.2 SSD',
      battery: 'Up to 11 Hours',
      weight: '1.45 kg'
    },
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    color: 'Space Gray'
  },
  {
    id: 'prod-2',
    name: 'Precision Wireless Mouse',
    shortName: 'Mouse',
    category: 'Peripherals',
    categoryId: 2,
    price: 15,
    originalPrice: 25,
    rating: 4.7,
    reviewsCount: 389,
    inStock: true,
    stockCount: 65,
    badge: 'Popular',
    description: 'Ergonomic dual-connectivity wireless mouse with 2.4GHz USB and Bluetooth 5.2. Features 1600 DPI optical sensor and ultra-quiet silent-switch buttons.',
    specs: {
      connectivity: '2.4GHz USB & Bluetooth 5.2',
      sensor: 'Optical up to 1600 DPI',
      clicks: 'Silent Click (< 20dB)',
      battery: 'Rechargeable Type-C',
      weight: '82 grams'
    },
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    color: 'Matte Black'
  },
  {
    id: 'prod-3',
    name: 'Mechanical RGB Keyboard',
    shortName: 'Keyboard',
    category: 'Peripherals',
    categoryId: 2,
    price: 25,
    originalPrice: 40,
    rating: 4.8,
    reviewsCount: 275,
    inStock: true,
    stockCount: 42,
    badge: 'Best Value',
    description: 'Compact tenkeyless mechanical keyboard featuring tactile clicky switches, 18 customizable RGB backlight modes, double-shot keycaps, and detachable Type-C braided cable.',
    specs: {
      switches: 'Tactile Mechanical Switches',
      lighting: '18 Per-Key RGB Modes',
      layout: 'Tenkeyless 87 Keys',
      connection: 'Detachable USB-C',
      keycaps: 'Double-Shot PBT Non-Fade'
    },
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    color: 'Midnight Slate'
  },
  {
    id: 'prod-4',
    name: 'UltraSharp 27" 4K Monitor',
    shortName: 'Monitor',
    category: 'Displays',
    categoryId: 3,
    price: 120,
    originalPrice: 169,
    rating: 4.9,
    reviewsCount: 198,
    inStock: true,
    stockCount: 24,
    badge: 'Top Pick',
    description: '27-inch 4K UHD frameless monitor with factory-calibrated 99% sRGB color gamut, 75Hz refresh rate with AMD FreeSync, and dual HDMI and DisplayPort inputs.',
    specs: {
      resolution: '4K UHD (3840 x 2160)',
      panel: 'Super IPS Frameless',
      refresh: '75Hz with FreeSync',
      colorAccuracy: '99% sRGB Gamut',
      ports: '2x HDMI 2.0, DisplayPort 1.4'
    },
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    color: 'Silver Anodized'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'Laptops', name: 'Laptops' },
  { id: 'Peripherals', name: 'Peripherals' },
  { id: 'Displays', name: 'Displays' }
];

export const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    title: 'Standard Ground Delivery',
    time: '3 - 5 Business Days',
    price: 0,
    description: 'Tracked standard delivery to your residential or office address'
  },
  {
    id: 'express',
    title: 'Priority Express Delivery',
    time: '1 - 2 Business Days',
    price: 15,
    description: 'Fast expedited transit with priority processing'
  },
  {
    id: 'overnight',
    title: 'VIP Overnight Courier',
    time: 'Next Day Morning',
    price: 25,
    description: 'Guaranteed next morning delivery with signature confirmation'
  }
];

export const PROMO_CODES = {
  'SAVE10': { discountPercent: 10, label: '10% Off Cart Subtotal' },
  'WELCOME20': { discountPercent: 20, label: '20% Welcome Discount' }
};
