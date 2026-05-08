'use client'

import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="w-full bg-[#E8E4DF] py-16 md:py-24">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pmi-purple leading-tight">
            Start learning for free.
          </h2>
          <p className="mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-pmi-purple leading-snug">
            Sign up for a free PMI account to unlock dozens of free online courses, digital tools, virtual events, and thought leadership insights to accelerate your career.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10"
          >
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 bg-pmi-dark text-white text-base font-medium rounded-full hover:bg-pmi-purple transition-colors shadow-lg"
            >
              Register Now
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
