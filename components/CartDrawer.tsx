'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Image from 'next/image';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, isOpen, closeCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please try again.');
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-[#0D0D0D] z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#9FA4A6]/20">
              <h2 className="text-2xl font-bold font-montserrat text-white flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-[#00D036]" />
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-full bg-[#111111] hover:bg-[#1a1a1a] transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-[#9FA4A6] mb-4" />
                  <p className="text-[#9FA4A6] text-lg mb-2">Your cart is empty</p>
                  <p className="text-[#9FA4A6] text-sm">Add some products to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-[#111111] rounded-xl p-4 border border-[#9FA4A6]/20"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div 
                          className="w-20 h-20 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden"
                          style={{ backgroundColor: `${item.color}20`, borderWidth: '2px', borderColor: item.color }}
                        >
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-2"
                            />
                          ) : (
                            <span className="text-2xl font-bold" style={{ color: item.color }}>
                              {item.name.charAt(0)}
                            </span>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="text-white font-bold mb-1">{item.name}</h3>
                          <p className="text-[#00D036] font-semibold mb-2">
                            ${item.price.toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-[#0D0D0D] rounded-lg p-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded bg-[#111111] hover:bg-[#1a1a1a] transition-colors flex items-center justify-center"
                              >
                                <Minus className="w-4 h-4 text-white" />
                              </button>
                              <span className="text-white font-semibold w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded bg-[#111111] hover:bg-[#1a1a1a] transition-colors flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4 text-white" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[#FF7A00] hover:text-[#ff9933] transition-colors text-sm font-semibold"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-white font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#9FA4A6]/20 p-6 space-y-4">
                {/* Total */}
                <div className="flex justify-between items-center text-xl">
                  <span className="text-[#F2F2F2] font-semibold">Total:</span>
                  <span className="text-white font-bold font-montserrat">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-[#00D036] text-white py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,208,54,0.5)] transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="w-full text-[#9FA4A6] hover:text-white transition-colors text-sm"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
