import { Download, ExternalLink, FileImage, FileText, Maximize2, Minus, Plus, RotateCcw } from 'lucide-react'
import { useState } from 'react'

const legend = [
  ['01', 'Auth & User', 'Tài khoản, phân quyền, watchlist và audit.'],
  ['02', 'Company & Security Master', 'Doanh nghiệp canonical, ticker và alias.'],
  ['03', 'Source, Ingestion & Raw', 'Nguồn, job, run và raw snapshot.'],
  ['04', 'Version, Validation & Quarantine', 'Kiểm tra, phiên bản sạch và dữ liệu cách ly.'],
  ['05–08', 'Financial, Market & Macro Data', 'BCTC, metric, giá thị trường và vĩ mô.'],
  ['09–10', 'News & LLM Processing', 'Tin tức canonical và kết quả phân tích LLM.'],
  ['11', 'Feature, Dataset & Local AI', 'Feature, dataset, model, dự báo và outcome.'],
  ['12', 'User-facing Analysis', 'Báo cáo cuối cùng cho người dùng.'],
]

export function DatabasePage() {
  const [mode, setMode] = useState<'image' | 'pdf'>('image')
  const [zoom, setZoom] = useState(65)
  const updateZoom = (value: number) => setZoom(Math.min(200, Math.max(25, value)))

  function fullscreen() {
    const element = document.getElementById('database-viewer')
    if (element?.requestFullscreen) void element.requestFullscreen()
  }

  return <div className="page-stack">
    <section className="database-heading"><div><span className="eyebrow">PHYSICAL ERD / SƠ ĐỒ CƠ SỞ DỮ LIỆU VẬT LÝ</span><h2>PostgreSQL Financial AI Database</h2><p>Phóng to, thu nhỏ và cuộn để theo dõi quan hệ giữa 43 bảng. Dùng chế độ PDF để tìm kiếm và mở bằng trình đọc của trình duyệt.</p></div><div className="document-actions"><a className="secondary-button" href="/documents/database_latest.pdf" download><Download size={16} /> Tải PDF</a><a className="secondary-button" href="/documents/database_latest.pdf" target="_blank" rel="noreferrer"><ExternalLink size={16} /> Mở tab mới</a></div></section>
    <section className="viewer-shell" id="database-viewer">
      <div className="viewer-toolbar"><div className="viewer-tabs"><button className={mode === 'image' ? 'active' : ''} onClick={() => setMode('image')}><FileImage size={16} /> Image / Ảnh</button><button className={mode === 'pdf' ? 'active' : ''} onClick={() => setMode('pdf')}><FileText size={16} /> PDF viewer</button></div>{mode === 'image' ? <div className="zoom-controls"><button onClick={() => updateZoom(zoom - 10)} aria-label="Thu nhỏ"><Minus size={16} /></button><input type="range" min="25" max="200" value={zoom} onChange={(event) => updateZoom(Number(event.target.value))} aria-label="Mức thu phóng" /><span>{zoom}%</span><button onClick={() => updateZoom(zoom + 10)} aria-label="Phóng to"><Plus size={16} /></button><button onClick={() => setZoom(65)} aria-label="Đặt lại"><RotateCcw size={16} /></button><button onClick={fullscreen} aria-label="Toàn màn hình"><Maximize2 size={16} /></button></div> : null}</div>
      {mode === 'image' ? <div className="image-viewport"><img src="/documents/database_latest.png" alt="Sơ đồ quan hệ cơ sở dữ liệu PostgreSQL Financial AI gồm 12 khu chức năng" style={{ width: `${zoom}%` }} /></div> : <iframe className="pdf-viewer" title="Database physical ERD PDF" src="/documents/database_latest.pdf#toolbar=1&navpanes=0&view=FitH" />}
    </section>
    <section className="panel">
      <div className="panel-heading"><div><span className="eyebrow">ERD LEGEND / CHÚ GIẢI SƠ ĐỒ</span><h3>Ý nghĩa các khu dữ liệu</h3></div></div>
      <div className="legend-grid">{legend.map(([number, title, description]) => <article key={number}><span>{number}</span><div><strong>{title}</strong><p>{description}</p></div></article>)}</div>
      <p className="relation-note"><strong>Relationship notation / Ký hiệu quan hệ:</strong> PK = Primary Key / Khóa chính · FK = Foreign Key / Khóa ngoại · UQ = Unique / Duy nhất · NN = Not Null / Bắt buộc có giá trị.</p>
    </section>
  </div>
}
