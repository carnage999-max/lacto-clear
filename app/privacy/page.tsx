'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
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
              PRIVACY <span className="text-[#00A3E8]">POLICY</span>
            </h1>
            <p className="text-xl text-[#F2F2F2]">
              Global Privacy Policy — Gold Standard Edition
            </p>
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
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">Introduction</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                This Global Privacy Policy (the "Policy") describes how LactoClear ("Company," "we," "our," or "us") collects, uses, discloses, and safeguards personal information across all current and future websites, subdomains, and online services (collectively, the "Services"). This Policy sets a global standard for privacy compliance and data protection in accordance with the highest international legal frameworks, including but not limited to the General Data Protection Regulation (EU) 2016/679 ("GDPR"), the California Consumer Privacy Act and Privacy Rights Act (CCPA/CPRA), the Virginia Consumer Data Protection Act (VCDPA), the Canadian Personal Information Protection and Electronic Documents Act (PIPEDA), and the Brazilian General Data Protection Law (LGPD). It applies to all users regardless of geographic location.
              </p>
            </motion.div>

            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">1. Scope and Applicability</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                This Policy applies to all visitors, customers, and users of our Services, and to all data collected online or offline through any form of interaction. By using our Services, you consent to the practices described herein.
              </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">2. Information We Collect</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                We collect personal data directly and automatically, including identifiers (name, email, phone number, address), commercial data (transactions, purchases, payment methods), biometric and health data (where applicable), geolocation, internet activity, behavioral analytics, device identifiers, and any other data required for lawful and legitimate business operations.
              </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">3. Automated and AI‑Based Processing</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                We utilize Artificial Intelligence and Machine Learning ("AI/ML") technologies to analyze behavioral data, enhance service personalization, detect fraud, and improve user experience. Automated decision‑making may influence personalized recommendations or fraud prevention mechanisms, never without appropriate human oversight and legal safeguards.
              </p>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">4. How We Use Information</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                We process data for legitimate business purposes: service delivery, account management, communication, compliance, analytics, marketing, personalization, and platform security. Processing is always grounded in a lawful basis under applicable law.
              </p>
            </motion.div>

            {/* Section 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">5. Disclosure and Data Sharing</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                We do not sell personal data. We share information only with trusted service providers, payment processors, affiliates, analytics vendors, and legal authorities when required by law. Each third‑party partner is contractually obligated to maintain equivalent data protection standards.
              </p>
            </motion.div>

            {/* Section 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">6. International Data Transfers</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                Data may be processed and stored in the United States and other jurisdictions. All transfers comply with GDPR Chapter V and equivalent safeguards through Standard Contractual Clauses, adequacy decisions, or binding corporate rules.
              </p>
            </motion.div>

            {/* Section 7 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">7. Data Retention</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                Personal data is retained only for as long as necessary to fulfill the purposes for which it was collected or as required by law. Retention schedules are periodically reviewed for compliance and minimization.
              </p>
            </motion.div>

            {/* Section 8 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">8. Children's Privacy</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                We comply with the Children's Online Privacy Protection Act (COPPA) and do not knowingly collect data from children under 13 years old (or 16 in applicable jurisdictions) without verifiable parental consent. Parents may contact us to review or delete their child's data at any time.
              </p>
            </motion.div>

            {/* Section 9 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">9. Your Rights</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                Depending on your jurisdiction, you may have the right to access, correct, delete, restrict processing, object to processing, port your data, or withdraw consent. Requests can be submitted using the contact information below.
              </p>
            </motion.div>

            {/* Section 10 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">10. Security and Safeguards</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                We employ administrative, technical, and physical safeguards that meet or exceed industry standards, including encryption, pseudonymization, role‑based access controls, multi‑factor authentication, and continuous threat monitoring.
              </p>
            </motion.div>

            {/* Section 11 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">11. Cookies and Tracking Technologies</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                We use cookies, web beacons, and similar tools for site functionality, analytics, and marketing. Users can control cookie preferences via browser settings or our Cookie Management Tool.
              </p>
            </motion.div>

            {/* Section 12 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">12. Cross‑Border Compliance</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                This Policy incorporates global privacy principles such as lawfulness, fairness, transparency, purpose limitation, data minimization, accuracy, integrity, and accountability. These principles apply uniformly across all operations and subsidiaries.
              </p>
            </motion.div>

            {/* Section 13 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">13. Data Protection Officer and Contact</h2>
              <p className="text-[#F2F2F2] leading-relaxed mb-6">
                We maintain a designated Data Protection Officer ("DPO") to oversee compliance. Users may exercise their rights or submit complaints via:
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

            {/* Section 14 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold font-montserrat text-[#00D036] mb-4">14. Updates to This Policy</h2>
              <p className="text-[#F2F2F2] leading-relaxed">
                We may update this Policy to reflect legal, technical, or business developments. The latest version will always be available on our website, with a new 'Last Updated' date. Continued use of our Services constitutes acceptance of any modifications.
              </p>
            </motion.div>

            {/* Annexes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="text-[#9FA4A6] leading-relaxed">
                <strong>Annexes:</strong> This Policy may be supplemented by a Data Processing Addendum (DPA) for enterprise clients, a Cookie Policy, and jurisdiction‑specific addenda where required.
              </p>
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
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
