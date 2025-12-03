'use client';

import { motion } from 'framer-motion';
import { Target, Users, Award, Zap, Heart, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We exist to solve the metabolic blockade that holds people back from their peak performance and recovery.',
      color: '#00A3E8',
    },
    {
      icon: Shield,
      title: 'Science-First',
      description: 'Every formulation is backed by research into lactate metabolism and mitochondrial function.',
      color: '#00D036',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We use only the highest-grade ingredients and maintain strict manufacturing standards.',
      color: '#FF7A00',
    },
  ];

  const team = [
    {
      role: 'Research & Development',
      description: 'Our R&D team brings together expertise in biochemistry, metabolic science, and nutritional innovation.',
      icon: Zap,
    },
    {
      role: 'Quality Assurance',
      description: 'Every batch is tested for purity, potency, and safety to ensure you get exactly what we promise.',
      icon: Shield,
    },
    {
      role: 'Customer Care',
      description: 'We\'re here to support your journey with responsive, knowledgeable guidance every step of the way.',
      icon: Heart,
    },
  ];

  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00D036]/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00A3E8]/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold font-montserrat text-white mb-6">
              ABOUT <span className="text-[#00D036]">LACTOCLEAR®</span>
            </h1>
            <p className="text-xl lg:text-2xl text-[#F2F2F2] max-w-4xl mx-auto leading-relaxed">
              We're on a mission to revolutionize metabolic optimization through science-backed lactate clearance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold font-montserrat text-white mb-6">
              Our Story
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-[#F2F2F2] leading-relaxed"
          >
            <p>
              LactoClear® was born from a simple observation: despite advances in health and wellness, 
              many people still struggle with persistent fatigue, slow recovery, and metabolic stagnation. 
              The missing link? <span className="text-[#00D036] font-semibold">Lactate clearance</span>.
            </p>
            <p>
              While lactate has long been understood as a metabolic byproduct, emerging research revealed 
              something crucial—excess lactate doesn't just accumulate, it actively creates a "metabolic shield" 
              that blocks recovery pathways and suppresses optimal cellular function.
            </p>
            <p>
              We set out to develop a solution that would address this fundamental metabolic barrier. 
              After years of research and development, we created the <span className="text-[#00A3E8] font-semibold">LactoClear® System</span>—a 
              two-part protocol designed to break through the lactate shield and restore metabolic balance.
            </p>
            <p>
              Today, LactoClear® represents the culmination of cutting-edge metabolic science, premium formulation, 
              and a commitment to helping people achieve their peak performance and recovery potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold font-montserrat text-white mb-6">
              Our Values
            </h2>
            <p className="text-lg text-[#F2F2F2] max-w-3xl mx-auto">
              Everything we do is guided by these core principles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#0D0D0D] rounded-2xl p-8 border border-[#9FA4A6]/20 hover:border-[#9FA4A6]/40 transition-all duration-300"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${value.color}20`, borderWidth: '2px', borderColor: value.color }}
                  >
                    <Icon className="w-8 h-8" style={{ color: value.color }} />
                  </div>
                  <h3 className="text-2xl font-bold font-montserrat text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-[#F2F2F2] leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold font-montserrat text-white mb-6">
              Our Team
            </h2>
            <p className="text-lg text-[#F2F2F2] max-w-3xl mx-auto">
              A dedicated group of experts committed to metabolic innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#111111] rounded-2xl p-8 border border-[#9FA4A6]/20"
                >
                  <div className="w-16 h-16 bg-[#00A3E8]/20 rounded-full flex items-center justify-center mb-6 border-2 border-[#00A3E8]">
                    <Icon className="w-8 h-8 text-[#00A3E8]" />
                  </div>
                  <h3 className="text-2xl font-bold font-montserrat text-white mb-4">
                    {member.role}
                  </h3>
                  <p className="text-[#F2F2F2] leading-relaxed">
                    {member.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold font-montserrat text-white mb-6">
              Our Commitment to You
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-r from-[#00D036]/10 to-[#00A3E8]/10 border border-[#00D036]/30 rounded-2xl p-8 md:p-12"
          >
            <div className="space-y-6 text-lg text-[#F2F2F2] leading-relaxed">
              <p>
                <span className="text-[#00D036] font-semibold">Transparency:</span> We believe in full disclosure. 
                While we protect our proprietary formulations, we're always clear about what our products do and 
                what you can expect.
              </p>
              <p>
                <span className="text-[#00A3E8] font-semibold">Quality:</span> Every batch of LactoClear® undergoes 
                rigorous testing to ensure purity, potency, and safety. We never compromise on quality.
              </p>
              <p>
                <span className="text-[#FF7A00] font-semibold">Support:</span> Your success is our success. 
                We're here to answer questions, provide guidance, and help you get the most from the LactoClear® Protocol.
              </p>
              <p>
                <span className="text-white font-semibold">Innovation:</span> We're continuously researching and 
                developing new ways to support metabolic optimization and cellular health.
              </p>
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
            <h2 className="text-4xl font-bold font-montserrat text-white mb-6">
              Join the LactoClear® Movement
            </h2>
            <p className="text-xl text-[#F2F2F2] mb-8">
              Experience the difference that optimized lactate metabolism can make
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/buy"
                className="bg-[#00D036] text-white px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,208,54,0.5)] transition-all duration-300 font-semibold text-lg"
              >
                Shop Now
              </Link>
              <Link
                href="/contact"
                className="bg-transparent text-white px-8 py-4 rounded-full border-2 border-white hover:bg-white hover:text-black transition-all duration-300 font-semibold text-lg"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
