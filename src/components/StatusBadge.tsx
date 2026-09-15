const positive = new Set(['UP', 'SUCCESS', 'PASS', 'VALID', 'ACTIVE', 'LISTED', 'READY', 'TRUE'])
const warning = new Set(['RUNNING', 'PARTIAL_SUCCESS', 'WARNING', 'PENDING', 'REVIEW'])
const negative = new Set(['FAILED', 'FAIL', 'REJECTED', 'CRITICAL', 'LOCKED', 'FALSE'])

export function StatusBadge({ value }: { value: unknown }) {
  const label = String(value ?? '—')
  const key = label.toUpperCase()
  const tone = positive.has(key) ? 'positive' : warning.has(key) ? 'warning' : negative.has(key) ? 'negative' : 'neutral'
  return <span className={`status-badge ${tone}`}>{label}</span>
}
