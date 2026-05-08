'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe,
  BookOpen,
} from 'lucide-react'
import Link from 'next/link'

// ───────────────────────────────────────────────
// TIPOS
// ───────────────────────────────────────────────
interface FormData {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
  acceptTerms?: string
}

// ───────────────────────────────────────────────
// REGLAS DE VALIDACIÓN
// ───────────────────────────────────────────────
const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const getPasswordChecks = (password: string) => ({
  minLength: password.length >= 8,
  hasUppercase: /[A-Z]/.test(password),
  hasNumber: /\d/.test(password),
})

const validateField = (name: keyof FormData, value: string | boolean, formData: FormData): string | undefined => {
  switch (name) {
    case 'fullName':
      if (!value) return 'El nombre completo es obligatorio'
      if (typeof value === 'string' && value.trim().length < 3) return 'Mínimo 3 caracteres'
      return undefined
    case 'email':
      if (!value) return 'El email es obligatorio'
      if (typeof value === 'string' && !validateEmail(value)) return 'Introduce un email válido'
      return undefined
    case 'phone':
      if (typeof value === 'string' && value.trim().length > 0 && !/^[\d\s\+\-\(\)]{7,}$/.test(value)) {
        return 'Introduce un teléfono válido'
      }
      return undefined
    case 'password':
      if (!value) return 'La contraseña es obligatoria'
      if (typeof value === 'string') {
        const checks = getPasswordChecks(value)
        if (!checks.minLength || !checks.hasUppercase || !checks.hasNumber) {
          return 'La contraseña no cumple los requisitos'
        }
      }
      return undefined
    case 'confirmPassword':
      if (!value) return 'Confirma tu contraseña'
      if (typeof value === 'string' && value !== formData.password) return 'Las contraseñas no coinciden'
      return undefined
    case 'acceptTerms':
      if (!value) return 'Debes aceptar los términos y condiciones'
      return undefined
    default:
      return undefined
  }
}

// ───────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ───────────────────────────────────────────────
export default function SignUpPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
    acceptTerms: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const passwordChecks = getPasswordChecks(formData.password)

  const updateField = useCallback(
    (name: keyof FormData, value: string | boolean) => {
      setFormData((prev) => {
        const next = { ...prev, [name]: value }
        // Validar campo actual
        const error = validateField(name, value, next)
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
        // Si estamos modificando password, revalidar confirmPassword
        if (name === 'password' && next.confirmPassword) {
          const confirmError = validateField('confirmPassword', next.confirmPassword, next)
          setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: confirmError }))
        }
        return next
      })
    },
    []
  )

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name], formData)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true
    ;(Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key], formData)
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    })
    setErrors(newErrors)
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      acceptTerms: true,
    })
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')
    setStatusMessage('')

    if (!validateAll()) {
      setSubmitStatus('error')
      setStatusMessage('Por favor, corrige los errores del formulario.')
      return
    }

    setIsSubmitting(true)

    try {
      // ═══════════════════════════════════════════════
      // INTEGRACIÓN SUPABASE (descomentar cuando esté lista)
      // ═══════════════════════════════════════════════
      // import { createClient } from '@/lib/supabase/client'
      // const supabase = createClient()
      //
      // const { data, error } = await supabase.auth.signUp({
      //   email: formData.email,
      //   password: formData.password,
      //   options: {
      //     data: {
      //       full_name: formData.fullName,
      //       phone: formData.phone || null,
      //     },
      //   },
      // })
      //
      // if (error) throw error
      //
      // Opcional: insertar perfil adicional en tabla 'profiles'
      // const { error: profileError } = await supabase
      //   .from('profiles')
      //   .insert([
      //     {
      //       id: data.user?.id,
      //       full_name: formData.fullName,
      //       email: formData.email,
      //       phone: formData.phone || null,
      //       created_at: new Date().toISOString(),
      //     },
      //   ])
      //
      // if (profileError) throw profileError
      // ═══════════════════════════════════════════════

      // Simulación de éxito (eliminar cuando se conecte Supabase)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitStatus('success')
      setStatusMessage('¡Cuenta creada con éxito! Revisa tu email para confirmar el registro.')
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      })
      setTouched({
        fullName: false,
        email: false,
        phone: false,
        password: false,
        confirmPassword: false,
        acceptTerms: false,
      })
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Ha ocurrido un error al crear la cuenta. Inténtalo de nuevo.'
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
              Únete a la comunidad
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
              Crea tu cuenta en <span className="text-pmi-cyan">AECMI</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Accede a certificaciones BIM internacionales, recursos exclusivos y una red global de profesionales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== CONTENIDO PRINCIPAL ========== */}
      <section className="w-full bg-pmi-cream py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* ─── LADO IZQUIERDO: Beneficios (solo desktop) ─── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block sticky top-28"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-pmi-dark tracking-tight mb-6">
                ¿Por qué registrarte?
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: Award,
                    title: 'Certificaciones BIM',
                    description: 'Accede a programas de certificación internacional reconocidos en el sector AEC.',
                  },
                  {
                    icon: BookOpen,
                    title: 'Recursos exclusivos',
                    description: 'Materiales técnicos, guías y herramientas especializadas en gestión BIM.',
                  },
                  {
                    icon: Globe,
                    title: 'Red global',
                    description: 'Conecta con profesionales, instituciones y empresas de más de 30 países.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Registro verificable',
                    description: 'Tu perfil profesional certificado será visible para empresas y organizaciones.',
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
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-pmi-cyan" />
                  <span className="text-sm font-semibold text-pmi-dark">Registro gratuito</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Crear una cuenta en AECMI es completamente gratuito. Solo pagarás cuando decidas
                  inscribirte en un programa de certificación.
                </p>
              </div>
            </motion.div>

            {/* ─── LADO DERECHO: Formulario ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-pmi-dark mb-1">Completa tus datos</h2>
                <p className="text-sm text-gray-500 mb-8">
                  Todos los campos marcados con <span className="text-red-500">*</span> son obligatorios.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Nombre completo */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        onBlur={() => handleBlur('fullName')}
                        placeholder="Tu nombre y apellidos"
                        className={`${inputBaseClass} ${touched.fullName && errors.fullName ? inputErrorClass : inputNormalClass}`}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.fullName && errors.fullName && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.fullName}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

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
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="tu@email.com"
                        className={`${inputBaseClass} ${touched.email && errors.email ? inputErrorClass : inputNormalClass}`}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.email && errors.email && (
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

                  {/* Teléfono */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono <span className="text-gray-400 font-normal">(opcional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        placeholder="+34 600 000 000"
                        className={`${inputBaseClass} ${touched.phone && errors.phone ? inputErrorClass : inputNormalClass}`}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.phone && errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.phone}
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
                        value={formData.password}
                        onChange={(e) => updateField('password', e.target.value)}
                        onBlur={() => handleBlur('password')}
                        placeholder="Crea una contraseña segura"
                        className={`${inputBaseClass} pr-11 ${touched.password && errors.password ? inputErrorClass : inputNormalClass}`}
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

                    {/* Requisitos de contraseña */}
                    <div className="mt-3 space-y-1.5">
                      {[
                        { label: 'Mínimo 8 caracteres', met: passwordChecks.minLength },
                        { label: 'Al menos una mayúscula', met: passwordChecks.hasUppercase },
                        { label: 'Al menos un número', met: passwordChecks.hasNumber },
                      ].map((req) => (
                        <div key={req.label} className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                              req.met ? 'bg-green-500' : 'bg-gray-200'
                            }`}
                          >
                            <CheckCircle2 className={`w-3 h-3 ${req.met ? 'text-white' : 'text-gray-400'}`} />
                          </div>
                          <span className={`text-xs transition-colors ${req.met ? 'text-green-700' : 'text-gray-500'}`}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <AnimatePresence>
                      {touched.password && errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 mt-2 text-xs text-red-600"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.password}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Confirmar contraseña */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar contraseña <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                        onBlur={() => handleBlur('confirmPassword')}
                        placeholder="Repite tu contraseña"
                        className={`${inputBaseClass} pr-11 ${touched.confirmPassword && errors.confirmPassword ? inputErrorClass : inputNormalClass}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.confirmPassword}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Términos y condiciones */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          id="acceptTerms"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={(e) => updateField('acceptTerms', e.target.checked)}
                          onBlur={() => handleBlur('acceptTerms')}
                          className="peer sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                            formData.acceptTerms
                              ? 'bg-pmi-dark border-pmi-dark'
                              : touched.acceptTerms && errors.acceptTerms
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-300 bg-white group-hover:border-pmi-blue'
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 text-white ${formData.acceptTerms ? 'opacity-100' : 'opacity-0'}`} />
                        </div>
                      </div>
                      <span className="text-sm text-gray-700 leading-snug">
                        Acepto los{' '}
                        <a href="#" className="text-pmi-blue font-medium hover:underline">
                          términos y condiciones
                        </a>{' '}
                        y la{' '}
                        <a href="#" className="text-pmi-blue font-medium hover:underline">
                          política de privacidad
                        </a>{' '}
                        de AECMI <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <AnimatePresence>
                      {touched.acceptTerms && errors.acceptTerms && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.acceptTerms}
                        </motion.p>
                      )}
                    </AnimatePresence>
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
                        Creando cuenta...
                      </>
                    ) : (
                      <>
                        Crear Cuenta
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

                {/* Link a login */}
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <Link
                      href="/auth/login"
                      className="text-pmi-blue font-semibold hover:underline"
                    >
                      Inicia sesión
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
