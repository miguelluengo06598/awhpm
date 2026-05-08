'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Building2, Users, Award } from 'lucide-react'

const highlights = [
  {
    icon: Building2,
    title: 'Sector AEC',
    description: 'Arquitectura, Ingeniería y Construcción',
  },
  {
    icon: Award,
    title: 'Certificación BIM',
    description: 'Competencias técnicas y estratégicas',
  },
  {
    icon: Users,
    title: 'Comunidad global',
    description: 'Expertos, instituciones y profesionales',
  },
]

export default function AECMISection() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-pmi-dark via-pmi-purple to-pmi-purple overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-400 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white/80 uppercase bg-white/10 rounded-full mb-6">
              Organización Internacional
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              AECMI
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-white/90 font-medium leading-relaxed">
              Especialistas en la certificación de competencias BIM
            </p>
            <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl">
              AECMI es una organización internacional especializada en la certificación de competencias BIM para profesionales del sector de la Arquitectura, la Ingeniería y la Construcción. Nuestro propósito es contribuir al desarrollo de una industria más eficiente, colaborativa y digitalizada mediante la promoción de estándares internacionales, programas de certificación y formación especializada orientada a las necesidades reales del mercado.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <a
                href="#conocenos"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-pmi-dark font-medium rounded-full hover:bg-white/90 transition-colors shadow-lg hover:shadow-xl"
              >
                Conócenos
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="w-full bg-white py-12 md:py-16 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4 p-5 bg-pmi-cream rounded-2xl"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-pmi-purple/10 rounded-xl shrink-0">
                  <item.icon className="w-6 h-6 text-pmi-purple" />
                </div>
                <div>
                  <div className="text-sm font-bold text-pmi-dark">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="conocenos" className="w-full bg-pmi-cream py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left column - sticky title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="lg:sticky lg:top-32">
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-purple uppercase bg-pmi-purple/10 rounded-full mb-4">
                  Nuestra labor
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
                  Acreditamos el talento que transforma la industria
                </h2>
                <div className="mt-6 w-16 h-1 bg-pmi-purple rounded-full" />
              </div>
            </motion.div>

            {/* Right column - paragraphs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3 space-y-8"
            >
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Trabajamos para acreditar las capacidades técnicas, estratégicas y de liderazgo de los profesionales que participan en todas las fases del ciclo de vida de los proyectos constructivos. A través de nuestras certificaciones, recursos técnicos y actividades de investigación ayudamos a empresas y profesionales a fortalecer su posicionamiento y mejorar la calidad de sus procesos y resultados.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                AECMI reúne a expertos, instituciones académicas, organizaciones y profesionales comprometidos con la excelencia y la innovación dentro del sector AEC. Nuestra comunidad internacional comparte una visión común basada en el conocimiento, la mejora continua y el impulso de buenas prácticas que permitan afrontar con garantías los desafíos actuales y futuros de la industria.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
