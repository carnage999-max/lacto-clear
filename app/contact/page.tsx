'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              GET IN <span className="text-[#00A3E8]">TOUCH</span>
            </h1>
            <p className="text-xl lg:text-2xl text-[#F2F2F2] max-w-4xl mx-auto leading-relaxed">
              Have questions about LactoClear®? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-montserrat text-white mb-8">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[#F2F2F2] mb-2 font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#111111] border-2 border-[#9FA4A6]/20 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#F2F2F2] mb-2 font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#111111] border-2 border-[#9FA4A6]/20 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#F2F2F2] mb-2 font-semibold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#111111] border-2 border-[#9FA4A6]/20 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none transition-colors duration-300 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00D036] text-white py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,208,54,0.5)] transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-montserrat text-white mb-8">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#111111] rounded-full flex items-center justify-center border-2 border-[#00A3E8] flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#00A3E8]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-montserrat text-white mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:info@lactoclear.com"
                      className="text-[#F2F2F2] hover:text-[#00A3E8] transition-colors break-words"
                    >
                      info@lactoclear.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#111111] rounded-full flex items-center justify-center border-2 border-[#00D036] flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#00D036]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-montserrat text-white mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:+1234567890"
                      className="text-[#F2F2F2] hover:text-[#00D036] transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:col-span-2 lg:col-span-1">
                  <div className="w-12 h-12 bg-[#111111] rounded-full flex items-center justify-center border-2 border-[#FF7A00] flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#FF7A00]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-montserrat text-white mb-2">
                      Address
                    </h3>
                    <p className="text-[#F2F2F2]">
                      PO Box 52<br />
                      Detroit, ME 04929<br />
                      USA
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-12 bg-[#111111] rounded-xl p-6 border border-[#9FA4A6]/20">
                <h3 className="text-2xl font-bold font-montserrat text-white mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 text-[#F2F2F2]">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
