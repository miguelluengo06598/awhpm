'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award,
  CheckCircle2,
  FileText,
  Search,
  CreditCard,
  GraduationCap,
  ArrowRight,
  ChevronDown,
  BookOpen,
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  ClipboardList,
  Layers,
  HardHat,
  Calendar,
  Globe,
  MessageSquare,
  UserCheck,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'

// ─── FAQ Accordion Component ───
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-pmi-dark">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Data ───
const introCards = [
  {
    icon: Globe,
    title: 'Reconocimiento Internacional',
    description:
      'Programas desarrollados conforme a estándares internacionales y las necesidades reales del sector.',
  },
  {
    icon: ShieldCheck,
    title: 'Evaluación Integral',
    description:
      'Evaluamos capacidades técnicas y competencias transversales como liderazgo, coordinación y gestión.',
  },
  {
    icon: Award,
    title: 'Garantía de Calidad',
    description:
      'Reconocimiento con proyección internacional que fortalece el posicionamiento profesional.',
  },
]

const pasos = [
  {
    step: 1,
    icon: CheckCircle2,
    title: 'Cumplir Criterios de Elegibilidad',
    description: 'Requiere experiencia y conocimiento especializado en gestión BIM.',
    note: 'Revisa el manual de certificación',
  },
  {
    step: 2,
    icon: FileText,
    title: 'Solicitud Completa',
    description: 'Proporciona información de contacto, educación y experiencia profesional.',
    note: '100 días para completar',
  },
  {
    step: 3,
    icon: Search,
    title: 'Revisión de Solicitud',
    description: 'Verificación de criterios de elegibilidad y validación de experiencia.',
    note: '~15 días',
  },
  {
    step: 4,
    icon: CreditCard,
    title: 'Pago',
    description: 'Sistema de pago en línea seguro para completar tu inscripción.',
    note: 'Paga después de aprobación',
  },
  {
    step: 5,
    icon: GraduationCap,
    title: 'Examen e Entrevista',
    description: 'Examen técnico de competencias y entrevista personal con evaluadores.',
    note: '1 año con 3 intentos',
  },
]

const certificaciones = [
  {
    icon: ClipboardList,
    title: 'Information Delivery Manager',
    description: 'Especialista en gestión estratégica de información en proyectos BIM.',
    bullets: [
      'Gestión de procesos y protocolos de información',
      'Supervisión de entornos comunes de datos (CDE)',
      'Cumplimiento de estándares ISO 19650',
    ],
    tecnicas: ['ISO 19650', 'Estrategia CDE', 'Gestión QA/QC'],
    transversales: ['Liderazgo', 'Negociación', 'Comunicación'],
  },
  {
    icon: Layers,
    title: 'BIM Design Manager',
    description: 'Coordinador de procesos BIM en fase de diseño.',
    bullets: [
      'Coordinación interdisciplinar de equipos de diseño',
      'Auditoría de modelos digitales y federados',
      'Gestión de incidencias y resolución de conflictos',
    ],
    tecnicas: ['Auditar modelos 3D', 'CDE', 'IMS'],
    transversales: ['Liderazgo', 'Negociación', 'Comunicación'],
  },
  {
    icon: HardHat,
    title: 'BIM Construction Manager',
    description: 'Especialista en implantación BIM en fase de construcción.',
    bullets: [
      'Coordinación en obra y seguimiento de procesos constructivos',
      'Control de calidad y gestión de modelos federados',
      'Gestión documental y trazabilidad del proyecto',
    ],
    tecnicas: ['BEP', 'CDE', 'IMS', 'BIM 4D y 5D'],
    transversales: ['Liderazgo', 'Negociación', 'Comunicación'],
  },
]

const mantenerPuntos = [
  {
    icon: BookOpen,
    title: 'Formación Continua',
    description:
      'Programas de actualización periódica para mantener los conocimientos al día.',
  },
  {
    icon: RefreshCw,
    title: 'Actualización Permanente',
    description: 'Revisión de competencias alineadas con la evolución del sector.',
  },
  {
    icon: TrendingUp,
    title: 'Desarrollo Profesional',
    description:
      'Acceso a recursos exclusivos y comunidad de profesionales certificados.',
  },
]

const faqGeneral = [
  {
    q: '¿Cómo obtengo una certificación AECMI?',
    a: 'Debes cumplir con los criterios de elegibilidad, completar la solicitud en línea, pasar la revisión de tu experiencia, realizar el pago y aprobar el examen técnico junto con la entrevista personal.',
  },
  {
    q: '¿Cómo completo la solicitud?',
    a: 'La solicitud se completa a través de nuestro portal en línea. Necesitarás información de contacto, tus credenciales académicas, y una descripción detallada de tu experiencia profesional en proyectos BIM.',
  },
  {
    q: '¿Qué documentación debo enviar?',
    a: 'Generalmente se requiere: identificación oficial, CV detallado, certificados académicos, referencias profesionales y evidencia de proyectos en los que hayas participado.',
  },
]

const faqExamen = [
  {
    q: '¿Cómo programo una cita para el examen?',
    a: 'Una vez aprobada tu elegibilidad, recibirás un enlace para acceder al calendario de exámenes y seleccionar la fecha y hora que mejor se adapte a tu disponibilidad.',
  },
  {
    q: '¿Dónde se realiza el examen?',
    a: 'Los exámenes se realizan en línea a través de nuestra plataforma segura. También disponemos de centros presenciales en ciudades seleccionadas.',
  },
  {
    q: '¿Los exámenes están disponibles en otros idiomas?',
    a: 'Actualmente los exámenes están disponibles en español e inglés. Estamos trabajando para incorporar más idiomas próximamente.',
  },
  {
    q: 'Si no apruebo, ¿puedo reintentar?',
    a: 'Sí, tienes hasta 3 intentos durante el período de un año a partir de la aprobación de tu elegibilidad.',
  },
  {
    q: '¿Qué sucede si mi elegibilidad vence?',
    a: 'Si tu período de elegibilidad vence, deberás volver a presentar una nueva solicitud completa y pagar la tarifa correspondiente.',
  },
  {
    q: '¿Cómo programo mi entrevista personal?',
    a: 'Tras aprobar el examen técnico, nuestro equipo te contactará para coordinar la entrevista personal con un evaluador senior de AECMI.',
  },
  {
    q: '¿Cómo realizo mi entrevista personal?',
    a: 'La entrevista se realiza de forma virtual a través de videollamada. Durante 45-60 minutos se evaluarán tus competencias técnicas y transversales.',
  },
  {
    q: '¿Con quién realizo la entrevista?',
    a: 'La entrevista la realiza un evaluador senior certificado por AECMI con amplia experiencia en gestión de proyectos BIM a nivel internacional.',
  },
  {
    q: '¿Qué sucede si no cumplo los requisitos?',
    a: 'Si no cumples los requisitos en alguna etapa, recibirás retroalimentación detallada y podrás volver a presentarte tras un período de espera definido.',
  },
]

export default function CertificationsPage() {
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
              Profesional
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Certificaciones AECMI
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Reconocimiento profesional internacional en BIM. Certificamos competencias técnicas
              y de liderazgo para profesionales del sector AEC.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
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
              Fundamentos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              ¿Qué son nuestras certificaciones?
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 space-y-5"
            >
              <p className="text-gray-700 leading-relaxed text-lg">
                Las certificaciones profesionales de AECMI reconocen el conocimiento, la experiencia
                y las competencias de los profesionales que desempeñan funciones estratégicas dentro
                de proyectos BIM y procesos de gestión de la información en el sector AEC.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Nuestros programas de certificación han sido desarrollados conforme a estándares
                internacionales y tomando como referencia las necesidades reales de empresas,
                administraciones y operadores de la industria de la construcción. Cada certificación
                evalúa no solo capacidades técnicas, sino también competencias relacionadas con
                liderazgo, coordinación y gestión de equipos y procesos.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Obtener una certificación AECMI supone acceder a un reconocimiento profesional con
                proyección internacional que contribuye a fortalecer el posicionamiento de los
                profesionales dentro de un mercado cada vez más competitivo y especializado.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 bg-pmi-dark rounded-3xl p-8 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-pmi-cyan" />
                <h3 className="text-xl font-bold">¿Por qué certificarte?</h3>
              </div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-pmi-cyan shrink-0 mt-0.5" />
                  <span>Reconocimiento con proyección internacional</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-pmi-cyan shrink-0 mt-0.5" />
                  <span>Acceso a red exclusiva de profesionales</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-pmi-cyan shrink-0 mt-0.5" />
                  <span>Mayor competitividad en el mercado laboral</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-pmi-cyan shrink-0 mt-0.5" />
                  <span>Confianza de empresas y organizaciones</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {introCards.map((item, index) => (
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
                <h3 className="text-xl font-bold text-pmi-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROCESO ========== */}
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
              Pasos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Proceso de Certificación
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Obtener una certificación AECMI es un proceso estructurado que garantiza la calidad
              y el rigor de cada profesional acreditado.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-pmi-blue via-pmi-cyan to-pmi-blue/20 -translate-x-1/2" />
            <div className="space-y-8 md:space-y-12">
              {pasos.map((paso, index) => {
                const isLeft = index % 2 === 0
                return (
                  <motion.div
                    key={paso.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative grid md:grid-cols-2 gap-8 items-center ${
                      isLeft ? '' : 'md:[direction:rtl]'
                    }`}
                  >
                    <div className={`${isLeft ? 'md:text-right' : 'md:text-left'} md:[direction:ltr]`}>
                      <div
                        className={`inline-flex items-center gap-3 mb-3 ${
                          isLeft ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        <div className="flex items-center justify-center w-12 h-12 bg-pmi-dark rounded-xl shadow-md">
                          <paso.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-bold text-pmi-blue uppercase tracking-wider">
                          Paso {paso.step}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-pmi-dark mb-2">{paso.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-2">{paso.description}</p>
                      <span className="inline-block px-3 py-1 text-xs font-medium text-pmi-blue bg-blue-50 rounded-full">
                        {paso.note}
                      </span>
                    </div>
                    <div className={`${isLeft ? 'md:text-left' : 'md:text-right'} md:[direction:ltr]`}>
                      <div className="hidden md:inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-full text-white font-bold text-sm shadow-lg border-4 border-pmi-cream relative z-10">
                        {paso.step}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Tips Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 p-8 rounded-3xl bg-pmi-dark text-white"
          >
            <div className="flex items-center gap-3 mb-5">
              <AlertCircle className="w-6 h-6 text-pmi-cyan" />
              <h3 className="text-xl font-bold">Consejos para tu solicitud</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Recopila toda la información antes de iniciar tu solicitud.',
                'Revisa detalladamente el manual de certificación correspondiente.',
                'Consulta fuentes actualizadas sobre estándares BIM y ISO 19650.',
                'Considera realizar un curso preparatorio antes del examen.',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-pmi-cyan shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CERTIFICACIONES DISPONIBLES ========== */}
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
              Programas
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Nuestras Certificaciones
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {certificaciones.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group flex flex-col bg-pmi-cream rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="p-8 pb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-2xl mb-6 shadow-md group-hover:scale-105 transition-transform">
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-pmi-dark mb-3">{cert.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{cert.description}</p>

                  <ul className="space-y-2 mb-6">
                    {cert.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-pmi-blue shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-8 pb-4">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Competencias técnicas
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {cert.tecnicas.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-xs font-medium text-pmi-dark bg-white border border-gray-100 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Competencias transversales
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {cert.transversales.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-xs font-medium text-white bg-pmi-dark rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto p-8 pt-0 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-pmi-dark text-white font-medium rounded-xl hover:bg-pmi-blue transition-colors"
                  >
                    Solicitar Certificación
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 text-pmi-dark font-medium rounded-xl border border-gray-200 hover:bg-white transition-colors">
                    Más información
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MANTENER CERTIFICACIÓN ========== */}
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
              Renovación
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Renovación de Certificaciones
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Las certificaciones AECMI requieren procesos periódicos de renovación orientados a
              garantizar que los profesionales mantienen actualizados sus conocimientos,
              experiencia y competencias técnicas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {mantenerPuntos.map((item, index) => (
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

      {/* ========== REGISTRO ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-blue-50 rounded-full mb-4">
                Transparencia
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
                Registro de Profesionales Certificados
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                AECMI mantiene un registro actualizado de profesionales certificados con el
                objetivo de aportar transparencia y confianza al mercado. Las empresas y
                organizaciones pueden verificar las credenciales de los profesionales de forma
                rápida y segura.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-pmi-dark text-white font-semibold rounded-full hover:bg-pmi-blue transition-all shadow-lg hover:shadow-xl">
                  Ver Registro de Certificados
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '100%', label: 'Verificable online' },
                { value: '24/7', label: 'Acceso al registro' },
                { value: 'Global', label: 'Reconocimiento internacional' },
                { value: 'Seguro', label: 'Datos validados por AECMI' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-pmi-cream border border-gray-100 text-center"
                >
                  <div className="text-2xl font-extrabold text-pmi-dark">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
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
              Ayuda
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Preguntas Frecuentes
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* General */}
            <div>
              <h3 className="text-xl font-bold text-pmi-dark mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-pmi-blue" />
                General
              </h3>
              <div className="space-y-3">
                {faqGeneral.map((faq) => (
                  <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>

            {/* Examen */}
            <div>
              <h3 className="text-xl font-bold text-pmi-dark mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-pmi-blue" />
                Examen y Entrevista
              </h3>
              <div className="space-y-3">
                {faqExamen.map((faq) => (
                  <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
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
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              ¿Listo para certificarte?
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Da el siguiente paso en tu carrera profesional y únete a la comunidad de expertos
              certificados por AECMI.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-pmi-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl text-base"
              >
                Iniciar Solicitud
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-medium rounded-full border border-white/30 hover:bg-white/10 transition-all text-base"
              >
                Contacta con nosotros
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
