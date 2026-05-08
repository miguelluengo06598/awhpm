'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function InfinityBadge() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <div className="flex items-center gap-3 bg-[#1A1A2E] rounded-full pl-3 pr-2 py-2 shadow-xl">
          <div className="flex items-center gap-2">
            <img
              src="/images/infinity.png"
              alt="PMI Infinity"
              className="w-6 h-6 object-contain"
            />
            <span className="text-sm font-medium text-white">PMI Infinity</span>
            <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-[#00A3C4] rounded-full">
              New
            </span>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-3 h-3 text-white/70" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
