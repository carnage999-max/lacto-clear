const Database = require('better-sqlite3');

// Open both databases
const oldDb = new Database('./orders.db');
const newDb = new Database('./lacto-clear.db');

try {
  // Check if there are any orders in the old database
  const ordersCount = oldDb.prepare('SELECT COUNT(*) as count FROM orders').get();
  console.log(`Found ${ordersCount.count} orders in orders.db`);

  if (ordersCount.count > 0) {
    // Get all orders from old database
    const orders = oldDb.prepare('SELECT * FROM orders').all();
    
    // Insert into new database
    const insertOrder = newDb.prepare(`
      INSERT OR IGNORE INTO orders 
      (stripe_session_id, stripe_payment_intent, customer_email, customer_name, amount_total, currency, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const getNewOrderId = newDb.prepare('SELECT id FROM orders WHERE stripe_session_id = ?');
    const insertOrderItem = newDb.prepare(`
      INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
      VALUES (?, ?, ?, ?, ?)
    `);

    let migratedOrders = 0;
    let migratedItems = 0;

    for (const order of orders) {
      insertOrder.run(
        order.stripe_session_id,
        order.stripe_payment_intent,
        order.customer_email,
        order.customer_name,
        order.amount_total,
        order.currency,
        order.status,
        order.created_at,
        order.updated_at
      );

      // Get the new order ID
      const newOrder = getNewOrderId.get(order.stripe_session_id);
      
      if (newOrder) {
        migratedOrders++;
        
        // Migrate order items
        const items = oldDb.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
        
        for (const item of items) {
          insertOrderItem.run(
            newOrder.id,
            item.product_id,
            item.product_name,
            item.quantity,
            item.price
          );
          migratedItems++;
        }
      }
    }

    console.log(`✅ Migrated ${migratedOrders} orders and ${migratedItems} order items`);
  } else {
    console.log('No orders to migrate');
  }

  // Check shipping addresses
  const shippingCount = oldDb.prepare('SELECT COUNT(*) as count FROM shipping_addresses').get();
  console.log(`Found ${shippingCount.count} shipping addresses in orders.db`);

  if (shippingCount.count > 0) {
    const addresses = oldDb.prepare('SELECT * FROM shipping_addresses').all();
    const insertAddress = newDb.prepare(`
      INSERT OR IGNORE INTO shipping_addresses
      (order_id, name, address_line1, address_line2, city, state, postal_code, country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const getOrderId = newDb.prepare('SELECT id FROM orders WHERE id = ?');
    let migratedAddresses = 0;

    for (const addr of addresses) {
      const orderExists = getOrderId.get(addr.order_id);
      if (orderExists) {
        insertAddress.run(
          addr.order_id,
          addr.name,
          addr.address_line1,
          addr.address_line2,
          addr.city,
          addr.state,
          addr.postal_code,
          addr.country
        );
        migratedAddresses++;
      }
    }
    
    console.log(`✅ Migrated ${migratedAddresses} shipping addresses`);
  }

  console.log('\n✅ Migration complete! You can now delete orders.db if desired.');
} catch (error) {
  console.error('Migration error:', error);
} finally {
  oldDb.close();
  newDb.close();
}
