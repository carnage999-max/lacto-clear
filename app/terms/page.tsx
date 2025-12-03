'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold font-montserrat text-white mb-6">
              TERMS OF <span className="text-[#00A3E8]">SERVICE</span>
            </h1>
            <p className="text-[#9FA4A6] mt-4">
              Last Updated: December 2, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none">
            
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">Agreement to Terms</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use of the LactoClear website and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
              </p>
            </motion.div>

            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">1. Use of Services</h2>
              <p className="text-[#F2F2F2] leading-relaxed mb-4">
                You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms.
              </p>
              <p className="text-[#F2F2F2] leading-relaxed">
                You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to use our Services in any way that violates any applicable law or regulation.
              </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">2. Product Information and Disclaimer</h2>
              <p className="text-[#F2F2F2] leading-relaxed mb-4">
                LactoClear products are dietary supplements designed to support metabolic function and overall wellness. These statements have not been evaluated by the Food and Drug Administration. Our products are not intended to diagnose, treat, cure, or prevent any disease.
              </p>
              <p className="text-[#F2F2F2] leading-relaxed">
                We make every effort to ensure the accuracy of product information on our website. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free. We reserve the right to correct any errors, inaccuracies, or omissions at any time without prior notice.
              </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">3. Orders and Payment</h2>
              <p className="text-[#F2F2F2] leading-relaxed mb-4">
                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraudulent activity.
              </p>
              <p className="text-[#F2F2F2] leading-relaxed">
                Payment must be made at the time of purchase using one of our accepted payment methods. By providing payment information, you represent and warrant that you have the legal right to use the payment method provided.
              </p>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">4. Shipping and Delivery</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                We ship to addresses within the United States. Shipping times vary based on your location and the shipping method selected. We are not responsible for delays caused by shipping carriers or circumstances beyond our control. Title and risk of loss pass to you upon delivery to the carrier.
              </p>
            </motion.div>

            {/* Section 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">5. Returns and Refunds</h2>
              <p className="text-[#F2F2F2] leading-relaxed mb-4">
                We offer a 30-day money-back guarantee on all products. If you are not satisfied with your purchase, you may return the product within 30 days of delivery for a full refund of the purchase price, excluding shipping costs.
              </p>
              <p className="text-[#F2F2F2] leading-relaxed">
                To initiate a return, please contact our customer service team at info@lactoclear.com. Products must be returned in their original condition and packaging. Refunds will be processed within 5-7 business days of receiving the returned product.
              </p>
            </motion.div>

            {/* Section 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">6. Intellectual Property</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                All content on our website, including but not limited to text, graphics, logos, images, and software, is the property of LactoClear or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
              </p>
            </motion.div>

            {/* Section 7 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">7. Limitation of Liability</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                To the fullest extent permitted by law, LactoClear shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our Services or products.
              </p>
            </motion.div>

            {/* Section 8 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">8. Indemnification</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                You agree to indemnify, defend, and hold harmless LactoClear and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or relating to your use of our Services, your violation of these Terms, or your violation of any rights of another party.
              </p>
            </motion.div>

            {/* Section 9 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">9. Governing Law</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of Maine, United States, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms shall be brought exclusively in the courts of Maine.
              </p>
            </motion.div>

            {/* Section 10 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">10. Changes to Terms</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website with a new "Last Updated" date. Your continued use of our Services after any such changes constitutes your acceptance of the new Terms.
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">Contact Information</h2>
              <p className="text-[#F2F2F2] leading-relaxed mb-6">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#9FA4A6]/20">
                <p className="text-[#F2F2F2]">
                  <strong className="text-white">Email:</strong> info@lactoclear.com
                </p>
                <p className="text-[#F2F2F2] mt-2">
                  <strong className="text-white">Mailing Address:</strong><br />
                  LactoClear<br />
                  PO Box 52<br />
                  Detroit, ME 04929<br />
                  USA
                </p>
              </div>
            </motion.div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center pt-8 border-t border-[#9FA4A6]/20"
            >
              <p className="text-[#9FA4A6]">
                © 2025 LactoClear. All rights reserved.
              </p>
              <p className="text-[#9FA4A6] mt-2 text-sm">
                See also: <Link href="/privacy" className="text-[#00A3E8] hover:text-[#00D036]">Privacy Policy</Link>
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
