'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  FileText,
  Award,
  FolderOpen,
  CreditCard,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { name: 'Inicio', href: '/dashboard/client', icon: Home },
  { name: 'Mis solicitudes', href: '/dashboard/client#solicitudes', icon: FileText },
  { name: 'Certificaciones', href: '/dashboard/client#certificaciones', icon: Award },
  { name: 'Documentos', href: '/dashboard/client#documentos', icon: FolderOpen },
  { name: 'Pagos', href: '/dashboard/client#pagos', icon: CreditCard },
  { name: 'Configuración', href: '/dashboard/client#configuracion', icon: Settings },
]

interface ClientSidebarProps {
  onLogout: () => void
}

export default function ClientSidebar({ onLogout }: ClientSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href.split('#')[0]

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-100"
      >
        {mobileOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
      </button>

      {/* Mobile overlay */}
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

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-100 flex flex-col transition-transform lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo area */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="8" width="14" height="24" fill="#00A3C4" rx="1"/>
              <rect x="18" y="4" width="8" height="18" fill="#E87722" rx="1"/>
              <rect x="18" y="24" width="8" height="12" fill="#5B2D8E" rx="1"/>
              <rect x="28" y="12" width="10" height="20" fill="#003B5C" rx="1"/>
            </svg>
            <span className="font-bold text-pmi-dark text-sm">AECMI</span>
          </Link>
        </div>

        {/* Navigation */}
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
                    ? 'bg-pmi-dark text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-pmi-dark'
                }`}
              >
                <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-400'}`} />
                <span className="flex-1">{item.name}</span>
                {active && <ChevronRight className="w-4 h-4" />}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </motion.aside>
    </>
  )
}
