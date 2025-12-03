import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    { href: '/about', label: 'About LactoClear®' },
    { href: '/protocol', label: 'The LactoClear® Protocol' },
    { href: '/research', label: 'Research Links' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-black border-t border-[#9FA4A6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo and Description */}
        <div className="mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="text-3xl font-bold font-montserrat">
              <span className="text-[#00D036]">Lacto</span>
              <span className="text-white">Clear</span>
              <span className="text-[#00A3E8]">®</span>
            </div>
          </Link>
          <p className="text-[#F2F2F2] max-w-md text-lg">
            Clearing the path for peak recovery through metabolic optimization.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#9FA4A6] hover:text-[#00A3E8] transition-colors duration-300 text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex space-x-6 mb-8">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-[#9FA4A6] hover:text-[#00A3E8] transition-colors duration-300"
              >
                <Icon className="w-6 h-6" />
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-[#9FA4A6]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#9FA4A6] text-sm">
              © {new Date().getFullYear()} LactoClear®. All rights reserved.
            </p>
            <p className="text-[#9FA4A6] text-sm text-center">
              These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
