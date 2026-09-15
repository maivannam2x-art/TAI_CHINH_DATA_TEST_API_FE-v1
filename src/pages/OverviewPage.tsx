import { ArrowRight, CheckCircle2, CircleAlert, Database, Gauge, Layers3, Network, RefreshCw, ShieldCheck } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { demoCollections } from '../data/demo'
import { requestApi } from '../lib/api'
import type { DataMode, PageId } from '../types'
import { DataTable } from '../components/DataTable'

const pipeline = [
  ['External Source', 'Nguồn bên ngoài'],
  ['Raw Snapshot', 'Bản chụp dữ liệu thô'],
  ['Validation', 'Kiểm tra chất lượng'],
  ['Clean & Versioned', 'Dữ liệu sạch có phiên bản'],
  ['Reporting & AI', 'Báo cáo và trí tuệ nhân tạo'],
]

const coverage = [
  { label: 'Market Data / Dữ liệu thị trường', value: 92, color: '#17a079' },
  { label: 'Financial Statements / Báo cáo tài chính', value: 84, color: '#5474d8' },
  { label: 'News / Tin tức', value: 76, color: '#da8756' },
  { label: 'Macro Data / Dữ liệu vĩ mô', value: 68, color: '#8b68cc' },
]

interface OverviewProps { apiBase: string; dataMode: DataMode; onNavigate: (page: PageId) => void }

export function OverviewPage({ apiBase, dataMode, onNavigate }: OverviewProps) {
  const [health, setHealth] = useState<'idle' | 'loading' | 'up' | 'down'>('idle')
  const [lastChecked, setLastChecked] = useState('Dữ liệu mẫu / Demo data')

  const checkHealth = useCallback(async () => {
    if (dataMode === 'demo') {
      setHealth('up')
      setLastChecked('Mô phỏng thành công / Demo healthy')
      return
    }
    setHealth('loading')
    try {
      const result = await requestApi(apiBase, '/api/health')
      setHealth(result.ok ? 'up' : 'down')
      setLastChecked(`${result.status} · ${result.durationMs} ms`)
    } catch (error) {
      setHealth('down')
      setLastChecked(error instanceof Error ? error.message : 'Không thể kết nối')
    }
  }, [apiBase, dataMode])

  useEffect(() => {
    const timer = window.setTimeout(() => { void checkHealth() }, 0)
    return () => window.clearTimeout(timer)
  }, [checkHealth])

  return (
    <div className="page-stack">
      <section className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">BA CONTROL CENTER / TRUNG TÂM KIỂM THỬ</span>
          <h2>Một nơi để đọc dự án, xem dữ liệu và thử toàn bộ API tài chính.</h2>
          <p>Giao diện được tổ chức theo 12 khu trong PostgreSQL ERD, giữ rõ provenance, freshness, validation và version trước khi dữ liệu đi vào báo cáo hoặc AI.</p>
          <div className="hero-actions"><button className="primary-button" onClick={() => onNavigate('explorer')}>Xem dữ liệu <ArrowRight size={17} /></button><button className="secondary-button" onClick={() => onNavigate('api')}>Mở API Playground</button></div>
        </div>
        <div className="health-panel">
          <div className="health-orbit"><Gauge size={34} /><span className={health === 'up' ? 'orbit-dot up' : health === 'loading' ? 'orbit-dot loading' : 'orbit-dot'} /></div>
          <span className="eyebrow">SYSTEM HEALTH / SỨC KHỎE HỆ THỐNG</span>
          <strong>{health === 'up' ? 'Operational' : health === 'loading' ? 'Checking...' : 'Needs attention'}</strong>
          <small>{lastChecked}</small>
          <button className="text-button" onClick={() => void checkHealth()}><RefreshCw size={15} /> Kiểm tra lại / Recheck</button>
        </div>
      </section>

      <section className="kpi-grid">
        <article className="kpi-card"><Database size={20} /><div><strong>43</strong><span>Tables / Bảng dữ liệu</span></div><small>Đủ field, type, constraint và mô tả</small></article>
        <article className="kpi-card"><Layers3 size={20} /><div><strong>12</strong><span>Data zones / Khu dữ liệu</span></div><small>Tổ chức đúng theo ERD vật lý</small></article>
        <article className="kpi-card"><Network size={20} /><div><strong>19</strong><span>API scenarios / Kịch bản API</span></div><small>GET, POST, PUT và PATCH</small></article>
        <article className="kpi-card"><ShieldCheck size={20} /><div><strong>3</strong><span>Quality gates / Cổng chất lượng</span></div><small>Raw → Validation → Clean version</small></article>
      </section>

      <section className="content-grid two-thirds">
        <article className="panel pipeline-panel">
          <div className="panel-heading"><div><span className="eyebrow">DATA FLOW / LUỒNG DỮ LIỆU</span><h3>Đường đi của một bản ghi</h3></div><span className="soft-tag">End-to-end</span></div>
          <div className="pipeline">
            {pipeline.map(([english, vietnamese], index) => <div className="pipeline-step" key={english}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{english}</strong><small>{vietnamese}</small></div>{index < pipeline.length - 1 ? <ArrowRight size={17} /> : null}</div>)}
          </div>
          <div className="control-note"><CheckCircle2 size={19} /><p><strong>Nguyên tắc kiểm soát:</strong> dữ liệu lỗi không ghi đè dữ liệu tốt; validation critical fail phải dừng trước khi tạo phiên bản clean hợp lệ.</p></div>
        </article>
        <article className="panel coverage-panel">
          <div className="panel-heading"><div><span className="eyebrow">TEST COVERAGE / PHẠM VI KIỂM THỬ</span><h3>Mức sẵn sàng demo</h3></div></div>
          <div className="coverage-list">{coverage.map((item) => <div className="coverage-row" key={item.label}><div><span>{item.label}</span><strong>{item.value}%</strong></div><div className="progress"><span style={{ width: `${item.value}%`, background: item.color }} /></div></div>)}</div>
          <p className="muted-caption"><CircleAlert size={15} /> Tỷ lệ này mô tả phạm vi dữ liệu mẫu của FE, không phải SLA production.</p>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading"><div><span className="eyebrow">LATEST INGESTIONS / LẦN THU THẬP GẦN NHẤT</span><h3>BA có thể kiểm tra trạng thái và số lượng bản ghi</h3></div><button className="text-button" onClick={() => onNavigate('explorer')}>Mở Data Explorer <ArrowRight size={15} /></button></div>
        <DataTable rows={demoCollections.ingestions} />
      </section>
    </div>
  )
}
