'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Package, TrendingUp, DollarSign, Calendar, ArrowLeft } from 'lucide-react';

interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  name?: string;
  address_line1?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

interface Order {
  id: number;
  stripe_session_id: string;
  customer_email?: string;
  customer_name?: string;
  amount_total: number;
  amount_display: string;
  currency: string;
  status: string;
  created_at: string;
  items: OrderItem[];
  shipping?: ShippingAddress;
}

interface Stats {
  totalOrders: number;
  totalRevenue: string;
  recentOrders: number;
}

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data.orders);
      setStats(data.stats);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#00D036';
      case 'pending':
        return '#FFD400';
      case 'failed':
      case 'expired':
        return '#FF7A00';
      default:
        return '#9FA4A6';
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading orders...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-[#FF7A00] text-xl">Error: {error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center space-x-2 text-[#00A3E8] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin</span>
          </Link>
          <h1 className="text-5xl font-bold font-montserrat text-white mb-4">
            ORDER <span className="text-[#00D036]">MANAGEMENT</span>
          </h1>
          <p className="text-[#9FA4A6]">View and manage all customer orders</p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0D0D0D] rounded-xl p-6 border border-[#00D036]/30"
            >
              <div className="flex items-center justify-between mb-4">
                <Package className="w-8 h-8 text-[#00D036]" />
                <span className="text-3xl font-bold text-white">
                  {stats.totalOrders}
                </span>
              </div>
              <p className="text-[#9FA4A6]">Total Orders</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0D0D0D] rounded-xl p-6 border border-[#00A3E8]/30"
            >
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-[#00A3E8]" />
                <span className="text-3xl font-bold text-white">
                  {stats.totalRevenue}
                </span>
              </div>
              <p className="text-[#9FA4A6]">Total Revenue</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0D0D0D] rounded-xl p-6 border border-[#FF7A00]/30"
            >
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-[#FF7A00]" />
                <span className="text-3xl font-bold text-white">
                  {stats.recentOrders}
                </span>
              </div>
              <p className="text-[#9FA4A6]">Last 7 Days</p>
            </motion.div>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#0D0D0D] rounded-xl p-12 border border-[#9FA4A6]/20 text-center">
              <Package className="w-16 h-16 text-[#9FA4A6] mx-auto mb-4" />
              <p className="text-[#9FA4A6] text-lg">No orders yet</p>
            </div>
          ) : (
            orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#0D0D0D] rounded-xl p-6 border border-[#9FA4A6]/20 hover:border-[#9FA4A6]/40 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        Order #{order.id}
                      </h3>
                      <span
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{ 
                          backgroundColor: `${getStatusColor(order.status)}20`,
                          color: getStatusColor(order.status)
                        }}
                      >
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[#9FA4A6] text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#00D036]">
                      {order.amount_display}
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                {(order.customer_email || order.customer_name) && (
                  <div className="bg-[#111111] rounded-lg p-4 mb-4">
                    <p className="text-[#9FA4A6] text-sm mb-1">Customer</p>
                    {order.customer_name && (
                      <p className="text-white">{order.customer_name}</p>
                    )}
                    {order.customer_email && (
                      <p className="text-[#00A3E8]">{order.customer_email}</p>
                    )}
                  </div>
                )}

                {/* Order Items */}
                <div className="bg-[#111111] rounded-lg p-4 mb-4">
                  <p className="text-[#9FA4A6] text-sm mb-3">Items</p>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-white">
                          {item.quantity}x {item.product_name}
                        </span>
                        <span className="text-[#9FA4A6]">
                          ${(item.price / 100).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                {order.shipping && (
                  <div className="bg-[#111111] rounded-lg p-4">
                    <p className="text-[#9FA4A6] text-sm mb-2">Shipping Address</p>
                    <div className="text-white text-sm">
                      {order.shipping.name && <p>{order.shipping.name}</p>}
                      {order.shipping.address_line1 && (
                        <p>{order.shipping.address_line1}</p>
                      )}
                      {order.shipping.city && order.shipping.state && (
                        <p>
                          {order.shipping.city}, {order.shipping.state}{' '}
                          {order.shipping.postal_code}
                        </p>
                      )}
                      {order.shipping.country && <p>{order.shipping.country}</p>}
                    </div>
                  </div>
                )}

                {/* Session ID (for reference) */}
                <div className="mt-4 pt-4 border-t border-[#9FA4A6]/20">
                  <p className="text-[#9FA4A6] text-xs">
                    Session: {order.stripe_session_id}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
