'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  Mail,
  CalendarDays,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
  { name: 'Solicitudes', href: '/dashboard/admin#solicitudes', icon: FileText },
  { name: 'Usuarios', href: '/dashboard/admin#usuarios', icon: Users },
  { name: 'Pagos', href: '/dashboard/admin#pagos', icon: CreditCard },
  { name: 'Contactos', href: '/dashboard/admin#contactos', icon: Mail },
  { name: 'Exámenes', href: '/dashboard/admin#examenes', icon: CalendarDays },
  { name: 'Reportes', href: '/dashboard/admin#reportes', icon: BarChart3 },
  { name: 'Configuración', href: '/dashboard/admin#configuracion', icon: Settings },
]

interface AdminSidebarProps {
  onLogout: () => void
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href.split('#')[0]

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-100"
      >
        {mobileOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-sm block leading-tight">AECMI</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-pmi-blue text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span className="flex-1">{item.name}</span>
                {active && <ChevronRight className="w-4 h-4" />}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </motion.aside>
    </>
  )
}
