'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, AlertCircle } from 'lucide-react';
import Image from 'next/image';

function AdminLoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(redirect);
        router.refresh();
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00A3E8]/10 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#111111] rounded-2xl border border-[#9FA4A6]/20 p-8 shadow-[0_0_40px_rgba(0,163,232,0.2)]">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-12">
              <Image
                src="/logos/lactoclear-nav-logo.png"
                alt="LactoClear"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00A3E8]/10 rounded-full mb-4">
              <Lock className="w-8 h-8 text-[#00A3E8]" />
            </div>
            <h1 className="text-3xl font-bold font-montserrat text-white mb-2">
              Admin Access
            </h1>
            <p className="text-[#9FA4A6]">Enter your password to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#F2F2F2] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-[#9FA4A6]/30 rounded-lg text-white placeholder-[#9FA4A6] focus:outline-none focus:border-[#00A3E8] focus:ring-2 focus:ring-[#00A3E8]/20 transition-all"
                placeholder="Enter admin password"
                required
                autoFocus
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-3"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00A3E8] text-white py-3 rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,163,232,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#9FA4A6]">
            <p>Default password: lactoclear-admin-2025</p>
            <p className="mt-1">Change this in your .env.local file</p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
