'use client';

import { motion } from 'framer-motion';
import { Droplet, Flame, Wind, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function NasalSprayPage() {
  const sprays = [
    {
      name: 'LactoClear® Core Nasal',
      icon: Droplet,
      image: '/products/nasal-spray-core.png',
      color: '#00D036',
      description: 'Targeted lactate clearance through nasal delivery for rapid action',
      benefits: [
        'Fast-acting nasal delivery',
        'Bypasses digestive system',
        'Convenient application',
        'Complements oral Core formula',
      ],
    },
    {
      name: 'MitoFuel® Nasal',
      icon: Flame,
      image: '/products/nasal-spray-mitofuel.png',
      color: '#FF7A00',
      description: 'Mitochondrial activation delivered directly for enhanced metabolic support',
      benefits: [
        'Quick absorption',
        'Supports energy production',
        'Easy to use on-the-go',
        'Works with oral MitoFuel',
      ],
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Nasal administration provides rapid absorption directly into the bloodstream',
      color: '#00A3E8',
    },
    {
      icon: Wind,
      title: 'Bypasses Digestion',
      description: 'Avoids the digestive system for those with sensitive stomachs',
      color: '#00D036',
    },
    {
      icon: CheckCircle,
      title: 'Complements the System',
      description: 'Works synergistically with oral formulas for enhanced results',
      color: '#FF7A00',
    },
  ];

  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D036]/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold font-montserrat text-white mb-6">
                <span className="text-[#00A3E8]">TARGETED CLEARANCE.</span>
                <br />
                FAST DELIVERY.
              </h1>
              <p className="text-xl lg:text-2xl text-[#F2F2F2] max-w-4xl mx-auto leading-relaxed">
                Experience the power of LactoClear® through advanced nasal delivery
              </p>
            </motion.div>
          </div>

          {/* Nasal Spray Products */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {sprays.map((spray, index) => {
              const Icon = spray.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-[#111111] rounded-2xl p-8 border-2 hover:shadow-[0_0_40px_rgba(0,163,232,0.2)] transition-all duration-300"
                  style={{ borderColor: spray.color }}
                >
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-32 h-48">
                      <Image
                        src={spray.image}
                        alt={spray.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <h2
                    className="text-3xl font-bold font-montserrat mb-4 text-center"
                    style={{ color: spray.color }}
                  >
                    {spray.name}
                  </h2>

                  <p className="text-[#F2F2F2] text-lg mb-6 text-center leading-relaxed">
                    {spray.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {spray.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: spray.color }}
                        />
                        <p className="text-[#F2F2F2]">{benefit}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/buy?product=nasal-${index === 0 ? 'core' : 'mitofuel'}`}
                    className="block w-full text-white py-3 rounded-full transition-all duration-300 font-semibold text-center"
                    style={{
                      backgroundColor: spray.color,
                      boxShadow: `0 0 0 rgba(${spray.color}, 0)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 30px ${spray.color}80`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 ${spray.color}00`;
                    }}
                  >
                    Buy Now
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Nasal Delivery */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold font-montserrat text-center mb-12 text-white"
          >
            Why <span className="text-[#00A3E8]">Nasal Delivery</span>?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-[#111111] rounded-xl p-8 border border-[#9FA4A6]/20 hover:border-[#00A3E8]/50 transition-all duration-300"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 border-2"
                    style={{ borderColor: feature.color }}
                  >
                    <Icon className="w-8 h-8" style={{ color: feature.color }} />
                  </div>
                  <h3
                    className="text-2xl font-bold font-montserrat mb-4"
                    style={{ color: feature.color }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-[#F2F2F2] text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Complements The System */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-white mb-6">
              Complements the <span className="text-[#00D036]">Complete System</span>
            </h2>
            <p className="text-xl text-[#F2F2F2] leading-relaxed">
              The nasal sprays work synergistically with the oral formulas, providing an additional delivery method for enhanced flexibility and results. Use them together for comprehensive metabolic support.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#0D0D0D] rounded-2xl p-12 border border-[#9FA4A6]/20"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold font-montserrat text-[#00D036] mb-4">
                  Safety & Usage
                </h3>
                <ul className="space-y-3 text-[#F2F2F2]">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#00D036] mt-1">•</span>
                    <span>Follow label instructions carefully</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#00D036] mt-1">•</span>
                    <span>Do not exceed recommended dosage</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#00D036] mt-1">•</span>
                    <span>Consult healthcare professional if needed</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#00D036] mt-1">•</span>
                    <span>Store in a cool, dry place</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-montserrat text-[#FF7A00] mb-4">
                  Best Practices
                </h3>
                <ul className="space-y-3 text-[#F2F2F2]">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FF7A00] mt-1">•</span>
                    <span>Use consistently for best results</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FF7A00] mt-1">•</span>
                    <span>Can be used alongside oral formulas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FF7A00] mt-1">•</span>
                    <span>Prime spray before first use</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FF7A00] mt-1">•</span>
                    <span>Clean nozzle regularly</span>
                  </li>
                </ul>
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
              Ready to Try Nasal Delivery?
            </h2>
            <p className="text-xl text-[#F2F2F2] mb-8">
              Experience fast-acting clearance with LactoClear® nasal sprays
            </p>
            <Link
              href="/buy"
              className="inline-flex items-center space-x-2 bg-[#00A3E8] text-white px-12 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,163,232,0.5)] transition-all duration-300 font-semibold text-xl"
            >
              <span>Shop Nasal Sprays</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
