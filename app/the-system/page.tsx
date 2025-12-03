'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Droplet, Flame, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function TheSystemPage() {
  const coreBenefits = [
    'Breaks down excess lactate accumulation',
    'Clears the protective barrier',
    'Restores pH balance',
    'Opens recovery pathways',
  ];

  const mitoFuelBenefits = [
    'Reactivates mitochondrial function',
    'Accelerates energy production',
    'Enhances metabolic efficiency',
    'Supports cellular communication',
  ];

  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D036]/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold font-montserrat text-white mb-6">
              THE <span className="text-[#00D036]">LACTOCLEAR®</span> SYSTEM
            </h1>
            <p className="text-xl lg:text-2xl text-[#F2F2F2] max-w-4xl mx-auto leading-relaxed">
              A two-step protocol designed to break the lactate barrier and restore metabolic balance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two Product Columns */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Core Column */}
            <motion.div
              id="core"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#111111] rounded-2xl p-8 border-2 border-[#00D036] hover:shadow-[0_0_40px_rgba(0,208,54,0.3)] transition-all duration-300"
            >
              {/* Product Visual */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-64 h-80">
                  <Image
                    src="/products/core-bottle.png"
                    alt="LactoClear Core"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <h2 className="text-4xl font-bold font-montserrat text-[#00D036] mb-4 text-center">
                LactoClear® Core
              </h2>

              <p className="text-xl text-[#F2F2F2] mb-8 text-center leading-relaxed">
                The foundation of the protocol. Core dismantles the lactate shield, clearing the metabolic barrier that blocks recovery.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <h3 className="text-2xl font-bold font-montserrat text-white mb-4">
                  Key Benefits
                </h3>
                {coreBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#00D036] flex-shrink-0 mt-0.5" />
                    <p className="text-[#F2F2F2] text-lg">{benefit}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/buy?product=core"
                className="block w-full bg-[#00D036] text-white py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,208,54,0.5)] transition-all duration-300 font-semibold text-center text-lg"
              >
                Buy Core
              </Link>
            </motion.div>

            {/* MitoFuel Column */}
            <motion.div
              id="mitofuel"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#111111] rounded-2xl p-8 border-2 border-[#FF7A00] hover:shadow-[0_0_40px_rgba(255,122,0,0.3)] transition-all duration-300"
            >
              {/* Product Visual */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-64 h-80">
                  <Image
                    src="/products/mitofuel-bottle.png"
                    alt="MitoFuel"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <h2 className="text-4xl font-bold font-montserrat text-[#FF7A00] mb-4 text-center">
                MitoFuel®
              </h2>

              <p className="text-xl text-[#F2F2F2] mb-8 text-center leading-relaxed">
                The activation phase. MitoFuel reactivates mitochondrial function and accelerates metabolic recovery once the barrier is cleared.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <h3 className="text-2xl font-bold font-montserrat text-white mb-4">
                  Key Benefits
                </h3>
                {mitoFuelBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                    <p className="text-[#F2F2F2] text-lg">{benefit}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/buy?product=mitofuel"
                className="block w-full bg-[#FF7A00] text-white py-4 rounded-full hover:shadow-[0_0_30px_rgba(255,122,0,0.5)] transition-all duration-300 font-semibold text-center text-lg"
              >
                Buy MitoFuel
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Protocol Flow Graphic */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold font-montserrat text-center mb-12 text-white"
          >
            The Complete Protocol
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-[#0D0D0D] rounded-2xl p-12 border border-[#9FA4A6]/20"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
              {/* Core */}
              <div className="flex-1 text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-b from-[#00D036]/20 to-[#00D036]/5 rounded-full border-2 border-[#00D036] flex items-center justify-center mb-4">
                  <Droplet className="w-16 h-16 text-[#00D036]" />
                </div>
                <h3 className="text-2xl font-bold font-montserrat text-[#00D036] mb-2">
                  Core
                </h3>
                <p className="text-[#F2F2F2]">Clearance Phase</p>
              </div>

              <ArrowRight className="w-12 h-12 text-[#00D036] transform lg:rotate-0 rotate-90" />

              {/* MitoFuel */}
              <div className="flex-1 text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-b from-[#FF7A00]/20 to-[#FF7A00]/5 rounded-full border-2 border-[#FF7A00] flex items-center justify-center mb-4">
                  <Flame className="w-16 h-16 text-[#FF7A00]" />
                </div>
                <h3 className="text-2xl font-bold font-montserrat text-[#FF7A00] mb-2">
                  MitoFuel
                </h3>
                <p className="text-[#F2F2F2]">Activation Phase</p>
              </div>

              <ArrowRight className="w-12 h-12 text-[#FF7A00] transform lg:rotate-0 rotate-90" />

              {/* Clearance */}
              <div className="flex-1 text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-b from-[#00A3E8]/20 to-[#00A3E8]/5 rounded-full border-2 border-[#00A3E8] flex items-center justify-center mb-4">
                  <ArrowRight className="w-16 h-16 text-[#00A3E8]" />
                </div>
                <h3 className="text-2xl font-bold font-montserrat text-[#00A3E8] mb-2">
                  Clearance
                </h3>
                <p className="text-[#F2F2F2]">Barrier Removed</p>
              </div>

              <ArrowRight className="w-12 h-12 text-[#00A3E8] transform lg:rotate-0 rotate-90" />

              {/* Recovery */}
              <div className="flex-1 text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-b from-white/20 to-white/5 rounded-full border-2 border-white flex items-center justify-center mb-4">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-montserrat text-white mb-2">
                  Recovery
                </h3>
                <p className="text-[#F2F2F2]">Balance Restored</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-white mb-6">
              Get the Complete System
            </h2>
            <p className="text-xl text-[#F2F2F2] mb-8">
              Maximize your results with Core + MitoFuel
            </p>
            <Link
              href="/buy?bundle=complete"
              className="inline-flex items-center space-x-2 bg-[#00A3E8] text-white px-12 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,163,232,0.5)] transition-all duration-300 font-semibold text-xl"
            >
              <span>Buy Complete System</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
