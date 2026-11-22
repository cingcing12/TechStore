// Required Products exactly as specified in the PDF Practical Exercise 1:
// 1. Laptop - $650
// 2. Mouse - $15
// 3. Keyboard - $25
// 4. Monitor - $120

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Pro Ultrabook Laptop 15.6"',
    shortName: 'Laptop',
    category: 'Laptops',
    categoryId: 1,
    price: 650,
    originalPrice: 799,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    stockCount: 18,
    badge: 'Best Seller',
    description: 'High-performance ultra-thin laptop powered by latest generation octa-core processor, 16GB RAM, 512GB NVMe SSD, and vivid FHD IPS anti-glare display. Ideal for software development, design, and multitasking.',
    specs: {
      screen: '15.6" FHD (1920x1080) IPS',
      cpu: 'Intel Core i7 12-Gen / Ryzen 7',
      ram: '16GB DDR5 4800MHz',
      storage: '512GB M.2 PCIe NVMe SSD',
      battery: 'Up to 11 Hours Fast-Charge',
      weight: '1.45 kg'
    },
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    color: 'Space Gray'
  },
  {
    id: 'prod-2',
    name: 'Precision Wireless Ergonomic Mouse',
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
    description: 'Ultra-silent ergonomic 2.4GHz & Bluetooth dual-mode wireless mouse with adjustable DPI (800/1200/1600), whisper-quiet switches, and ergonomic palm contour for long work hours.',
    specs: {
      connectivity: '2.4G USB Receiver & Bluetooth 5.2',
      dpi: 'Up to 1600 DPI (3 Levels)',
      batteryLife: 'Up to 6 Months rechargeable',
      clicks: 'Silent Click Technology (< 20dB)',
      weight: '85 grams'
    },
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    color: 'Matte Black'
  },
  {
    id: 'prod-3',
    name: 'RGB Mechanical Gaming Keyboard',
    shortName: 'Keyboard',
    category: 'Peripherals',
    categoryId: 2,
    price: 25,
    originalPrice: 40,
    rating: 4.8,
    reviewsCount: 275,
    inStock: true,
    stockCount: 42,
    badge: 'Staff Pick',
    description: 'Compact mechanical gaming keyboard equipped with tactile blue switches, 18 dynamic per-key RGB backlight modes, double-shot ABS keycaps, and detachable braided Type-C cable.',
    specs: {
      switches: 'Tactile Mechanical Clicky Switches',
      lighting: '18 Backlight RGB Modes',
      keycaps: 'Double-Shot ABS Non-Fade',
      layout: 'Tenkeyless Compact 87 Keys',
      connection: 'Detachable USB Type-C'
    },
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    color: 'Midnight Black'
  },
  {
    id: 'prod-4',
    name: 'UltraSharp 27" 4K IPS Monitor',
    shortName: 'Monitor',
    category: 'Monitors',
    categoryId: 3,
    price: 120,
    originalPrice: 169,
    rating: 4.9,
    reviewsCount: 198,
    inStock: true,
    stockCount: 24,
    badge: 'Hot Deal',
    description: 'Stunning 27-inch 4K UHD frameless monitor featuring 99% sRGB color accuracy, 75Hz refresh rate with AMD FreeSync, built-in dual stereo speakers, and versatile HDMI/DisplayPort connectivity.',
    specs: {
      resolution: '4K UHD (3840 x 2160)',
      panel: 'Super IPS Frameless Design',
      refreshRate: '75Hz with FreeSync',
      colorGamut: '99% sRGB Color Accuracy',
      ports: '2x HDMI 2.0, 1x DP 1.4, Audio Out'
    },
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    color: 'Silver Edge'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products', count: 4 },
  { id: 'Laptops', name: 'Laptops', count: 1 },
  { id: 'Peripherals', name: 'Peripherals & Accessories', count: 2 },
  { id: 'Monitors', name: 'Monitors & Displays', count: 1 }
];

export const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    title: 'Standard Delivery',
    time: '3 - 5 Business Days',
    price: 0,
    description: 'Reliable ground shipping with tracking code'
  },
  {
    id: 'express',
    title: 'Express Priority',
    time: '1 - 2 Business Days',
    price: 15,
    description: 'Expedited fast delivery directly to your door'
  },
  {
    id: 'overnight',
    title: 'VIP Overnight',
    time: 'Guaranteed Next Day',
    price: 25,
    description: 'Immediate handling & morning delivery'
  }
];

// Coupon promo codes available for testing
export const PROMO_CODES = {
  'SAVE10': { discountPercent: 10, label: '10% Off Cart Subtotal' },
  'WELCOME20': { discountPercent: 20, label: '20% Special Welcome Discount' },
  'STUDENT5': { discountPercent: 5, label: '5% Academic Student Discount' }
};

// Database schema specifications directly addressing Practical Exercise Database Design (Page 4)
export const DATABASE_SCHEMA = {
  tables: [
    {
      name: 'Customers',
      description: 'Stores customer profile information and shipping addresses',
      primaryKey: 'customer_id',
      columns: [
        { name: 'customer_id', type: 'INT', isPK: true, isFK: false, desc: 'Auto-increment Unique Identifier' },
        { name: 'first_name', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'Customer First Name' },
        { name: 'last_name', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'Customer Last Name' },
        { name: 'email', type: 'VARCHAR(255)', isPK: false, isFK: false, desc: 'Unique Email Address' },
        { name: 'phone', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'Contact Phone Number' },
        { name: 'address', type: 'TEXT', isPK: false, isFK: false, desc: 'Street Delivery Address' },
        { name: 'city', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'City / Municipality' },
        { name: 'postal_code', type: 'VARCHAR(20)', isPK: false, isFK: false, desc: 'Postal or ZIP Code' },
        { name: 'created_at', type: 'TIMESTAMP', isPK: false, isFK: false, desc: 'Account Registration Date' }
      ]
    },
    {
      name: 'Categories',
      description: 'Classification hierarchy for e-commerce products',
      primaryKey: 'category_id',
      columns: [
        { name: 'category_id', type: 'INT', isPK: true, isFK: false, desc: 'Auto-increment Primary Key' },
        { name: 'name', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'Category Name (Laptops, Peripherals, etc.)' },
        { name: 'slug', type: 'VARCHAR(100)', isPK: false, isFK: false, desc: 'SEO-friendly URL identifier' },
        { name: 'description', type: 'TEXT', isPK: false, isFK: false, desc: 'Category summary' }
      ]
    },
    {
      name: 'Products',
      description: 'Inventory items available for purchase with pricing',
      primaryKey: 'product_id',
      columns: [
        { name: 'product_id', type: 'INT', isPK: true, isFK: false, desc: 'Auto-increment Primary Key' },
        { name: 'category_id', type: 'INT', isPK: false, isFK: true, foreignTable: 'Categories', desc: 'FK to Categories(category_id)' },
        { name: 'name', type: 'VARCHAR(255)', isPK: false, isFK: false, desc: 'Product Title (Laptop, Mouse, Keyboard, Monitor)' },
        { name: 'price', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Unit Price in USD ($650, $15, $25, $120)' },
        { name: 'stock_quantity', type: 'INT', isPK: false, isFK: false, desc: 'Available units in warehouse' },
        { name: 'image_url', type: 'VARCHAR(500)', isPK: false, isFK: false, desc: 'Thumbnail image path' },
        { name: 'is_active', type: 'BOOLEAN', isPK: false, isFK: false, desc: 'Available for sale flag' }
      ]
    },
    {
      name: 'Orders',
      description: 'Customer purchase transactions and status tracking',
      primaryKey: 'order_id',
      columns: [
        { name: 'order_id', type: 'INT', isPK: true, isFK: false, desc: 'Auto-increment Primary Key' },
        { name: 'order_code', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'Display Order ID (e.g. ORD-0001)' },
        { name: 'customer_id', type: 'INT', isPK: false, isFK: true, foreignTable: 'Customers', desc: 'FK to Customers(customer_id)' },
        { name: 'order_date', type: 'TIMESTAMP', isPK: false, isFK: false, desc: 'Transaction placement date and time' },
        { name: 'subtotal', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Order sum before shipping and taxes' },
        { name: 'shipping_fee', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Applied shipping cost' },
        { name: 'total_amount', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Grand Total paid by customer' },
        { name: 'shipping_method', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'Standard, Express, Overnight' },
        { name: 'order_status', type: 'VARCHAR(50)', isPK: false, isFK: false, desc: 'Status: Pending, Processing, Shipped, Completed' }
      ]
    },
    {
      name: 'Order_Items',
      description: 'Line item breakdown bridging Orders and Products (Many-to-Many)',
      primaryKey: 'order_item_id',
      columns: [
        { name: 'order_item_id', type: 'INT', isPK: true, isFK: false, desc: 'Auto-increment Primary Key' },
        { name: 'order_id', type: 'INT', isPK: false, isFK: true, foreignTable: 'Orders', desc: 'FK to Orders(order_id)' },
        { name: 'product_id', type: 'INT', isPK: false, isFK: true, foreignTable: 'Products', desc: 'FK to Products(product_id)' },
        { name: 'quantity', type: 'INT', isPK: false, isFK: false, desc: 'Purchased quantity' },
        { name: 'unit_price', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'Snapshot of price at time of purchase' },
        { name: 'total_line_price', type: 'DECIMAL(10,2)', isPK: false, isFK: false, desc: 'quantity * unit_price' }
      ]
    }
  ],
  relationships: [
    { from: 'Categories', to: 'Products', type: '1 to Many (1:N)', desc: 'One Category contains Many Products' },
    { from: 'Customers', to: 'Orders', type: '1 to Many (1:N)', desc: 'One Customer places Many Orders' },
    { from: 'Orders', to: 'Order_Items', type: '1 to Many (1:N)', desc: 'One Order contains Many Line Items' },
    { from: 'Products', to: 'Order_Items', type: '1 to Many (1:N)', desc: 'One Product is referenced in Many Order Items' }
  ]
};
