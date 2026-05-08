'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const tabs = ['AI', 'Agile', 'Careers', 'Sustainability']

const resourcesData: Record<string, any[]> = {
  AI: [
    {
      type: 'featured',
      badges: ['Online Tool', 'Free for Members'],
      title: 'Unlock the Power of Infinity™',
      description: 'Exclusive to members and powered by AI, PMI Infinity™ is your project management coach designed to boost project success.',
      image: '/images/infinity.png',
      cta: 'Explore Infinity',
      bgClass: 'bg-gradient-to-br from-pmi-teal to-[#0A3A44]',
      isDark: true,
    },
    {
      type: 'card',
      badges: ['Podcast', 'Discussion'],
      title: 'Lee Lambert on AI, Human Skills, and the Evolution of Project Management',
      description: 'Lee Lambert, PMI Fellow and one of the founders of the PMP, shares how AI is changing project management.',
      cta: 'Listen Now',
    },
    {
      type: 'link',
      badges: ['Article', 'Free for Members'],
      title: 'Enabling Project Management Transformation with GenAI',
    },
    {
      type: 'link',
      badges: ['eLearning', 'Certification'],
      title: 'PMI-CPMAI™ is your license to lead AI',
    },
  ],
  Agile: [
    {
      type: 'featured',
      badges: ['Guide', 'Free for Members'],
      title: 'Agile Practice Guide',
      description: 'A comprehensive guide to understanding agile approaches and how to apply them to your projects.',
      cta: 'Explore Guide',
      bgClass: 'bg-gradient-to-br from-[#0A2A5C] to-[#1E1050]',
      isDark: true,
    },
    {
      type: 'card',
      badges: ['Webinar'],
      title: 'Scaling Agile in Large Organizations',
      description: 'Learn from industry experts how to successfully implement agile practices at enterprise scale.',
      cta: 'Watch Now',
    },
    {
      type: 'link',
      badges: ['Article'],
      title: 'Agile vs. Waterfall: Choosing the Right Approach',
    },
    {
      type: 'link',
      badges: ['Certification'],
      title: 'PMI-ACP®: Validate Your Agile Expertise',
    },
  ],
  Careers: [
    {
      type: 'featured',
      badges: ['Tool', 'Free'],
      title: 'PMI Career Navigator™',
      description: 'Map your career path in project management with personalized recommendations and insights.',
      cta: 'Explore Tool',
      bgClass: 'bg-gradient-to-br from-pmi-purple to-[#2D1157]',
      isDark: true,
    },
    {
      type: 'card',
      badges: ['Report'],
      title: 'Earning Power: Project Management Salary Survey',
      description: 'Discover how project management certifications impact earning potential worldwide.',
      cta: 'Read Report',
    },
    {
      type: 'link',
      badges: ['Article'],
      title: 'Top Project Management Skills for 2026',
    },
    {
      type: 'link',
      badges: ['Tool'],
      title: 'PMI Job Board: Find Your Next Role',
    },
  ],
  Sustainability: [
    {
      type: 'featured',
      badges: ['Guide', 'New'],
      title: 'Sustainability in Project Management',
      description: 'Learn how to integrate sustainability principles into your project management practices.',
      cta: 'Explore Guide',
      bgClass: 'bg-gradient-to-br from-[#1B4D3E] to-[#0A3328]',
      isDark: true,
    },
    {
      type: 'card',
      badges: ['Whitepaper'],
      title: 'Green Project Management: The Future is Now',
      description: 'Explore the growing importance of environmental considerations in project delivery.',
      cta: 'Download',
    },
    {
      type: 'link',
      badges: ['Article'],
      title: 'PMI-PBA®: Business Analysis for Sustainable Projects',
    },
    {
      type: 'link',
      badges: ['Certification'],
      title: 'GPM-b™: Green Project Management Certification',
    },
  ],
}

export default function Resources() {
  const [activeTab, setActiveTab] = useState('AI')

  const resources = resourcesData[activeTab] || []

  return (
    <section className="w-full bg-pmi-cream py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A career in project management means being dedicated to lifelong learning. Use the resources below to fuel your growth and excel within the ever-changing project landscape.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex gap-0 border-b border-gray-200 mb-10 overflow-x-auto scrollbar-hide"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-pmi-dark'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-pmi-dark"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {/* Featured card */}
            <div
              className={`${resources[0]?.bgClass || 'bg-gradient-to-br from-pmi-teal to-[#0A3A44]'} rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden min-h-[360px]`}
            >
              <div className="flex gap-2 mb-4">
                {resources[0]?.badges?.map((badge: string) => (
                  <span
                    key={badge}
                    className="px-3 py-1 text-xs font-medium rounded-full border border-white/30 text-white/90"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {resources[0]?.image && (
                <div className="w-28 h-28 mb-4">
                  <img
                    src={resources[0].image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <h3 className="text-xl md:text-2xl font-bold text-white mt-auto">
                {resources[0]?.title}
              </h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {resources[0]?.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center self-start gap-2 mt-6 px-5 py-2.5 bg-white text-pmi-dark text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
              >
                {resources[0]?.cta}
              </a>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4">
              {/* Podcast/Article card */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 flex flex-col">
                <div className="flex gap-2 mb-3">
                  {resources[1]?.badges?.map((badge: string) => (
                    <span
                      key={badge}
                      className="px-3 py-1 text-xs font-medium rounded-full border border-gray-300 text-gray-600"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-pmi-dark leading-snug">
                  {resources[1]?.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {resources[1]?.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center self-start gap-2 mt-4 px-5 py-2.5 bg-pmi-dark text-white text-sm font-medium rounded-full hover:bg-pmi-purple transition-colors"
                >
                  {resources[1]?.cta}
                </a>
              </div>

              {/* Link items */}
              {resources.slice(2).map((resource: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 border border-gray-100 group hover:border-gray-200 transition-colors"
                >
                  <div className="flex gap-2 mb-2">
                    {resource.badges?.map((badge: string) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border border-gray-300 text-gray-600"
                      >
                        {badge === 'Free for Members' && (
                          <Sparkles className="w-3 h-3 text-pmi-purple" />
                        )}
                        {badge}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="flex items-center justify-between group/link"
                  >
                    <span className="text-base font-semibold text-pmi-dark group-hover/link:text-pmi-purple transition-colors pr-4">
                      {resource.title}
                    </span>
                    <ArrowRight className="w-5 h-5 text-pmi-dark flex-shrink-0 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
        fill="currentColor"
      />
    </svg>
  )
}
