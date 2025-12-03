'use client';

import { motion } from 'framer-motion';
import { Shield, ArrowRight, Zap, Activity } from 'lucide-react';
import Image from 'next/image';

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Lactate Builds the Shield',
      description: 'Stressed or compromised cells produce excess lactate, creating a protective barrier that blocks immune detection and metabolic communication.',
      color: '#FF7A00',
      icon: Shield,
    },
    {
      number: '02',
      title: 'Shield Blocks Recovery',
      description: 'This acidic microenvironment suppresses recovery pathways, maintains cellular dysfunction, and prevents your body from returning to balance.',
      color: '#9FA4A6',
      icon: Activity,
    },
    {
      number: '03',
      title: 'LactoClear® Dismantles the Shield',
      description: 'Our two-step system breaks down the lactate barrier and reactivates metabolic function, clearing the path for peak recovery.',
      color: '#00D036',
      icon: Zap,
    },
  ];

  return (
    <main className="min-h-screen bg-black pt-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00A3E8]/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-montserrat text-white mb-6 break-words">
              UNDERSTANDING THE <span className="text-[#00A3E8]">LACTATE SHIELD</span>
            </h1>
            <p className="text-xl lg:text-2xl text-[#F2F2F2] max-w-4xl mx-auto leading-relaxed">
              Discover how excess lactate creates a metabolic barrier and why clearing it is essential for optimal recovery
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 bg-[#0D0D0D] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => {
              const diagrams = ['/diagrams/lactate-shield-1.png', '/diagrams/lactate-shield-2.png', '/diagrams/lactate-shield-1.png'];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col gap-8 items-center"
                >
                  {/* Image */}
                  <div className="w-full max-w-2xl">
                    <div className="relative w-full h-80 bg-[#111111] rounded-2xl border-2 p-4"
                      style={{ borderColor: step.color }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={diagrams[index]}
                          alt={step.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center max-w-2xl">
                    <div className="text-6xl font-bold opacity-20 mb-2" style={{ color: step.color }}>
                      {step.number}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold font-montserrat mb-4" style={{ color: step.color }}>
                      {step.title}
                    </h3>
                    <p className="text-lg md:text-xl text-[#F2F2F2] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Process Diagram */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold font-montserrat text-center mb-12 text-white"
          >
            The <span className="text-[#00D036]">Process</span> Visualized
          </motion.h2>

          {/* Desktop: Horizontal Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block relative w-full h-[400px] mb-10"
          >
            <Image
              src="/diagrams/process-horizontal.png"
              alt="LactoClear Process - Horizontal"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Mobile: Vertical Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:hidden relative w-full h-[600px] mb-10"
          >
            <Image
              src="/diagrams/process-vertical.png"
              alt="LactoClear Process - Vertical"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* Diagram Section */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold font-montserrat text-center mb-12 text-white"
          >
            The <span className="text-[#00D036]">Clearance</span> Pathway
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-black rounded-2xl p-12 border border-[#9FA4A6]/20"
          >
            {/* Horizontal Flow */}
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
              {/* Step 1: Core */}
              <div className="flex-1 text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-b from-[#00D036]/20 to-[#00D036]/5 rounded-full border-2 border-[#00D036] flex items-center justify-center mb-4">
                  <Shield className="w-16 h-16 text-[#00D036]" />
                </div>
                <h3 className="text-2xl font-bold font-montserrat text-[#00D036] mb-2">
                  Core
                </h3>
                <p className="text-[#F2F2F2]">Lactate Clearance</p>
              </div>

              <ArrowRight className="w-12 h-12 text-[#9FA4A6] transform lg:rotate-0 rotate-90" />

              {/* Step 2: MitoFuel */}
              <div className="flex-1 text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-b from-[#FF7A00]/20 to-[#FF7A00]/5 rounded-full border-2 border-[#FF7A00] flex items-center justify-center mb-4">
                  <Zap className="w-16 h-16 text-[#FF7A00]" />
                </div>
                <h3 className="text-2xl font-bold font-montserrat text-[#FF7A00] mb-2">
                  MitoFuel
                </h3>
                <p className="text-[#F2F2F2]">Metabolic Activation</p>
              </div>

              <ArrowRight className="w-12 h-12 text-[#9FA4A6] transform lg:rotate-0 rotate-90" />

              {/* Step 3: Clearance */}
              <div className="flex-1 text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-b from-[#00A3E8]/20 to-[#00A3E8]/5 rounded-full border-2 border-[#00A3E8] flex items-center justify-center mb-4">
                  <Activity className="w-16 h-16 text-[#00A3E8]" />
                </div>
                <h3 className="text-2xl font-bold font-montserrat text-[#00A3E8] mb-2">
                  Clearance
                </h3>
                <p className="text-[#F2F2F2]">Path Opened</p>
              </div>

              <ArrowRight className="w-12 h-12 text-[#9FA4A6] transform lg:rotate-0 rotate-90" />

              {/* Step 4: Recovery */}
              <div className="flex-1 text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-b from-white/20 to-white/5 rounded-full border-2 border-white flex items-center justify-center mb-4">
                  <Zap className="w-16 h-16 text-white" />
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
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-[#F2F2F2] mb-8">
              Discover the complete LactoClear® system
            </p>
            <a
              href="/the-system"
              className="inline-flex items-center space-x-2 bg-[#00D036] text-white px-12 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,208,54,0.5)] transition-all duration-300 font-semibold text-xl"
            >
              <span>Explore The System</span>
              <ArrowRight className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
