'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: number
  subtitle?: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
  delay?: number
}

const COLOR_MAP = {
  blue: 'from-blue-500 to-cyan-400',
  green: 'from-emerald-500 to-green-400',
  purple: 'from-violet-500 to-purple-400',
  orange: 'from-orange-500 to-amber-400',
}

export default function StatCard({ title, value, icon: Icon, trend, subtitle, color = 'blue', delay = 0 }: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0
  const isNegative = trend !== undefined && trend < 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-extrabold text-pmi-dark mt-2">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{isPositive ? '+' : ''}{trend}%</span>
              <span className="text-gray-400 font-normal ml-1">vs mes anterior</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${COLOR_MAP[color]} flex items-center justify-center shadow-sm`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  )
}
