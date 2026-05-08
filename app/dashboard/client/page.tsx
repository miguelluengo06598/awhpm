'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
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
  CheckCircle2,
  AlertCircle,
  Bell,
  LogOut,
  User,
  ChevronRight,
  Home,
  Trash2,
  X,
  MapPin,
  Video,
  Phone,
  Receipt,
} from 'lucide-react'
import Link from 'next/link'
import ClientSidebar from '@/components/dashboard/ClientSidebar'
import StatusBadge from '@/components/dashboard/StatusBadge'
import DetailModal from '@/components/dashboard/DetailModal'
import { supabase } from '@/lib/supabaseClient'

// ═══════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════
interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string | null
  role: string
}

interface CertificationApp {
  id: string
  certification_id: string
  status: string
  submitted_at: string
  updated_at: string
  exam_date: string | null
  exam_time: string | null
  exam_location: string | null
  exam_passed: boolean | null
  interview_date: string | null
  interview_time: string | null
  interview_result: string | null
  certification_issued_date: string | null
  certification_expiry_date: string | null
  certification_code: string | null
  payment_status: string
  payment_amount: number | null
  rejection_reason: string | null
  certifications?: { name: string }
}

interface CertDoc {
  id: string
  application_id: string
  file_name: string
  file_url: string
  document_type: string
  uploaded_at: string
}

interface Payment {
  id: string
  application_id: string
  amount: number
  status: string
  payment_method: string | null
  created_at: string
}

interface DashboardEvent {
  id: string
  tipo: string
  titulo: string
  fecha: string
  hora: string | null
  modalidad: string | null
  estado: string
}

// ═══════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════
export default function ClientDashboardPage() {
  const router = useRouter()

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [applications, setApplications] = useState<CertificationApp[]>([])
  const [documents, setDocuments] = useState<CertDoc[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [events, setEvents] = useState<DashboardEvent[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [detailOpen, setDetailOpen] = useState(false)
  const [detailTitle, setDetailTitle] = useState('')
  const [detailContent, setDetailContent] = useState<React.ReactNode>(null)

  // ─── AUTH + FETCH ───
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Verificar sesión
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      if (sessionError || !sessionData.session) {
        router.replace('/auth/signin')
        return
      }

      const userId = sessionData.session.user.id

      // Fetch perfil
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) throw profileError
      if (profileData.role === 'admin') {
        router.replace('/dashboard/admin')
        return
      }
      setProfile(profileData)

      // Fetch aplicaciones con nombre de certificación
      const { data: appsData, error: appsError } = await supabase
        .from('certifications_applications')
        .select('*, certifications(name)')
        .eq('user_id', userId)
        .order('submitted_at', { ascending: false })

      if (appsError) throw appsError
      setApplications(appsData || [])

      // Construir eventos desde aplicaciones
      const evtList: DashboardEvent[] = []
      ;(appsData || []).forEach((app: CertificationApp) => {
        if (app.exam_date && app.status !== 'rejected') {
          evtList.push({
            id: app.id + '-exam',
            tipo: 'Examen',
            titulo: `Examen — ${app.certifications?.name || 'Certificación'}`,
            fecha: app.exam_date,
            hora: app.exam_time,
            modalidad: app.exam_location || 'Online',
            estado: app.status === 'exam_scheduled' ? 'Confirmado' : 'Pendiente',
          })
        }
        if (app.interview_date && app.status !== 'rejected') {
          evtList.push({
            id: app.id + '-int',
            tipo: 'Entrevista',
            titulo: `Entrevista — ${app.certifications?.name || 'Certificación'}`,
            fecha: app.interview_date,
            hora: app.interview_time,
            modalidad: null,
            estado: app.interview_result || 'Pendiente',
          })
        }
        if (app.certification_expiry_date && app.status === 'certified') {
          const daysLeft = Math.ceil((new Date(app.certification_expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          if (daysLeft <= 90) {
            evtList.push({
              id: app.id + '-ren',
              tipo: 'Recordatorio',
              titulo: `Renovación ${app.certifications?.name || ''}`,
              fecha: app.certification_expiry_date,
              hora: null,
              modalidad: null,
              estado: daysLeft < 0 ? 'Vencida' : daysLeft <= 30 ? 'Urgente' : 'Próxima',
            })
          }
        }
      })
      setEvents(evtList)

      // Fetch documentos de todas las aplicaciones del usuario
      const appIds = (appsData || []).map((a: CertificationApp) => a.id)
      if (appIds.length > 0) {
        const { data: docsData, error: docsError } = await supabase
          .from('documents')
          .select('*')
          .in('application_id', appIds)
          .order('uploaded_at', { ascending: false })

        if (docsError) throw docsError
        setDocuments(docsData || [])
      }

      // Fetch pagos de todas las aplicaciones del usuario
      if (appIds.length > 0) {
        const { data: payData, error: payError } = await supabase
          .from('payments')
          .select('*')
          .in('application_id', appIds)
          .order('created_at', { ascending: false })

        if (payError) throw payError
        setPayments(payData || [])
      }
    } catch (err) {
      console.error(err)
      setError('Error al cargar los datos. Intenta recargar la página.')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // ─── LOGOUT ───
  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('aecmi_session')
    sessionStorage.removeItem('aecmi_session')
    router.push('/auth/signin')
  }

  // ─── STATS ───
  const totalApps = applications.length
  const approvedApps = applications.filter((a) => a.status === 'certified').length
  const activeCerts = applications.filter((a) => a.status === 'certified' && a.certification_expiry_date && new Date(a.certification_expiry_date) > new Date()).length
  const upcomingRenewals = applications.filter((a) => {
    if (!a.certification_expiry_date) return false
    const days = Math.ceil((new Date(a.certification_expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return days <= 90 && days >= 0
  }).length

  // ─── MODAL HELPERS ───
  const openDetail = (title: string, content: React.ReactNode) => {
    setDetailTitle(title)
    setDetailContent(content)
    setDetailOpen(true)
  }

  const formatDate = (d: string | null) => (d ? new Date(d).toLocaleDateString('es-ES') : '—')
  const formatCurrency = (n: number | null) => (n ? `€${n.toFixed(2)}` : '—')

  if (loading) {
    return (
      <div className="min-h-screen bg-pmi-cream flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-pmi-blue/20 border-t-pmi-blue rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-pmi-cream flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm text-center max-w-md">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-pmi-dark mb-2">Error</h2>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 px-4 py-2 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  const userName = profile ? `${profile.first_name} ${profile.last_name}` : 'Usuario'

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
            </div>
            <div className="flex items-center gap-3">
              <button className="relative w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center transition-colors border border-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
                {upcomingRenewals > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {upcomingRenewals}
                  </span>
                )}
              </button>
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-2xl sm:text-3xl font-bold text-pmi-dark">
              Bienvenido, <span className="text-pmi-blue">{userName}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">Gestiona tus certificaciones, documentos y pagos.</p>
          </motion.div>

          {/* ═══════════════════════════════════════════════
              RESUMEN / STATS
          ═══════════════════════════════════════════════ */}
          <section>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Solicitudes', value: totalApps, icon: FileText, color: 'from-blue-500 to-cyan-400' },
                { label: 'Aprobadas', value: approvedApps, icon: CheckCircle2, color: 'from-emerald-500 to-green-400' },
                { label: 'Certificaciones activas', value: activeCerts, icon: Award, color: 'from-violet-500 to-purple-400' },
                { label: 'Próximas renovaciones', value: upcomingRenewals, icon: Clock, color: 'from-orange-500 to-amber-400' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-sm`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-extrabold text-pmi-dark">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </section>


          {/* ═══════════════════════════════════════════════
              MIS SOLICITUDES
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

            {applications.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
                <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Aún no tienes solicitudes de certificación.</p>
                <Link href="/certifications" className="inline-flex items-center gap-1 text-sm text-pmi-blue font-medium mt-2 hover:underline">
                  Explorar certificaciones <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50/70 border-b border-gray-100">
                          <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Certificación</th>
                          <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Estado</th>
                          <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Solicitud</th>
                          <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Actualización</th>
                          <th className="text-right font-semibold text-gray-700 px-5 py-3.5">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {applications.map((app) => (
                          <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-5 py-4 font-medium text-pmi-dark">
                              {app.certifications?.name?.replace(/_/g, ' ') || 'Certificación'}
                            </td>
                            <td className="px-5 py-4"><StatusBadge status={app.status} /></td>
                            <td className="px-5 py-4 text-gray-600">{formatDate(app.submitted_at)}</td>
                            <td className="px-5 py-4 text-gray-600">{formatDate(app.updated_at)}</td>
                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={() =>
                                  openDetail(
                                    `Solicitud`,
                                    <div className="space-y-3 text-sm">
                                      <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Certificación</span><span className="font-medium">{app.certifications?.name?.replace(/_/g, ' ') || '—'}</span></div>
                                        <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Estado</span><StatusBadge status={app.status} /></div>
                                        <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Solicitud</span><span className="font-medium">{formatDate(app.submitted_at)}</span></div>
                                        <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Pago</span><span className="font-medium">{app.payment_status === 'completed' ? 'Pagado' : app.payment_status === 'pending' ? 'Pendiente' : app.payment_status}</span></div>
                                        {app.exam_date && (
                                          <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Examen</span><span className="font-medium">{formatDate(app.exam_date)} {app.exam_time || ''}</span></div>
                                        )}
                                        {app.interview_date && (
                                          <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Entrevista</span><span className="font-medium">{formatDate(app.interview_date)} {app.interview_time || ''}</span></div>
                                        )}
                                        {app.certification_code && (
                                          <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Credencial</span><span className="font-medium font-mono">{app.certification_code}</span></div>
                                        )}
                                      </div>
                                      {app.rejection_reason && (
                                        <div className="p-3 bg-red-50 rounded-xl text-red-700 text-xs">{app.rejection_reason}</div>
                                      )}
                                    </div>
                                  )
                                }
                                className="inline-flex items-center gap-1 text-xs font-medium text-pmi-blue hover:text-pmi-dark transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" /> Ver detalles
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
                  {applications.map((app) => (
                    <div key={app.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-bold text-pmi-dark">{app.certifications?.name?.replace(/_/g, ' ') || 'Certificación'}</h3>
                        <StatusBadge status={app.status} />
                      </div>
                      <div className="text-xs text-gray-500 mb-3">Solicitud: {formatDate(app.submitted_at)}</div>
                      <button
                        onClick={() =>
                          openDetail(
                            'Detalle de solicitud',
                            <div className="space-y-3 text-sm">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Certificación</span><span className="font-medium">{app.certifications?.name?.replace(/_/g, ' ') || '—'}</span></div>
                                <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Estado</span><StatusBadge status={app.status} /></div>
                                <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Pago</span><span className="font-medium">{app.payment_status}</span></div>
                                {app.exam_date && <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Examen</span><span className="font-medium">{formatDate(app.exam_date)}</span></div>}
                              </div>
                            </div>
                          )
                        }
                        className="w-full inline-flex items-center justify-center gap-1 text-xs font-medium text-pmi-blue border border-pmi-blue/20 rounded-lg py-2 hover:bg-pmi-blue/5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> Ver detalles
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* ═══════════════════════════════════════════════
              CERTIFICACIONES ACTIVAS
          ═══════════════════════════════════════════════ */}
          <section id="certificaciones">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-pmi-dark">Certificaciones Activas</h2>
                <p className="text-xs text-gray-500">Tus credenciales vigentes</p>
              </div>
            </div>

            {activeCerts === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
                <Award className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Aún no tienes certificaciones activas.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {applications
                  .filter((a) => a.status === 'certified' && a.certification_expiry_date && new Date(a.certification_expiry_date) > new Date())
                  .map((cert, index) => {
                    const daysLeft = cert.certification_expiry_date
                      ? Math.ceil((new Date(cert.certification_expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                      : 0
                    const needsRenewal = daysLeft <= 90
                    return (
                      <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-pmi-cream rounded-xl flex items-center justify-center">
                            <Award className="w-6 h-6 text-pmi-blue" />
                          </div>
                          <StatusBadge status={needsRenewal ? 'Por Renovar' : 'Activa'} />
                        </div>
                        <h3 className="text-base font-bold text-pmi-dark mb-1">
                          {cert.certifications?.name?.replace(/_/g, ' ') || 'Certificación'}
                        </h3>
                        <p className="text-xs text-gray-400 font-mono mb-4">{cert.certification_code || '—'}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-gray-500">Obtención</span><span className="font-medium">{formatDate(cert.certification_issued_date)}</span></div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Vencimiento</span>
                            <span className={`font-medium ${needsRenewal ? 'text-orange-600' : ''}`}>
                              {formatDate(cert.certification_expiry_date)} {needsRenewal && `(${daysLeft}d)`}
                            </span>
                          </div>
                        </div>
                        {needsRenewal && (
                          <button className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-50 text-orange-700 text-sm font-medium rounded-xl border border-orange-100 hover:bg-orange-100 transition-colors">
                            <Clock className="w-4 h-4" /> Renovar ahora
                          </button>
                        )}
                        {!needsRenewal && (
                          <button className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors">
                            <Download className="w-4 h-4" /> Descargar credencial
                          </button>
                        )}
                      </motion.div>
                    )
                  })}
              </div>
            )}
          </section>


          {/* ═══════════════════════════════════════════════
              PRÓXIMOS EVENTOS
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

            {events.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
                <CalendarDays className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No tienes eventos programados.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {events.map((evt, index) => {
                  const isUrgent = evt.estado === 'Urgente' || evt.estado === 'Vencida'
                  const isConfirmed = evt.estado === 'Confirmado'
                  return (
                    <motion.div
                      key={evt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`bg-white p-5 rounded-2xl border shadow-sm ${isUrgent ? 'border-red-200 bg-red-50/30' : 'border-gray-100'}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${
                          evt.tipo === 'Examen' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                          evt.tipo === 'Entrevista' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          'bg-red-100 text-red-800 border-red-200'
                        }`}>
                          {evt.tipo}
                        </span>
                        {isUrgent && <AlertCircle className="w-4 h-4 text-red-500" />}
                        {isConfirmed && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                      </div>
                      <h3 className="text-sm font-bold text-pmi-dark mb-3">{evt.titulo}</h3>
                      <div className="space-y-1.5 text-xs text-gray-600">
                        <div className="flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5 text-gray-400" /><span>{formatDate(evt.fecha)}</span></div>
                        {evt.hora && <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-gray-400" /><span>{evt.hora}</span></div>}
                        {evt.modalidad && evt.modalidad !== '—' && (
                          <div className="flex items-center gap-2">
                            {evt.modalidad === 'Online' ? <Video className="w-3.5 h-3.5 text-gray-400" /> : <MapPin className="w-3.5 h-3.5 text-gray-400" />}
                            <span>{evt.modalidad}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <span className={`text-xs font-semibold ${isUrgent ? 'text-red-600' : isConfirmed ? 'text-green-600' : 'text-gray-500'}`}>
                          {isUrgent ? 'Acción requerida' : isConfirmed ? 'Confirmado' : 'Pendiente'}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </section>

          {/* ═══════════════════════════════════════════════
              PAGOS
          ═══════════════════════════════════════════════ */}
          <section id="pagos">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-pmi-dark">Pagos</h2>
                <p className="text-xs text-gray-500">Historial de facturación</p>
              </div>
            </div>

            {payments.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
                <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No tienes pagos registrados.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50/70 border-b border-gray-100">
                        <th className="text-left font-semibold text-gray-700 px-5 py-3.5">ID</th>
                        <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Monto</th>
                        <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Estado</th>
                        <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Método</th>
                        <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Fecha</th>
                        <th className="text-right font-semibold text-gray-700 px-5 py-3.5">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {payments.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-4 font-mono text-xs text-gray-600">{p.id.slice(0, 8)}</td>
                          <td className="px-5 py-4 font-semibold text-pmi-dark">{formatCurrency(p.amount)}</td>
                          <td className="px-5 py-4"><StatusBadge status={p.status === 'completed' ? 'Pagado' : p.status} /></td>
                          <td className="px-5 py-4 text-gray-600">{p.payment_method || '—'}</td>
                          <td className="px-5 py-4 text-gray-600">{formatDate(p.created_at)}</td>
                          <td className="px-5 py-4 text-right">
                            <button className="inline-flex items-center gap-1 text-xs font-medium text-pmi-blue hover:text-pmi-dark transition-colors">
                              <Receipt className="w-3.5 h-3.5" /> Factura
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* ═══════════════════════════════════════════════
              DOCUMENTOS
          ═══════════════════════════════════════════════ */}
          <section id="documentos">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-pmi-dark">Documentos</h2>
                  <p className="text-xs text-gray-500">Archivos subidos a tus solicitudes</p>
                </div>
              </div>
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-pmi-dark text-sm font-medium rounded-xl border border-gray-200 hover:border-pmi-blue hover:text-pmi-blue transition-colors shadow-sm">
                <Upload className="w-4 h-4" />
                Subir documento
              </button>
            </div>

            {documents.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center">
                <FolderOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No tienes documentos subidos.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50/70 border-b border-gray-100">
                        <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Nombre</th>
                        <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Tipo</th>
                        <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Fecha</th>
                        <th className="text-right font-semibold text-gray-700 px-5 py-3.5">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-pmi-cream rounded-lg flex items-center justify-center shrink-0">
                                <FileText className="w-4 h-4 text-pmi-blue" />
                              </div>
                              <span className="font-medium text-pmi-dark">{doc.file_name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                              {doc.document_type}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-gray-600">{formatDate(doc.uploaded_at)}</td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={doc.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-pmi-blue hover:bg-pmi-blue/10 rounded-lg transition-colors"
                                title="Descargar"
                              >
                                <Download className="w-4 h-4" />
                              </a>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>

          {/* Footer */}
          <footer className="pt-6 pb-2 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link href="/certifications" className="inline-flex items-center gap-1.5 text-sm text-pmi-blue font-medium hover:underline">
                <Eye className="w-4 h-4" /> Ver certificaciones en el registro público
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-pmi-dark transition-colors">
                <AlertCircle className="w-4 h-4" /> Contactar soporte
              </Link>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">
              © {new Date().getFullYear()} AECMI. Todos los derechos reservados.
            </p>
          </footer>
        </main>
      </div>

      <DetailModal open={detailOpen} title={detailTitle} onClose={() => setDetailOpen(false)}>
        {detailContent}
      </DetailModal>
    </div>
  )
}
