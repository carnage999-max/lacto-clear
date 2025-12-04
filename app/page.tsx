'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Shield, Zap, Activity, ArrowRight, Droplet, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

// Force static generation
export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="min-h-screen bg-black pt-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00A3E8]/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00D036]/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <Image
                  src="/logos/lactoclear-full-logo.png"
                  alt="LactoClear - Clearing the Path for Peak Recovery"
                  width={600}
                  height={200}
                  priority
                  className="w-full max-w-md"
                />
              </div>
              
              <p className="text-xl text-[#F2F2F2] mb-8 leading-relaxed">
                Break through the lactate barrier. Restore metabolic balance. 
                Unlock your body's natural recovery potential with the LactoClear® system.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/the-system"
                  className="group bg-[#00D036] text-white px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,208,54,0.5)] transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <Droplet className="w-5 h-5" />
                  <span>LactoClear® Core</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/the-system"
                  className="group bg-[#FF7A00] text-white px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(255,122,0,0.5)] transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <Flame className="w-5 h-5" />
                  <span>MitoFuel®</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Product Images */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full h-[500px] flex items-center justify-center">
                <Image
                  src="/products/system-hero.png"
                  alt="LactoClear Core and MitoFuel"
                  width={600}
                  height={500}
                  priority
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What LactoClear Does Section */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold font-montserrat text-center mb-12 text-white"
          >
            What <span className="text-[#00D036]">LactoClear®</span> Does
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Breaks the Lactate Barrier',
                description: 'Dismantles the protective lactate shield that blocks recovery pathways',
                color: '#00D036',
              },
              {
                icon: Activity,
                title: 'Clears the Path for Recovery',
                description: 'Opens metabolic pathways to restore normal cellular function',
                color: '#00A3E8',
              },
              {
                icon: Zap,
                title: 'Restores Metabolic Balance',
                description: 'Reactivates energy production and cellular communication',
                color: '#FF7A00',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#111111] rounded-xl p-8 border border-[#9FA4A6]/20 hover:border-[#00A3E8]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,163,232,0.2)]"
              >
                <div className="mb-6">
                  <item.icon
                    className="w-16 h-16"
                    style={{ color: item.color }}
                  />
                </div>
                <h3 className="text-2xl font-bold font-montserrat text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-[#F2F2F2] text-lg leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warburg Effect Section */}
      <section className="py-20 bg-black border-y border-[#9FA4A6]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-white mb-8">
              <span className="text-[#FF7A00]">WARBURG EFFECT</span>
            </h2>
            <p className="text-lg text-[#F2F2F2] leading-relaxed space-y-6">
              Tumors rely on an altered form of metabolism known as the Warburg effect, which causes them to produce large amounts of lactic acid. This lactic acid accumulates in the tumor microenvironment and creates an acidic barrier that weakens the body's natural immune response. The same acidic conditions also support the tumor's ability to survive, adapt, and spread. In this way, the metabolic byproducts of the Warburg effect both shield the tumor from attack.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why the Lacto Shield Matters Section */}
      <section className="py-20 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Lactate Shield Diagram */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full h-96 bg-[#0D0D0D] rounded-2xl border border-[#9FA4A6]/20 p-6 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/diagrams/lactate-shield-1.png"
                    alt="Lactate Shield Formation"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-white mb-6">
                Why the <span className="text-[#FF7A00]">Lacto Shield</span> Matters
              </h2>
              <div className="space-y-4 text-lg text-[#F2F2F2] leading-relaxed">
                <p>
                  Stressed, inflamed, or compromised cells produce excess lactate, creating a protective barrier—the "lacto shield"—that blocks immune surveillance and metabolic communication.
                </p>
                <p>
                  This shield creates an acidic microenvironment that suppresses recovery, maintains cellular dysfunction, and prevents your body from returning to balance.
                </p>
                <p>
                  <span className="text-[#00D036] font-semibold">LactoClear®</span> dismantles this barrier, clearing the path for your body's natural recovery mechanisms to function optimally.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The LactoClear System Section */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold font-montserrat text-center mb-4 text-white"
          >
            The <span className="text-[#00D036]">LactoClear®</span> System
          </motion.h2>
          <p className="text-center text-xl text-[#F2F2F2] mb-10 max-w-3xl mx-auto">
            A two-step protocol designed to break the lactate barrier and restore metabolic function
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Core Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#111111] rounded-2xl p-8 border-2 border-[#00D036] hover:shadow-[0_0_40px_rgba(0,208,54,0.3)] transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-64">
                  <Image
                    src="/products/core-bottle.png"
                    alt="LactoClear Core"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4 text-center">
                LactoClear® Core
              </h3>
              <p className="text-[#F2F2F2] text-lg mb-6 text-center leading-relaxed">
                Breaks down excess lactate and clears the protective barrier that blocks cellular recovery
              </p>
              <Link
                href="/the-system#core"
                className="block w-full bg-[#00D036] text-white py-3 rounded-full hover:shadow-[0_0_20px_rgba(0,208,54,0.5)] transition-all duration-300 font-semibold text-center"
              >
                View Protocol
              </Link>
            </motion.div>

            {/* MitoFuel Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#111111] rounded-2xl p-8 border-2 border-[#FF7A00] hover:shadow-[0_0_40px_rgba(255,122,0,0.3)] transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-64">
                  <Image
                    src="/products/mitofuel-bottle.png"
                    alt="MitoFuel"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-3xl font-bold font-montserrat text-[#FF7A00] mb-4 text-center">
                MitoFuel®
              </h3>
              <p className="text-[#F2F2F2] text-lg mb-6 text-center leading-relaxed">
                Reactivates mitochondrial function and accelerates metabolic recovery once the barrier is cleared
              </p>
              <Link
                href="/the-system#mitofuel"
                className="block w-full bg-[#FF7A00] text-white py-3 rounded-full hover:shadow-[0_0_20px_rgba(255,122,0,0.5)] transition-all duration-300 font-semibold text-center"
              >
                View Protocol
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-white mb-6">
              Ready to Clear the Path?
            </h2>
            <p className="text-xl text-[#F2F2F2] mb-8">
              Experience the power of metabolic optimization with the LactoClear® system
            </p>
            <Link
              href="/buy"
              className="inline-flex items-center space-x-2 bg-[#00A3E8] text-white px-12 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,163,232,0.5)] transition-all duration-300 font-semibold text-xl"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
