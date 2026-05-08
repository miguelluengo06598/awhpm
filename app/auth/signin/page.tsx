'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Award,
  Globe,
} from 'lucide-react'
import Link from 'next/link'

// ═══════════════════════════════════════════════
// USUARIOS DE PRUEBA (simulación)
// Reemplazar por supabase.auth.signInWithPassword()
// ═══════════════════════════════════════════════
const TEST_USERS: Record<string, { password: string; role: 'admin' | 'client'; name: string }> = {
  'admin@aecmi.com': { password: 'Admin123', role: 'admin', name: 'Administrador' },
  'user@aecmi.com': { password: 'User123', role: 'client', name: 'Usuario Demo' },
}

// ═══════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════
export default function SignInPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {}
    if (!email.trim()) {
      newErrors.email = 'El email es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Introduce un email válido'
    }
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')
    setStatusMessage('')

    if (!validate()) return

    setIsSubmitting(true)

    try {
      // ═══════════════════════════════════════════════
      // INTEGRACIÓN SUPABASE (reemplazar cuando esté lista)
      // ═══════════════════════════════════════════════
      // import { createClient } from '@/lib/supabase/client'
      // const supabase = createClient()
      //
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // })
      //
      // if (error) throw error
      //
      // // Obtener rol del usuario desde la tabla profiles o user_metadata
      // const { data: profile } = await supabase
      //   .from('profiles')
      //   .select('role')
      //   .eq('id', data.user.id)
      //   .single()
      //
      // const role = profile?.role || 'client'
      //
      // // Guardar sesión en cookie/localStorage según rememberMe
      // if (rememberMe) {
      //   localStorage.setItem('aecmi_session', JSON.stringify({
      //     user: data.user,
      //     role,
      //   }))
      // }
      // ═══════════════════════════════════════════════

      // Simulación local (eliminar cuando se conecte Supabase)
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const testUser = TEST_USERS[email.trim().toLowerCase()]
      if (!testUser || testUser.password !== password) {
        throw new Error('Credenciales inválidas. Verifica tu email y contraseña.')
      }

      const role = testUser.role

      // Guardar sesión simulada en localStorage
      const sessionData = {
        email: email.trim().toLowerCase(),
        role,
        name: testUser.name,
        loggedInAt: new Date().toISOString(),
      }

      if (rememberMe) {
        localStorage.setItem('aecmi_session', JSON.stringify(sessionData))
      } else {
        sessionStorage.setItem('aecmi_session', JSON.stringify(sessionData))
      }

      setSubmitStatus('success')
      setStatusMessage(`¡Bienvenido, ${testUser.name}! Redirigiendo...`)

      // Redirigir según rol
      setTimeout(() => {
        if (role === 'admin') {
          router.push('/dashboard/admin')
        } else {
          router.push('/dashboard/client')
        }
      }, 800)
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Ha ocurrido un error. Inténtalo de nuevo.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBaseClass =
    'w-full pl-11 pr-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all bg-gray-50/50'
  const inputNormalClass = 'border-gray-200 focus:ring-pmi-blue focus:border-transparent'
  const inputErrorClass = 'border-red-300 focus:ring-red-200 focus:border-red-300 bg-red-50/30'

  return (
    <>
      {/* ========== HERO SIMPLIFICADO ========== */}
      <section className="relative w-full bg-gradient-to-br from-pmi-dark via-[#0A2540] to-pmi-blue overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-cyan-400 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-white/90 uppercase bg-white/10 rounded-full mb-4 border border-white/10">
              Bienvenido de nuevo
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
              Inicia sesión en <span className="text-pmi-cyan">AECMI</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Accede a tu cuenta para gestionar tus certificaciones, recursos y perfil profesional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== CONTENIDO PRINCIPAL ========== */}
      <section className="w-full bg-pmi-cream py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* ─── LADO IZQUIERDO: Info (solo desktop) ─── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block sticky top-28"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-pmi-dark tracking-tight mb-6">
                Accede a tu espacio
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: Award,
                    title: 'Tus certificaciones',
                    description: 'Consulta el estado de tus certificaciones BIM y descarga credenciales.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Perfil verificado',
                    description: 'Actualiza tu información profesional y mantén tu perfil visible.',
                  },
                  {
                    icon: Globe,
                    title: 'Comunidad AECMI',
                    description: 'Accede a eventos, formación y networking con profesionales del sector.',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-pmi-blue/20 hover:shadow-md transition-all"
                  >
                    <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-pmi-dark">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100">
                <h3 className="text-sm font-semibold text-pmi-dark mb-3">Usuarios de prueba</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">admin@aecmi.com</span>
                    <span className="px-2 py-0.5 bg-pmi-dark text-white text-xs rounded-md">Admin</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">user@aecmi.com</span>
                    <span className="px-2 py-0.5 bg-pmi-blue text-white text-xs rounded-md">Client</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">Contraseñas: Admin123 / User123</p>
              </div>
            </motion.div>

            {/* ─── LADO DERECHO: Formulario ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:mx-0 mx-auto max-w-md lg:max-w-none"
            >
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-pmi-dark mb-1">Inicia sesión</h2>
                <p className="text-sm text-gray-500 mb-8">
                  Introduce tus credenciales para acceder a tu cuenta.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                        }}
                        placeholder="tu@email.com"
                        className={`${inputBaseClass} ${errors.email ? inputErrorClass : inputNormalClass}`}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
                        }}
                        placeholder="Tu contraseña"
                        className={`${inputBaseClass} pr-11 ${errors.password ? inputErrorClass : inputNormalClass}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.password}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Opciones: Recuérdame + Olvidé contraseña */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="peer sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                            rememberMe
                              ? 'bg-pmi-dark border-pmi-dark'
                              : 'border-gray-300 bg-white group-hover:border-pmi-blue'
                          }`}
                        >
                          <CheckCircle2 className={`w-3 h-3 text-white ${rememberMe ? 'opacity-100' : 'opacity-0'}`} />
                        </div>
                      </div>
                      <span className="text-sm text-gray-700">Recuérdame</span>
                    </label>

                    <Link
                      href="/auth/reset-password"
                      className="text-sm text-pmi-blue font-medium hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  {/* Botón submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-pmi-dark text-white font-semibold rounded-xl hover:bg-pmi-blue transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verificando...
                      </>
                    ) : (
                      <>
                        Iniciar Sesión
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Mensajes de estado */}
                  <AnimatePresence mode="wait">
                    {submitStatus !== 'idle' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex items-start gap-3 p-4 rounded-xl text-sm ${
                          submitStatus === 'success'
                            ? 'bg-green-50 text-green-800 border border-green-100'
                            : 'bg-red-50 text-red-800 border border-red-100'
                        }`}
                      >
                        {submitStatus === 'success' ? (
                          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        )}
                        <span>{statusMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Link a registro */}
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <Link
                      href="/auth/signup"
                      className="text-pmi-blue font-semibold hover:underline"
                    >
                      Regístrate
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
