'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  FileText,
  Users,
  CreditCard,
  Award,
  Bell,
  LogOut,
  Eye,
  CheckCircle2,
  XCircle,
  User,
  Mail,
  CalendarDays,
  Download,
  Plus,
  Ban,
  Edit3,
  BarChart3,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCheck,
  Reply,
  MapPin,
  Video,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import AdminSidebar from '@/components/dashboard/AdminSidebar'
import StatCard from '@/components/dashboard/StatCard'
import DataTable from '@/components/dashboard/DataTable'
import ConfirmModal from '@/components/dashboard/ConfirmModal'
import DetailModal from '@/components/dashboard/DetailModal'
import StatusBadge from '@/components/dashboard/StatusBadge'
import { supabase } from '@/lib/supabaseClient'

// ═══════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════
interface AdminUser {
  id: string
  email: string
  first_name: string
  last_name: string
  role: string
  is_active: boolean
  created_at: string
}

interface CertApplication {
  id: string
  user_id: string
  certification_id: string
  status: string
  submitted_at: string
  reviewed_at: string | null
  payment_status: string
  payment_amount: number | null
  exam_date: string | null
  exam_time: string | null
  exam_location: string | null
  interview_date: string | null
  interview_time: string | null
  certification_code: string | null
  admin_notes: string | null
  rejection_reason: string | null
  users?: { first_name: string; last_name: string; email: string }
  certifications?: { name: string }
}

interface ContactMessage {
  id: string
  full_name: string
  email: string
  subject: string
  status: string
  created_at: string
  response: string | null
}

// ═══════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════
export default function AdminDashboardPage() {
  const router = useRouter()

  const [profile, setProfile] = useState<AdminUser | null>(null)
  const [applications, setApplications] = useState<CertApplication[]>([])
  const [users, setUsers] = useState<AdminUser[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmConfig, setConfirmConfig] = useState<{ title: string; message: string; variant: 'danger' | 'primary' | 'warning'; onConfirm: () => void }>({ title: '', message: '', variant: 'danger', onConfirm: () => {} })
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailTitle, setDetailTitle] = useState('')
  const [detailContent, setDetailContent] = useState<React.ReactNode>(null)

  // ─── FETCH ───
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { data: sessionData } = await supabase.auth.getSession()
      if (!sessionData.session) {
        router.replace('/auth/signin')
        return
      }

      const userId = sessionData.session.user.id

      // Verificar rol admin
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError || !profileData || profileData.role !== 'admin') {
        router.replace('/dashboard/client')
        return
      }
      setProfile(profileData)

      // Solicitudes con joins
      const { data: appsData, error: appsError } = await supabase
        .from('certifications_applications')
        .select('*, users(first_name, last_name, email), certifications(name)')
        .order('submitted_at', { ascending: false })

      if (appsError) throw appsError
      setApplications(appsData || [])

      // Usuarios
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (usersError) throw usersError
      setUsers(usersData || [])

      // Mensajes
      const { data: msgData, error: msgError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (msgError) throw msgError
      setMessages(msgData || [])
    } catch (err) {
      console.error(err)
      setError('Error al cargar los datos.')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // ─── ACCIONES ───
  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('aecmi_session')
    sessionStorage.removeItem('aecmi_session')
    router.push('/auth/signin')
  }

  const openConfirm = (title: string, message: string, variant: 'danger' | 'primary' | 'warning', onConfirm: () => void) => {
    setConfirmConfig({ title, message, variant, onConfirm })
    setConfirmOpen(true)
  }

  const openDetail = (title: string, content: React.ReactNode) => {
    setDetailTitle(title)
    setDetailContent(content)
    setDetailOpen(true)
  }

  const updateAppStatus = async (id: string, status: string, notes?: string) => {
    const updates: Record<string, any> = { status, updated_at: new Date().toISOString() }
    if (notes) {
      if (status === 'rejected') updates.rejection_reason = notes
      else updates.admin_notes = notes
    }

    const { error } = await supabase.from('certifications_applications').update(updates).eq('id', id)
    if (error) {
      alert('Error: ' + error.message)
    } else {
      setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)))
    }
  }

  const updateUserActive = async (id: string, is_active: boolean) => {
    const { error } = await supabase.from('users').update({ is_active }).eq('id', id)
    if (error) {
      alert('Error: ' + error.message)
    } else {
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, is_active } : u)))
    }
  }

  const updateMessageStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id)
    if (error) {
      alert('Error: ' + error.message)
    } else {
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)))
    }
  }

  // ─── STATS ───
  const totalApps = applications.length
  const pendingReview = applications.filter((a) => a.status === 'pending' || a.status === 'in_review').length
  const certifiedCount = applications.filter((a) => a.status === 'certified').length
  const totalRevenue = applications.reduce((sum, a) => sum + (a.payment_amount || 0), 0)
  const newMessages = messages.filter((m) => m.status === 'new').length

  const formatDate = (d: string | null) => (d ? new Date(d).toLocaleDateString('es-ES') : '—')
  const formatCurrency = (n: number | null) => (n ? `€${n.toFixed(2)}` : '—')

  const downloadCSV = (filename: string, rows: Record<string, any>[]) => {
    if (rows.length === 0) return
    const headers = Object.keys(rows[0])
    const csv = [
      headers.join(','),
      ...rows.map((r) => headers.map((h) => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(',')),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-pmi-blue/20 border-t-pmi-blue rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm text-center max-w-md">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-pmi-dark mb-2">Error</h2>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button onClick={fetchData} className="inline-flex items-center gap-2 px-4 py-2 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors">Reintentar</button>
        </div>
      </div>
    )
  }

  const userName = profile ? `${profile.first_name} ${profile.last_name}` : 'Admin'

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-pmi-dark hidden sm:block">Panel de Administración AECMI</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Bienvenido, {userName}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center transition-colors border border-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
                {newMessages > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{newMessages}</span>
                )}
              </button>
              <button onClick={handleLogout} className="hidden sm:inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 font-medium px-3 py-2 rounded-xl hover:bg-red-50 transition-colors border border-red-100">
                <LogOut className="w-4 h-4" /> Salir
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          <div className="sm:hidden">
            <h1 className="text-xl font-bold text-pmi-dark">Panel de Administración</h1>
            <p className="text-sm text-gray-500">Bienvenido, {userName}</p>
          </div>

          {/* ═══════════════════════════════════════════════
              ESTADÍSTICAS
          ═══════════════════════════════════════════════ */}
          <section>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard title="Total Solicitudes" value={totalApps} icon={FileText} trend={12} subtitle="Este mes" color="blue" delay={0} />
              <StatCard title="Pendientes Revisión" value={pendingReview} icon={Clock} trend={-5} subtitle="Requieren acción" color="orange" delay={0.1} />
              <StatCard title="Certificaciones" value={certifiedCount} icon={Award} trend={8} subtitle="Otorgadas" color="green" delay={0.2} />
              <StatCard title="Ingresos" value={formatCurrency(totalRevenue)} icon={CreditCard} trend={15} subtitle="Pagos completados" color="purple" delay={0.3} />
            </div>
          </section>


          {/* ═══════════════════════════════════════════════
              SOLICITUDES
          ═══════════════════════════════════════════════ */}
          <section id="solicitudes">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-pmi-dark">Solicitudes Pendientes de Revisión</h2>
                <p className="text-xs text-gray-500">Gestiona las solicitudes de certificación</p>
              </div>
            </div>

            <DataTable
              data={applications}
              searchKeys={['users.first_name', 'users.last_name', 'users.email', 'certifications.name']}
              filterOptions={[
                { key: 'status', label: 'Estado', options: ['pending', 'in_review', 'approved', 'rejected', 'exam_scheduled', 'exam_passed', 'certified'] },
              ]}
              itemsPerPage={10}
              columns={[
                { key: 'id', header: 'ID', width: '80px', render: (item) => <span className="font-mono text-xs text-gray-600">{item.id.slice(0, 8)}</span> },
                {
                  key: 'user',
                  header: 'Usuario',
                  render: (item) => (
                    <div>
                      <div className="font-medium text-pmi-dark">{item.users?.first_name} {item.users?.last_name}</div>
                      <div className="text-xs text-gray-400">{item.users?.email}</div>
                    </div>
                  ),
                },
                {
                  key: 'certification',
                  header: 'Certificación',
                  render: (item) => <span className="text-sm">{item.certifications?.name?.replace(/_/g, ' ') || '—'}</span>,
                },
                { key: 'submitted_at', header: 'Fecha', width: '100px', render: (item) => formatDate(item.submitted_at) },
                { key: 'status', header: 'Estado', render: (item) => <StatusBadge status={item.status} /> },
              ]}
              actions={(item) => (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      openDetail(
                        `Solicitud ${item.id.slice(0, 8)}`,
                        <div className="space-y-3 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Usuario</span><span className="font-medium">{item.users?.first_name} {item.users?.last_name}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Email</span><span className="font-medium">{item.users?.email}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Certificación</span><span className="font-medium">{item.certifications?.name?.replace(/_/g, ' ') || '—'}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Fecha</span><span className="font-medium">{formatDate(item.submitted_at)}</span></div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs mb-1">Estado</span><StatusBadge status={item.status} /></div>
                          {item.admin_notes && <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Notas</span><span className="font-medium">{item.admin_notes}</span></div>}
                          {item.rejection_reason && <div className="p-3 bg-red-50 rounded-xl text-red-700 text-xs">{item.rejection_reason}</div>}
                          <div className="flex gap-3 pt-2">
                            <button onClick={() => { setDetailOpen(false); updateAppStatus(item.id, 'approved'); }} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium text-sm">
                              <CheckCircle2 className="w-4 h-4" /> Aprobar
                            </button>
                            <button onClick={() => { setDetailOpen(false); updateAppStatus(item.id, 'rejected', 'Solicitud rechazada por el administrador'); }} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium text-sm">
                              <XCircle className="w-4 h-4" /> Rechazar
                            </button>
                          </div>
                        </div>
                      )
                    }
                    className="p-2 text-pmi-blue hover:bg-pmi-blue/10 rounded-lg transition-colors"
                    title="Ver detalles"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => openConfirm('Aprobar solicitud', `¿Aprobar solicitud de ${item.users?.first_name}?`, 'primary', () => updateAppStatus(item.id, 'approved'))} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Aprobar">
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => openConfirm('Rechazar solicitud', `¿Rechazar solicitud de ${item.users?.first_name}?`, 'danger', () => updateAppStatus(item.id, 'rejected', 'Solicitud rechazada'))} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Rechazar">
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              )}
            />
          </section>

          {/* ═══════════════════════════════════════════════
              USUARIOS
          ═══════════════════════════════════════════════ */}
          <section id="usuarios">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-pmi-dark">Gestión de Usuarios</h2>
                  <p className="text-xs text-gray-500">Usuarios registrados en la plataforma</p>
                </div>
              </div>
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors shadow-sm">
                <Plus className="w-4 h-4" /> Añadir usuario
              </button>
            </div>

            <DataTable
              data={users}
              searchKeys={['first_name', 'last_name', 'email']}
              filterOptions={[{ key: 'role', label: 'Rol', options: ['admin', 'client', 'staff'] }]}
              itemsPerPage={10}
              columns={[
                {
                  key: 'nombre',
                  header: 'Usuario',
                  render: (item) => (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-pmi-cream rounded-full flex items-center justify-center text-sm font-bold text-pmi-dark">
                        {item.first_name?.charAt(0)}{item.last_name?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-pmi-dark">{item.first_name} {item.last_name}</div>
                        <div className="text-xs text-gray-400">{item.email}</div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: 'role',
                  header: 'Rol',
                  render: (item) => (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      item.role === 'admin' ? 'bg-red-100 text-red-800 border-red-200' : item.role === 'staff' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}>
                      {item.role}
                    </span>
                  ),
                },
                { key: 'created_at', header: 'Registro', width: '110px', render: (item) => formatDate(item.created_at) },
                {
                  key: 'is_active',
                  header: 'Estado',
                  render: (item) => <span className={`text-xs font-medium ${item.is_active ? 'text-green-600' : 'text-gray-400'}`}>{item.is_active ? 'Activo' : 'Inactivo'}</span>,
                },
              ]}
              actions={(item) => (
                <div className="flex items-center gap-1">
                  <button onClick={() => openDetail(`Perfil de ${item.first_name}`, <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-pmi-cream rounded-full flex items-center justify-center text-xl font-bold text-pmi-dark">{item.first_name?.charAt(0)}</div>
                      <div><div className="font-bold text-pmi-dark text-base">{item.first_name} {item.last_name}</div><div className="text-gray-500">{item.email}</div></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Rol</span><span className="font-medium capitalize">{item.role}</span></div>
                      <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Registro</span><span className="font-medium">{formatDate(item.created_at)}</span></div>
                    </div>
                  </div>)} className="p-2 text-pmi-blue hover:bg-pmi-blue/10 rounded-lg transition-colors" title="Ver perfil"><Eye className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Editar"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => openConfirm(item.is_active ? 'Desactivar usuario' : 'Activar usuario', `¿${item.is_active ? 'Desactivar' : 'Activar'} a ${item.first_name}?`, item.is_active ? 'danger' : 'primary', () => updateUserActive(item.id, !item.is_active))} className={`p-2 rounded-lg transition-colors ${item.is_active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`} title={item.is_active ? 'Desactivar' : 'Activar'}>{item.is_active ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}</button>
                </div>
              )}
            />
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
                <p className="text-xs text-gray-500">Gestiona pagos y facturación</p>
              </div>
            </div>

            <DataTable
              data={applications.filter((a) => a.payment_status)}
              searchKeys={['users.first_name', 'users.last_name', 'users.email']}
              filterOptions={[{ key: 'payment_status', label: 'Estado', options: ['pending', 'completed', 'failed'] }]}
              itemsPerPage={10}
              columns={[
                {
                  key: 'usuario',
                  header: 'Usuario',
                  render: (item) => (
                    <div>
                      <div className="font-medium text-pmi-dark">{item.users?.first_name} {item.users?.last_name}</div>
                      <div className="text-xs text-gray-400">{item.users?.email}</div>
                    </div>
                  ),
                },
                {
                  key: 'certificacion',
                  header: 'Certificación',
                  render: (item) => <span className="text-sm">{item.certifications?.name?.replace(/_/g, ' ') || '—'}</span>,
                },
                { key: 'payment_amount', header: 'Monto', render: (item) => <span className="font-semibold text-pmi-dark">{formatCurrency(item.payment_amount)}</span> },
                { key: 'payment_status', header: 'Estado', render: (item) => <StatusBadge status={item.payment_status === 'completed' ? 'Pagado' : item.payment_status} /> },
              ]}
              actions={(item) => (
                <div className="flex items-center gap-1">
                  <button onClick={() => openDetail('Detalle de pago', <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Usuario</span><span className="font-medium">{item.users?.first_name} {item.users?.last_name}</span></div>
                      <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Email</span><span className="font-medium">{item.users?.email}</span></div>
                      <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Concepto</span><span className="font-medium">{item.certifications?.name?.replace(/_/g, ' ') || '—'}</span></div>
                      <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Monto</span><span className="font-semibold">{formatCurrency(item.payment_amount)}</span></div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between"><span className="text-gray-500 text-xs">Estado</span><StatusBadge status={item.payment_status === 'completed' ? 'Pagado' : item.payment_status} /></div>
                  </div>)} className="p-2 text-pmi-blue hover:bg-pmi-blue/10 rounded-lg transition-colors" title="Ver detalles"><Eye className="w-4 h-4" /></button>
                  {item.payment_status === 'pending' && (
                    <button onClick={() => openConfirm('Marcar como pagado', `¿Confirmar pago de ${item.users?.first_name}?`, 'primary', () => updateAppStatus(item.id, item.status, undefined))} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Marcar pagado"><CheckCircle2 className="w-4 h-4" /></button>
                  )}
                </div>
              )}
            />
          </section>

          {/* ═══════════════════════════════════════════════
              CONTACTOS / MENSAJES
          ═══════════════════════════════════════════════ */}
          <section id="contactos">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm relative">
                <Mail className="w-5 h-5 text-white" />
                {newMessages > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{newMessages}</span>}
              </div>
              <div>
                <h2 className="text-lg font-bold text-pmi-dark">Contactos / Mensajes</h2>
                <p className="text-xs text-gray-500">Mensajes recibidos desde el formulario</p>
              </div>
            </div>

            <DataTable
              data={messages}
              searchKeys={['full_name', 'email', 'subject']}
              filterOptions={[{ key: 'status', label: 'Estado', options: ['new', 'read', 'responded'] }]}
              itemsPerPage={10}
              columns={[
                {
                  key: 'nombre',
                  header: 'De',
                  render: (item) => (
                    <div>
                      <div className="font-medium text-pmi-dark">{item.full_name}</div>
                      <div className="text-xs text-gray-400">{item.email}</div>
                    </div>
                  ),
                },
                { key: 'subject', header: 'Asunto' },
                { key: 'created_at', header: 'Fecha', width: '100px', render: (item) => formatDate(item.created_at) },
                {
                  key: 'status',
                  header: 'Estado',
                  render: (item) => (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      item.status === 'new' ? 'bg-red-100 text-red-800 border-red-200' : item.status === 'read' ? 'bg-gray-100 text-gray-800 border-gray-200' : 'bg-green-100 text-green-800 border-green-200'
                    }`}>
                      {item.status}
                    </span>
                  ),
                },
              ]}
              actions={(item) => (
                <div className="flex items-center gap-1">
                  <button onClick={() => openDetail(item.subject, <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pmi-cream rounded-full flex items-center justify-center font-bold text-pmi-dark">{item.full_name?.charAt(0)}</div>
                      <div><div className="font-bold text-pmi-dark">{item.full_name}</div><div className="text-gray-500">{item.email}</div></div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl"><div className="text-xs text-gray-500 mb-1">Asunto</div><div className="font-medium">{item.subject}</div></div>
                    <div className="p-4 bg-gray-50 rounded-xl"><div className="text-xs text-gray-500 mb-1">Mensaje</div><p className="text-gray-700 leading-relaxed">Este es un mensaje de ejemplo. En producción se mostrará el contenido real desde la base de datos.</p></div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => { setDetailOpen(false); updateMessageStatus(item.id, 'responded'); }} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-pmi-dark text-white rounded-xl hover:bg-pmi-blue transition-colors font-medium text-sm"><Reply className="w-4 h-4" /> Responder</button>
                      <button onClick={() => { setDetailOpen(false); updateMessageStatus(item.id, 'read'); }} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm"><CheckCheck className="w-4 h-4" /> Marcar leído</button>
                    </div>
                  </div>)} className="p-2 text-pmi-blue hover:bg-pmi-blue/10 rounded-lg transition-colors" title="Ver mensaje"><Eye className="w-4 h-4" /></button>
                  {item.status === 'new' && <button onClick={() => updateMessageStatus(item.id, 'read')} className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Marcar leído"><CheckCheck className="w-4 h-4" /></button>}
                </div>
              )}
            />
          </section>

          {/* ═══════════════════════════════════════════════
              EXÁMENES
          ═══════════════════════════════════════════════ */}
          <section id="examenes">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                <CalendarDays className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-pmi-dark">Exámenes Programados</h2>
                <p className="text-xs text-gray-500">Próximos exámenes y entrevistas</p>
              </div>
            </div>

            <DataTable
              data={applications.filter((a) => a.exam_date)}
              searchKeys={['users.first_name', 'users.last_name', 'certifications.name']}
              filterOptions={[
                { key: 'status', label: 'Estado', options: ['exam_scheduled', 'exam_passed', 'certified'] },
              ]}
              itemsPerPage={10}
              columns={[
                {
                  key: 'usuario',
                  header: 'Candidato',
                  render: (item) => (
                    <div>
                      <div className="font-medium text-pmi-dark">{item.users?.first_name} {item.users?.last_name}</div>
                      <div className="text-xs text-gray-400">{item.users?.email}</div>
                    </div>
                  ),
                },
                {
                  key: 'certificacion',
                  header: 'Certificación',
                  render: (item) => <span className="text-sm">{item.certifications?.name?.replace(/_/g, ' ') || '—'}</span>,
                },
                { key: 'exam_date', header: 'Fecha', width: '100px', render: (item) => formatDate(item.exam_date) },
                { key: 'exam_time', header: 'Hora', width: '80px', render: (item) => item.exam_time || '—' },
                {
                  key: 'modalidad',
                  header: 'Modalidad',
                  render: (item) => (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                      {item.exam_location?.toLowerCase().includes('online') ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                      {item.exam_location || 'Online'}
                    </span>
                  ),
                },
                { key: 'status', header: 'Estado', render: (item) => <StatusBadge status={item.status} /> },
              ]}
              actions={(item) => (
                <div className="flex items-center gap-1">
                  <button onClick={() => openDetail(`Examen — ${item.certifications?.name?.replace(/_/g, ' ') || ''}`, <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Candidato</span><span className="font-medium">{item.users?.first_name} {item.users?.last_name}</span></div>
                      <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Email</span><span className="font-medium">{item.users?.email}</span></div>
                      <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Certificación</span><span className="font-medium">{item.certifications?.name?.replace(/_/g, ' ') || '—'}</span></div>
                      <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Fecha y hora</span><span className="font-medium">{formatDate(item.exam_date)} {item.exam_time || ''}</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Modalidad</span><span className="font-medium">{item.exam_location || 'Online'}</span></div>
                      <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Estado</span><StatusBadge status={item.status} /></div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-pmi-dark text-white rounded-xl hover:bg-pmi-blue transition-colors font-medium text-sm"><Edit3 className="w-4 h-4" /> Reprogramar</button>
                      <button onClick={() => { setDetailOpen(false); openConfirm('Cancelar examen', `¿Cancelar examen de ${item.users?.first_name}?`, 'danger', () => {}); }} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors font-medium text-sm"><XCircle className="w-4 h-4" /> Cancelar</button>
                    </div>
                  </div>)} className="p-2 text-pmi-blue hover:bg-pmi-blue/10 rounded-lg transition-colors" title="Ver detalles"><Eye className="w-4 h-4" /></button>
                </div>
              )}
            />
          </section>

          {/* ═══════════════════════════════════════════════
              REPORTES
          ═══════════════════════════════════════════════ */}
          <section id="reportes">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-pmi-dark">Reportes</h2>
                <p className="text-xs text-gray-500">Descarga informes del sistema</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: 'Reporte de Solicitudes', desc: 'Todas las solicitudes con estados y filtros.', icon: FileText, color: 'from-blue-500 to-cyan-400', data: applications },
                { title: 'Reporte de Certificaciones', desc: 'Certificaciones otorgadas y próximas a vencer.', icon: Award, color: 'from-emerald-500 to-green-400', data: applications.filter((a) => a.status === 'certified') },
                { title: 'Reporte de Usuarios', desc: 'Listado completo de usuarios registrados.', icon: Users, color: 'from-violet-500 to-purple-400', data: users },
              ].map((rep, index) => (
                <motion.div
                  key={rep.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rep.color} flex items-center justify-center shadow-sm mb-4`}>
                    <rep.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-pmi-dark mb-1">{rep.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{rep.desc}</p>
                  <div className="flex gap-3">
                    <button onClick={() => downloadCSV(rep.title.replace(/\s+/g, '_').toLowerCase(), rep.data)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors">
                      <Download className="w-4 h-4" /> CSV
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <footer className="pt-6 pb-2 border-t border-gray-200">
            <p className="text-center text-xs text-gray-400">
              © {new Date().getFullYear()} AECMI — Panel de Administración. Todos los derechos reservados.
            </p>
          </footer>
        </main>
      </div>

      <ConfirmModal open={confirmOpen} title={confirmConfig.title} message={confirmConfig.message} variant={confirmConfig.variant} onConfirm={() => { confirmConfig.onConfirm(); setConfirmOpen(false); }} onCancel={() => setConfirmOpen(false)} />
      <DetailModal open={detailOpen} title={detailTitle} onClose={() => setDetailOpen(false)}>{detailContent}</DetailModal>
    </div>
  )
}
