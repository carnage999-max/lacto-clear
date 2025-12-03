'use client';

import { motion } from 'framer-motion';
import { Clock, Target, Zap, Heart, Brain, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function ProtocolPage() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Foundation',
      duration: 'Days 1-7',
      icon: Target,
      color: '#00A3E8',
      goals: [
        'Begin lactate metabolism optimization',
        'Establish baseline energy levels',
        'Start mitochondrial support',
      ],
      dosage: 'Core: 2 capsules daily (morning) | MitoFuel: 1 capsule daily (afternoon)',
    },
    {
      phase: 'Phase 2',
      title: 'Activation',
      duration: 'Days 8-30',
      icon: Zap,
      color: '#00D036',
      goals: [
        'Maximize lactate clearance',
        'Enhance ATP production',
        'Optimize metabolic efficiency',
      ],
      dosage: 'Core: 2 capsules daily | MitoFuel: 2 capsules daily',
    },
    {
      phase: 'Phase 3',
      title: 'Maintenance',
      duration: 'Day 31+',
      icon: TrendingUp,
      color: '#FF7A00',
      goals: [
        'Sustain metabolic optimization',
        'Continue energy support',
        'Long-term wellness foundation',
      ],
      dosage: 'Core: 2 capsules daily | MitoFuel: 1-2 capsules as needed',
    },
  ];

  const guidelines = [
    {
      icon: Clock,
      title: 'Timing',
      description: 'Take Core in the morning with breakfast. Take MitoFuel in the afternoon or before physical activity for optimal support.',
    },
    {
      icon: Heart,
      title: 'Consistency',
      description: 'Daily use is essential for best results. Set reminders to maintain your routine and support continuous metabolic optimization.',
    },
    {
      icon: Brain,
      title: 'Lifestyle Integration',
      description: 'Combine with balanced nutrition, adequate hydration, quality sleep, and regular physical activity for enhanced benefits.',
    },
  ];

  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00D036]/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold font-montserrat text-white mb-6">
              THE LACTOCLEAR® <span className="text-[#00D036]">PROTOCOL</span>
            </h1>
            <p className="text-xl lg:text-2xl text-[#F2F2F2] max-w-4xl mx-auto leading-relaxed">
              A comprehensive 90-day approach to metabolic optimization and sustained energy
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold font-montserrat text-white mb-6">
              What is the Protocol?
            </h2>
            <p className="text-lg text-[#F2F2F2] leading-relaxed max-w-3xl mx-auto">
              The LactoClear® Protocol is a scientifically-designed supplement regimen that combines 
              <span className="text-[#00A3E8] font-semibold"> LactoClear® Core</span> and 
              <span className="text-[#FF7A00] font-semibold"> LactoClear® MitoFuel</span> to optimize 
              lactate metabolism, support mitochondrial function, and enhance cellular energy production. 
              This systematic approach ensures maximum benefits through three progressive phases.
            </p>
          </motion.div>

          {/* The Two Products */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#00A3E8]/10 to-transparent border border-[#00A3E8]/30 rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-[#00A3E8] rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-montserrat text-white mb-4">
                LactoClear® Core
              </h3>
              <p className="text-[#F2F2F2] leading-relaxed mb-4">
                The foundation of the protocol. Core contains the proprietary lactate-metabolizing enzyme blend 
                that helps convert excess lactate into usable energy, reducing fatigue and supporting optimal 
                cellular function.
              </p>
              <div className="inline-block bg-[#00A3E8]/20 text-[#00A3E8] px-4 py-2 rounded-full text-sm font-semibold">
                Essential Daily Support
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#FF7A00]/10 to-transparent border border-[#FF7A00]/30 rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-montserrat text-white mb-4">
                LactoClear® MitoFuel
              </h3>
              <p className="text-[#F2F2F2] leading-relaxed mb-4">
                Advanced mitochondrial support. MitoFuel provides targeted nutrients that enhance ATP production, 
                protect mitochondria from oxidative stress, and amplify the benefits of Core for sustained 
                energy throughout the day.
              </p>
              <div className="inline-block bg-[#FF7A00]/20 text-[#FF7A00] px-4 py-2 rounded-full text-sm font-semibold">
                Enhanced Performance
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Three Phases */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold font-montserrat text-white mb-6">
              The Three Phases
            </h2>
            <p className="text-lg text-[#F2F2F2] max-w-3xl mx-auto">
              Each phase is designed to progressively optimize your metabolic function
            </p>
          </motion.div>

          <div className="space-y-8">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#0D0D0D] rounded-2xl p-8 border border-[#9FA4A6]/20 hover:border-[#9FA4A6]/40 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${phase.color}20`, borderWidth: '2px', borderColor: phase.color }}
                      >
                        <Icon className="w-10 h-10" style={{ color: phase.color }} />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 
                            className="text-3xl font-bold font-montserrat mb-2"
                            style={{ color: phase.color }}
                          >
                            {phase.phase}: {phase.title}
                          </h3>
                          <p className="text-[#9FA4A6] text-lg font-semibold">
                            {phase.duration}
                          </p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-white font-bold mb-3">Phase Goals:</h4>
                        <ul className="space-y-2">
                          {phase.goals.map((goal, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-[#00D036] mr-2">▸</span>
                              <span className="text-[#F2F2F2]">{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#111111] rounded-xl p-4 border border-[#9FA4A6]/10">
                        <h4 className="text-white font-bold mb-2">Recommended Dosage:</h4>
                        <p className="text-[#F2F2F2]">{phase.dosage}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold font-montserrat text-white mb-6">
              Usage Guidelines
            </h2>
            <p className="text-lg text-[#F2F2F2] max-w-3xl mx-auto">
              Follow these best practices to maximize your results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {guidelines.map((guideline, index) => {
              const Icon = guideline.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#111111] rounded-2xl p-8 border border-[#9FA4A6]/20 hover:border-[#00D036]/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-[#00D036]/20 rounded-full flex items-center justify-center mb-6 border-2 border-[#00D036]">
                    <Icon className="w-8 h-8 text-[#00D036]" />
                  </div>
                  <h3 className="text-2xl font-bold font-montserrat text-white mb-4">
                    {guideline.title}
                  </h3>
                  <p className="text-[#F2F2F2] leading-relaxed">
                    {guideline.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expected Results */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold font-montserrat text-white mb-6">
              What to Expect
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                timeframe: 'Week 1-2',
                expectation: 'Initial improvements in energy levels and reduced post-exercise fatigue. Your body begins adapting to enhanced lactate metabolism.',
              },
              {
                timeframe: 'Week 3-4',
                expectation: 'Noticeable increase in sustained energy throughout the day. Better recovery after physical activity and improved mental clarity.',
              },
              {
                timeframe: 'Week 5-8',
                expectation: 'Optimal metabolic function established. Consistent energy levels, enhanced endurance, and overall improvement in daily performance.',
              },
              {
                timeframe: 'Week 9-12+',
                expectation: 'Long-term metabolic optimization maintained. Sustained benefits with continued use, supporting overall health and wellness goals.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0D0D0D] rounded-xl p-6 border-l-4 border-[#00A3E8]"
              >
                <h3 className="text-xl font-bold font-montserrat text-[#00A3E8] mb-2">
                  {item.timeframe}
                </h3>
                <p className="text-[#F2F2F2] leading-relaxed">
                  {item.expectation}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-[#FF7A00]/10 to-[#FFD400]/10 border border-[#FF7A00]/30 rounded-2xl p-8"
          >
            <p className="text-[#F2F2F2] text-center text-sm">
              <strong className="text-white">Important Note:</strong> Individual results may vary. 
              The LactoClear® Protocol is designed to support metabolic function, but results depend on 
              various factors including diet, lifestyle, and individual physiology. These statements have 
              not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or 
              prevent any disease.
            </p>
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
              Ready to Start Your Protocol?
            </h2>
            <p className="text-xl text-[#F2F2F2] mb-8">
              Get both Core and MitoFuel together and save with our Protocol Bundle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/buy"
                className="bg-[#00D036] text-white px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,208,54,0.5)] transition-all duration-300 font-semibold text-lg"
              >
                Shop the Protocol
              </Link>
              <Link
                href="/how-it-works"
                className="bg-transparent text-white px-8 py-4 rounded-full border-2 border-white hover:bg-white hover:text-black transition-all duration-300 font-semibold text-lg"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
