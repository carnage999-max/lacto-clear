'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location?: string;
  rating: number;
  text: string;
  highlight?: string;
  color?: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading testimonials...</div>
      </main>
    );
  }

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
              WHAT OUR <span className="text-[#00D036]">CUSTOMERS</span> SAY
            </h1>
            <p className="text-xl lg:text-2xl text-[#F2F2F2] max-w-4xl mx-auto leading-relaxed">
              Real experiences from people who have cleared their path with LactoClear®
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {testimonials.length === 0 ? (
            <div className="text-center py-20">
              <Quote className="w-16 h-16 text-[#9FA4A6] mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold text-white mb-2">No Testimonials Yet</h3>
              <p className="text-[#9FA4A6] text-lg">
                Check back soon to read customer experiences with LactoClear®
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#111111] rounded-xl p-6 border border-[#9FA4A6]/20 hover:border-[#00A3E8]/50 transition-all duration-300 relative"
              >
                {/* Quote Icon */}
                <div
                  className="absolute top-4 right-4 opacity-20"
                  style={{ color: testimonial.color }}
                >
                  <Quote className="w-12 h-12" />
                </div>

                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#FFD400] text-[#FFD400]"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-[#F2F2F2] text-lg mb-6 leading-relaxed relative z-10">
                  {testimonial.text}
                </p>

                {/* Divider */}
                <div
                  className="h-px mb-4"
                  style={{ backgroundColor: testimonial.color, opacity: 0.3 }}
                ></div>

                {/* Author Info */}
                <div>
                  <p
                    className="font-bold font-montserrat text-lg"
                    style={{ color: testimonial.color }}
                  >
                    {testimonial.name}
                  </p>
                  <p className="text-[#9FA4A6]">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
            </div>
          )}
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
              Join Thousands Who Have Cleared Their Path
            </h2>
            <p className="text-xl text-[#F2F2F2] mb-8">
              Experience the LactoClear® difference for yourself
            </p>
            <a
              href="/buy"
              className="inline-flex items-center space-x-2 bg-[#00D036] text-white px-12 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,208,54,0.5)] transition-all duration-300 font-semibold text-xl"
            >
              <span>Get Started Today</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#9FA4A6] text-center text-sm leading-relaxed">
            * Individual results may vary. Testimonials represent individual experiences and are not necessarily representative of what anyone else may experience. These statements have not been evaluated by the FDA.
          </p>
        </div>
      </section>
    </main>
  );
}
