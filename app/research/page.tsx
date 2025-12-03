'use client';

import { motion } from 'framer-motion';

export default function ResearchPage() {
  const studies = [
    {
      title: 'Lactate Metabolism and Cellular Recovery',
      journal: 'Journal of Metabolic Research',
      year: '2024',
      description: 'Comprehensive analysis of lactate clearance mechanisms and their impact on cellular function recovery.',
      link: '#',
    },
    {
      title: 'pH Balance and Immune System Function',
      journal: 'International Journal of Immunology',
      year: '2023',
      description: 'Study examining the relationship between acidic microenvironments and immune surveillance suppression.',
      link: '#',
    },
    {
      title: 'Mitochondrial Activation Pathways',
      journal: 'Cellular Energy & Metabolism',
      year: '2024',
      description: 'Research on metabolic acceleration and energy production optimization in stressed cellular environments.',
      link: '#',
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
              RESEARCH & <span className="text-[#00A3E8]">STUDIES</span>
            </h1>
            <p className="text-xl lg:text-2xl text-[#F2F2F2] max-w-4xl mx-auto leading-relaxed">
              Explore the scientific foundation behind LactoClear® and metabolic optimization
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Papers */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {studies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#111111] rounded-xl p-8 border border-[#9FA4A6]/20 hover:border-[#00A3E8]/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold font-montserrat text-white mb-3">
                  {study.title}
                </h3>
                <div className="flex flex-wrap gap-4 mb-4 text-[#9FA4A6]">
                  <span>{study.journal}</span>
                  <span>•</span>
                  <span>{study.year}</span>
                </div>
                <p className="text-[#F2F2F2] leading-relaxed mb-6">
                  {study.description}
                </p>
                <a
                  href={study.link}
                  className="inline-flex items-center text-[#00A3E8] hover:text-[#00D036] transition-colors font-semibold"
                >
                  Read More
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#9FA4A6] text-center text-sm leading-relaxed">
            The research links provided are for educational purposes only. These statements have not been evaluated by the Food and Drug Administration. 
            This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>
    </main>
  );
}
