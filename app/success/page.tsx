'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Package, Home } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, Suspense } from 'react';
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation';

function SuccessPageContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const hasVerified = useRef(false);

  useEffect(() => {
    // Clear cart after successful purchase
    clearCart();

    // Verify and update payment status (only once)
    if (sessionId && !hasVerified.current) {
      hasVerified.current = true;
      
      const verifyPayment = async () => {
        try {
          const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId }),
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log('Payment verified:', data);
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
        }
      };
      
      verifyPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-black pt-20 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-[#00D036] rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(0,208,54,0.5)]">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold font-montserrat text-white mb-6">
            ORDER <span className="text-[#00D036]">CONFIRMED!</span>
          </h1>
          <p className="text-xl text-[#F2F2F2] mb-4">
            Thank you for your purchase!
          </p>
          <p className="text-[#9FA4A6] mb-8">
            We've received your order and will send you a confirmation email shortly.
            Your LactoClear® products will be shipped to you soon.
          </p>

          {sessionId && (
            <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#9FA4A6]/20 mb-8">
              <p className="text-[#9FA4A6] text-sm mb-2">Order Reference</p>
              <p className="text-white font-mono text-sm break-all">{sessionId}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-[#0D0D0D] rounded-xl p-8 border border-[#00D036]/30">
              <Package className="w-12 h-12 text-[#00D036] mx-auto mb-4" />
              <h3 className="text-xl font-bold font-montserrat text-white mb-2">
                What's Next?
              </h3>
              <p className="text-[#F2F2F2]">
                You'll receive a tracking number via email once your order ships.
                Most orders are processed within 1-2 business days.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-[#00D036] text-white px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,208,54,0.5)] transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
              <Link
                href="/protocol"
                className="bg-transparent text-white px-8 py-4 rounded-full border-2 border-white hover:bg-white hover:text-black transition-all duration-300 font-semibold text-lg"
              >
                View Protocol Guide
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
