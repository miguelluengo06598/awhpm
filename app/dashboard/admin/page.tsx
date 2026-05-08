'use client'

import { useEffect, useState } from 'react'
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
  Search,
  BarChart3,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCheck,
  Reply,
  MapPin,
  Video,
} from 'lucide-react'
import Link from 'next/link'
import AdminSidebar from '@/components/dashboard/AdminSidebar'
import StatCard from '@/components/dashboard/StatCard'
import DataTable from '@/components/dashboard/DataTable'
import ConfirmModal from '@/components/dashboard/ConfirmModal'
import DetailModal from '@/components/dashboard/DetailModal'
import StatusBadge from '@/components/dashboard/StatusBadge'

// ═══════════════════════════════════════════════
// DATOS SIMULADOS
// ═══════════════════════════════════════════════

const SOLICITUDES = [
  { id: 'SOL-2025-004', usuario: 'María González', email: 'maria.g@email.com', certificacion: 'BIM Design Manager', fecha: '2025-04-22', estado: 'Pending' },
  { id: 'SOL-2025-005', usuario: 'Carlos Ruiz', email: 'carlos.r@email.com', certificacion: 'Information Delivery Manager', fecha: '2025-04-21', estado: 'In Review' },
  { id: 'SOL-2025-006', usuario: 'Ana López', email: 'ana.lopez@email.com', certificacion: 'BIM Construction Manager', fecha: '2025-04-20', estado: 'Pending' },
  { id: 'SOL-2025-007', usuario: 'Pedro Martínez', email: 'pedro.m@email.com', certificacion: 'BIM Design Manager', fecha: '2025-04-18', estado: 'In Review' },
  { id: 'SOL-2025-008', usuario: 'Laura Sánchez', email: 'laura.s@email.com', certificacion: 'Information Delivery Manager', fecha: '2025-04-15', estado: 'Pending' },
  { id: 'SOL-2025-009', usuario: 'Juan Herrera', email: 'juan.h@email.com', certificacion: 'BIM Construction Manager', fecha: '2025-04-10', estado: 'Exam Scheduled' },
  { id: 'SOL-2025-010', usuario: 'Sofía Torres', email: 'sofia.t@email.com', certificacion: 'BIM Design Manager', fecha: '2025-04-05', estado: 'Pending' },
]

const USUARIOS = [
  { id: 1, nombre: 'Miguel Luengo', email: 'miguel@aecmi.com', rol: 'admin', fechaRegistro: '2024-01-10', activo: true },
  { id: 2, nombre: 'María González', email: 'maria.g@email.com', rol: 'client', fechaRegistro: '2025-04-22', activo: true },
  { id: 3, nombre: 'Carlos Ruiz', email: 'carlos.r@email.com', rol: 'client', fechaRegistro: '2025-04-21', activo: true },
  { id: 4, nombre: 'Ana López', email: 'ana.lopez@email.com', rol: 'client', fechaRegistro: '2025-04-20', activo: true },
  { id: 5, nombre: 'Pedro Martínez', email: 'pedro.m@email.com', rol: 'staff', fechaRegistro: '2025-03-15', activo: true },
  { id: 6, nombre: 'Laura Sánchez', email: 'laura.s@email.com', rol: 'client', fechaRegistro: '2025-04-15', activo: false },
  { id: 7, nombre: 'Juan Herrera', email: 'juan.h@email.com', rol: 'client', fechaRegistro: '2025-04-10', activo: true },
]

const PAGOS = [
  { id: 'INV-2025-004', usuario: 'María González', email: 'maria.g@email.com', concepto: 'BIM Design Manager', monto: '€450.00', estado: 'Pendiente', metodo: '—' },
  { id: 'INV-2025-005', usuario: 'Carlos Ruiz', email: 'carlos.r@email.com', concepto: 'Information Delivery Manager', monto: '€450.00', estado: 'Pendiente', metodo: '—' },
  { id: 'INV-2025-006', usuario: 'Ana López', email: 'ana.lopez@email.com', concepto: 'BIM Construction Manager', monto: '€450.00', estado: 'Pendiente', metodo: '—' },
  { id: 'INV-2025-007', usuario: 'Juan Herrera', email: 'juan.h@email.com', concepto: 'BIM Construction Manager', monto: '€450.00', estado: 'Pagado', metodo: 'Tarjeta' },
  { id: 'INV-2025-008', usuario: 'Laura Sánchez', email: 'laura.s@email.com', concepto: 'Information Delivery Manager', monto: '€450.00', estado: 'Fallido', metodo: 'Transferencia' },
]

const MENSAJES = [
  { id: 1, nombre: 'Carlos Ruiz', email: 'carlos.r@email.com', asunto: 'Información sobre certificaciones', fecha: '2025-04-22', estado: 'Nuevo' },
  { id: 2, nombre: 'María González', email: 'maria.g@email.com', asunto: 'Solicitud de formación', fecha: '2025-04-21', estado: 'Nuevo' },
  { id: 3, nombre: 'Empresa XYZ', email: 'contacto@xyz.com', asunto: 'Colaboración institucional', fecha: '2025-04-20', estado: 'Leído' },
  { id: 4, nombre: 'Ana López', email: 'ana.lopez@email.com', asunto: 'Acreditación académica', fecha: '2025-04-18', estado: 'Respondido' },
  { id: 5, nombre: 'Pedro Martínez', email: 'pedro.m@email.com', asunto: 'Eventos', fecha: '2025-04-15', estado: 'Leído' },
  { id: 6, nombre: 'Laura Sánchez', email: 'laura.s@email.com', asunto: 'Otro', fecha: '2025-04-10', estado: 'Nuevo' },
]

const EXAMENES = [
  { id: 1, usuario: 'Carlos Ruiz', email: 'carlos.r@email.com', certificacion: 'Information Delivery Manager', fecha: '2025-04-28', hora: '10:00 CET', modalidad: 'Online', estado: 'Confirmado' },
  { id: 2, usuario: 'María González', email: 'maria.g@email.com', certificacion: 'BIM Design Manager', fecha: '2025-04-30', hora: '14:00 CET', modalidad: 'Presencial', estado: 'Pendiente' },
  { id: 3, usuario: 'Juan Herrera', email: 'juan.h@email.com', certificacion: 'BIM Construction Manager', fecha: '2025-05-02', hora: '09:30 CET', modalidad: 'Online', estado: 'Confirmado' },
  { id: 4, usuario: 'Ana López', email: 'ana.lopez@email.com', certificacion: 'BIM Construction Manager', fecha: '2025-05-05', hora: '11:00 CET', modalidad: 'Presencial', estado: 'Pendiente' },
]

// ═══════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════
export default function AdminDashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState('Admin')
  const [loading, setLoading] = useState(true)

  // Modales
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmConfig, setConfirmConfig] = useState({ title: '', message: '', onConfirm: () => {} })
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailTitle, setDetailTitle] = useState('')
  const [detailContent, setDetailContent] = useState<React.ReactNode>(null)

  useEffect(() => {
    const session = localStorage.getItem('aecmi_session') || sessionStorage.getItem('aecmi_session')
    if (!session) {
      router.replace('/auth/signin')
      return
    }
    try {
      const data = JSON.parse(session)
      if (data.role !== 'admin') {
        router.replace('/dashboard/client')
        return
      }
      setUserName(data.name || 'Admin')
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

  const openConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmConfig({ title, message, onConfirm })
    setConfirmOpen(true)
  }

  const openDetail = (title: string, content: React.ReactNode) => {
    setDetailTitle(title)
    setDetailContent(content)
    setDetailOpen(true)
  }

  const mensajesNuevos = MENSAJES.filter((m) => m.estado === 'Nuevo').length

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-pmi-blue/20 border-t-pmi-blue rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1 min-w-0">
        {/* ─── HEADER ─── */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-pmi-dark hidden sm:block">Panel de Administración AECMI</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Bienvenido, {userName}</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Notificaciones */}
              <button className="relative w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center transition-colors border border-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
                {mensajesNuevos > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {mensajesNuevos}
                  </span>
                )}
              </button>

              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 font-medium px-3 py-2 rounded-xl hover:bg-red-50 transition-colors border border-red-100"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          {/* Saludo mobile */}
          <div className="sm:hidden">
            <h1 className="text-xl font-bold text-pmi-dark">Panel de Administración</h1>
            <p className="text-sm text-gray-500">Bienvenido, {userName}</p>
          </div>

          {/* ═══════════════════════════════════════════════
              ESTADÍSTICAS
          ═══════════════════════════════════════════════ */}
          <section>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard
                title="Total Solicitudes"
                value={SOLICITUDES.length}
                icon={FileText}
                trend={12}
                subtitle="Este mes"
                color="blue"
                delay={0}
              />
              <StatCard
                title="Solicitudes Pendientes"
                value={SOLICITUDES.filter((s) => s.estado === 'Pending').length}
                icon={Clock}
                trend={-5}
                subtitle="Requieren acción"
                color="orange"
                delay={0.1}
              />
              <StatCard
                title="Certificaciones Otorgadas"
                value={124}
                icon={Award}
                trend={8}
                subtitle="Acumulado total"
                color="green"
                delay={0.2}
              />
              <StatCard
                title="Ingresos"
                value="€18.450"
                icon={CreditCard}
                trend={15}
                subtitle="Pagos completados"
                color="purple"
                delay={0.3}
              />
            </div>
          </section>


          {/* ═══════════════════════════════════════════════
              SOLICITUDES PENDIENTES
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
              data={SOLICITUDES}
              searchKeys={['usuario', 'email', 'certificacion']}
              filterOptions={[
                { key: 'certificacion', label: 'Certificación', options: ['BIM Design Manager', 'Information Delivery Manager', 'BIM Construction Manager'] },
                { key: 'estado', label: 'Estado', options: ['Pending', 'In Review', 'Exam Scheduled'] },
              ]}
              itemsPerPage={5}
              columns={[
                { key: 'id', header: 'ID', width: '100px' },
                {
                  key: 'usuario',
                  header: 'Usuario',
                  render: (item) => (
                    <div>
                      <div className="font-medium text-pmi-dark">{item.usuario}</div>
                      <div className="text-xs text-gray-400">{item.email}</div>
                    </div>
                  ),
                },
                { key: 'certificacion', header: 'Certificación' },
                { key: 'fecha', header: 'Fecha', width: '110px' },
                {
                  key: 'estado',
                  header: 'Estado',
                  render: (item) => <StatusBadge status={item.estado} />,
                },
              ]}
              actions={(item) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      openDetail(
                        `Solicitud ${item.id}`,
                        <div className="space-y-4 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Usuario</span><span className="font-medium">{item.usuario}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Email</span><span className="font-medium">{item.email}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Certificación</span><span className="font-medium">{item.certificacion}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Fecha</span><span className="font-medium">{item.fecha}</span></div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs mb-1">Estado</span><StatusBadge status={item.estado} /></div>
                          <div className="flex gap-3 pt-2">
                            <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium">
                              <CheckCircle2 className="w-4 h-4" /> Aprobar
                            </button>
                            <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium">
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
                  <button
                    onClick={() =>
                      openConfirm(
                        'Aprobar solicitud',
                        `¿Estás seguro de que deseas aprobar la solicitud de ${item.usuario}?`,
                        () => setConfirmOpen(false)
                      )
                    }
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Aprobar"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      openConfirm(
                        'Rechazar solicitud',
                        `¿Estás seguro de que deseas rechazar la solicitud de ${item.usuario}?`,
                        () => setConfirmOpen(false)
                      )
                    }
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Rechazar"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              )}
            />
          </section>

          {/* ═══════════════════════════════════════════════
              GESTIÓN DE USUARIOS
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
                <Plus className="w-4 h-4" />
                Añadir usuario
              </button>
            </div>

            <DataTable
              data={USUARIOS}
              searchKeys={['nombre', 'email']}
              filterOptions={[
                { key: 'rol', label: 'Rol', options: ['admin', 'client', 'staff'] },
              ]}
              itemsPerPage={5}
              columns={[
                {
                  key: 'nombre',
                  header: 'Usuario',
                  render: (item) => (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-pmi-cream rounded-full flex items-center justify-center text-sm font-bold text-pmi-dark">
                        {item.nombre.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-pmi-dark">{item.nombre}</div>
                        <div className="text-xs text-gray-400">{item.email}</div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: 'rol',
                  header: 'Rol',
                  render: (item) => (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        item.rol === 'admin'
                          ? 'bg-red-100 text-red-800 border-red-200'
                          : item.rol === 'staff'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      }`}
                    >
                      {item.rol}
                    </span>
                  ),
                },
                { key: 'fechaRegistro', header: 'Registro', width: '110px' },
                {
                  key: 'activo',
                  header: 'Estado',
                  render: (item) => (
                    <span className={`text-xs font-medium ${item.activo ? 'text-green-600' : 'text-gray-400'}`}>
                      {item.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  ),
                },
              ]}
              actions={(item) => (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      openDetail(
                        `Perfil de ${item.nombre}`,
                        <div className="space-y-4 text-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 bg-pmi-cream rounded-full flex items-center justify-center text-xl font-bold text-pmi-dark">
                              {item.nombre.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-pmi-dark text-base">{item.nombre}</div>
                              <div className="text-gray-500">{item.email}</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Rol</span><span className="font-medium capitalize">{item.rol}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Registro</span><span className="font-medium">{item.fechaRegistro}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Estado</span><span className={`font-medium ${item.activo ? 'text-green-600' : 'text-gray-400'}`}>{item.activo ? 'Activo' : 'Inactivo'}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">ID</span><span className="font-medium font-mono">{item.id}</span></div>
                          </div>
                        </div>
                      )
                    }
                    className="p-2 text-pmi-blue hover:bg-pmi-blue/10 rounded-lg transition-colors"
                    title="Ver perfil"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Editar">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      openConfirm(
                        item.activo ? 'Desactivar usuario' : 'Activar usuario',
                        `¿Estás seguro de que deseas ${item.activo ? 'desactivar' : 'activar'} a ${item.nombre}?`,
                        () => setConfirmOpen(false)
                      )
                    }
                    className={`p-2 rounded-lg transition-colors ${item.activo ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                    title={item.activo ? 'Desactivar' : 'Activar'}
                  >
                    {item.activo ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  </button>
                </div>
              )}
            />
          </section>


          {/* ═══════════════════════════════════════════════
              PAGOS PENDIENTES
          ═══════════════════════════════════════════════ */}
          <section id="pagos">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl flex items-center justify-center shadow-sm">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-pmi-dark">Pagos Pendientes</h2>
                <p className="text-xs text-gray-500">Gestiona pagos y facturación</p>
              </div>
            </div>

            <DataTable
              data={PAGOS}
              searchKeys={['usuario', 'email', 'concepto']}
              filterOptions={[
                { key: 'estado', label: 'Estado', options: ['Pendiente', 'Pagado', 'Fallido'] },
              ]}
              itemsPerPage={5}
              columns={[
                {
                  key: 'usuario',
                  header: 'Usuario',
                  render: (item) => (
                    <div>
                      <div className="font-medium text-pmi-dark">{item.usuario}</div>
                      <div className="text-xs text-gray-400">{item.email}</div>
                    </div>
                  ),
                },
                { key: 'concepto', header: 'Certificación' },
                { key: 'monto', header: 'Monto', render: (item) => <span className="font-semibold text-pmi-dark">{item.monto}</span> },
                {
                  key: 'estado',
                  header: 'Estado',
                  render: (item) => <StatusBadge status={item.estado} />,
                },
                { key: 'metodo', header: 'Método', render: (item) => <span className="text-gray-500">{item.metodo}</span> },
              ]}
              actions={(item) => (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      openDetail(
                        `Pago ${item.id}`,
                        <div className="space-y-4 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Usuario</span><span className="font-medium">{item.usuario}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Email</span><span className="font-medium">{item.email}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Concepto</span><span className="font-medium">{item.concepto}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Monto</span><span className="font-semibold">{item.monto}</span></div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                            <span className="text-gray-500 text-xs">Estado</span>
                            <StatusBadge status={item.estado} />
                          </div>
                        </div>
                      )
                    }
                    className="p-2 text-pmi-blue hover:bg-pmi-blue/10 rounded-lg transition-colors"
                    title="Ver detalles"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {item.estado === 'Pendiente' && (
                    <button
                      onClick={() =>
                        openConfirm(
                          'Marcar como pagado',
                          `¿Confirmas que ${item.usuario} ha realizado el pago de ${item.monto}?`,
                          () => setConfirmOpen(false)
                        )
                      }
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Marcar como pagado"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
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
                {mensajesNuevos > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {mensajesNuevos}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold text-pmi-dark">Contactos / Mensajes</h2>
                <p className="text-xs text-gray-500">Mensajes recibidos desde el formulario de contacto</p>
              </div>
            </div>

            <DataTable
              data={MENSAJES}
              searchKeys={['nombre', 'email', 'asunto']}
              filterOptions={[
                { key: 'estado', label: 'Estado', options: ['Nuevo', 'Leído', 'Respondido'] },
              ]}
              itemsPerPage={5}
              columns={[
                {
                  key: 'nombre',
                  header: 'De',
                  render: (item) => (
                    <div>
                      <div className="font-medium text-pmi-dark">{item.nombre}</div>
                      <div className="text-xs text-gray-400">{item.email}</div>
                    </div>
                  ),
                },
                { key: 'asunto', header: 'Asunto' },
                { key: 'fecha', header: 'Fecha', width: '100px' },
                {
                  key: 'estado',
                  header: 'Estado',
                  render: (item) => (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        item.estado === 'Nuevo'
                          ? 'bg-red-100 text-red-800 border-red-200'
                          : item.estado === 'Leído'
                          ? 'bg-gray-100 text-gray-800 border-gray-200'
                          : 'bg-green-100 text-green-800 border-green-200'
                      }`}
                    >
                      {item.estado}
                    </span>
                  ),
                },
              ]}
              actions={(item) => (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      openDetail(
                        item.asunto,
                        <div className="space-y-4 text-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-pmi-cream rounded-full flex items-center justify-center font-bold text-pmi-dark">
                              {item.nombre.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-pmi-dark">{item.nombre}</div>
                              <div className="text-gray-500">{item.email}</div>
                            </div>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-xl">
                            <div className="text-xs text-gray-500 mb-1">Asunto</div>
                            <div className="font-medium">{item.asunto}</div>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-xl">
                            <div className="text-xs text-gray-500 mb-1">Mensaje</div>
                            <p className="text-gray-700 leading-relaxed">
                              Este es un mensaje de ejemplo recibido desde el formulario de contacto de AECMI. En la integración con Supabase, aquí se mostrará el contenido real del mensaje.
                            </p>
                          </div>
                          <div className="flex gap-3 pt-2">
                            <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-pmi-dark text-white rounded-xl hover:bg-pmi-blue transition-colors font-medium text-sm">
                              <Reply className="w-4 h-4" /> Responder
                            </button>
                            <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm">
                              <CheckCheck className="w-4 h-4" /> Marcar leído
                            </button>
                          </div>
                        </div>
                      )
                    }
                    className="p-2 text-pmi-blue hover:bg-pmi-blue/10 rounded-lg transition-colors"
                    title="Ver mensaje"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              )}
            />
          </section>

          {/* ═══════════════════════════════════════════════
              EXÁMENES PROGRAMADOS
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
              data={EXAMENES}
              searchKeys={['usuario', 'email', 'certificacion']}
              filterOptions={[
                { key: 'modalidad', label: 'Modalidad', options: ['Online', 'Presencial'] },
                { key: 'estado', label: 'Estado', options: ['Confirmado', 'Pendiente'] },
              ]}
              itemsPerPage={5}
              columns={[
                {
                  key: 'usuario',
                  header: 'Candidato',
                  render: (item) => (
                    <div>
                      <div className="font-medium text-pmi-dark">{item.usuario}</div>
                      <div className="text-xs text-gray-400">{item.email}</div>
                    </div>
                  ),
                },
                { key: 'certificacion', header: 'Certificación' },
                { key: 'fecha', header: 'Fecha', width: '100px' },
                { key: 'hora', header: 'Hora', width: '90px' },
                {
                  key: 'modalidad',
                  header: 'Modalidad',
                  render: (item) => (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                      {item.modalidad === 'Online' ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                      {item.modalidad}
                    </span>
                  ),
                },
                {
                  key: 'estado',
                  header: 'Estado',
                  render: (item) => <StatusBadge status={item.estado} />,
                },
              ]}
              actions={(item) => (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      openDetail(
                        `Examen — ${item.certificacion}`,
                        <div className="space-y-4 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Candidato</span><span className="font-medium">{item.usuario}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Email</span><span className="font-medium">{item.email}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Certificación</span><span className="font-medium">{item.certificacion}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Fecha y hora</span><span className="font-medium">{item.fecha} — {item.hora}</span></div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Modalidad</span><span className="font-medium">{item.modalidad}</span></div>
                            <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500 block text-xs">Estado</span><StatusBadge status={item.estado} /></div>
                          </div>
                          <div className="flex gap-3 pt-2">
                            <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-pmi-dark text-white rounded-xl hover:bg-pmi-blue transition-colors font-medium text-sm">
                              <Edit3 className="w-4 h-4" /> Reprogramar
                            </button>
                            <button
                              onClick={() => {
                                setDetailOpen(false)
                                openConfirm(
                                  'Cancelar examen',
                                  `¿Estás seguro de cancelar el examen de ${item.usuario}?`,
                                  () => setConfirmOpen(false)
                                )
                              }}
                              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors font-medium text-sm"
                            >
                              <XCircle className="w-4 h-4" /> Cancelar
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
                {
                  title: 'Reporte de Solicitudes',
                  desc: 'Todas las solicitudes del período seleccionado con estados y filtros.',
                  icon: FileText,
                  color: 'from-blue-500 to-cyan-400',
                },
                {
                  title: 'Reporte de Certificaciones',
                  desc: 'Certificaciones otorgadas, vencidas y próximas a renovar.',
                  icon: Award,
                  color: 'from-emerald-500 to-green-400',
                },
                {
                  title: 'Reporte de Ingresos',
                  desc: 'Pagos recibidos, pendientes y facturación mensual.',
                  icon: CreditCard,
                  color: 'from-violet-500 to-purple-400',
                },
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
                    <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors">
                      <Download className="w-4 h-4" /> PDF
                    </button>
                    <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-pmi-dark text-sm font-medium rounded-xl border border-gray-200 hover:border-pmi-blue hover:text-pmi-blue transition-colors">
                      <Download className="w-4 h-4" /> Excel
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-6 pb-2 border-t border-gray-200">
            <p className="text-center text-xs text-gray-400">
              © {new Date().getFullYear()} AECMI — Panel de Administración. Todos los derechos reservados.
            </p>
          </footer>
        </main>
      </div>

      {/* Modales globales */}
      <ConfirmModal
        open={confirmOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        onConfirm={() => {
          confirmConfig.onConfirm()
          setConfirmOpen(false)
        }}
        onCancel={() => setConfirmOpen(false)}
      />
      <DetailModal open={detailOpen} title={detailTitle} onClose={() => setDetailOpen(false)}>
        {detailContent}
      </DetailModal>
    </div>
  )
}
