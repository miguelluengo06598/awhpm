'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react'

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  width?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  searchKeys?: string[]
  filterOptions?: { key: string; label: string; options: string[] }[]
  itemsPerPage?: number
  actions?: (item: T) => React.ReactNode
  mobileCard?: (item: T) => React.ReactNode
  emptyMessage?: string
}

export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchKeys = [],
  filterOptions = [],
  itemsPerPage = 5,
  actions,
  mobileCard,
  emptyMessage = 'No se encontraron registros',
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = [...data]

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((item) =>
        searchKeys.some((key) => {
          const val = String(item[key] ?? '').toLowerCase()
          return val.includes(q)
        })
      )
    }

    // Filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter((item) => String(item[key]) === value)
      }
    })

    return result
  }, [data, search, filters, searchKeys])

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  const start = (page - 1) * itemsPerPage
  const paginated = filtered.slice(start, start + itemsPerPage)

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {searchKeys.length > 0 && (
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Buscar..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pmi-blue focus:border-transparent bg-white"
            />
          </div>
        )}
        {filterOptions.map((opt) => (
          <div key={opt.key} className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filters[opt.key] || 'all'}
              onChange={(e) => updateFilter(opt.key, e.target.value)}
              className="pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pmi-blue focus:border-transparent bg-white appearance-none"
            >
              <option value="all">{opt.label}</option>
              {opt.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left font-semibold text-gray-700 px-5 py-3.5 whitespace-nowrap"
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {col.header}
                  </th>
                ))}
                {actions && <th className="text-right font-semibold text-gray-700 px-5 py-3.5">Acciones</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-5 py-10 text-center text-gray-400 text-sm"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginated.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-4 whitespace-nowrap">
                        {col.render ? col.render(item) : String(item[col.key] ?? '-')}
                      </td>
                    ))}
                    {actions && <td className="px-5 py-4 text-right">{actions(item)}</td>}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {paginated.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm">
            {emptyMessage}
          </div>
        ) : (
          paginated.map((item, idx) => (
            <div key={idx}>
              {mobileCard ? (
                mobileCard(item)
              ) : (
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                  {columns.map((col) => (
                    <div key={col.key} className="flex justify-between text-sm">
                      <span className="text-gray-500">{col.header}</span>
                      <span className="text-gray-900 font-medium">
                        {col.render ? col.render(item) : String(item[col.key] ?? '-')}
                      </span>
                    </div>
                  ))}
                  {actions && <div className="pt-2 border-t border-gray-100 flex justify-end">{actions(item)}</div>}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Mostrando {start + 1}-{Math.min(start + itemsPerPage, filtered.length)} de {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-700 font-medium min-w-[3rem] text-center">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
