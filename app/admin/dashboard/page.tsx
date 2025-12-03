'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  DollarSign, 
  ShoppingBag, 
  TrendingUp, 
  Eye,
  MousePointerClick,
  ArrowLeft,
  Package
} from 'lucide-react';

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  recentOrders: number;
}

interface ProductAnalytics {
  product_id: string;
  product_name: string;
  order_count: number;
  total_quantity: number;
  total_revenue: number;
}

interface AnalyticsEvent {
  event_type: string;
  count: number;
}

interface PageView {
  page_url: string;
  unique_visitors: number;
  total_views: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [productAnalytics, setProductAnalytics] = useState<ProductAnalytics[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/admin/check-auth');
      if (!response.ok) {
        router.push('/admin/login?redirect=/admin/dashboard');
        return;
      }
      fetchData();
    };
    checkAuth();
  }, [router]);

  const fetchData = async () => {
    try {
      const [statsRes, productsRes, eventsRes, pageViewsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/product-analytics'),
        fetch('/api/admin/analytics'),
        fetch('/api/admin/page-views'),
      ]);

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data);
      }

      if (productsRes.ok) {
        const data = await productsRes.json();
        setProductAnalytics(data);
      }

      if (eventsRes.ok) {
        const data = await eventsRes.json();
        setEvents(data);
      }

      if (pageViewsRes.ok) {
        const data = await pageViewsRes.json();
        setPageViews(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Header */}
      <section className="border-b border-[#9FA4A6]/20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/admin"
            className="inline-flex items-center space-x-2 text-[#00A3E8] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin</span>
          </Link>
          <h1 className="text-4xl font-bold font-montserrat text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-[#9FA4A6]">Real-time performance metrics</p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Total Revenue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111111] rounded-xl border border-[#00D036]/20 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#9FA4A6] text-sm mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-white">
                    {stats ? formatCurrency(stats.totalRevenue) : '$0.00'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#00D036]/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#00D036]" />
                </div>
              </div>
            </motion.div>

            {/* Total Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#111111] rounded-xl border border-[#00A3E8]/20 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#9FA4A6] text-sm mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-white">
                    {stats?.totalOrders || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#00A3E8]/10 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-[#00A3E8]" />
                </div>
              </div>
            </motion.div>

            {/* Recent Orders (7 days) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#111111] rounded-xl border border-[#FF7A00]/20 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#9FA4A6] text-sm mb-1">Last 7 Days</p>
                  <p className="text-3xl font-bold text-white">
                    {stats?.recentOrders || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#FF7A00]/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#FF7A00]" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#111111] rounded-xl border border-[#9FA4A6]/20 p-6 mb-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Package className="w-6 h-6 text-[#00D036]" />
              <h2 className="text-2xl font-bold font-montserrat text-white">
                Product Performance
              </h2>
            </div>

            {productAnalytics.length > 0 ? (
              <div className="space-y-4">
                {productAnalytics.map((product) => (
                  <div
                    key={product.product_id}
                    className="bg-black rounded-lg border border-[#9FA4A6]/10 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {product.product_name}
                      </h3>
                      <span className="text-[#00D036] font-bold">
                        {formatCurrency(product.total_revenue)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#9FA4A6]">Orders: </span>
                        <span className="text-white font-medium">{product.order_count}</span>
                      </div>
                      <div>
                        <span className="text-[#9FA4A6]">Units Sold: </span>
                        <span className="text-white font-medium">{product.total_quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#9FA4A6] text-center py-8">No product data yet</p>
            )}
          </motion.div>

          {/* Unique Page Views */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#111111] rounded-xl border border-[#9FA4A6]/20 p-6 mb-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="w-6 h-6 text-[#FFD400]" />
              <h2 className="text-2xl font-bold font-montserrat text-white">
                Unique Page Views
              </h2>
            </div>

            {pageViews.length > 0 ? (
              <div className="space-y-4">
                {pageViews.map((page) => (
                  <div
                    key={page.page_url}
                    className="bg-black rounded-lg border border-[#9FA4A6]/10 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {page.page_url || '/'}
                      </h3>
                      <span className="text-[#FFD400] font-bold">
                        {page.unique_visitors} unique
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-[#9FA4A6]">Total Views: </span>
                      <span className="text-white font-medium">{page.total_views}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#9FA4A6] text-center py-8">No page view data yet</p>
            )}
          </motion.div>

          {/* User Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#111111] rounded-xl border border-[#9FA4A6]/20 p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <MousePointerClick className="w-6 h-6 text-[#00A3E8]" />
              <h2 className="text-2xl font-bold font-montserrat text-white">
                User Events
              </h2>
            </div>

            {events.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                  <div
                    key={event.event_type}
                    className="bg-black rounded-lg border border-[#9FA4A6]/10 p-4"
                  >
                    <p className="text-[#9FA4A6] text-sm mb-1 capitalize">
                      {event.event_type.replace(/_/g, ' ')}
                    </p>
                    <p className="text-2xl font-bold text-white">{event.count}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#9FA4A6] text-center py-8">No tracking data yet</p>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
