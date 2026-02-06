'use client'

import { motion } from 'framer-motion'

const footerLinks = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Security', 'Roadmap'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Guides', 'Community', 'Documentation', 'Support'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Cookies', 'Compliance'],
  },
]

export function Footer() {
  return (
    <footer className="w-full bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white uppercase mb-20">
            My Founders Club
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20 pb-12 border-b border-white/10">
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <h3 className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-sm text-white/60 hover:text-white transition-colors font-light"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 tracking-wider"
        >
          <p className="uppercase font-light">© 2025 My Founders Club. All Rights Reserved.</p>
          <p className="uppercase font-light">Design & Development</p>
        </motion.div>
      </div>
    </footer>
  )
}
