'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Compass, Users, Zap, TrendingUp, Award, Globe } from 'lucide-react'

const features = [
  {
    icon: Compass,
    title: 'Founder Network',
    description: 'Connect with like-minded entrepreneurs, share experiences, and build lasting partnerships.',
    image: '/founders-hub.jpg',
  },
  {
    icon: Users,
    title: 'Investor Directory',
    description: 'Access curated investor profiles and funding opportunities tailored to your stage.',
    image: '/investor-directory.jpg',
  },
  {
    icon: Zap,
    title: 'Market Insights',
    description: 'Real-time data on Gulf startup trends, competitive landscape, and growth strategies.',
    image: '/ecosystem.jpg',
  },
  {
    icon: TrendingUp,
    title: 'Growth Tools',
    description: 'Resources, templates, and frameworks to accelerate your business development.',
    image: '/growth-tools.jpg',
  },
  {
    icon: Award,
    title: 'Mentorship Hub',
    description: 'Learn from seasoned founders and industry experts through curated programs.',
    image: '/mentorship.jpg',
  },
  {
    icon: Globe,
    title: 'Global Expansion',
    description: 'Connect with international networks to scale your business beyond the region.',
    image: '/ecosystem.jpg',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export function FeaturesSection() {
  return (
    <section className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] via-background to-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Comprehensive tools and community designed for the Gulf startup ecosystem.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                {/* Image backdrop */}
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-orange-500/20"
                    animate={{ borderColor: ['rgba(255, 91, 35, 0.2)', 'rgba(255, 91, 35, 0.5)', 'rgba(255, 91, 35, 0.2)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>

                {/* Content */}
                <div className="glass glass-hover p-6 rounded-b-2xl">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/30 to-teal-500/20 flex items-center justify-center mb-4 group-hover:from-orange-500/40 group-hover:to-teal-500/30 transition-all"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <Icon className="w-6 h-6 text-orange-400" />
                  </motion.div>

                  <h3 className="text-lg font-light mb-2 text-white">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm font-light">{feature.description}</p>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-0 right-0 w-1 h-8 bg-gradient-to-b from-orange-500 to-transparent" />
                    <div className="absolute top-0 right-0 w-8 h-1 bg-gradient-to-r from-orange-500 to-transparent" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
