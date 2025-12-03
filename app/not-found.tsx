'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black pt-20 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-[#00A3E8]/10 border-2 border-[#00A3E8]">
              <Search className="w-16 h-16 text-[#00A3E8]" />
            </div>
          </div>

          {/* Error Code */}
          <h1 className="text-9xl font-bold font-montserrat text-white mb-4">
            4<span className="text-[#00A3E8]">0</span>4
          </h1>

          {/* Error Message */}
          <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-white mb-4">
            Page Not Found
          </h2>

          <p className="text-xl text-[#F2F2F2] mb-8 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on the path to recovery.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center space-x-2 bg-[#00D036] text-white px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,208,54,0.5)] transition-all duration-300 font-semibold text-lg"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/the-system"
              className="inline-flex items-center justify-center space-x-2 bg-[#111111] border-2 border-[#00A3E8] text-white px-8 py-4 rounded-full hover:bg-[#00A3E8] transition-all duration-300 font-semibold text-lg"
            >
              <span>Explore Products</span>
            </Link>
          </div>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 pt-8 border-t border-[#9FA4A6]/20"
        >
          <p className="text-[#9FA4A6] mb-4">Popular pages you might be looking for:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/how-it-works" className="text-[#00A3E8] hover:text-[#00D036] transition-colors">
              How It Works
            </Link>
            <span className="text-[#9FA4A6]">•</span>
            <Link href="/science" className="text-[#00A3E8] hover:text-[#00D036] transition-colors">
              Science
            </Link>
            <span className="text-[#9FA4A6]">•</span>
            <Link href="/faq" className="text-[#00A3E8] hover:text-[#00D036] transition-colors">
              FAQ
            </Link>
            <span className="text-[#9FA4A6]">•</span>
            <Link href="/contact" className="text-[#00A3E8] hover:text-[#00D036] transition-colors">
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
