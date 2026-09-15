import {
  Activity,
  BookOpenCheck,
  Braces,
  Building2,
  ChevronLeft,
  Database,
  ClipboardCheck,
  FileChartColumnIncreasing,
  Menu,
  ServerCog,
  Settings2,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import type { DataMode, PageId } from '../types'

const navigation: { id: PageId; label: string; eyebrow: string; icon: typeof Activity }[] = [
  { id: 'overview', label: 'Tổng quan', eyebrow: 'Dashboard', icon: FileChartColumnIncreasing },
  { id: 'project', label: 'Đọc dự án', eyebrow: 'Business flow', icon: Building2 },
  { id: 'explorer', label: 'Dữ liệu', eyebrow: 'Data explorer', icon: Database },
  { id: 'catalog', label: 'Từ điển DB', eyebrow: '43 bảng', icon: Braces },
  { id: 'api', label: 'API Playground', eyebrow: 'Thử endpoint', icon: ServerCog },
  { id: 'database', label: 'Sơ đồ database', eyebrow: 'Zoom & PDF', icon: Activity },
  { id: 'checklist', label: 'Kịch bản test', eyebrow: 'BA checklist', icon: ClipboardCheck },
]

interface LayoutProps {
  activePage: PageId
  onPageChange: (page: PageId) => void
  dataMode: DataMode
  onDataModeChange: (mode: DataMode) => void
  apiBase: string
  onApiBaseChange: (value: string) => void
  children: React.ReactNode
}

export function Layout({ activePage, onPageChange, dataMode, onDataModeChange, apiBase, onApiBaseChange, children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activePage])

  function selectPage(page: PageId) {
    setMobileOpen(false)
    onPageChange(page)
  }

  const current = navigation.find((item) => item.id === activePage) ?? navigation[0]

  return (
    <div className="app-shell">
      <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Mở menu"><Menu size={20} /></button>
      <aside className={`sidebar ${mobileOpen ? 'is-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><span>F</span></div>
          <div><strong>FinScope</strong><small>Data Console</small></div>
          <button className="sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Đóng menu"><X size={18} /></button>
        </div>
        <div className="workspace-pill"><span className="live-dot" /> BA TEST WORKSPACE <small>V1.0</small></div>
        <nav aria-label="Điều hướng chính">
          {navigation.map(({ id, label, eyebrow, icon: Icon }) => (
            <button key={id} className={activePage === id ? 'nav-item active' : 'nav-item'} onClick={() => selectPage(id)}>
              <Icon size={19} strokeWidth={1.9} />
              <span><small>{eyebrow}</small>{label}</span>
              {activePage === id ? <ChevronLeft className="active-chevron" size={15} /> : null}
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <BookOpenCheck size={18} />
          <div><strong>Nguồn thiết kế</strong><span>Báo cáo 77 trang và ERD PostgreSQL mới nhất.</span></div>
        </div>
        <div className="sidebar-footer"><span>LOCAL FIRST</span><small>Không lưu token hoặc nội dung chat</small></div>
      </aside>
      {mobileOpen ? <button className="sidebar-backdrop" onClick={() => setMobileOpen(false)} aria-label="Đóng menu" /> : null}
      <main className="main-panel">
        <header className="topbar">
          <div><span className="breadcrumb">FINANCIAL DATA / {current.eyebrow.toUpperCase()}</span><h1>{current.label}</h1></div>
          <div className="topbar-actions">
            <div className="mode-switch" role="group" aria-label="Chế độ dữ liệu">
              <button className={dataMode === 'demo' ? 'active' : ''} onClick={() => onDataModeChange('demo')}>Dữ liệu mẫu</button>
              <button className={dataMode === 'live' ? 'active' : ''} onClick={() => onDataModeChange('live')}><span className="live-dot" /> API trực tiếp</button>
            </div>
            <button className="icon-button" onClick={() => setSettingsOpen(true)} aria-label="Cấu hình API"><Settings2 size={19} /></button>
          </div>
        </header>
        <div className="page-content">{children}</div>
      </main>
      {settingsOpen ? (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSettingsOpen(false)}>
          <section className="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-heading"><div><span className="eyebrow">Kết nối dữ liệu</span><h2 id="settings-title">Cấu hình backend</h2></div><button className="icon-button" onClick={() => setSettingsOpen(false)} aria-label="Đóng"><X size={18} /></button></div>
            <label className="form-field"><span>API base URL</span><input value={apiBase} onChange={(event) => onApiBaseChange(event.target.value)} placeholder="http://localhost:8080" /></label>
            <p className="privacy-note">Chỉ URL này được lưu trong trình duyệt. Không lưu token, mật khẩu, nội dung chat hoặc request body.</p>
            <div className="modal-actions"><button className="secondary-button" onClick={() => onApiBaseChange('http://localhost:8080')}>Dùng local</button><button className="primary-button" onClick={() => setSettingsOpen(false)}>Lưu cấu hình</button></div>
          </section>
        </div>
      ) : null}
    </div>
  )
}
