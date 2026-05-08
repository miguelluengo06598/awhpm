'use client'

import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: TrendingUp,
    title: 'career growth',
    description: 'and level up your skills with free and discounted professional education and certification.',
  },
  {
    icon: Zap,
    title: 'project success',
    description: 'with members-only tools, resources, and expertise.',
  },
  {
    icon: Users,
    title: 'global community',
    description: 'of more than 750,000 Project Professionals.',
  },
]

export default function Membership() {
  return (
    <section className="w-full bg-pmi-cream py-8 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[3rem] md:rounded-[4rem]"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A2A5C] via-[#1E1050] to-[#2D1050]" />
          
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-purple-500/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-[200px] h-[200px] bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-2xl" />
          
          {/* Content */}
          <div className="relative px-8 md:px-16 lg:px-20 py-12 md:py-20 lg:py-24">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
              {/* Left column */}
              <div className="flex-1 max-w-lg">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-purple-300" />
                  <span className="text-sm font-medium text-purple-200">PMI Membership</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-tight">
                  Unlock opportunity with
                  <br />
                  PMI membership
                </h2>
                
                <p className="mt-6 text-base text-white/75 leading-relaxed">
                  Join PMI for exclusive access to career development resources, project tools, and a global community.
                </p>
                
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white text-pmi-dark font-medium rounded-full hover:bg-white/90 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-pmi-purple" />
                  Explore Membership
                </motion.a>
              </div>

              {/* Right column - Features */}
              <div className="flex-1 max-w-md space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Boost <span className="font-semibold text-white">{feature.title}</span>{' '}
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
