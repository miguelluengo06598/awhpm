'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const activityCards = [
  {
    title: 'Connect and network',
    description: 'Our chapter events and monthly meetings are perfect opportunities to meet other industry leaders, broaden your professional circle, and gain fresh perspective and ideas.',
    image: '/images/connect-network.jpg',
    cta: 'Learn More',
  },
  {
    title: 'Give back',
    description: 'Make a difference in your community. By volunteering your skills, expertise, and time for your chapter\'s social good activities, you can drive change where it matters most.',
    image: '/images/giving-back.jpg',
    cta: 'Learn More',
  },
  {
    title: 'Level up',
    description: 'Take advantage of custom-designed educational events and workshops that will further your career and increase your knowledge.',
    image: '/images/level-up.jpg',
    cta: 'Learn More',
  },
]

export default function Community() {
  return (
    <section className="w-full bg-pmi-cream py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-pmi-dark tracking-tight leading-[1.1] max-w-md"
          >
            The PMI community is active where you are
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base text-gray-600 leading-relaxed max-w-md lg:pt-4"
          >
            Make meaningful connections with visionary thought leaders, trend-setters, and project professionals elevating our world through project success.
          </motion.p>
        </div>

        {/* Chapters banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl mb-8"
        >
          <div className="absolute inset-0">
            <img
              src="/images/chapters-bg.jpg"
              alt="PMI Chapters"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>
          <div className="relative px-8 md:px-12 py-12 md:py-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-xs leading-tight">
              Check out the chapters near you
            </h3>
            <div className="flex flex-col md:items-end gap-4">
              <p className="text-sm text-white/80 max-w-xs md:text-right">
                Connect with like-minded professionals who shape the future one project at a time.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-pmi-dark text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
              >
                View Chapters
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Activity cards */}
        <div className="space-y-0">
          {activityCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row md:items-center gap-6 py-8 border-b border-gray-200 last:border-b-0"
            >
              <h3 className="text-xl md:text-2xl font-bold text-pmi-dark md:w-1/4 shrink-0">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed md:w-2/5 flex-1">
                {card.description}
              </p>
              <div className="flex items-center gap-4 md:w-auto">
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-pmi-dark hover:text-pmi-purple transition-colors"
                >
                  {card.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="w-32 h-20 rounded-xl overflow-hidden md:w-40 md:h-24">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
