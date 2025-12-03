'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function FloatingCartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <motion.button
      onClick={openCart}
      className="fixed bottom-6 right-6 z-50 bg-[#00D036] text-white w-16 h-16 rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(0,208,54,0.5)] transition-all duration-300 flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <ShoppingCart className="w-6 h-6" />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 bg-[#FF7A00] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
          >
            {totalItems}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
