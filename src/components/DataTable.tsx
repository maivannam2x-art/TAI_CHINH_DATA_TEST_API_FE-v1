import { StatusBadge } from './StatusBadge'

const STATUS_KEY = /(status|active|quality|severity|listed)/i

function prettify(value: string) {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2').replaceAll('_', ' ')
}

function formatValue(value: unknown, key: string) {
  if (STATUS_KEY.test(key) || typeof value === 'boolean') return <StatusBadge value={value} />
  if (typeof value === 'number') return new Intl.NumberFormat('vi-VN').format(value)
  if (value && typeof value === 'object') return <code className="inline-json">{JSON.stringify(value)}</code>
  return String(value ?? '—')
}

export function DataTable({ rows, emptyMessage = 'Chưa có dữ liệu.' }: { rows: Record<string, unknown>[]; emptyMessage?: string }) {
  if (!rows.length) return <div className="empty-state">{emptyMessage}</div>
  const columns = Array.from(new Set(rows.flatMap((row) => Object.keys(row)))).slice(0, 9)
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead><tr>{columns.map((column) => <th key={column}>{prettify(column)}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={`${rowIndex}-${String(row.id ?? row.code ?? row.symbol ?? '')}`}>{columns.map((column) => <td key={column}>{formatValue(row[column], column)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}
