const Database = require('better-sqlite3');
const path = require('path');

// Use the same path as lib/database.ts
const dbPath = path.join(process.cwd(), 'lacto-clear.db');
const db = new Database(dbPath);

console.log('🗄️  Initializing database for Vercel deployment...');
console.log('Database path:', dbPath);

// Create all tables
db.exec(`
  -- Products table
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    features TEXT,
    image TEXT,
    color TEXT,
    badge TEXT,
    enabled INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- FAQs table
  CREATE TABLE IF NOT EXISTS faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    color TEXT,
    sort_order INTEGER DEFAULT 0,
    enabled INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Testimonials table
  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT,
    rating INTEGER DEFAULT 5,
    text TEXT NOT NULL,
    highlight TEXT,
    color TEXT,
    enabled INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Site settings table
  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Orders table
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stripe_session_id TEXT UNIQUE,
    stripe_payment_intent_id TEXT,
    customer_email TEXT NOT NULL,
    customer_name TEXT,
    total_amount INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Order items table
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  );

  -- Shipping addresses table
  CREATE TABLE IF NOT EXISTS shipping_addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    line1 TEXT NOT NULL,
    line2 TEXT,
    city TEXT NOT NULL,
    state TEXT,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  );

  -- Analytics events table
  CREATE TABLE IF NOT EXISTS analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    event_data TEXT,
    page_url TEXT,
    user_agent TEXT,
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Create indexes
  CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(event_type);
  CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_events(created_at);
  CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
  CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
`);

console.log('✅ Tables created');

// Initialize products
const products = [
  {
    id: 'core',
    name: 'LactoClear® Core',
    price: 49.99,
    description: 'Break down lactate accumulation and dismantle the protective barrier',
    image: '/products/core-bottle.png',
    color: '#00D036',
    badge: null,
    features: JSON.stringify(['Lactate breakdown', 'Barrier dismantling', 'Foundation protocol']),
  },
  {
    id: 'mitofuel',
    name: 'MitoFuel®',
    price: 54.99,
    description: 'Reactivate mitochondrial function and accelerate metabolic recovery',
    image: '/products/mitofuel-bottle.png',
    color: '#FF7A00',
    badge: null,
    features: JSON.stringify(['Mitochondrial activation', 'Metabolic acceleration', 'Recovery support']),
  },
  {
    id: 'complete',
    name: 'LactoClear® Complete System',
    price: 89.99,
    description: 'The complete two-step protocol: Core + MitoFuel for optimal results',
    image: '/products/bottles.png',
    color: '#00A3E8',
    badge: 'BEST VALUE',
    features: JSON.stringify(['Complete protocol', 'Core + MitoFuel', 'Save $15']),
  },
  {
    id: 'nasal-core',
    name: 'LactoClear® Nasal Core',
    price: 39.99,
    description: 'Fast-acting nasal spray delivery for rapid lactate clearance',
    image: '/products/nasal-spray-core.png',
    color: '#00D036',
    badge: null,
    features: JSON.stringify(['Nasal delivery', 'Fast-acting', 'Convenient application']),
  },
  {
    id: 'nasal-mitofuel',
    name: 'MitoFuel® Nasal Spray',
    price: 44.99,
    description: 'Targeted nasal delivery for enhanced mitochondrial support',
    image: '/products/nasal-spray-mitofuel.png',
    color: '#FF7A00',
    badge: null,
    features: JSON.stringify(['Nasal delivery', 'Mitochondrial support', 'Quick absorption']),
  },
];

const insertProduct = db.prepare(`
  INSERT OR REPLACE INTO products (id, name, price, description, features, image, color, badge, enabled, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
`);

products.forEach((product, index) => {
  insertProduct.run(
    product.id,
    product.name,
    product.price,
    product.description,
    product.features,
    product.image,
    product.color,
    product.badge,
    index
  );
});

console.log(`✅ Initialized ${products.length} products`);

// Initialize FAQs
const faqs = [
  {
    category: 'core',
    question: 'What is LactoClear® Core?',
    answer: 'LactoClear® Core is the foundation of our two-step protocol. It is designed to break down excess lactate accumulation and dismantle the protective barrier that blocks recovery pathways.',
    color: '#00D036',
    sort_order: 1,
  },
  {
    category: 'core',
    question: 'How do I take Core?',
    answer: 'Follow the dosing instructions on the product label or as directed by your healthcare professional. Core is typically taken before MitoFuel for optimal results.',
    color: '#00D036',
    sort_order: 2,
  },
  {
    category: 'mitofuel',
    question: 'What is MitoFuel®?',
    answer: 'MitoFuel® is the activation phase of the LactoClear® system. It reactivates mitochondrial function and accelerates metabolic recovery once the lactate barrier has been cleared by Core.',
    color: '#FF7A00',
    sort_order: 3,
  },
  {
    category: 'mitofuel',
    question: 'Can I take MitoFuel without Core?',
    answer: 'While MitoFuel can be taken alone, it works best when combined with Core as part of the complete LactoClear® system. Core clears the pathway, allowing MitoFuel to work more effectively.',
    color: '#FF7A00',
    sort_order: 4,
  },
  {
    category: 'nasal',
    question: 'What are the LactoClear® Nasal Sprays?',
    answer: 'The LactoClear® nasal sprays provide targeted delivery for faster action. They complement the oral system and offer an alternative delivery method for those who prefer nasal administration.',
    color: '#00A3E8',
    sort_order: 5,
  },
  {
    category: 'nasal',
    question: 'How do I use the nasal sprays?',
    answer: 'Follow the instructions on the product label. Generally, nasal sprays are administered directly into each nostril. Do not exceed the recommended dosage.',
    color: '#00A3E8',
    sort_order: 6,
  },
  {
    category: 'general',
    question: 'How long does it take to see results?',
    answer: 'Results vary by individual. Some people notice changes within days, while others may take several weeks. Consistency is key for optimal results.',
    color: '#FFFFFF',
    sort_order: 7,
  },
  {
    category: 'general',
    question: 'Is LactoClear® safe?',
    answer: 'LactoClear® products are formulated with quality ingredients. However, we recommend consulting with your healthcare professional before starting any new supplement regimen, especially if you have existing health conditions or take medications.',
    color: '#FFFFFF',
    sort_order: 8,
  },
  {
    category: 'general',
    question: 'Can I take LactoClear® with other supplements?',
    answer: 'In most cases, yes. However, we recommend consulting with your healthcare professional to ensure there are no interactions with your current supplement or medication regimen.',
    color: '#FFFFFF',
    sort_order: 9,
  },
  {
    category: 'general',
    question: 'What if I miss a dose?',
    answer: 'If you miss a dose, take it as soon as you remember. If it\'s close to your next scheduled dose, skip the missed dose and resume your normal schedule. Do not double up on doses.',
    color: '#FFFFFF',
    sort_order: 10,
  },
];

const insertFAQ = db.prepare(`
  INSERT OR REPLACE INTO faqs (category, question, answer, color, sort_order, enabled)
  VALUES (?, ?, ?, ?, ?, 1)
`);

faqs.forEach((faq) => {
  insertFAQ.run(
    faq.category,
    faq.question,
    faq.answer,
    faq.color,
    faq.sort_order
  );
});

console.log(`✅ Initialized ${faqs.length} FAQs`);

db.close();
console.log('✅ Database initialization complete!');
