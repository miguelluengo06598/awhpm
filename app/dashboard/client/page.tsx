'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, LogOut, Award, BookOpen, Globe } from 'lucide-react'

export default function ClientDashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState('Usuario')

  useEffect(() => {
    const session = localStorage.getItem('aecmi_session') || sessionStorage.getItem('aecmi_session')
    if (!session) {
      router.replace('/auth/signin')
      return
    }
    try {
      const data = JSON.parse(session)
      if (data.role === 'admin') {
        router.replace('/dashboard/admin')
        return
      }
      setUserName(data.name || 'Usuario')
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
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-pmi-dark">Mi Cuenta</span>
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
          <p className="text-gray-600 mb-8">Bienvenido a tu panel personal de AECMI.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                label: 'Mis certificaciones',
                value: '2 activas',
                desc: 'Consulta el estado de tus certificaciones BIM.',
              },
              {
                icon: BookOpen,
                label: 'Formación',
                value: '3 cursos',
                desc: 'Accede a tus cursos y materiales de estudio.',
              },
              {
                icon: Globe,
                label: 'Comunidad',
                value: 'Eventos',
                desc: 'Descubre próximos eventos y webinars.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-extrabold text-pmi-dark">{item.value}</div>
                <div className="text-sm font-semibold text-gray-700 mt-1">{item.label}</div>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
