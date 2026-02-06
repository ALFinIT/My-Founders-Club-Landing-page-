"use client"

import { motion } from 'framer-motion'
import { Twitter, Linkedin, Instagram } from 'lucide-react'
import { Logo } from '@/components/logo'

const leftLinks = [
  { label: 'Platform', links: ['Explore Network', 'Opportunities'] },
]

const midLinks = [
  { label: 'Privacy', links: ['Privacy Policy', 'Data Usage'] },
]

const rightLinks = [
  { label: 'About', links: ['About Us'] },
]

export function Footer() {
  return (
    <footer className="w-full bg-black pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14">
              <Logo />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mt-1 font-light">Build Locally. Champion Regionally. Scale Globally.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a href="https://twitter.com/my_founders_club" target="_blank" rel="noopener noreferrer" className="p-2 text-white bg-white/5 rounded-full hover:bg-white/10 transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/company/my-founders-club" target="_blank" rel="noopener noreferrer" className="p-2 text-white bg-white/5 rounded-full hover:bg-white/10 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/my_founders_club" target="_blank" rel="noopener noreferrer" className="p-2 text-white bg-white/5 rounded-full hover:bg-white/10 transition-all">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8 border-b border-white/10 pb-8">
          {leftLinks.map((sec, i) => (
            <div key={i}>
              <h3 className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-4">{sec.label}</h3>
              <ul className="space-y-2">
                {sec.links.map((l, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-sm text-white/60 hover:text-white transition-colors font-light">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {midLinks.map((sec, i) => (
            <div key={i}>
              <h3 className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-4">{sec.label}</h3>
              <ul className="space-y-2">
                {sec.links.map((l, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-sm text-white/60 hover:text-white transition-colors font-light">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {rightLinks.map((sec, i) => (
            <div key={i}>
              <h3 className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-4">{sec.label}</h3>
              <ul className="space-y-2">
                {sec.links.map((l, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-sm text-white/60 hover:text-white transition-colors font-light">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <motion.div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 tracking-wider">
          <p className="font-light">© 2026 My Founders Club. All rights reserved.</p>
          <p className="font-light">Platform · Explore Network · Opportunities</p>
        </motion.div>
      </div>
    </footer>
  )
}
