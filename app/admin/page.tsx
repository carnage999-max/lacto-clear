'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  FileText, 
  BarChart3,
  LogOut,
  Settings
} from 'lucide-react';

export default function AdminHomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const response = await fetch('/api/admin/check-auth');
      if (!response.ok) {
        router.push('/admin/login?redirect=/admin');
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const adminSections = [
    {
      title: 'Dashboard',
      description: 'View analytics, revenue, and performance metrics',
      icon: BarChart3,
      href: '/admin/dashboard',
      color: '#00A3E8',
    },
    {
      title: 'Orders',
      description: 'Manage customer orders and track fulfillment',
      icon: ShoppingBag,
      href: '/admin/orders',
      color: '#00D036',
    },
    {
      title: 'Products',
      description: 'Edit product details, pricing, and availability',
      icon: Package,
      href: '/admin/products',
      color: '#FF7A00',
    },
    {
      title: 'Content',
      description: 'Manage FAQs, testimonials, and site content',
      icon: FileText,
      href: '/admin/content',
      color: '#FFD400',
    },
  ];

  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Header */}
      <section className="border-b border-[#9FA4A6]/20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold font-montserrat text-white mb-2">
                Admin Panel
              </h1>
              <p className="text-[#9FA4A6]">Manage your LactoClear® website</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-[#9FA4A6] hover:text-white transition-colors"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 hover:bg-red-500/20 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Sections Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={section.href}
                    className="block bg-[#111111] rounded-xl border border-[#9FA4A6]/20 p-6 hover:border-[#00A3E8]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,163,232,0.2)] group"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300"
                      style={{ backgroundColor: `${section.color}20` }}
                    >
                      <Icon 
                        className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" 
                        style={{ color: section.color }}
                      />
                    </div>
                    <h3 className="text-xl font-bold font-montserrat text-white mb-2 group-hover:text-[#00A3E8] transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-[#9FA4A6] text-sm">
                      {section.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 bg-[#111111] rounded-xl border border-[#9FA4A6]/20 p-8"
          >
            <h2 className="text-2xl font-bold font-montserrat text-white mb-6">
              Quick Actions
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-3 p-4 bg-[#00A3E8]/10 border border-[#00A3E8]/20 rounded-lg hover:bg-[#00A3E8]/20 transition-all"
              >
                <BarChart3 className="w-5 h-5 text-[#00A3E8]" />
                <span className="text-white font-medium">View Analytics</span>
              </Link>
              <Link
                href="/admin/products"
                className="flex items-center space-x-3 p-4 bg-[#00D036]/10 border border-[#00D036]/20 rounded-lg hover:bg-[#00D036]/20 transition-all"
              >
                <Package className="w-5 h-5 text-[#00D036]" />
                <span className="text-white font-medium">Edit Products</span>
              </Link>
              <Link
                href="/admin/content"
                className="flex items-center space-x-3 p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/20 rounded-lg hover:bg-[#FF7A00]/20 transition-all"
              >
                <FileText className="w-5 h-5 text-[#FF7A00]" />
                <span className="text-white font-medium">Manage Content</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
