'use client'

import { useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

const certs = [
  'PMP®', 'PgMP®', 'PfMP®', 'CAPM®', 'PMI-CP™', 'PMI-PMOCP™', 
  'PMI-ACP®', 'PMI-RMP®', 'PMI-PBA®', 'PMI-CPMAI™', 'GPM-b™', 'PMI-SP®',
]

export default function CertTicker() {
  const [isPaused, setIsPaused] = useState(false)
  const tickerRef = useRef<HTMLDivElement>(null)

  // Duplicate for seamless loop
  const allCerts = [...certs, ...certs]

  return (
    <section className="w-full bg-[#E8E4DF] py-10 overflow-hidden">
      <div className="relative">
        <div
          ref={tickerRef}
          className={`flex items-center gap-8 ${isPaused ? '' : 'animate-ticker-scroll'}`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
            width: 'max-content',
          }}
        >
          {allCerts.map((cert, index) => (
            <div
              key={index}
              className={`flex-shrink-0 px-4 ${
                cert === 'PfMP®' 
                  ? 'py-3 border-2 border-pmi-orange rounded-full' 
                  : ''
              }`}
            >
              <span className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
                cert === 'PfMP®' ? 'text-pmi-orange' : 'text-gray-400'
              }`}>
                {cert}
              </span>
            </div>
          ))}
        </div>

        {/* Pause button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors z-10"
        >
          {isPaused ? (
            <Play className="w-4 h-4 text-gray-700" />
          ) : (
            <Pause className="w-4 h-4 text-gray-700" />
          )}
        </button>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#E8E4DF] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-12 top-0 bottom-0 w-20 bg-gradient-to-l from-[#E8E4DF] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  )
}
