'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Award,
  FileText,
  FolderOpen,
  CreditCard,
  CalendarDays,
  Clock,
  ArrowRight,
  Plus,
  Download,
  Upload,
  Eye,
  ChevronRight,
  Home,
  LogOut,
  User,
  CheckCircle2,
  AlertCircle,
  Receipt,
} from 'lucide-react'
import Link from 'next/link'
import ClientSidebar from '@/components/dashboard/ClientSidebar'
import StatusBadge from '@/components/dashboard/StatusBadge'

// ═══════════════════════════════════════════════
// DATOS SIMULADOS
// ═══════════════════════════════════════════════

const SOLICITUDES = [
  {
    id: 'SOL-2025-001',
    certificacion: 'Information Delivery Manager',
    estado: 'In Review',
    fechaSolicitud: '2025-03-15',
    ultimaActualizacion: '2025-04-02',
    progreso: 60,
  },
  {
    id: 'SOL-2025-002',
    certificacion: 'BIM Design Manager',
    estado: 'Exam Scheduled',
    fechaSolicitud: '2025-02-10',
    ultimaActualizacion: '2025-04-10',
    progreso: 80,
  },
  {
    id: 'SOL-2024-089',
    certificacion: 'BIM Construction Manager',
    estado: 'Certified',
    fechaSolicitud: '2024-08-20',
    ultimaActualizacion: '2024-12-15',
    progreso: 100,
  },
  {
    id: 'SOL-2025-003',
    certificacion: 'Information Delivery Manager',
    estado: 'Pending',
    fechaSolicitud: '2025-04-20',
    ultimaActualizacion: '2025-04-20',
    progreso: 15,
  },
]

const CERTIFICACIONES_ACTIVAS = [
  {
    id: 'CERT-2024-089',
    nombre: 'BIM Construction Manager',
    fechaObtencion: '2024-12-15',
    fechaVencimiento: '2027-12-15',
    estado: 'Activa',
    numeroCredencial: 'AECMI-BCM-2024-089',
  },
  {
    id: 'CERT-2023-042',
    nombre: 'BIM Design Manager',
    fechaObtencion: '2023-06-10',
    fechaVencimiento: '2026-06-10',
    estado: 'Activa',
    numeroCredencial: 'AECMI-BDM-2023-042',
  },
  {
    id: 'CERT-2022-015',
    nombre: 'Information Delivery Manager',
    fechaObtencion: '2022-01-20',
    fechaVencimiento: '2025-01-20',
    estado: 'Por Renovar',
    numeroCredencial: 'AECMI-IDM-2022-015',
  },
]

const DOCUMENTOS = [
  { id: 1, nombre: 'CV_Profesional.pdf', tipo: 'CV', fechaSubida: '2025-01-10', tamano: '2.4 MB' },
  { id: 2, nombre: 'Certificado_Universidad.pdf', tipo: 'Educación', fechaSubida: '2025-01-10', tamano: '1.8 MB' },
  { id: 3, nombre: 'Portfolio_BIM_2024.pdf', tipo: 'Portfolio', fechaSubida: '2025-02-05', tamano: '8.2 MB' },
  { id: 4, nombre: 'Referencia_Empresa_X.pdf', tipo: 'Experiencia', fechaSubida: '2025-03-01', tamano: '1.1 MB' },
]

const PAGOS = [
  {
    id: 'INV-2025-001',
    concepto: 'Solicitud BIM Design Manager',
    fecha: '2025-02-10',
    monto: '€450.00',
    estado: 'Pagado',
    metodo: 'Tarjeta de crédito',
  },
  {
    id: 'INV-2025-002',
    concepto: 'Solicitud Information Delivery Manager',
    fecha: '2025-03-15',
    monto: '€450.00',
    estado: 'Pagado',
    metodo: 'Transferencia bancaria',
  },
  {
    id: 'INV-2025-003',
    concepto: 'Renovación Information Delivery Manager',
    fecha: '2025-04-20',
    monto: '€200.00',
    estado: 'Pendiente',
    metodo: '—',
  },
]

const EVENTOS = [
  {
    id: 1,
    tipo: 'Examen',
    titulo: 'Examen técnico — BIM Design Manager',
    fecha: '2025-04-28',
    hora: '10:00 CET',
    modalidad: 'Online',
    estado: 'Confirmado',
  },
  {
    id: 2,
    tipo: 'Entrevista',
    titulo: 'Entrevista personal — BIM Design Manager',
    fecha: '2025-05-05',
    hora: '14:30 CET',
    modalidad: 'Videollamada',
    estado: 'Pendiente',
  },
  {
    id: 3,
    tipo: 'Recordatorio',
    titulo: 'Fecha límite renovación IDM',
    fecha: '2025-01-20',
    hora: '23:59 CET',
    modalidad: '—',
    estado: 'Urgente',
  },
]

// ═══════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════
export default function ClientDashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState('Usuario')
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(true)

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
      setUserEmail(data.email || '')
    } catch {
      router.replace('/auth/signin')
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('aecmi_session')
    sessionStorage.removeItem('aecmi_session')
    router.push('/auth/signin')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-pmi-cream flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-pmi-blue/20 border-t-pmi-blue rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pmi-cream flex">
      <ClientSidebar onLogout={handleLogout} />

      <div className="flex-1 min-w-0">
        {/* ─── HEADER ─── */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Home className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
              <span className="font-medium text-pmi-dark">Dashboard</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-400">Mis Certificaciones</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4 text-pmi-blue" />
                <span className="font-medium text-pmi-dark">{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          {/* Saludo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-pmi-dark">
              Bienvenido, <span className="text-pmi-blue">{userName}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {userEmail || 'Gestiona tus certificaciones, documentos y pagos desde aquí.'}
            </p>
          </motion.div>

          {/* ═══════════════════════════════════════════════
              SECCIÓN 1: MIS SOLICITUDES
          ═══════════════════════════════════════════════ */}
          <section id="solicitudes">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-pmi-dark">Mis Solicitudes de Certificación</h2>
                  <p className="text-xs text-gray-500">Estado de tus solicitudes activas</p>
                </div>
              </div>
              <Link
                href="/certifications"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Nueva Solicitud
              </Link>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/70 border-b border-gray-100">
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">ID</th>
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Certificación</th>
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Estado</th>
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Fecha solicitud</th>
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Última act.</th>
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Progreso</th>
                      <th className="text-right font-semibold text-gray-700 px-5 py-3.5">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {SOLICITUDES.map((sol) => (
                      <tr key={sol.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-4 text-gray-600 font-mono text-xs">{sol.id}</td>
                        <td className="px-5 py-4 font-medium text-pmi-dark">{sol.certificacion}</td>
                        <td className="px-5 py-4">
                          <StatusBadge status={sol.estado} />
                        </td>
                        <td className="px-5 py-4 text-gray-600">{sol.fechaSolicitud}</td>
                        <td className="px-5 py-4 text-gray-600">{sol.ultimaActualizacion}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-pmi-blue to-pmi-cyan rounded-full"
                                style={{ width: `${sol.progreso}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">{sol.progreso}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button className="inline-flex items-center gap-1 text-xs font-medium text-pmi-blue hover:text-pmi-dark transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                            Ver detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {SOLICITUDES.map((sol) => (
                <div key={sol.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-400 font-mono">{sol.id}</p>
                      <h3 className="text-sm font-bold text-pmi-dark mt-0.5">{sol.certificacion}</h3>
                    </div>
                    <StatusBadge status={sol.estado} />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 mb-3">
                    <div>
                      <span className="text-gray-400 block">Solicitud</span>
                      {sol.fechaSolicitud}
                    </div>
                    <div>
                      <span className="text-gray-400 block">Actualización</span>
                      {sol.ultimaActualizacion}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pmi-blue to-pmi-cyan rounded-full"
                        style={{ width: `${sol.progreso}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{sol.progreso}%</span>
                  </div>
                  <button className="w-full inline-flex items-center justify-center gap-1 text-xs font-medium text-pmi-blue border border-pmi-blue/20 rounded-lg py-2 hover:bg-pmi-blue/5 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    Ver detalles
                  </button>
                </div>
              ))}
            </div>
          </section>


          {/* ═══════════════════════════════════════════════
              SECCIÓN 2: CERTIFICACIONES ACTIVAS
          ═══════════════════════════════════════════════ */}
          <section id="certificaciones">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-pmi-dark">Certificaciones Activas</h2>
                <p className="text-xs text-gray-500">Tus credenciales vigentes y próximas a vencer</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CERTIFICACIONES_ACTIVAS.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-pmi-cream rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-pmi-blue" />
                    </div>
                    <StatusBadge status={cert.estado} />
                  </div>

                  <h3 className="text-base font-bold text-pmi-dark mb-1">{cert.nombre}</h3>
                  <p className="text-xs text-gray-400 font-mono mb-4">{cert.numeroCredencial}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Obtención</span>
                      <span className="text-gray-700 font-medium">{cert.fechaObtencion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Vencimiento</span>
                      <span className={`font-medium ${cert.estado === 'Por Renovar' ? 'text-orange-600' : 'text-gray-700'}`}>
                        {cert.fechaVencimiento}
                      </span>
                    </div>
                  </div>

                  {cert.estado === 'Por Renovar' && (
                    <button className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-50 text-orange-700 text-sm font-medium rounded-xl border border-orange-100 hover:bg-orange-100 transition-colors">
                      <Clock className="w-4 h-4" />
                      Renovar ahora
                    </button>
                  )}

                  {cert.estado === 'Activa' && (
                    <button className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors">
                      <Download className="w-4 h-4" />
                      Descargar credencial
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              SECCIÓN 3: DOCUMENTOS
          ═══════════════════════════════════════════════ */}
          <section id="documentos">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-pmi-dark">Documentos</h2>
                  <p className="text-xs text-gray-500">CV, certificados académicos y evidencias</p>
                </div>
              </div>
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-pmi-dark text-sm font-medium rounded-xl border border-gray-200 hover:border-pmi-blue hover:text-pmi-blue transition-colors shadow-sm">
                <Upload className="w-4 h-4" />
                Subir documento
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/70 border-b border-gray-100">
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Nombre</th>
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Tipo</th>
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Fecha</th>
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Tamaño</th>
                      <th className="text-right font-semibold text-gray-700 px-5 py-3.5">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {DOCUMENTOS.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-pmi-cream rounded-lg flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-pmi-blue" />
                            </div>
                            <span className="font-medium text-pmi-dark">{doc.nombre}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                            {doc.tipo}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-600">{doc.fechaSubida}</td>
                        <td className="px-5 py-4 text-gray-600">{doc.tamano}</td>
                        <td className="px-5 py-4 text-right">
                          <button className="inline-flex items-center gap-1 text-xs font-medium text-pmi-blue hover:text-pmi-dark transition-colors">
                            <Download className="w-3.5 h-3.5" />
                            Descargar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              SECCIÓN 4: PAGOS
          ═══════════════════════════════════════════════ */}
          <section id="pagos">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-pmi-dark">Pagos</h2>
                <p className="text-xs text-gray-500">Historial de facturación y pagos pendientes</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/70 border-b border-gray-100">
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Factura</th>
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Concepto</th>
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Fecha</th>
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Monto</th>
                      <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Estado</th>
                      <th className="text-right font-semibold text-gray-700 px-5 py-3.5">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {PAGOS.map((pago) => (
                      <tr key={pago.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Receipt className="w-4 h-4 text-gray-400" />
                            <span className="font-mono text-xs text-gray-600">{pago.id}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-medium text-pmi-dark">{pago.concepto}</td>
                        <td className="px-5 py-4 text-gray-600">{pago.fecha}</td>
                        <td className="px-5 py-4 font-semibold text-pmi-dark">{pago.monto}</td>
                        <td className="px-5 py-4">
                          <StatusBadge status={pago.estado} />
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            {pago.estado === 'Pendiente' ? (
                              <button className="inline-flex items-center gap-1 text-xs font-medium text-white bg-pmi-dark px-3 py-1.5 rounded-lg hover:bg-pmi-blue transition-colors">
                                Pagar
                              </button>
                            ) : (
                              <button className="inline-flex items-center gap-1 text-xs font-medium text-pmi-blue hover:text-pmi-dark transition-colors">
                                <Download className="w-3.5 h-3.5" />
                                Factura
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>


          {/* ═══════════════════════════════════════════════
              SECCIÓN 5: PRÓXIMOS EVENTOS
          ═══════════════════════════════════════════════ */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                <CalendarDays className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-pmi-dark">Próximos eventos</h2>
                <p className="text-xs text-gray-500">Exámenes, entrevistas y recordatorios</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {EVENTOS.map((evento, index) => {
                const isUrgent = evento.estado === 'Urgente'
                const isConfirmed = evento.estado === 'Confirmado'
                return (
                  <motion.div
                    key={evento.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`bg-white p-5 rounded-2xl border shadow-sm ${
                      isUrgent ? 'border-red-200 bg-red-50/30' : 'border-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${
                          evento.tipo === 'Examen'
                            ? 'bg-purple-100 text-purple-800 border-purple-200'
                            : evento.tipo === 'Entrevista'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : 'bg-red-100 text-red-800 border-red-200'
                        }`}
                      >
                        {evento.tipo}
                      </span>
                      {isUrgent && <AlertCircle className="w-4 h-4 text-red-500" />}
                      {isConfirmed && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    </div>

                    <h3 className="text-sm font-bold text-pmi-dark mb-3">{evento.titulo}</h3>

                    <div className="space-y-1.5 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
                        <span>{evento.fecha}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{evento.hora}</span>
                      </div>
                      {evento.modalidad !== '—' && (
                        <div className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 flex items-center justify-center text-gray-400 text-[10px]">@</span>
                          <span>{evento.modalidad}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <span
                        className={`text-xs font-semibold ${
                          isUrgent ? 'text-red-600' : isConfirmed ? 'text-green-600' : 'text-gray-500'
                        }`}
                      >
                        {isUrgent ? 'Acción requerida' : isConfirmed ? 'Confirmado' : 'Pendiente'}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════
              FOOTER DEL DASHBOARD
          ═══════════════════════════════════════════════ */}
          <footer className="pt-6 pb-2 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <Link
                  href="/certifications"
                  className="inline-flex items-center gap-1.5 text-sm text-pmi-blue font-medium hover:underline"
                >
                  <Eye className="w-4 h-4" />
                  Ver mis certificaciones en el registro público
                </Link>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-pmi-dark transition-colors"
              >
                <AlertCircle className="w-4 h-4" />
                Contactar soporte
              </Link>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">
              © {new Date().getFullYear()} AECMI. Todos los derechos reservados.
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
