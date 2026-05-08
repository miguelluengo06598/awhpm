'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre nosotros', href: '/about' },
  { name: 'Contacto', href: '/contact' },
  { name: 'Certificaciones', href: '/certifications' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-100">
      {/* Top utility bar */}
      <div className="w-full border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="8" width="14" height="24" fill="#00A3C4" rx="1"/>
                <rect x="18" y="4" width="8" height="18" fill="#E87722" rx="1"/>
                <rect x="18" y="24" width="8" height="12" fill="#5B2D8E" rx="1"/>
                <rect x="28" y="12" width="10" height="20" fill="#003B5C" rx="1"/>
              </svg>
              <div className="ml-2 hidden sm:block">
                <div className="text-[11px] font-bold text-gray-900 leading-tight tracking-wide">PROJECT</div>
                <div className="text-[11px] font-bold text-gray-900 leading-tight tracking-wide">MANAGEMENT</div>
                <div className="text-[11px] font-medium text-gray-500 leading-tight tracking-wide">Institute.</div>
              </div>
            </div>
          </Link>

          {/* Right utility items */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden md:flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 transition-colors px-2 py-1">
              <span>Language</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <a href="#" className="hidden md:block text-sm text-gray-700 hover:text-gray-900 transition-colors px-2 py-1">
              Store
            </a>
            <button className="hidden md:flex items-center text-gray-700 hover:text-gray-900 transition-colors px-2 py-1">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <a href="#" className="text-sm text-gray-700 hover:text-gray-900 transition-colors px-2 py-1">
              Log in
            </a>
            <a
              href="/auth/signup"
              className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-pmi-purple border border-pmi-purple rounded-md hover:bg-pmi-purple hover:text-white transition-colors"
            >
              Register
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="w-full">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12">
          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-pmi-purple transition-colors rounded-md hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search + Mobile menu */}
          <div className="flex items-center gap-2 ml-auto">
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 280, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search"
                      className="w-full pl-4 pr-10 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pmi-purple focus:border-transparent"
                      autoFocus
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors"
            >
              {searchOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Search className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {!searchOpen && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <nav className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 text-base font-medium text-gray-800 hover:text-pmi-purple border-b border-gray-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-1 text-sm text-gray-700">
                  <span>Language</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <a href="#" className="text-sm text-gray-700">Store</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
