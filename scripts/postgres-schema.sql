-- PostgreSQL Schema Migration for LactoClear®
-- Run this script in your PostgreSQL database before deploying to Amplify

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    features JSONB,  -- Changed from TEXT to JSONB for better querying
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
    event_data JSONB,  -- Changed from TEXT to JSONB
    page_url TEXT,
    user_agent TEXT,
    ip_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
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

-- Insert default products
INSERT INTO products (id, name, price, description, features, image, color, badge, enabled, sort_order)
VALUES 
  ('core', 'LactoClear® Core', 49.99, 'Break down lactate accumulation and dismantle the protective barrier', 
   '["Lactate breakdown", "Barrier dismantling", "Foundation protocol"]'::jsonb, 
   '/products/core-bottle.png', '#00D036', NULL, 1, 0),
   
  ('mitofuel', 'MitoFuel®', 54.99, 'Reactivate mitochondrial function and accelerate metabolic recovery', 
   '["Mitochondrial activation", "Metabolic acceleration", "Recovery support"]'::jsonb, 
   '/products/mitofuel-bottle.png', '#FF7A00', NULL, 1, 1),
   
  ('complete', 'LactoClear® Complete System', 89.99, 'The complete two-step protocol: Core + MitoFuel for optimal results', 
   '["Complete protocol", "Core + MitoFuel", "Save $15"]'::jsonb, 
   '/products/bottles.png', '#00A3E8', 'BEST VALUE', 1, 2),
   
  ('nasal-core', 'LactoClear® Nasal Core', 39.99, 'Fast-acting nasal spray delivery for rapid lactate clearance', 
   '["Nasal delivery", "Fast-acting", "Convenient application"]'::jsonb, 
   '/products/nasal-spray-core.png', '#00D036', NULL, 1, 3),
   
  ('nasal-mitofuel', 'MitoFuel® Nasal Spray', 44.99, 'Targeted nasal delivery for enhanced mitochondrial support', 
   '["Nasal delivery", "Mitochondrial support", "Quick absorption"]'::jsonb, 
   '/products/nasal-spray-mitofuel.png', '#FF7A00', NULL, 1, 4)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  features = EXCLUDED.features,
  image = EXCLUDED.image,
  color = EXCLUDED.color,
  badge = EXCLUDED.badge,
  sort_order = EXCLUDED.sort_order;

-- Insert default FAQs
INSERT INTO faqs (category, question, answer, color, sort_order, enabled)
VALUES 
  ('core', 'What is LactoClear® Core?', 
   'LactoClear® Core is the foundation of our two-step protocol. It is designed to break down excess lactate accumulation and dismantle the protective barrier that blocks recovery pathways.', 
   '#00D036', 1, 1),
   
  ('core', 'How do I take Core?', 
   'Follow the dosing instructions on the product label or as directed by your healthcare professional. Core is typically taken before MitoFuel for optimal results.', 
   '#00D036', 2, 1),
   
  ('mitofuel', 'What is MitoFuel®?', 
   'MitoFuel® is the activation phase of the LactoClear® system. It reactivates mitochondrial function and accelerates metabolic recovery once the lactate barrier has been cleared by Core.', 
   '#FF7A00', 3, 1),
   
  ('mitofuel', 'Can I take MitoFuel without Core?', 
   'While MitoFuel can be taken alone, it works best when combined with Core as part of the complete LactoClear® system. Core clears the pathway, allowing MitoFuel to work more effectively.', 
   '#FF7A00', 4, 1),
   
  ('nasal', 'What are the LactoClear® Nasal Sprays?', 
   'The LactoClear® nasal sprays provide targeted delivery for faster action. They complement the oral system and offer an alternative delivery method for those who prefer nasal administration.', 
   '#00A3E8', 5, 1),
   
  ('nasal', 'How do I use the nasal sprays?', 
   'Follow the instructions on the product label. Generally, nasal sprays are administered directly into each nostril. Do not exceed the recommended dosage.', 
   '#00A3E8', 6, 1),
   
  ('general', 'How long does it take to see results?', 
   'Results vary by individual. Some people notice changes within days, while others may take several weeks. Consistency is key for optimal results.', 
   '#FFFFFF', 7, 1),
   
  ('general', 'Is LactoClear® safe?', 
   'LactoClear® products are formulated with quality ingredients. However, we recommend consulting with your healthcare professional before starting any new supplement regimen, especially if you have existing health conditions or take medications.', 
   '#FFFFFF', 8, 1),
   
  ('general', 'Can I take LactoClear® with other supplements?', 
   'In most cases, yes. However, we recommend consulting with your healthcare professional to ensure there are no interactions with your current supplement or medication regimen.', 
   '#FFFFFF', 9, 1),
   
  ('general', 'What if I miss a dose?', 
   'If you miss a dose, take it as soon as you remember. If it''s close to your next scheduled dose, skip the missed dose and resume your normal schedule. Do not double up on doses.', 
   '#FFFFFF', 10, 1);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for automatic updated_at updates
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a view for easy analytics queries
CREATE OR REPLACE VIEW analytics_summary AS
SELECT 
    event_type,
    COUNT(*) as event_count,
    COUNT(DISTINCT ip_address) as unique_visitors,
    DATE(created_at) as event_date
FROM analytics_events
GROUP BY event_type, DATE(created_at);

-- Grant necessary permissions (adjust username as needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO lactoclear;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO lactoclear;

-- Verify installation
SELECT 'Products' as table_name, COUNT(*) as row_count FROM products
UNION ALL
SELECT 'FAQs', COUNT(*) FROM faqs
UNION ALL
SELECT 'Testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'Orders', COUNT(*) FROM orders;
