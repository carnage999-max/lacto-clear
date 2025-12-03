'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/the-system', label: 'The LactoClear System' },
    { href: '/science', label: 'Science' },
    { href: '/faq', label: 'FAQ' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/nasal-spray', label: 'Nasal Spray Line' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#9FA4A6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:scale-105 transition-transform duration-300">
            <div className="relative w-56 h-14 lg:w-48 lg:h-12 drop-shadow-[0_0_15px_rgba(0,208,54,0.4)]">
              <Image
                src="/logos/lactoclear-nav-logo.png"
                alt="LactoClear"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-[#00A3E8] transition-colors duration-300 text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00A3E8] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Link
              href="/buy"
              className="bg-[#00D036] text-white px-6 py-2 rounded-full hover:bg-[#00A3E8] hover:shadow-[0_0_20px_rgba(0,163,232,0.5)] transition-all duration-300 font-semibold flex items-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Buy Now</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white hover:text-[#00A3E8] transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0D0D0D] border-t border-[#9FA4A6]/20">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:text-[#00A3E8] transition-colors duration-300 text-lg font-medium py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/buy"
              onClick={() => setIsMenuOpen(false)}
              className="block bg-[#00D036] text-white px-6 py-3 rounded-full hover:bg-[#00A3E8] transition-all duration-300 font-semibold text-center"
            >
              Buy Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
