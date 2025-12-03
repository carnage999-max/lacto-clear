import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'lacto-clear.db');
const db = new Database(dbPath);

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stripe_session_id TEXT UNIQUE NOT NULL,
    stripe_payment_intent TEXT,
    customer_email TEXT,
    customer_name TEXT,
    amount_total INTEGER NOT NULL,
    currency TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (id)
  );

  CREATE TABLE IF NOT EXISTS shipping_addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    name TEXT,
    address_line1 TEXT,
    address_line2 TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    country TEXT,
    FOREIGN KEY (order_id) REFERENCES orders (id)
  );

  CREATE INDEX IF NOT EXISTS idx_orders_session ON orders(stripe_session_id);
  CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
  CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

  -- Products table for admin management
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

  -- FAQs table for content management
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Site settings for homepage and general content
  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

  CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(event_type);
  CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_events(created_at);
`);

export interface Order {
  id?: number;
  stripe_session_id: string;
  stripe_payment_intent?: string;
  customer_email?: string;
  customer_name?: string;
  amount_total: number;
  currency: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id?: number;
  order_id: number;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  id?: number;
  order_id: number;
  name?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

// Create a new order
export function createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) {
  const stmt = db.prepare(`
    INSERT INTO orders (
      stripe_session_id, stripe_payment_intent, customer_email, customer_name,
      amount_total, currency, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    order.stripe_session_id,
    order.stripe_payment_intent || null,
    order.customer_email || null,
    order.customer_name || null,
    order.amount_total,
    order.currency,
    order.status
  );

  return result.lastInsertRowid;
}

// Add order items
export function createOrderItems(orderId: number, items: Omit<OrderItem, 'id' | 'order_id'>[]) {
  const stmt = db.prepare(`
    INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
    VALUES (?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((items: Omit<OrderItem, 'id' | 'order_id'>[]) => {
    for (const item of items) {
      stmt.run(orderId, item.product_id, item.product_name, item.quantity, item.price);
    }
  });

  insertMany(items);
}

// Add shipping address
export function createShippingAddress(address: Omit<ShippingAddress, 'id'>) {
  const stmt = db.prepare(`
    INSERT INTO shipping_addresses (
      order_id, name, address_line1, address_line2, city, state, postal_code, country
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    address.order_id,
    address.name || null,
    address.address_line1 || null,
    address.address_line2 || null,
    address.city || null,
    address.state || null,
    address.postal_code || null,
    address.country || null
  );

  return result.lastInsertRowid;
}

// Get order by session ID
export function getOrderBySessionId(sessionId: string) {
  const stmt = db.prepare('SELECT * FROM orders WHERE stripe_session_id = ?');
  return stmt.get(sessionId) as Order | undefined;
}

// Get order items
export function getOrderItems(orderId: number) {
  const stmt = db.prepare('SELECT * FROM order_items WHERE order_id = ?');
  return stmt.all(orderId) as OrderItem[];
}

// Get shipping address
export function getShippingAddress(orderId: number) {
  const stmt = db.prepare('SELECT * FROM shipping_addresses WHERE order_id = ?');
  return stmt.get(orderId) as ShippingAddress | undefined;
}

// Get all orders (with pagination)
export function getAllOrders(limit = 50, offset = 0) {
  const stmt = db.prepare(`
    SELECT * FROM orders 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `);
  return stmt.all(limit, offset) as Order[];
}

// Update order status
export function updateOrderStatus(sessionId: string, status: string, paymentIntent?: string) {
  const stmt = db.prepare(`
    UPDATE orders 
    SET status = ?, stripe_payment_intent = ?, updated_at = CURRENT_TIMESTAMP
    WHERE stripe_session_id = ?
  `);
  return stmt.run(status, paymentIntent || null, sessionId);
}

// Get order statistics
export function getOrderStats() {
  const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get() as { count: number };
  const totalRevenue = db.prepare('SELECT SUM(amount_total) as total FROM orders WHERE status = ?').get('paid') as { total: number };
  const recentOrders = db.prepare("SELECT COUNT(*) as count FROM orders WHERE created_at >= datetime('now', '-7 days')").get() as { count: number };

  return {
    totalOrders: totalOrders.count,
    totalRevenue: totalRevenue.total || 0,
    recentOrders: recentOrders.count,
  };
}

// ============= PRODUCTS =============
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  features?: string; // JSON string
  image?: string;
  color?: string;
  badge?: string;
  enabled: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export function getAllProducts() {
  const stmt = db.prepare('SELECT * FROM products ORDER BY sort_order ASC, name ASC');
  return stmt.all() as Product[];
}

export function getEnabledProducts() {
  const stmt = db.prepare('SELECT * FROM products WHERE enabled = 1 ORDER BY sort_order ASC, name ASC');
  return stmt.all() as Product[];
}

export function getProductById(id: string) {
  const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
  return stmt.get(id) as Product | undefined;
}

export function createProduct(product: Omit<Product, 'created_at' | 'updated_at'>) {
  const stmt = db.prepare(`
    INSERT INTO products (id, name, price, description, features, image, color, badge, enabled, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(
    product.id, product.name, product.price, product.description || null,
    product.features || null, product.image || null, product.color || null,
    product.badge || null, product.enabled, product.sort_order
  );
}

export function updateProduct(id: string, product: Partial<Product>) {
  const fields = [];
  const values = [];
  
  if (product.name !== undefined) { fields.push('name = ?'); values.push(product.name); }
  if (product.price !== undefined) { fields.push('price = ?'); values.push(product.price); }
  if (product.description !== undefined) { fields.push('description = ?'); values.push(product.description); }
  if (product.features !== undefined) { fields.push('features = ?'); values.push(product.features); }
  if (product.image !== undefined) { fields.push('image = ?'); values.push(product.image); }
  if (product.color !== undefined) { fields.push('color = ?'); values.push(product.color); }
  if (product.badge !== undefined) { fields.push('badge = ?'); values.push(product.badge); }
  if (product.enabled !== undefined) { fields.push('enabled = ?'); values.push(product.enabled); }
  if (product.sort_order !== undefined) { fields.push('sort_order = ?'); values.push(product.sort_order); }
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`);
  return stmt.run(...values);
}

export function deleteProduct(id: string) {
  const stmt = db.prepare('DELETE FROM products WHERE id = ?');
  return stmt.run(id);
}

// ============= FAQs =============
export interface FAQ {
  id?: number;
  category: string;
  question: string;
  answer: string;
  color?: string;
  sort_order: number;
  enabled: number;
  created_at?: string;
  updated_at?: string;
}

export function getAllFAQs() {
  const stmt = db.prepare('SELECT * FROM faqs ORDER BY sort_order ASC, id ASC');
  return stmt.all() as FAQ[];
}

export function getEnabledFAQs() {
  const stmt = db.prepare('SELECT * FROM faqs WHERE enabled = 1 ORDER BY sort_order ASC, id ASC');
  return stmt.all() as FAQ[];
}

export function createFAQ(faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>) {
  const stmt = db.prepare(`
    INSERT INTO faqs (category, question, answer, color, sort_order, enabled)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(faq.category, faq.question, faq.answer, faq.color || null, faq.sort_order, faq.enabled);
}

export function updateFAQ(id: number, faq: Partial<FAQ>) {
  const fields = [];
  const values = [];
  
  if (faq.category !== undefined) { fields.push('category = ?'); values.push(faq.category); }
  if (faq.question !== undefined) { fields.push('question = ?'); values.push(faq.question); }
  if (faq.answer !== undefined) { fields.push('answer = ?'); values.push(faq.answer); }
  if (faq.color !== undefined) { fields.push('color = ?'); values.push(faq.color); }
  if (faq.sort_order !== undefined) { fields.push('sort_order = ?'); values.push(faq.sort_order); }
  if (faq.enabled !== undefined) { fields.push('enabled = ?'); values.push(faq.enabled); }
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`UPDATE faqs SET ${fields.join(', ')} WHERE id = ?`);
  return stmt.run(...values);
}

export function deleteFAQ(id: number) {
  const stmt = db.prepare('DELETE FROM faqs WHERE id = ?');
  return stmt.run(id);
}

// ============= TESTIMONIALS =============
export interface Testimonial {
  id?: number;
  name: string;
  location?: string;
  rating: number;
  text: string;
  highlight?: string;
  color?: string;
  enabled: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export function getAllTestimonials() {
  const stmt = db.prepare('SELECT * FROM testimonials ORDER BY sort_order ASC, id DESC');
  return stmt.all() as Testimonial[];
}

export function getEnabledTestimonials() {
  const stmt = db.prepare('SELECT * FROM testimonials WHERE enabled = 1 ORDER BY sort_order ASC, id DESC');
  return stmt.all() as Testimonial[];
}

export function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) {
  const stmt = db.prepare(`
    INSERT INTO testimonials (name, location, rating, text, highlight, color, enabled, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(
    testimonial.name, testimonial.location || null, testimonial.rating,
    testimonial.text, testimonial.highlight || null, testimonial.color || null,
    testimonial.enabled, testimonial.sort_order
  );
}

export function updateTestimonial(id: number, testimonial: Partial<Testimonial>) {
  const fields = [];
  const values = [];
  
  if (testimonial.name !== undefined) { fields.push('name = ?'); values.push(testimonial.name); }
  if (testimonial.location !== undefined) { fields.push('location = ?'); values.push(testimonial.location); }
  if (testimonial.rating !== undefined) { fields.push('rating = ?'); values.push(testimonial.rating); }
  if (testimonial.text !== undefined) { fields.push('text = ?'); values.push(testimonial.text); }
  if (testimonial.highlight !== undefined) { fields.push('highlight = ?'); values.push(testimonial.highlight); }
  if (testimonial.color !== undefined) { fields.push('color = ?'); values.push(testimonial.color); }
  if (testimonial.enabled !== undefined) { fields.push('enabled = ?'); values.push(testimonial.enabled); }
  if (testimonial.sort_order !== undefined) { fields.push('sort_order = ?'); values.push(testimonial.sort_order); }
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`UPDATE testimonials SET ${fields.join(', ')} WHERE id = ?`);
  return stmt.run(...values);
}

export function deleteTestimonial(id: number) {
  const stmt = db.prepare('DELETE FROM testimonials WHERE id = ?');
  return stmt.run(id);
}

// ============= SITE SETTINGS =============
export function getSetting(key: string) {
  const stmt = db.prepare('SELECT value FROM site_settings WHERE key = ?');
  const result = stmt.get(key) as { value: string } | undefined;
  return result?.value;
}

export function setSetting(key: string, value: string) {
  const stmt = db.prepare(`
    INSERT INTO site_settings (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP
  `);
  return stmt.run(key, value, value);
}

// ============= ANALYTICS =============
export interface AnalyticsEvent {
  id?: number;
  event_type: string;
  event_data?: string; // JSON string
  page_url?: string;
  user_agent?: string;
  ip_address?: string;
  created_at?: string;
}

export function trackEvent(event: Omit<AnalyticsEvent, 'id' | 'created_at'>) {
  const stmt = db.prepare(`
    INSERT INTO analytics_events (event_type, event_data, page_url, user_agent, ip_address)
    VALUES (?, ?, ?, ?, ?)
  `);
  return stmt.run(
    event.event_type,
    event.event_data || null,
    event.page_url || null,
    event.user_agent || null,
    event.ip_address || null
  );
}

export function getAnalytics(startDate?: string, endDate?: string) {
  let query = 'SELECT event_type, COUNT(*) as count FROM analytics_events';
  const params: string[] = [];
  
  if (startDate || endDate) {
    query += ' WHERE ';
    if (startDate) {
      query += 'created_at >= ?';
      params.push(startDate);
    }
    if (endDate) {
      if (startDate) query += ' AND ';
      query += 'created_at <= ?';
      params.push(endDate);
    }
  }
  
  query += ' GROUP BY event_type ORDER BY count DESC';
  
  const stmt = db.prepare(query);
  return stmt.all(...params) as { event_type: string; count: number }[];
}

export function getAnalyticsDetail(eventType: string, limit = 100) {
  const stmt = db.prepare(`
    SELECT * FROM analytics_events 
    WHERE event_type = ? 
    ORDER BY created_at DESC 
    LIMIT ?
  `);
  return stmt.all(eventType, limit) as AnalyticsEvent[];
}

export function getProductAnalytics() {
  const stmt = db.prepare(`
    SELECT 
      product_id,
      product_name,
      COUNT(*) as order_count,
      SUM(quantity) as total_quantity,
      SUM(price * quantity) as total_revenue
    FROM order_items
    GROUP BY product_id
    ORDER BY total_revenue DESC
  `);
  return stmt.all() as {
    product_id: string;
    product_name: string;
    order_count: number;
    total_quantity: number;
    total_revenue: number;
  }[];
}

export function getUniquePageViews(startDate?: string, endDate?: string) {
  let query = `
    SELECT 
      page_url,
      COUNT(DISTINCT ip_address) as unique_visitors,
      COUNT(*) as total_views
    FROM analytics_events 
    WHERE event_type = 'page_view'
  `;
  const params: string[] = [];
  
  if (startDate) {
    query += ' AND created_at >= ?';
    params.push(startDate);
  }
  if (endDate) {
    query += ' AND created_at <= ?';
    params.push(endDate);
  }
  
  query += ' GROUP BY page_url ORDER BY unique_visitors DESC';
  
  const stmt = db.prepare(query);
  return stmt.all(...params) as {
    page_url: string;
    unique_visitors: number;
    total_views: number;
  }[];
}

export default db;
