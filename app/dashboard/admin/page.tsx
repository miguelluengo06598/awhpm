'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShieldCheck, LogOut } from 'lucide-react'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState('Admin')

  useEffect(() => {
    // Verificar sesión simulada
    const session = localStorage.getItem('aecmi_session') || sessionStorage.getItem('aecmi_session')
    if (!session) {
      router.replace('/auth/signin')
      return
    }
    try {
      const data = JSON.parse(session)
      if (data.role !== 'admin') {
        router.replace('/dashboard/client')
        return
      }
      setUserName(data.name || 'Admin')
    } catch {
      router.replace('/auth/signin')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('aecmi_session')
    sessionStorage.removeItem('aecmi_session')
    router.push('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-pmi-cream">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-pmi-dark">Panel de Administración</span>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-pmi-dark mb-2">Hola, {userName}</h1>
          <p className="text-gray-600 mb-8">Bienvenido al panel de administración de AECMI.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Usuarios registrados', value: '124' },
              { label: 'Certificaciones activas', value: '86' },
              { label: 'Solicitudes pendientes', value: '12' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="text-3xl font-extrabold text-pmi-dark">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
