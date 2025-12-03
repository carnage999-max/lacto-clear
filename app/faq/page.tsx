'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  color?: string;
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faqs');
      if (response.ok) {
        const data = await response.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading FAQs...</div>
      </main>
    );
  }

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              FREQUENTLY ASKED <span className="text-[#00A3E8]">QUESTIONS</span>
            </h1>
            <p className="text-xl lg:text-2xl text-[#F2F2F2] max-w-4xl mx-auto leading-relaxed mb-8">
              Find answers to common questions about LactoClear®
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#9FA4A6]" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 bg-[#111111] border-2 border-[#9FA4A6]/20 rounded-full text-white focus:border-[#00A3E8] focus:outline-none transition-colors duration-300"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#111111] rounded-xl border border-[#9FA4A6]/20 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1a1a1a] transition-colors duration-300"
                >
                  <span
                    className="text-lg font-semibold pr-8"
                    style={{ color: faq.color }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    style={{ color: faq.color }}
                  />
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-[#F2F2F2] leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#9FA4A6] text-xl">
                No questions found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-[#F2F2F2] mb-8">
              Our team is here to help you understand the LactoClear® system
            </p>
            <a
              href="/contact"
              className="inline-flex items-center space-x-2 bg-[#00A3E8] text-white px-12 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,163,232,0.5)] transition-all duration-300 font-semibold text-xl"
            >
              <span>Contact Us</span>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
