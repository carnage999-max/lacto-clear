const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'lacto-clear.db');
const db = new Database(dbPath);

// Create products table if it doesn't exist
db.exec(`
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
  )
`);

console.log('✅ Products table ready');

// Default products
const products = [
  {
    id: 'core',
    name: 'LactoClear® Core',
    price: 49.99,
    description: 'The foundation of the protocol. Breaks down the lactate barrier.',
    features: JSON.stringify([
      '30-day supply',
      'Lactate clearance support',
      'pH balance restoration',
      'Easy-to-take capsules',
    ]),
    image: '/products/core-bottle.png',
    color: '#00D036',
    badge: null,
    enabled: 1,
    sort_order: 1,
  },
  {
    id: 'mitofuel',
    name: 'MitoFuel®',
    price: 54.99,
    description: 'The activation phase. Reactivates mitochondrial function.',
    features: JSON.stringify([
      '30-day supply',
      'Metabolic activation',
      'Energy production support',
      'Premium formulation',
    ]),
    image: '/products/mitofuel-bottle.png',
    color: '#FF7A00',
    badge: null,
    enabled: 1,
    sort_order: 2,
  },
  {
    id: 'complete',
    name: 'Complete System',
    price: 89.99,
    description: 'Core + MitoFuel. The full two-step protocol for maximum results.',
    features: JSON.stringify([
      'Both Core & MitoFuel',
      '30-day supply of each',
      'Complete protocol',
      'Save $15',
    ]),
    image: '/products/bottles.png',
    color: '#00A3E8',
    badge: 'BEST VALUE',
    enabled: 1,
    sort_order: 3,
  },
  {
    id: 'nasal-core',
    name: 'LactoClear® Core Nasal',
    price: 39.99,
    description: 'Targeted lactate clearance through nasal delivery for rapid action.',
    features: JSON.stringify([
      'Fast-acting nasal delivery',
      'Bypasses digestive system',
      'Convenient application',
      'Complements oral Core formula',
    ]),
    image: '/products/nasal-spray-core.png',
    color: '#00D036',
    badge: null,
    enabled: 1,
    sort_order: 4,
  },
  {
    id: 'nasal-mitofuel',
    name: 'MitoFuel® Nasal',
    price: 44.99,
    description: 'Mitochondrial activation delivered directly for enhanced metabolic support.',
    features: JSON.stringify([
      'Quick absorption',
      'Supports energy production',
      'Easy to use on-the-go',
      'Works with oral MitoFuel',
    ]),
    image: '/products/nasal-spray-mitofuel.png',
    color: '#FF7A00',
    badge: null,
    enabled: 1,
    sort_order: 5,
  },
];

// Insert or update products
const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO products 
  (id, name, price, description, features, image, color, badge, enabled, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

let added = 0;
let updated = 0;

for (const product of products) {
  const existing = db.prepare('SELECT id FROM products WHERE id = ?').get(product.id);
  
  insertStmt.run(
    product.id,
    product.name,
    product.price,
    product.description,
    product.features,
    product.image,
    product.color,
    product.badge,
    product.enabled,
    product.sort_order
  );
  
  if (existing) {
    updated++;
    console.log(`✅ Updated: ${product.name}`);
  } else {
    added++;
    console.log(`✅ Added: ${product.name}`);
  }
}

console.log(`\n🎉 Done! Added ${added} products, updated ${updated} products.`);

db.close();
