'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function GivingBack() {
  return (
    <section className="w-full bg-pmi-cream py-8 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pmi-purple to-[#4A1D8C]"
        >
          <div className="flex flex-col md:flex-row">
            {/* Content */}
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight max-w-sm">
                Your Path to Giving Back
              </h2>
              <p className="mt-4 text-base text-white/80 leading-relaxed max-w-sm">
                PMI membership unlocks local chapter volunteer opportunities
              </p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white text-pmi-dark font-medium rounded-full hover:bg-white/90 transition-colors self-start"
              >
                Become a Member
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>

            {/* Image */}
            <div className="flex-1 relative min-h-[250px] md:min-h-[320px]">
              <img
                src="/images/giving-back.jpg"
                alt="Volunteers giving back to the community"
                className="absolute inset-0 w-full h-full object-cover md:rounded-r-3xl"
              />
              {/* Purple overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-pmi-purple/60 via-pmi-purple/20 to-transparent md:rounded-r-3xl" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
