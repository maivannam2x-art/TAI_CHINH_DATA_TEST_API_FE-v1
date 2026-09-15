import { CheckCircle2, ClipboardCheck, Database, Network, ShieldCheck, Sparkles } from 'lucide-react'
import { useState } from 'react'

const sections = [
  {
    icon: Network,
    title: 'API connectivity / Kết nối API',
    items: [
      ['API-01', 'Health endpoint trả HTTP 200 và status UP.'],
      ['API-02', 'FE hiển thị lỗi rõ khi ngrok/backend đang tắt.'],
      ['API-03', 'Request GET/POST/PATCH giữ đúng path và JSON body.'],
      ['API-04', 'Không log token, mật khẩu hoặc raw body nhạy cảm.'],
    ],
  },
  {
    icon: Database,
    title: 'Data pipeline / Luồng dữ liệu',
    items: [
      ['DATA-01', 'Fetch thành công mới tạo raw_payload bất biến.'],
      ['DATA-02', 'Critical validation fail không tạo clean data version.'],
      ['DATA-03', 'Retry cùng payload không sinh duplicate ngoài ý muốn.'],
      ['DATA-04', 'Có thể truy từ report/prediction về source và raw.'],
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Quality & security / Chất lượng và bảo mật',
    items: [
      ['SEC-01', 'Request headers lưu audit đã mask Authorization/API key.'],
      ['SEC-02', 'Raw payload body chỉ hiện khi diagnostics được bật.'],
      ['SEC-03', 'Quarantine record không xuất hiện trong clean view.'],
      ['SEC-04', 'Account chỉ giữ password hash, không giữ plaintext.'],
    ],
  },
  {
    icon: Sparkles,
    title: 'AI readiness / Sẵn sàng cho AI',
    items: [
      ['AI-01', 'Prediction giữ model, feature, dataset và data version.'],
      ['AI-02', 'Temporal split không để dữ liệu tương lai lọt vào train.'],
      ['AI-03', 'Thiếu dữ liệu phải trả reject reason thay vì đoán.'],
      ['AI-04', 'LLM analysis chỉ dùng clean context có provenance.'],
    ],
  },
]

export function ChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const total = sections.reduce((sum, section) => sum + section.items.length, 0)
  const completed = Object.values(checked).filter(Boolean).length
  return <div className="page-stack">
    <section className="checklist-hero"><div><span className="eyebrow">ACCEPTANCE CHECKLIST / DANH SÁCH NGHIỆM THU</span><h2>Kịch bản để BA kiểm tra luồng chính và các điểm kiểm soát.</h2><p>Trạng thái đánh dấu chỉ tồn tại trong phiên trình duyệt hiện tại, không gửi lên server.</p></div><div className="completion-ring" style={{ '--progress': `${(completed / total) * 360}deg` } as React.CSSProperties}><span><strong>{completed}</strong>/{total}</span></div></section>
    <div className="checklist-grid">{sections.map(({ icon: Icon, title, items }) => <section className="panel checklist-section" key={title}><div className="checklist-title"><span><Icon size={19} /></span><h3>{title}</h3></div><div className="check-items">{items.map(([id, label]) => <label key={id} className={checked[id] ? 'checked' : ''}><input type="checkbox" checked={Boolean(checked[id])} onChange={(event) => setChecked((current) => ({ ...current, [id]: event.target.checked }))} /><span className="custom-check">{checked[id] ? <CheckCircle2 size={19} /> : null}</span><code>{id}</code><span>{label}</span></label>)}</div></section>)}</div>
    <section className="handoff-note"><ClipboardCheck size={22} /><div><strong>Definition of Done / Điều kiện hoàn tất</strong><p>Không còn lỗi blocker, API contract được BA xác nhận, dữ liệu có provenance/version, và các failure state được hiển thị rõ thay vì im lặng fallback.</p></div></section>
  </div>
}
