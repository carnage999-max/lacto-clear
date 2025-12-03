import { Pool, PoolClient, QueryResult } from 'pg';

// Type definitions
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

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon requires SSL
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Connection pool settings
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Initialize schema on startup
async function initializeSchema() {
  const client = await pool.connect();
  try {
    // Check if tables exist
    const result = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'products'
      );
    `);

    if (!result.rows[0].exists) {
      console.log('📊 Initializing database schema...');
      
      // Run schema initialization
      await client.query(`
        -- Products table
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          description TEXT,
          features JSONB,
          image TEXT,
          color TEXT,
          badge TEXT,
          enabled INTEGER DEFAULT 1,
          sort_order INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- FAQs table
        CREATE TABLE IF NOT EXISTS faqs (
          id SERIAL PRIMARY KEY,
          category TEXT NOT NULL,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          color TEXT,
          sort_order INTEGER DEFAULT 0,
          enabled INTEGER DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Testimonials table
        CREATE TABLE IF NOT EXISTS testimonials (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          location TEXT,
          rating INTEGER DEFAULT 5,
          text TEXT NOT NULL,
          highlight TEXT,
          color TEXT,
          enabled INTEGER DEFAULT 1,
          sort_order INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Site settings table
        CREATE TABLE IF NOT EXISTS site_settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Orders table
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          stripe_session_id TEXT UNIQUE,
          stripe_payment_intent_id TEXT,
          customer_email TEXT NOT NULL,
          customer_name TEXT,
          total_amount INTEGER NOT NULL,
          status TEXT DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Order items table
        CREATE TABLE IF NOT EXISTS order_items (
          id SERIAL PRIMARY KEY,
          order_id INTEGER NOT NULL,
          product_id TEXT NOT NULL,
          product_name TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          price INTEGER NOT NULL,
          FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        );

        -- Shipping addresses table
        CREATE TABLE IF NOT EXISTS shipping_addresses (
          id SERIAL PRIMARY KEY,
          order_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          line1 TEXT NOT NULL,
          line2 TEXT,
          city TEXT NOT NULL,
          state TEXT,
          postal_code TEXT NOT NULL,
          country TEXT NOT NULL,
          FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        );

        -- Analytics events table
        CREATE TABLE IF NOT EXISTS analytics_events (
          id SERIAL PRIMARY KEY,
          event_type TEXT NOT NULL,
          event_data JSONB,
          page_url TEXT,
          user_agent TEXT,
          ip_address TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_products_enabled ON products(enabled);
        CREATE INDEX IF NOT EXISTS idx_products_sort ON products(sort_order);
        CREATE INDEX IF NOT EXISTS idx_faqs_enabled ON faqs(enabled);
        CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
        CREATE INDEX IF NOT EXISTS idx_faqs_sort ON faqs(sort_order);
        CREATE INDEX IF NOT EXISTS idx_testimonials_enabled ON testimonials(enabled);
        CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
        CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
        CREATE INDEX IF NOT EXISTS idx_orders_session ON orders(stripe_session_id);
        CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(event_type);
        CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_events(created_at);
        CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics_events(page_url);

        -- Create timestamp update function
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
        END;
        $$ language 'plpgsql';

        -- Create triggers for automatic timestamps
        DROP TRIGGER IF EXISTS update_products_updated_at ON products;
        CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

        DROP TRIGGER IF EXISTS update_faqs_updated_at ON faqs;
        CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

        DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
        CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

        DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
        CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      `);

      console.log('✅ Schema initialized');
      await initializeDefaultData();
    }
  } finally {
    client.release();
  }
}

// Initialize default data
async function initializeDefaultData() {
  const client = await pool.connect();
  try {
    // Check if products exist
    const productCount = await client.query('SELECT COUNT(*) FROM products');
    
    if (parseInt(productCount.rows[0].count) === 0) {
      console.log('📦 Initializing default products...');
      
      const products = [
        ['core', 'LactoClear® Core', 49.99, 'Break down lactate accumulation and dismantle the protective barrier', '["Lactate breakdown", "Barrier dismantling", "Foundation protocol"]', '/products/core-bottle.png', '#00D036', null],
        ['mitofuel', 'MitoFuel®', 54.99, 'Reactivate mitochondrial function and accelerate metabolic recovery', '["Mitochondrial activation", "Metabolic acceleration", "Recovery support"]', '/products/mitofuel-bottle.png', '#FF7A00', null],
        ['complete', 'LactoClear® Complete System', 89.99, 'The complete two-step protocol: Core + MitoFuel for optimal results', '["Complete protocol", "Core + MitoFuel", "Save $15"]', '/products/bottles.png', '#00A3E8', 'BEST VALUE'],
        ['nasal-core', 'LactoClear® Nasal Core', 39.99, 'Fast-acting nasal spray delivery for rapid lactate clearance', '["Nasal delivery", "Fast-acting", "Convenient application"]', '/products/nasal-spray-core.png', '#00D036', null],
        ['nasal-mitofuel', 'MitoFuel® Nasal Spray', 44.99, 'Targeted nasal delivery for enhanced mitochondrial support', '["Nasal delivery", "Mitochondrial support", "Quick absorption"]', '/products/nasal-spray-mitofuel.png', '#FF7A00', null],
      ];

      for (let i = 0; i < products.length; i++) {
        await client.query(
          'INSERT INTO products (id, name, price, description, features, image, color, badge, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [...products[i], i]
        );
      }
      
      console.log(`✅ Initialized ${products.length} products`);
    }

    // Check if FAQs exist
    const faqCount = await client.query('SELECT COUNT(*) FROM faqs');
    
    if (parseInt(faqCount.rows[0].count) === 0) {
      console.log('❓ Initializing default FAQs...');
      
      const faqs = [
        ['core', 'What is LactoClear® Core?', 'LactoClear® Core is the foundation of our two-step protocol. It is designed to break down excess lactate accumulation and dismantle the protective barrier that blocks recovery pathways.', '#00D036', 1],
        ['core', 'How do I take Core?', 'Follow the dosing instructions on the product label or as directed by your healthcare professional. Core is typically taken before MitoFuel for optimal results.', '#00D036', 2],
        ['mitofuel', 'What is MitoFuel®?', 'MitoFuel® is the activation phase of the LactoClear® system. It reactivates mitochondrial function and accelerates metabolic recovery once the lactate barrier has been cleared by Core.', '#FF7A00', 3],
        ['mitofuel', 'Can I take MitoFuel without Core?', 'While MitoFuel can be taken alone, it works best when combined with Core as part of the complete LactoClear® system. Core clears the pathway, allowing MitoFuel to work more effectively.', '#FF7A00', 4],
        ['nasal', 'What are the LactoClear® Nasal Sprays?', 'The LactoClear® nasal sprays provide targeted delivery for faster action. They complement the oral system and offer an alternative delivery method for those who prefer nasal administration.', '#00A3E8', 5],
        ['nasal', 'How do I use the nasal sprays?', 'Follow the instructions on the product label. Generally, nasal sprays are administered directly into each nostril. Do not exceed the recommended dosage.', '#00A3E8', 6],
        ['general', 'How long does it take to see results?', 'Results vary by individual. Some people notice changes within days, while others may take several weeks. Consistency is key for optimal results.', '#FFFFFF', 7],
        ['general', 'Is LactoClear® safe?', 'LactoClear® products are formulated with quality ingredients. However, we recommend consulting with your healthcare professional before starting any new supplement regimen, especially if you have existing health conditions or take medications.', '#FFFFFF', 8],
        ['general', 'Can I take LactoClear® with other supplements?', 'In most cases, yes. However, we recommend consulting with your healthcare professional to ensure there are no interactions with your current supplement or medication regimen.', '#FFFFFF', 9],
        ['general', 'What if I miss a dose?', 'If you miss a dose, take it as soon as you remember. If it\'s close to your next scheduled dose, skip the missed dose and resume your normal schedule. Do not double up on doses.', '#FFFFFF', 10],
      ];

      for (const faq of faqs) {
        await client.query(
          'INSERT INTO faqs (category, question, answer, color, sort_order) VALUES ($1, $2, $3, $4, $5)',
          faq
        );
      }
      
      console.log(`✅ Initialized ${faqs.length} FAQs`);
    }
  } finally {
    client.release();
  }
}

// Initialize on startup (but only in production/runtime, not during build)
if (process.env.NODE_ENV !== 'development' || process.env.DATABASE_URL) {
  initializeSchema().catch(err => {
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ Database initialization error:', err);
      // Don't exit in production - graceful degradation
    } else {
      console.warn('⚠️  Database initialization warning:', err.message);
    }
  });
}

// Export query function
export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

// Get all enabled products
export async function getEnabledProducts() {
  const result = await query(
    'SELECT * FROM products WHERE enabled = 1 ORDER BY sort_order'
  );
  return result.rows;
}

// Get product by ID
export async function getProductById(id: string) {
  const result = await query(
    'SELECT * FROM products WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

// Get all products
export async function getAllProducts() {
  const result = await query(
    'SELECT * FROM products ORDER BY sort_order'
  );
  return result.rows;
}

// Create product
export async function createProduct(product: any) {
  const result = await query(
    `INSERT INTO products (id, name, price, description, features, image, color, badge, enabled, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [product.id, product.name, product.price, product.description, product.features, 
     product.image, product.color, product.badge, product.enabled || 1, product.sort_order || 0]
  );
  return result.rows[0];
}

// Update product
export async function updateProduct(id: string, updates: any) {
  const fields = Object.keys(updates);
  const values = Object.values(updates);
  const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
  
  const result = await query(
    `UPDATE products SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
}

// Delete product
export async function deleteProduct(id: string) {
  const result = await query(
    'DELETE FROM products WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

// Get enabled FAQs
export async function getEnabledFAQs() {
  const result = await query(
    'SELECT * FROM faqs WHERE enabled = 1 ORDER BY sort_order'
  );
  return result.rows;
}

// Get all FAQs
export async function getAllFAQs() {
  const result = await query(
    'SELECT * FROM faqs ORDER BY sort_order'
  );
  return result.rows;
}

// Create FAQ
export async function createFAQ(faq: any) {
  const result = await query(
    `INSERT INTO faqs (category, question, answer, color, sort_order, enabled)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [faq.category, faq.question, faq.answer, faq.color, faq.sort_order || 0, faq.enabled || 1]
  );
  return result.rows[0];
}

// Update FAQ
export async function updateFAQ(id: number, updates: any) {
  const fields = Object.keys(updates);
  const values = Object.values(updates);
  const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
  
  const result = await query(
    `UPDATE faqs SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
}

// Delete FAQ
export async function deleteFAQ(id: number) {
  const result = await query(
    'DELETE FROM faqs WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

// Get enabled testimonials
export async function getEnabledTestimonials() {
  const result = await query(
    'SELECT * FROM testimonials WHERE enabled = 1 ORDER BY sort_order'
  );
  return result.rows;
}

// Get all testimonials
export async function getAllTestimonials() {
  const result = await query(
    'SELECT * FROM testimonials ORDER BY sort_order'
  );
  return result.rows;
}

// Create testimonial
export async function createTestimonial(testimonial: any) {
  const result = await query(
    `INSERT INTO testimonials (name, location, rating, text, highlight, color, enabled, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [testimonial.name, testimonial.location, testimonial.rating || 5, testimonial.text, 
     testimonial.highlight, testimonial.color, testimonial.enabled || 1, testimonial.sort_order || 0]
  );
  return result.rows[0];
}

// Update testimonial
export async function updateTestimonial(id: number, updates: any) {
  const fields = Object.keys(updates);
  const values = Object.values(updates);
  const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
  
  const result = await query(
    `UPDATE testimonials SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
}

// Delete testimonial
export async function deleteTestimonial(id: number) {
  const result = await query(
    'DELETE FROM testimonials WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

// Orders functions
export async function createOrder(order: any) {
  const result = await query(
    `INSERT INTO orders (stripe_session_id, stripe_payment_intent_id, customer_email, customer_name, total_amount, status)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [order.stripe_session_id, order.stripe_payment_intent_id, order.customer_email, 
     order.customer_name, order.total_amount, order.status || 'pending']
  );
  return result.rows[0];
}

export async function getOrderBySessionId(sessionId: string) {
  const result = await query(
    'SELECT * FROM orders WHERE stripe_session_id = $1',
    [sessionId]
  );
  return result.rows[0] || null;
}

export async function updateOrderStatus(id: number, status: string) {
  const result = await query(
    'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
}

// Analytics functions
export async function trackEvent(event: any) {
  const result = await query(
    `INSERT INTO analytics_events (event_type, event_data, page_url, user_agent, ip_address)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [event.event_type, JSON.stringify(event.event_data || {}), event.page_url, 
     event.user_agent, event.ip_address]
  );
  return result.rows[0];
}

export async function getAnalyticsStats(startDate?: string, endDate?: string) {
  let query_str = 'SELECT event_type, COUNT(*) as count FROM analytics_events WHERE 1=1';
  const params: any[] = [];

  if (startDate) {
    query_str += ` AND created_at >= $${params.length + 1}`;
    params.push(startDate);
  }
  if (endDate) {
    query_str += ` AND created_at <= $${params.length + 1}`;
    params.push(endDate);
  }

  query_str += ' GROUP BY event_type ORDER BY count DESC';

  const result = await query(query_str, params);
  return result.rows;
}

// Alias for backwards compatibility
export async function getAnalytics(startDate?: string, endDate?: string) {
  return getAnalyticsStats(startDate, endDate);
}

export async function getAnalyticsDetail(eventType: string, limit = 100) {
  const result = await query(
    `SELECT * FROM analytics_events 
     WHERE event_type = $1 
     ORDER BY created_at DESC 
     LIMIT $2`,
    [eventType, limit]
  );
  return result.rows;
}

// Site settings
export async function getSetting(key: string) {
  const result = await query(
    'SELECT value FROM site_settings WHERE key = $1',
    [key]
  );
  return result.rows[0]?.value || null;
}

export async function setSetting(key: string, value: string) {
  const result = await query(
    `INSERT INTO site_settings (key, value) VALUES ($1, $2)
     ON CONFLICT(key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP
     RETURNING *`,
    [key, value]
  );
  return result.rows[0];
}

export async function getUniquePageViews(startDate?: string, endDate?: string) {
  let query_str = `
    SELECT 
      page_url,
      COUNT(DISTINCT ip_address) as unique_visitors,
      COUNT(*) as total_views
    FROM analytics_events 
    WHERE event_type = 'page_view'
  `;
  const params: any[] = [];

  if (startDate) {
    query_str += ` AND created_at >= $${params.length + 1}`;
    params.push(startDate);
  }
  if (endDate) {
    query_str += ` AND created_at <= $${params.length + 1}`;
    params.push(endDate);
  }

  query_str += ' GROUP BY page_url ORDER BY unique_visitors DESC';

  const result = await query(query_str, params);
  return result.rows;
}

// Order items management
export async function createOrderItems(orderId: number, items: any[]) {
  for (const item of items) {
    await query(
      `INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
       VALUES ($1, $2, $3, $4, $5)`,
      [orderId, item.product_id, item.product_name, item.quantity, item.price]
    );
  }
}

export async function getOrderItems(orderId: number) {
  const result = await query(
    'SELECT * FROM order_items WHERE order_id = $1 ORDER BY id DESC',
    [orderId]
  );
  return result.rows;
}

// Shipping address management
export async function createShippingAddress(address: any) {
  const result = await query(
    `INSERT INTO shipping_addresses (
      order_id, name, address_line1, address_line2, city, state, postal_code, country
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [
      address.order_id,
      address.name || null,
      address.address_line1 || null,
      address.address_line2 || null,
      address.city || null,
      address.state || null,
      address.postal_code || null,
      address.country || null,
    ]
  );
  return result.rows[0];
}

export async function getShippingAddress(orderId: number) {
  const result = await query(
    'SELECT * FROM shipping_addresses WHERE order_id = $1',
    [orderId]
  );
  return result.rows[0] || null;
}

// Order statistics
export async function getOrderStats(startDate?: string, endDate?: string) {
  let query_str = `
    SELECT
      DATE(created_at) as date,
      COUNT(*) as total_orders,
      SUM(amount_total) as total_revenue,
      AVG(amount_total) as avg_order_value
    FROM orders
    WHERE 1=1
  `;
  const params: any[] = [];

  if (startDate) {
    query_str += ` AND created_at >= $${params.length + 1}`;
    params.push(startDate);
  }
  if (endDate) {
    query_str += ` AND created_at <= $${params.length + 1}`;
    params.push(endDate);
  }

  query_str += ' GROUP BY DATE(created_at) ORDER BY date DESC';

  const result = await query(query_str, params);
  return result.rows;
}

// Get all orders with pagination
export async function getAllOrders(limit = 50, offset = 0) {
  const result = await query(
    'SELECT * FROM orders ORDER BY created_at DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  return result.rows;
}

// Product analytics
export async function getProductAnalytics(startDate?: string, endDate?: string) {
  let query_str = `
    SELECT
      oi.product_id,
      oi.product_name,
      COUNT(DISTINCT oi.order_id) as times_ordered,
      SUM(oi.quantity) as total_quantity,
      SUM(oi.price * oi.quantity) as total_revenue
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.id
    WHERE 1=1
  `;
  const params: any[] = [];

  if (startDate) {
    query_str += ` AND o.created_at >= $${params.length + 1}`;
    params.push(startDate);
  }
  if (endDate) {
    query_str += ` AND o.created_at <= $${params.length + 1}`;
    params.push(endDate);
  }

  query_str += ' GROUP BY oi.product_id, oi.product_name ORDER BY total_revenue DESC';

  const result = await query(query_str, params);
  return result.rows;
}

export default {
  query,
  getEnabledProducts,
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getEnabledFAQs,
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getEnabledTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  createOrder,
  getOrderBySessionId,
  updateOrderStatus,
  createOrderItems,
  getOrderItems,
  createShippingAddress,
  getShippingAddress,
  getAllOrders,
  trackEvent,
  getAnalytics,
  getAnalyticsStats,
  getAnalyticsDetail,
  getUniquePageViews,
  getOrderStats,
  getProductAnalytics,
  getSetting,
  setSetting,
};
