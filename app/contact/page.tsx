'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Handshake,
  CalendarDays,
  MessageSquare,
  Headphones,
  Users,
} from 'lucide-react'
import Link from 'next/link'

const asuntos = [
  'Información sobre certificaciones',
  'Solicitud de formación',
  'Colaboración institucional',
  'Acreditación académica',
  'Eventos',
  'Otro',
]

const infoContacto = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@aecmi.com',
    href: 'mailto:info@aecmi.com',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+34 XXX XXX XXX',
    href: 'tel:+34000000000',
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Madrid, España',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Horario',
    value: 'Lunes a Viernes, 9:00 - 17:00',
    href: '#',
  },
]

const areasInteres = [
  {
    icon: Award,
    title: 'Certificaciones',
    description: 'Información sobre programas de certificación BIM y requisitos.',
  },
  {
    icon: BookOpen,
    title: 'Formación',
    description: 'Cursos, talleres y capacitación especializada para profesionales.',
  },
  {
    icon: Handshake,
    title: 'Colaboración',
    description: 'Alianzas institucionales y académicas con AECMI.',
  },
  {
    icon: CalendarDays,
    title: 'Eventos',
    description: 'Próximos eventos, webinars y jornadas de la comunidad.',
  },
]

const compromisoPuntos = [
  {
    icon: Headphones,
    title: 'Respuestas ágiles',
    description: 'Garantizamos tiempos de respuesta cortos para todas las consultas.',
  },
  {
    icon: Users,
    title: 'Acompañamiento continuo',
    description: 'Te acompañamos durante todo el proceso de certificación y registro.',
  },
  {
    icon: MessageSquare,
    title: 'Comunicación cercana',
    description: 'Mantenemos una comunicación directa y personalizada con cada miembro.',
  },
]

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setStatusMessage('')

    const formData = new FormData(e.currentTarget)

    // ───────────────────────────────────────────────
    // ESTRUCTURA DEL PAYLOAD PARA SUPABASE
    // ───────────────────────────────────────────────
    const payload = {
      fullName: formData.get('fullName')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      phone: formData.get('phone')?.toString().trim() || '',
      subject: formData.get('subject')?.toString() || '',
      message: formData.get('message')?.toString().trim() || '',
      createdAt: new Date().toISOString(),
    }

    // Validación básica en cliente
    if (!payload.fullName || !payload.email || !payload.subject || !payload.message) {
      setSubmitStatus('error')
      setStatusMessage('Por favor, completa todos los campos obligatorios.')
      setIsSubmitting(false)
      return
    }

    try {
      // ───────────────────────────────────────────────
      // LLAMADA AL API ROUTE (preparada para Supabase)
      // ───────────────────────────────────────────────
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Error al enviar el mensaje')
      }

      // Éxito: limpiar formulario y mostrar mensaje
      setSubmitStatus('success')
      setStatusMessage('¡Gracias! Tu mensaje ha sido enviado. Te contactaremos pronto.')
      formRef.current?.reset()
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative w-full bg-gradient-to-br from-pmi-dark via-[#0A2540] to-pmi-blue overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-400 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-white/90 uppercase bg-white/10 rounded-full mb-6 border border-white/10">
              Estamos aquí para ayudarte
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Contacto
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Ponte en contacto con nuestro equipo. Ofrecemos orientación personalizada y resolvemos
              cualquier consulta relacionada con nuestras actividades.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ========== INTRODUCCIÓN ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-blue-50 rounded-full mb-4">
              Bienvenido
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              ¿Cómo podemos ayudarte?
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AECMI pone a disposición de profesionales, empresas e instituciones diferentes
              canales de comunicación para facilitar el acceso a información relacionada con
              certificaciones, formación, acreditaciones académicas, eventos y estándares BIM.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Award, title: 'Certificaciones', desc: 'Información y orientación sobre programas de certificación BIM.' },
              { icon: BookOpen, title: 'Formación', desc: 'Acceso a cursos, talleres y recursos de capacitación especializada.' },
              { icon: Handshake, title: 'Colaboración', desc: 'Acuerdos institucionales y académicos con AECMI.' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group p-8 rounded-3xl bg-pmi-cream border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all text-center"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-2xl mb-6 shadow-md group-hover:scale-105 transition-transform mx-auto">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pmi-dark mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FORMULARIO + INFO ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-bold text-pmi-dark mb-2">Envíanos un mensaje</h3>
                <p className="text-gray-500 mb-8">
                  Completa el formulario y te responderemos lo antes posible.
                </p>

                <form
                  id="contactForm"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pmi-blue focus:border-transparent transition-all bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pmi-blue focus:border-transparent transition-all bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono <span className="text-gray-400 font-normal">(opcional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+34 600 000 000"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pmi-blue focus:border-transparent transition-all bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Asunto <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        defaultValue=""
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pmi-blue focus:border-transparent transition-all bg-gray-50/50 appearance-none"
                      >
                        <option value="" disabled>
                          Selecciona un asunto
                        </option>
                        {asuntos.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Escribe tu mensaje aquí..."
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pmi-blue focus:border-transparent transition-all bg-gray-50/50 resize-none"
                    />
                  </div>

                  <button
                    id="contactFormSubmit"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-pmi-dark text-white font-medium rounded-xl hover:bg-pmi-blue transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar mensaje
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
              </div>
            </motion.div>

            {/* Info de contacto */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              <h3 className="text-2xl font-bold text-pmi-dark mb-6">Información de contacto</h3>

              {infoContacto.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-pmi-blue/20 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-pmi-dark rounded-xl shrink-0">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-pmi-dark">{item.label}</div>
                    <div className="text-sm text-gray-600 mt-0.5">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== ÁREAS DE INTERÉS ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-blue-50 rounded-full mb-4">
              Explora
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              ¿En qué área estás interesado?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {areasInteres.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-pmi-cream border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all text-center"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-2xl mb-6 shadow-md group-hover:scale-105 transition-transform mx-auto">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pmi-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMPROMISO ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
              Compromiso
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Nuestro compromiso
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Entendemos la importancia de mantener una comunicación cercana y eficiente con todos
              los miembros de nuestra comunidad.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {compromisoPuntos.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all text-center"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-pmi-dark rounded-2xl mb-6 shadow-md group-hover:scale-105 transition-transform mx-auto">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pmi-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER CTA ========== */}
      <section className="w-full bg-gradient-to-br from-pmi-blue via-[#0A2540] to-pmi-dark py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Conecta con AECMI
            </h2>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Tanto si desea obtener información sobre nuestras certificaciones como si está
              interesado en establecer acuerdos de colaboración institucional o académica, AECMI
              le ofrece un entorno profesional orientado a facilitar el intercambio de
              conocimiento y la generación de nuevas oportunidades dentro del sector AEC.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contactForm"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-pmi-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl text-base"
              >
                Iniciar conversación
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/certificaciones"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-medium rounded-full border border-white/30 hover:bg-white/10 transition-all text-base"
              >
                Ver nuestras certificaciones
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
