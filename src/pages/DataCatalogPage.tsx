import { Braces, ChevronDown, ChevronRight, KeyRound, Link2, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import rawSchema from '../data/schema.json'
import type { SchemaTable } from '../types'

const schema = rawSchema as SchemaTable[]

export function DataCatalogPage() {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('Tất cả khu / All zones')
  const [expanded, setExpanded] = useState<string | null>('companies')
  const groups = useMemo(() => ['Tất cả khu / All zones', ...Array.from(new Set(schema.map((table) => table.group)))], [])
  const filtered = useMemo(() => {
    const needle = query.toLocaleLowerCase('vi').trim()
    return schema.filter((table) => {
      const groupMatches = group === groups[0] || table.group === group
      const text = `${table.name} ${table.group} ${table.purpose} ${table.fields.map((field) => `${field.name} ${field.description}`).join(' ')}`.toLocaleLowerCase('vi')
      return groupMatches && (!needle || text.includes(needle))
    })
  }, [group, groups, query])

  return <div className="page-stack">
    <section className="catalog-hero"><div><span className="eyebrow">DATA DICTIONARY / TỪ ĐIỂN DỮ LIỆU</span><h2>Ý nghĩa của 43 bảng và toàn bộ trường dữ liệu.</h2><p>Mỗi trường giữ nguyên tên kỹ thuật tiếng Anh, đi kèm kiểu dữ liệu, constraint và phần giải thích tiếng Việt lấy từ tài liệu database.</p></div><div className="catalog-stats"><div><strong>43</strong><span>Tables / Bảng</span></div><div><strong>{schema.reduce((sum, table) => sum + table.fields.length, 0)}</strong><span>Fields / Trường</span></div><div><strong>12</strong><span>Zones / Khu</span></div></div></section>
    <section className="catalog-controls"><label className="search-box large"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm bảng, trường hoặc ý nghĩa..." /></label><select value={group} onChange={(event) => setGroup(event.target.value)} aria-label="Lọc theo khu">{groups.map((item) => <option key={item}>{item}</option>)}</select></section>
    <div className="catalog-results"><span>{filtered.length} tables / bảng phù hợp</span><span><KeyRound size={14} /> PK = Primary Key / Khóa chính</span><span><Link2 size={14} /> FK = Foreign Key / Khóa ngoại</span></div>
    <section className="schema-list">{filtered.map((table) => {
      const isOpen = expanded === table.name
      return <article className={`schema-card ${isOpen ? 'open' : ''}`} key={table.name}>
        <button className="schema-summary" onClick={() => setExpanded(isOpen ? null : table.name)} aria-expanded={isOpen}>
          <span className="schema-icon"><Braces size={18} /></span><span className="schema-title"><small>{table.group}</small><strong>{table.name}</strong><span>{table.purpose}</span></span><span className="field-count">{table.fields.length} fields / trường</span>{isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
        {isOpen ? <div className="schema-detail"><div className="table-scroll"><table className="field-table"><thead><tr><th>Field name / Tên trường</th><th>Data type / Kiểu dữ liệu</th><th>Constraint / Ràng buộc</th><th>Description / Ý nghĩa</th></tr></thead><tbody>{table.fields.map((field) => <tr key={field.name}><td><code>{field.name}</code></td><td><span className="type-pill">{field.type}{field.length && field.length !== '-' && !field.type.includes(field.length) ? ` (${field.length})` : ''}</span></td><td>{field.constraint || '—'}</td><td>{field.description}</td></tr>)}</tbody></table></div></div> : null}
      </article>
    })}</section>
  </div>
}
