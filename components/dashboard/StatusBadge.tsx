'use client'

const STATUS_STYLES: Record<string, string> = {
  // Solicitudes de certificación
  Pending: 'bg-gray-100 text-gray-700 border-gray-200',
  'In Review': 'bg-blue-100 text-blue-800 border-blue-200',
  Approved: 'bg-green-100 text-green-800 border-green-200',
  Rejected: 'bg-red-100 text-red-800 border-red-200',
  'Exam Scheduled': 'bg-orange-100 text-orange-800 border-orange-200',
  'Exam Passed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Certified: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  // Certificaciones activas
  Activa: 'bg-green-100 text-green-800 border-green-200',
  'Por Renovar': 'bg-orange-100 text-orange-800 border-orange-200',
  Vencida: 'bg-red-100 text-red-800 border-red-200',
  // Pagos
  Pagado: 'bg-green-100 text-green-800 border-green-200',
  Pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Fallido: 'bg-red-100 text-red-800 border-red-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  failed: 'bg-red-100 text-red-800 border-red-200',
  // Contactos
  Nuevo: 'bg-red-100 text-red-800 border-red-200',
  Leído: 'bg-gray-100 text-gray-800 border-gray-200',
  Respondido: 'bg-green-100 text-green-800 border-green-200',
  // Exámenes
  Confirmado: 'bg-green-100 text-green-800 border-green-200',
  // Genéricos
  new: 'bg-red-100 text-red-800 border-red-200',
  read: 'bg-gray-100 text-gray-800 border-gray-200',
  responded: 'bg-green-100 text-green-800 border-green-200',
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] || 'bg-gray-100 text-gray-800 border-gray-200'

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style} ${className}`}
    >
      {status}
    </span>
  )
}
