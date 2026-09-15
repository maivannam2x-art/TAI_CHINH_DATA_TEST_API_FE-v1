import { ArrowRight, Bot, BrainCircuit, DatabaseZap, LockKeyhole, Search, Settings, UserRound } from 'lucide-react'

const zones = [
  ['01', 'Auth & User', 'Xác thực và người dùng', '8 bảng', '#dceaf5'],
  ['02', 'Company & Security Master', 'Danh mục doanh nghiệp và chứng khoán', '3 bảng', '#fff1d8'],
  ['03', 'Source, Ingestion & Raw', 'Nguồn, thu thập và dữ liệu thô', '4 bảng', '#dff2ef'],
  ['04', 'Version, Validation & Quarantine', 'Phiên bản, kiểm tra và cách ly', '4 bảng', '#fff0bd'],
  ['05', 'Financial Statements', 'Báo cáo tài chính', '3 bảng', '#f6dfdb'],
  ['06', 'Financial Metrics', 'Chỉ số tài chính', '2 bảng', '#f7e2e2'],
  ['07', 'Market Data', 'Dữ liệu thị trường', '4 bảng', '#e7d9ef'],
  ['08', 'Macro Data', 'Dữ liệu vĩ mô', '2 bảng', '#e0edf5'],
  ['09', 'News', 'Tin tức', '2 bảng', '#eadff0'],
  ['10', 'LLM Processing', 'Xử lý mô hình ngôn ngữ', '2 bảng', '#f0e2f2'],
  ['11', 'Feature, Dataset & Local AI', 'Đặc trưng, tập dữ liệu và AI cục bộ', '8 bảng', '#e4e7eb'],
  ['12', 'User-facing Analysis', 'Phân tích cho người dùng', '1 bảng', '#ddeded'],
]

const useCases = [
  ['UC-U01', 'Search company/security', 'Tìm doanh nghiệp/chứng khoán', 'MUST'],
  ['UC-U03', 'View statements & provenance', 'Xem BCTC và nguồn gốc', 'MUST'],
  ['UC-U05', 'View market history', 'Xem lịch sử giá và VNINDEX', 'MUST'],
  ['UC-U07', 'Grounded LLM analysis', 'Phân tích LLM có căn cứ', 'MUST'],
  ['UC-U08', 'Local AI prediction', 'Dự báo bằng AI cục bộ', 'MUST'],
  ['UC-U09', 'Compare companies', 'So sánh doanh nghiệp', 'SHOULD'],
  ['UC-A03', 'Monitor & retry ingestion', 'Theo dõi và chạy lại thu thập', 'MUST'],
  ['UC-A04', 'Review quality & quarantine', 'Kiểm tra chất lượng và cách ly', 'MUST'],
]

export function ProjectPage() {
  return <div className="page-stack">
    <section className="intro-banner"><div><span className="eyebrow">PROJECT BRIEF / TÓM TẮT DỰ ÁN</span><h2>Hệ thống dữ liệu tài chính có truy vết, kiểm soát chất lượng và sẵn sàng cho AI.</h2></div><p>Mục tiêu là hợp nhất dữ liệu phân tán thành PostgreSQL canonical có raw snapshot, validation, versioning và lineage rõ ràng. LLM chỉ nhận context sạch; Local AI chỉ dự báo khi đủ điều kiện.</p></section>

    <section className="journey-grid">
      <article className="journey-card user"><div className="journey-icon"><UserRound /></div><span className="eyebrow">USER FLOW / LUỒNG NGƯỜI DÙNG</span><h3>Tra cứu đến phân tích</h3><div className="mini-flow"><span><Search size={16} /> Search / Tìm kiếm</span><ArrowRight size={15} /><span><DatabaseZap size={16} /> Financial Data / Dữ liệu tài chính</span><ArrowRight size={15} /><span><BrainCircuit size={16} /> AI Analysis / Phân tích AI</span></div></article>
      <article className="journey-card admin"><div className="journey-icon"><Settings /></div><span className="eyebrow">ADMIN FLOW / LUỒNG QUẢN TRỊ</span><h3>Thu thập đến kiểm soát</h3><div className="mini-flow"><span><LockKeyhole size={16} /> Login / Đăng nhập</span><ArrowRight size={15} /><span><DatabaseZap size={16} /> Ingestion / Thu thập</span><ArrowRight size={15} /><span><Bot size={16} /> Model Ops / Vận hành mô hình</span></div></article>
    </section>

    <section className="panel">
      <div className="panel-heading"><div><span className="eyebrow">DATABASE ORGANIZATION / TỔ CHỨC CƠ SỞ DỮ LIỆU</span><h3>12 khu chức năng theo Physical ERD</h3></div><span className="soft-tag">43 tables</span></div>
      <div className="zone-grid">{zones.map(([no, en, vi, count, color]) => <article className="zone-card" key={no} style={{ '--zone-color': color } as React.CSSProperties}><span className="zone-number">{no}</span><div><strong>{en}</strong><span>{vi}</span><small>{count}</small></div></article>)}</div>
    </section>

    <section className="panel">
      <div className="panel-heading"><div><span className="eyebrow">PRIORITY USE CASES / CA SỬ DỤNG ƯU TIÊN</span><h3>Phạm vi BA cần xác nhận</h3></div></div>
      <div className="usecase-list">{useCases.map(([id, en, vi, priority]) => <div className="usecase-row" key={id}><code>{id}</code><div><strong>{en}</strong><span>{vi}</span></div><span className={`priority ${priority.toLowerCase()}`}>{priority}</span></div>)}</div>
    </section>
  </div>
}
