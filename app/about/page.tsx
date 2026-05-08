'use client'

import { motion } from 'framer-motion'
import {
  Target,
  BookOpen,
  Award,
  Users,
  Zap,
  TrendingUp,
  Star,
  ShieldCheck,
  Lightbulb,
  RefreshCw,
  Globe,
  GraduationCap,
  Building2,
  HardHat,
  ArrowRight,
  BadgeCheck,
  FlaskConical,
  UsersRound,
  Scale,
  HeartHandshake,
  Landmark,
  Briefcase,
} from 'lucide-react'
import Link from 'next/link'

const misionItems = [
  {
    icon: Globe,
    title: 'Referencia internacional',
    description: 'Posicionamos AECMI como referencia en BIM y gestión de información aplicada a la construcción.',
  },
  {
    icon: Target,
    title: 'Estándares de calidad',
    description: 'Desarrollamos estándares profesionales que marcan la diferencia en el sector AEC.',
  },
  {
    icon: BookOpen,
    title: 'Formación especializada',
    description: 'Impulsamos la formación y el reconocimiento de competencias alineadas al mercado.',
  },
]

const visionPilares = [
  {
    icon: Users,
    title: 'Profesionales Preparados',
    description:
      'Liderazgo en procesos colaborativos complejos, formando expertos capaces de gestionar proyectos multidisciplinares con excelencia.',
  },
  {
    icon: Zap,
    title: 'Metodologías Eficientes',
    description:
      'Implantación de metodologías eficientes y sostenibles que optimizan recursos y reducen el impacto ambiental.',
  },
  {
    icon: TrendingUp,
    title: 'Excelencia Continua',
    description:
      'Trabajo conjunto con expertos internacionales, instituciones académicas y empresas comprometidas con la innovación.',
  },
]

const valores = [
  {
    icon: Star,
    title: 'Excelencia',
    description:
      'Buscamos los más altos estándares en cada certificación, proceso y servicio que ofrecemos.',
  },
  {
    icon: ShieldCheck,
    title: 'Ética',
    description:
      'Actuamos con integridad, transparencia y responsabilidad en todas nuestras relaciones profesionales.',
  },
  {
    icon: Lightbulb,
    title: 'Innovación',
    description:
      'Adoptamos y promovemos tecnologías y metodologías emergentes que transforman la industria.',
  },
  {
    icon: RefreshCw,
    title: 'Mejora Continua',
    description:
      'Evaluamos y refinamos constantemente nuestros programas para mantenernos a la vanguardia.',
  },
]

// SECCIÓN NUEVA 1: ¿Qué Hacemos?
const queHacemosItems = [
  {
    icon: BadgeCheck,
    title: 'Certificaciones Profesionales',
    description:
      'Programas de certificación orientados a reconocer las competencias de los perfiles BIM más relevantes del sector AEC, alineados con estándares internacionales.',
  },
  {
    icon: FlaskConical,
    title: 'Formación e Investigación',
    description:
      'Promovemos actividades de formación, investigación y difusión de buenas prácticas en gestión de la información y transformación digital.',
  },
  {
    icon: UsersRound,
    title: 'Comunidad Internacional',
    description:
      'Creamos una comunidad profesional que facilita el intercambio de conocimiento, la colaboración entre expertos y el desarrollo de nuevas oportunidades.',
  },
  {
    icon: Scale,
    title: 'Estándares Globales',
    description:
      'Seguimos los estándares más reconocidos en la profesión, un modelo para gobiernos y operadores privados que proporciona un lenguaje común global.',
  },
]

// SECCIÓN NUEVA 2: Valores Corporativos
const valoresCorporativos = [
  {
    icon: Award,
    title: 'Excelencia',
    description:
      'La responsabilidad, el reconocimiento del ejercicio excelente de competencias técnicas y el comportamiento ético aseguran nuestro compromiso con todas las partes integrantes de la cadena de valor.',
  },
  {
    icon: Globe,
    title: 'Visión Global',
    description:
      'Reunir a los miembros de la comunidad global y compartir criterios es la mejor manera de mejorar la práctica de los profesionales del sector.',
  },
  {
    icon: HeartHandshake,
    title: 'Compromiso',
    description:
      'Fomentamos diversos puntos de vista para que las personas contribuyan con su conocimiento y experiencia, permitiendo una mayor y mejor transformación del sector AEC.',
  },
]

// SECCIÓN NUEVA 3: Gobierno
const gobiernoItems = [
  {
    icon: Users,
    title: 'Consejo Asesor',
    description:
      'Integrado por profesionales y especialistas de reconocido prestigio internacional. Define los estándares, requisitos y mapa de competencias exigidos en las certificaciones. Orienta las líneas de investigación y guía la definición de buenas prácticas BIM.',
  },
  {
    icon: Briefcase,
    title: 'Consejo Ejecutivo',
    description:
      'Dirige y administra AECMI para ejecutar las actividades de la organización, garantizando el cumplimiento de los objetivos estratégicos mediante la observancia de las políticas de gobierno rectoras.',
  },
]

const colaboradores = [
  { icon: Globe, label: 'Expertos internacionales' },
  { icon: GraduationCap, label: 'Instituciones académicas' },
  { icon: Building2, label: 'Empresas innovadoras' },
  { icon: HardHat, label: 'Profesionales del sector AEC' },
]

export default function AboutPage() {
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
              Conócenos
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Sobre AECMI
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Líderes en certificación BIM internacional. Desarrollamos estándares, formamos
              profesionales y transformamos la industria AEC con rigor y visión de futuro.
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

      {/* ========== MISIÓN ========== */}
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
              Por qué existimos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Nuestra Misión
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AECMI nace con la vocación de convertirse en una referencia internacional dentro
              del ámbito BIM y de la gestión de la información aplicada a la construcción.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {misionItems.map((item, index) => (
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

      {/* ========== VISIÓN ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - visual block */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-[3rem] bg-gradient-to-br from-pmi-dark via-pmi-blue to-pmi-cyan p-1 shadow-2xl">
                <div className="w-full h-full rounded-[2.8rem] bg-white flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-8">
                    {visionPilares.map((pilar, i) => (
                      <div
                        key={pilar.title}
                        className={`flex flex-col items-center justify-center text-center p-4 rounded-2xl ${
                          i === 0
                            ? 'bg-pmi-dark text-white'
                            : i === 1
                            ? 'bg-pmi-blue text-white'
                            : 'bg-pmi-cream text-pmi-dark border border-gray-100'
                        }`}
                      >
                        <pilar.icon className="w-8 h-8 mb-2 opacity-90" />
                        <span className="text-sm font-semibold leading-tight">{pilar.title}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-gradient-to-br from-pmi-cyan to-blue-400 text-white">
                      <Award className="w-8 h-8 mb-2 opacity-90" />
                      <span className="text-sm font-semibold leading-tight">Certificación Internacional</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 rounded-[4rem] border-2 border-pmi-blue/10 pointer-events-none" />
            </motion.div>

            {/* Right - content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
                Hacia dónde vamos
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
                Nuestra Visión
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Creemos que la transformación digital de la industria AEC requiere profesionales
                preparados para liderar procesos colaborativos complejos y organizaciones capaces
                de implantar metodologías eficientes y sostenibles.
              </p>

              <div className="mt-10 space-y-6">
                {visionPilares.map((pilar, index) => (
                  <motion.div
                    key={pilar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-pmi-dark rounded-xl flex items-center justify-center">
                      <pilar.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-pmi-dark">{pilar.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{pilar.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== ¿QUÉ HACEMOS? (NUEVA) ========== */}
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
              Nuestra actividad
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              ¿Qué Hacemos?
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AECMI desarrolla programas de certificación profesional orientados a reconocer las
              competencias de los perfiles BIM más relevantes dentro del sector AEC.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {queHacemosItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-pmi-cream border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-2xl mb-6 shadow-md group-hover:scale-105 transition-transform">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-pmi-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NUESTROS VALORES (existente) ========== */}
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
              Lo que nos define
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Nuestros Valores
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              La experiencia acumulada por nuestros equipos nos permite ofrecer un marco sólido
              basado en principios que guían cada decisión.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all text-center"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-pmi-dark rounded-2xl mx-auto mb-6">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pmi-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== VALORES CORPORATIVOS (NUEVA) ========== */}
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
              Ideología central
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Valores Corporativos
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AECMI está impulsado por una misión clara y un conjunto de valores que inspiran la
              forma en que actuamos. Estos valores son fundamentales, duraderos y profundamente
              arraigados, guiando nuestro comportamiento en todo momento.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {valoresCorporativos.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group p-8 rounded-3xl bg-pmi-cream border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pmi-dark to-pmi-blue rounded-2xl mb-6 shadow-md group-hover:scale-105 transition-transform mx-auto">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-pmi-dark mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            En tiempos de crecimiento y cambio, nuestros valores centrales proporcionan
            continuidad y una brújula moral, comunicando nuestras creencias y guiando nuestro
            comportamiento como organización.
          </motion.p>
        </div>
      </section>

      {/* ========== GOBIERNO Y ORGANIZACIÓN (NUEVA) ========== */}
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
              Estructura
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Gobierno y Organización
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              La estructura de gobierno de AECMI está diseñada para garantizar la transparencia,
              la calidad y el cumplimiento de los principios éticos que inspiran todas nuestras
              actividades y procesos de certificación.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {gobiernoItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-2xl shadow-md">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-pmi-dark">{item.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 text-center max-w-3xl mx-auto"
          >
            <p className="text-gray-600 leading-relaxed">
              La sabiduría colectiva, la experiencia, la diversidad y la pasión de los miembros
              integrantes de los dos órganos de gobierno de AECMI son los pilares sobre los que
              se establecen y ejecutan nuestra ideología, propósito y valores centrales.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Ambos órganos trabajan conjuntamente para consolidar una institución orientada a la
              excelencia y al desarrollo sostenible del sector AEC.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== COLABORADORES ========== */}
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
              Alianzas
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Trabajamos con...
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {colaboradores.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-pmi-cream border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-2xl mb-5 shadow-md">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-base font-semibold text-pmi-dark">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
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
              Sé parte del cambio
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Nuestro objetivo es contribuir a generar una cultura de trabajo más integrada,
              transparente y orientada a aportar valor real a los proyectos.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-pmi-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl text-base"
              >
                Únete a AECMI
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/certifications"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-medium rounded-full border border-white/30 hover:bg-white/10 transition-all text-base"
              >
                Conoce nuestras certificaciones
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
