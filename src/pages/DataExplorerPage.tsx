import { AlertTriangle, Database, RefreshCw, Search } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { DataTable } from '../components/DataTable'
import { demoCollections } from '../data/demo'
import { readCollection, requestApi } from '../lib/api'
import type { DataMode } from '../types'

type CollectionKey = keyof typeof demoCollections

const collections: { key: CollectionKey; en: string; vi: string; path: string }[] = [
  { key: 'companies', en: 'Companies', vi: 'Doanh nghiệp', path: '/api/companies' },
  { key: 'securities', en: 'Securities', vi: 'Chứng khoán', path: '/api/securities?activeOnly=true' },
  { key: 'sources', en: 'Data Sources', vi: 'Nguồn dữ liệu', path: '/api/data-sources' },
  { key: 'ingestions', en: 'Ingestion Runs', vi: 'Lịch sử thu thập', path: '/api/ingestions?limit=20' },
  { key: 'validations', en: 'Validation Results', vi: 'Kết quả kiểm tra', path: '/api/admin/validation/results?limit=50' },
]

export function DataExplorerPage({ apiBase, dataMode }: { apiBase: string; dataMode: DataMode }) {
  const [active, setActive] = useState<CollectionKey>('companies')
  const [rows, setRows] = useState<Record<string, unknown>[]>(demoCollections.companies)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const selected = collections.find((collection) => collection.key === active)!

  const load = useCallback(async () => {
    setError('')
    if (dataMode === 'demo') {
      setRows(demoCollections[active] as Record<string, unknown>[])
      return
    }
    setLoading(true)
    try {
      const result = await requestApi(apiBase, selected.path)
      if (!result.ok) throw new Error(`${result.status} ${result.statusText}`)
      setRows(readCollection(result.data))
    } catch (caught) {
      setRows([])
      setError(caught instanceof Error ? caught.message : 'Không thể tải dữ liệu')
    } finally { setLoading(false) }
  }, [active, apiBase, dataMode, selected.path])

  useEffect(() => {
    const timer = window.setTimeout(() => { void load() }, 0)
    return () => window.clearTimeout(timer)
  }, [load])

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('vi')
    return needle ? rows.filter((row) => JSON.stringify(row).toLocaleLowerCase('vi').includes(needle)) : rows
  }, [rows, query])

  return <div className="page-stack">
    <section className="explorer-header"><div><span className="eyebrow">DATA EXPLORER / TRÌNH DUYỆT DỮ LIỆU</span><h2>Kiểm tra dữ liệu nghiệp vụ theo từng nhóm API.</h2><p>Chuyển sang “API trực tiếp” ở góc trên để đọc dữ liệu backend. Chế độ mẫu luôn được gắn nhãn rõ ràng.</p></div><div className={`source-state ${dataMode}`}><Database size={19} /><div><strong>{dataMode === 'demo' ? 'Demo dataset' : 'Live API'}</strong><span>{dataMode === 'demo' ? 'Dữ liệu minh họa' : apiBase}</span></div></div></section>
    <section className="collection-tabs" aria-label="Nhóm dữ liệu">{collections.map((item) => <button key={item.key} className={active === item.key ? 'active' : ''} onClick={() => setActive(item.key)}><strong>{item.en}</strong><span>{item.vi}</span></button>)}</section>
    <section className="panel">
      <div className="data-toolbar"><div><span className="eyebrow">{selected.en.toUpperCase()} / {selected.vi.toUpperCase()}</span><h3>{loading ? 'Đang tải dữ liệu...' : `${filteredRows.length} bản ghi hiển thị`}</h3></div><div className="toolbar-actions"><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm trong dữ liệu..." /></label><button className="icon-button" onClick={() => void load()} aria-label="Tải lại"><RefreshCw size={18} /></button></div></div>
      {error ? <div className="error-banner"><AlertTriangle size={18} /><div><strong>Không đọc được API trực tiếp.</strong><span>{error}. Hãy kiểm tra backend, CORS hoặc URL cấu hình.</span></div></div> : null}
      <DataTable rows={filteredRows} emptyMessage={loading ? 'Đang chờ phản hồi...' : 'API chưa trả về bản ghi.'} />
    </section>
  </div>
}
