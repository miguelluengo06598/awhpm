'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-pmi-dark via-pmi-purple to-pmi-purple overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-400 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4" />
      </div>
      
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] shrink-0"
          >
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src="/images/hero-summit.jpg"
                alt="PMI Global Summit Seoul"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pmi-purple/30 to-transparent" />
            </div>
            {/* Decorative ring */}
            <div className="absolute -inset-3 rounded-[3.5rem] border-2 border-white/10 pointer-events-none" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight tracking-tight">
              PMI<sup className="text-lg">®</sup> Global Summit Series
              <br />
              Seoul
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/85 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Registration is now open — two dynamic days, one global stage, and endless opportunities to connect across the region. Secure your pass by{' '}
              <span className="font-semibold text-white">13 April</span> and save{' '}
              <span className="font-semibold text-white">USD $400</span>.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-pmi-dark font-medium rounded-full hover:bg-white/90 transition-colors shadow-lg hover:shadow-xl"
              >
                Register Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
