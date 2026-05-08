'use client'

import { motion } from 'framer-motion'
import {
  Award,
  Users,
  Globe,
  ClipboardCheck,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Mail,
  Building2,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'

const propositoItems = [
  {
    icon: Award,
    title: 'Especialización BIM',
    description:
      'Certificaciones de competencias BIM para profesionales de Arquitectura, Ingeniería y Construcción.',
  },
  {
    icon: TrendingUp,
    title: 'Industria Digitalizada',
    description:
      'Impulsamos una industria más eficiente, colaborativa y preparada para los retos digitales.',
  },
  {
    icon: Globe,
    title: 'Estándares Globales',
    description:
      'Promovemos estándares internacionales y formación especializada alineada al mercado real.',
  },
]

const serviciosItems = [
  {
    icon: ClipboardCheck,
    title: 'Acreditación de Competencias',
    description:
      'Certificamos las capacidades técnicas, estratégicas y de liderazgo en todas las fases del ciclo de vida de los proyectos constructivos.',
  },
  {
    icon: BookOpen,
    title: 'Recursos Técnicos',
    description:
      'Ofrecemos herramientas, materiales y recursos especializados para que los profesionales apliquen BIM con excelencia.',
  },
  {
    icon: Lightbulb,
    title: 'Investigación e Innovación',
    description:
      'Desarrollamos actividades de investigación que impulsan el avance continuo de la industria AEC a nivel mundial.',
  },
]

const stats = [
  { value: '500+', label: 'Profesionales certificados' },
  { value: '30+', label: 'Países presentes' },
  { value: '50+', label: 'Instituciones aliadas' },
]

export default function AECMILanding() {
  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="relative w-full bg-gradient-to-br from-pmi-dark via-[#0A2540] to-pmi-blue overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-cyan-400 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-white/90 uppercase bg-white/10 rounded-full mb-6 border border-white/10">
              Organización Internacional
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              AECMI
              <span className="block text-pmi-cyan mt-2">Certificación BIM Internacional</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
              Transformando la industria AEC con estándares globales. Especialistas en la
              certificación de competencias BIM para profesionales de la Arquitectura, la
              Ingeniería y la Construcción.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#proposito"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-pmi-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl text-base"
              >
                Conoce más
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-medium rounded-full border border-white/30 hover:bg-white/10 transition-all text-base"
              >
                Contacta con nosotros
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ========== PROPÓSITO ========== */}
      <section id="proposito" className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-blue-50 rounded-full mb-4">
              Nuestra razón de ser
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Nuestro Propósito
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {propositoItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group p-8 rounded-3xl bg-pmi-cream border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-2xl mb-6 shadow-md group-hover:scale-105 transition-transform">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pmi-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICIOS ========== */}
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
              Servicios
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              ¿Qué Hacemos?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviciosItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-pmi-dark rounded-2xl mb-6">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pmi-dark mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMUNIDAD ========== */}
      <section className="relative w-full bg-pmi-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-pmi-cyan rounded-full blur-3xl transform -translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-cyan uppercase bg-white/10 rounded-full mb-4">
              Red Global
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Una Comunidad Global
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Expertos, instituciones académicas y profesionales comprometidos con la excelencia
              y la innovación dentro del sector AEC.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pmi-cyan to-blue-400">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-white/60 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
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
              Impulsa tu carrera con AECMI
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Únete a la comunidad internacional de profesionales certificados en BIM y marca la
              diferencia en la industria AEC.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/certifications"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-pmi-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl text-base"
              >
                Obtén tu Certificación
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-medium rounded-full border border-white/30 hover:bg-white/10 transition-all text-base"
              >
                <Mail className="w-5 h-5" />
                Contacta con nosotros
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
