'use client';

import { motion } from 'framer-motion';
import { Droplet, Flame, Package, CheckCircle, ShoppingCart, Wind } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  features?: string[];
  image?: string;
  color?: string;
  badge?: string;
}

const getDefaultProducts = (): Product[] => [
  {
    id: 'core',
    name: 'LactoClear® Core',
    image: '/products/core-bottle.png',
    color: '#00D036',
    price: 49.99,
    description: 'The foundation of the protocol. Breaks down the lactate barrier.',
    features: [
      '30-day supply',
      'Lactate clearance support',
      'pH balance restoration',
      'Easy-to-take capsules',
    ],
  },
  {
    id: 'mitofuel',
    name: 'MitoFuel®',
    image: '/products/mitofuel-bottle.png',
    color: '#FF7A00',
    price: 54.99,
    description: 'The activation phase. Reactivates mitochondrial function.',
    features: [
      '30-day supply',
      'Metabolic activation',
      'Energy production support',
      'Premium formulation',
    ],
  },
  {
    id: 'complete',
    name: 'Complete System',
    image: '/products/bottles.png',
    color: '#00A3E8',
    price: 89.99,
    description: 'Core + MitoFuel. The full two-step protocol for maximum results.',
    features: [
      'Both Core & MitoFuel',
      '30-day supply of each',
      'Complete protocol',
      'Save $15',
    ],
    badge: 'BEST VALUE',
  },
  {
    id: 'nasal-core',
    name: 'LactoClear® Core Nasal',
    image: '/products/nasal-spray-core.png',
    color: '#00D036',
    price: 39.99,
    description: 'Targeted lactate clearance through nasal delivery for rapid action.',
    features: [
      'Fast-acting nasal delivery',
      'Bypasses digestive system',
      'Convenient application',
      'Complements oral Core formula',
    ],
  },
  {
    id: 'nasal-mitofuel',
    name: 'MitoFuel® Nasal',
    image: '/products/nasal-spray-mitofuel.png',
    color: '#FF7A00',
    price: 44.99,
    description: 'Mitochondrial activation delivered directly for enhanced metabolic support.',
    features: [
      'Quick absorption',
      'Supports energy production',
      'Easy to use on-the-go',
      'Works with oral MitoFuel',
    ],
  },
];

const getProductIcon = (productId: string) => {
  switch (productId) {
    case 'core':
      return Droplet;
    case 'mitofuel':
      return Flame;
    case 'nasal-core':
    case 'nasal-mitofuel':
      return Wind;
    default:
      return Package;
  }
};

export default function BuyPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(getDefaultProducts());
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'oral' | 'nasal'>('all');
  const { addItem, openCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search and filter
  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesFilter = filter === 'all' ||
                         (filter === 'oral' && !product.id.includes('nasal')) ||
                         (filter === 'nasal' && product.id.includes('nasal'));
    
    return matchesSearch && matchesFilter;
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setProducts(data);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Keep default products on error
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.color || '#00A3E8',
      image: product.image,
    });
    setSelectedProduct(product.id);
    // Open cart drawer after adding
    setTimeout(() => openCart(), 300);
  };

  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="relative py-10 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00A3E8]/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-montserrat text-white mb-4 md:mb-6">
              CHOOSE YOUR <span className="text-[#00D036]">PATH</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-[#F2F2F2] max-w-4xl mx-auto leading-relaxed">
              Select the LactoClear® product that's right for you
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 md:py-12 lg:py-20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="mb-8 md:mb-12 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#111111] border-2 border-[#9FA4A6]/20 rounded-xl text-white placeholder-[#9FA4A6] focus:border-[#00A3E8] focus:outline-none transition-colors"
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 ${
                    filter === 'all'
                      ? 'bg-[#00A3E8] text-white shadow-[0_0_20px_rgba(0,163,232,0.4)]'
                      : 'bg-[#111111] text-[#9FA4A6] border-2 border-[#9FA4A6]/20 hover:border-[#00A3E8]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('oral')}
                  className={`px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 ${
                    filter === 'oral'
                      ? 'bg-[#00D036] text-white shadow-[0_0_20px_rgba(0,208,54,0.4)]'
                      : 'bg-[#111111] text-[#9FA4A6] border-2 border-[#9FA4A6]/20 hover:border-[#00D036]'
                  }`}
                >
                  Oral
                </button>
                <button
                  onClick={() => setFilter('nasal')}
                  className={`px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 ${
                    filter === 'nasal'
                      ? 'bg-[#FF7A00] text-white shadow-[0_0_20px_rgba(255,122,0,0.4)]'
                      : 'bg-[#111111] text-[#9FA4A6] border-2 border-[#9FA4A6]/20 hover:border-[#FF7A00]'
                  }`}
                >
                  Nasal
                </button>
              </div>
            </div>
          </div>

          {/* Products Carousel */}
          <div className="relative">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-[#9FA4A6] mx-auto mb-4" />
                <p className="text-[#9FA4A6] text-xl">No products found</p>
              </div>
            ) : (
              <>
                {/* Carousel Container */}
                <div className="overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory scrollbar-hide" 
                     style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <div className="flex gap-6">
                    {filteredProducts.map((product) => {
                      const Icon = getProductIcon(product.id);
                      return (
                        <motion.div
                          key={product.id}
                          className="shrink-0 w-[85vw] sm:w-[45vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ y: -8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div
                            className="bg-[#111111] rounded-2xl p-8 border-2 hover:shadow-[0_0_40px_rgba(0,163,232,0.3)] transition-all duration-300 h-full relative"
                            style={{ borderColor: product.color || '#00A3E8' }}
                          >
                            {/* Badge */}
                            {product.badge && (
                              <div
                                className="absolute -top-3 -right-3 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg z-10"
                                style={{ backgroundColor: product.color || '#00A3E8' }}
                              >
                                {product.badge}
                              </div>
                            )}

                            {/* Product Image */}
                            <div className="flex items-center justify-center mb-6">
                              <div className="relative w-40 h-52">
                                <Image
                                  src={product.image || '/products/core-bottle.png'}
                                  alt={product.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </div>

                            {/* Product Name */}
                            <h3
                              className="text-2xl font-bold font-montserrat mb-2 text-center"
                              style={{ color: product.color || '#00A3E8' }}
                            >
                              {product.name}
                            </h3>

                            {/* Price */}
                            <div className="text-center mb-4">
                              <span className="text-white text-3xl font-bold">${product.price.toFixed(2)}</span>
                            </div>

                            {/* Description */}
                            <p className="text-[#F2F2F2] text-center mb-6 leading-relaxed text-sm">
                              {product.description}
                            </p>

                            {/* Features */}
                            {product.features && product.features.length > 0 && (
                              <div className="space-y-2 mb-6">
                                {product.features.slice(0, 3).map((feature, idx) => (
                                  <div key={idx} className="flex items-start space-x-2">
                                    <CheckCircle
                                      className="w-4 h-4 shrink-0 mt-0.5"
                                      style={{ color: product.color || '#00A3E8' }}
                                    />
                                    <p className="text-[#F2F2F2] text-sm">{feature}</p>
                                  </div>
                                ))}
                                {product.features.length > 3 && (
                                  <p className="text-[#9FA4A6] text-xs text-center">
                                    +{product.features.length - 3} more
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Add to Cart Button */}
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="w-full text-white py-3 rounded-full transition-all duration-300 font-semibold text-base flex items-center justify-center space-x-2 mt-auto"
                              style={{ backgroundColor: product.color || '#00A3E8' }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = `0 0 30px ${product.color || '#00A3E8'}80`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 0 0 transparent';
                              }}
                            >
                              <ShoppingCart className="w-5 h-5" />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Scroll Hint */}
                {filteredProducts.length > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6 md:hidden">
                    <div className="text-[#9FA4A6] text-sm flex items-center gap-2">
                      <span>← Scroll to see more →</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold font-montserrat text-center mb-8 text-white"
          >
            Why Choose <span className="text-[#00A3E8]">LactoClear®</span>?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0D0D0D] rounded-2xl p-8 border-2 border-[#00D036] hover:shadow-[0_0_30px_rgba(0,208,54,0.3)] transition-all duration-300 text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#00D036]/10 flex items-center justify-center border-2 border-[#00D036] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-[#00D036]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-5xl font-bold font-montserrat text-[#00D036] mb-3">30</div>
              <p className="text-2xl font-semibold font-montserrat text-white mb-2">Days</p>
              <p className="text-[#F2F2F2] text-lg">Money-Back Guarantee</p>
              <p className="text-[#9FA4A6] text-sm mt-3">Try it risk-free. If you're not satisfied, get a full refund.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#0D0D0D] rounded-2xl p-8 border-2 border-[#FF7A00] hover:shadow-[0_0_30px_rgba(255,122,0,0.3)] transition-all duration-300 text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#FF7A00]/10 flex items-center justify-center border-2 border-[#FF7A00] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-[#FF7A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="text-5xl font-bold font-montserrat text-[#FF7A00] mb-3">FREE</div>
              <p className="text-2xl font-semibold font-montserrat text-white mb-2">Shipping</p>
              <p className="text-[#F2F2F2] text-lg">On All Orders Over $75</p>
              <p className="text-[#9FA4A6] text-sm mt-3">Fast, reliable delivery straight to your door.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#0D0D0D] rounded-2xl p-8 border-2 border-[#00A3E8] hover:shadow-[0_0_30px_rgba(0,163,232,0.3)] transition-all duration-300 text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#00A3E8]/10 flex items-center justify-center border-2 border-[#00A3E8] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-[#00A3E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-5xl font-bold font-montserrat text-[#00A3E8] mb-3">24/7</div>
              <p className="text-2xl font-semibold font-montserrat text-white mb-2">Support</p>
              <p className="text-[#F2F2F2] text-lg">Customer Care Available</p>
              <p className="text-[#9FA4A6] text-sm mt-3">Expert guidance whenever you need it.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-montserrat text-white mb-6">
              Have Questions?
            </h2>
            <p className="text-xl text-[#F2F2F2] mb-8">
              Check out our FAQ page or contact our support team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/faq"
                className="inline-flex items-center justify-center space-x-2 bg-[#111111] border-2 border-[#00A3E8] text-white px-8 py-3 rounded-full hover:bg-[#00A3E8] transition-all duration-300 font-semibold"
              >
                <span>View FAQ</span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-[#00A3E8] text-white px-8 py-3 rounded-full hover:shadow-[0_0_30px_rgba(0,163,232,0.5)] transition-all duration-300 font-semibold"
              >
                <span>Contact Support</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
