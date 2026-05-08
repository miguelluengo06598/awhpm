'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface FooterLink {
  name: string
  href: string
  external?: boolean
}

const footerLinks: Record<string, FooterLink[]> = {
  'Quick Links': [
    { name: 'Report PDUs', href: '#', external: true },
    { name: 'Online Courses', href: '#' },
    { name: 'PMBOK\u00AE Guide', href: '#' },
    { name: 'Webinars', href: '#', external: true },
    { name: 'Events', href: '#' },
    { name: 'Store', href: '#' },
    { name: 'eLearning Gifts', href: '#' },
  ],
  'Certifications': [
    { name: 'Project Management Professional (PMP)\u00AE', href: '#' },
    { name: 'Certified Associate in Project Management (CAPM)\u00AE', href: '#' },
    { name: 'PMI Agile Certified Practitioner (PMI-ACP)\u00AE', href: '#' },
    { name: 'Compare Certifications', href: '#' },
  ],
  'Membership': [
    { name: 'Become a Member', href: '#' },
    { name: 'Local Chapters', href: '#' },
    { name: 'Membership FAQs', href: '#' },
  ],
  'Community': [
    { name: 'Latest from the Community', href: '#', external: true },
    { name: 'Discussions', href: '#', external: true },
    { name: 'Templates', href: '#', external: true },
    { name: 'Blogs', href: '#', external: true },
    { name: 'Volunteering', href: '#' },
  ],
  'Partner with PMI': [
    { name: 'Enterprise and Commercial Partners', href: '#' },
    { name: 'Training Partners', href: '#' },
  ],
  'Organization': [
    { name: 'Our Mission & Vision', href: '#' },
    { name: 'Our Purpose', href: '#' },
    { name: 'Our Leadership', href: '#' },
    { name: 'The PMI Blog', href: '#' },
    { name: 'What is Project Management?', href: '#' },
    { name: 'What is a Project Manager?', href: '#' },
    { name: 'Press & Media', href: '#' },
  ],
  'Support': [
    { name: 'Contact Us', href: '#' },
    { name: 'Store Help', href: '#' },
  ],
}

const legalLinks = [
  'Accessibility', 'Privacy', 'Sitemap', 'Terms of use', 
  'Purchasing Terms', 'Advertising & Sponsorship',
]

export default function Footer() {
  return (
    <footer className="w-full bg-[#EBE7E2] border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Links grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8"
        >
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs text-gray-600 hover:text-gray-900 transition-colors leading-relaxed inline-flex items-center gap-1"
                    >
                      {link.name}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="8" width="14" height="24" fill="#00A3C4" rx="1"/>
                <rect x="18" y="4" width="8" height="18" fill="#E87722" rx="1"/>
                <rect x="18" y="24" width="8" height="12" fill="#5B2D8E" rx="1"/>
                <rect x="28" y="12" width="10" height="20" fill="#003B5C" rx="1"/>
              </svg>
              <div>
                <div className="text-xs font-bold text-gray-900 leading-tight tracking-wide">PROJECT</div>
                <div className="text-xs font-bold text-gray-900 leading-tight tracking-wide">MANAGEMENT</div>
                <div className="text-xs font-medium text-gray-500 leading-tight tracking-wide">Institute.</div>
              </div>
            </div>

            {/* Stay Connected */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Stay Connected</span>
              <div className="flex gap-3">
                {/* Social icons - simplified dots */}
                {[1, 2, 3, 4].map((i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors flex items-center justify-center"
                  >
                    <div className="w-4 h-4 bg-gray-500 rounded-sm" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Legal links */}
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-xs text-gray-500">
              © 2026 Project Management Institute
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
