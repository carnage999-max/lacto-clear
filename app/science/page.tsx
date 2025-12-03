'use client';

import { motion } from 'framer-motion';
import { BookOpen, AlertCircle, TestTube, Zap } from 'lucide-react';
import Image from 'next/image';

export default function SciencePage() {
  const sections = [
    {
      icon: AlertCircle,
      title: 'What is the Lactate Shield?',
      content: 'The lactate shield is a protective barrier created when cells produce excess lactate in response to stress, inflammation, or metabolic dysfunction. This barrier creates an acidic microenvironment that shields affected cells from immune detection and metabolic regulation.',
      color: '#FF7A00',
    },
    {
      icon: TestTube,
      title: 'Why Do Cells Produce Excess Lactate?',
      content: 'Stressed, inflamed, or compromised cells shift their metabolism to favor lactate production. This metabolic adaptation allows them to survive in challenging conditions, but it creates a barrier that prevents normal recovery and maintains dysfunction.',
      color: '#00D036',
    },
    {
      icon: Zap,
      title: 'pH Shift and Immune Suppression',
      content: 'The acidic environment created by excess lactate suppresses immune function and blocks cellular communication. This pH shift prevents recovery pathways from functioning optimally and maintains a state of metabolic dysfunction.',
      color: '#00A3E8',
    },
    {
      icon: BookOpen,
      title: 'Why Clearance Matters',
      content: 'Removing the lactate barrier restores normal pH balance, reactivates immune surveillance, and reopens metabolic communication pathways. This clearance is essential for allowing the body to return to balanced function.',
      color: '#00D036',
    },
  ];

  return (
    <main className="min-h-screen bg-black pt-20">
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
            <h1 className="text-5xl lg:text-7xl font-bold font-montserrat text-white mb-6">
              THE <span className="text-[#00A3E8]">SCIENCE</span> BEHIND LACTOCLEAR®
            </h1>
            <p className="text-xl lg:text-2xl text-[#F2F2F2] max-w-4xl mx-auto leading-relaxed">
              Understanding the metabolic barrier and why clearing it is essential for recovery
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lactate Shield Diagrams */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold font-montserrat text-center mb-12 text-white"
          >
            The <span className="text-[#FF7A00]">Lactate Shield</span> Explained
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Diagram 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#111111] rounded-2xl p-8 border border-[#9FA4A6]/20"
            >
              <div className="relative w-full h-96 mb-6">
                <Image
                  src="/diagrams/lactate-shield-1.png"
                  alt="Lactate Shield Formation"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold font-montserrat text-[#FF7A00] mb-3">
                Shield Formation
              </h3>
              <p className="text-[#F2F2F2] text-lg leading-relaxed">
                Stressed cells produce excess lactate, creating a protective acidic barrier that blocks immune detection and metabolic regulation.
              </p>
            </motion.div>

            {/* Diagram 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#111111] rounded-2xl p-8 border border-[#9FA4A6]/20"
            >
              <div className="relative w-full h-96 mb-6">
                <Image
                  src="/diagrams/lactate-shield-2.png"
                  alt="Breaking the Shield"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold font-montserrat text-[#00D036] mb-3">
                Breaking the Shield
              </h3>
              <p className="text-[#F2F2F2] text-lg leading-relaxed">
                LactoClear® Core dismantles the lactate barrier, restoring normal pH balance and reopening metabolic communication pathways.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Science Sections */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#111111] rounded-2xl p-8 lg:p-12 border border-[#9FA4A6]/20 hover:border-[#00A3E8]/50 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row items-start gap-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                    style={{ borderColor: section.color }}
                  >
                    <Icon className="w-8 h-8" style={{ color: section.color }} />
                  </div>
                  <div className="flex-1">
                    <h2
                      className="text-3xl lg:text-4xl font-bold font-montserrat mb-4"
                      style={{ color: section.color }}
                    >
                      {section.title}
                    </h2>
                    <p className="text-xl text-[#F2F2F2] leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How Removing the Shield Restores Balance */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-white mb-6">
              How Removing the Shield <span className="text-[#00D036]">Restores Balance</span>
            </h2>
            <p className="text-xl text-[#F2F2F2] max-w-4xl mx-auto leading-relaxed">
              The LactoClear® system is designed to systematically dismantle the lactate barrier and reactivate normal metabolic function
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Clearance Phase',
                description: 'Core breaks down excess lactate, removing the protective barrier and restoring normal pH balance.',
                color: '#00D036',
              },
              {
                title: 'Activation Phase',
                description: 'MitoFuel reactivates mitochondrial function and accelerates energy production once the pathway is clear.',
                color: '#FF7A00',
              },
              {
                title: 'Recovery Phase',
                description: 'With the barrier removed, normal metabolic communication resumes and balance is restored.',
                color: '#00A3E8',
              },
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#111111] rounded-xl p-8 border-2"
                style={{ borderColor: phase.color }}
              >
                <div
                  className="text-6xl font-bold font-montserrat mb-4 opacity-20"
                  style={{ color: phase.color }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3
                  className="text-2xl font-bold font-montserrat mb-4"
                  style={{ color: phase.color }}
                >
                  {phase.title}
                </h3>
                <p className="text-[#F2F2F2] text-lg leading-relaxed">
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#9FA4A6] text-center text-sm leading-relaxed">
            The information provided on this page is for educational purposes only. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult with a healthcare professional before starting any supplementation program.
          </p>
        </div>
      </section>
    </main>
  );
}
