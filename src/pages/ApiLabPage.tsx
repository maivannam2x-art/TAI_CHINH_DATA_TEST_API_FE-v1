import { Check, ChevronDown, ChevronRight, Clipboard, LoaderCircle, Play, ServerOff } from 'lucide-react'
import { useMemo, useState } from 'react'
import { endpoints } from '../data/endpoints'
import { requestApi, type ApiResult } from '../lib/api'
import type { ApiEndpoint } from '../types'

const methodClass: Record<string, string> = { GET: 'get', POST: 'post', PUT: 'put', PATCH: 'patch', DELETE: 'delete' }

function EndpointRow({ endpoint, apiBase }: { endpoint: ApiEndpoint; apiBase: string }) {
  const [open, setOpen] = useState(false)
  const [path, setPath] = useState(endpoint.examplePath)
  const [body, setBody] = useState(endpoint.body ?? '')
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<ApiResult | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function run() {
    setRunning(true); setError(''); setResult(null)
    try {
      let parsedBody: string | undefined
      if (body.trim()) parsedBody = JSON.stringify(JSON.parse(body))
      const response = await requestApi(apiBase, path, { method: endpoint.method, body: parsedBody })
      setResult(response)
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Request thất bại') }
    finally { setRunning(false) }
  }

  async function copyResponse() {
    const value = result ? JSON.stringify(result.data, null, 2) : error
    await navigator.clipboard.writeText(value)
    setCopied(true); window.setTimeout(() => setCopied(false), 1500)
  }

  return <article className={`endpoint ${methodClass[endpoint.method]} ${open ? 'open' : ''}`}>
    <button className="endpoint-summary" onClick={() => setOpen((value) => !value)} aria-expanded={open}><span className="method">{endpoint.method}</span><code>{endpoint.path}</code><span className="endpoint-title">{endpoint.title}<small>{endpoint.description}</small></span>{open ? <ChevronDown size={20} /> : <ChevronRight size={20} />}</button>
    {open ? <div className="endpoint-body">
      <div className="endpoint-description"><strong>Purpose / Mục đích</strong><p>{endpoint.description}</p></div>
      <label className="form-field"><span>Request path / Đường dẫn gọi</span><input value={path} onChange={(event) => setPath(event.target.value)} /></label>
      {endpoint.body !== undefined ? <label className="form-field"><span>JSON body / Dữ liệu gửi</span><textarea value={body} onChange={(event) => setBody(event.target.value)} rows={8} spellCheck={false} /></label> : null}
      <div className="try-row"><button className="run-button" onClick={() => void run()} disabled={running}>{running ? <LoaderCircle className="spin" size={17} /> : <Play size={16} fill="currentColor" />} Execute / Gửi request</button><code className="base-url">{apiBase}</code></div>
      {error || result ? <div className={`response-box ${result?.ok ? 'success' : 'failure'}`}><div className="response-header"><span>{error ? <><ServerOff size={16} /> CONNECTION ERROR</> : <>{result?.status} {result?.statusText} · {result?.durationMs} ms</>}</span><button onClick={() => void copyResponse()}>{copied ? <Check size={15} /> : <Clipboard size={15} />} {copied ? 'Đã sao chép' : 'Copy'}</button></div><pre>{error || JSON.stringify(result?.data, null, 2)}</pre></div> : null}
    </div> : null}
  </article>
}

export function ApiLabPage({ apiBase }: { apiBase: string }) {
  const groups = useMemo(() => Array.from(new Set(endpoints.map((endpoint) => endpoint.group))), [])
  return <div className="page-stack">
    <section className="api-hero"><div><span className="eyebrow">API PLAYGROUND / KHU THỬ NGHIỆM API</span><h2>Financial Data & News API Console <span>v1.0</span></h2><p>Chọn một endpoint, sửa path hoặc request body rồi gửi trực tiếp sang backend. Cấu hình hiện tại dùng ngrok và vẫn được giữ nguyên khi server tạm tắt.</p></div><div className="openapi-chip"><strong>REST</strong><span>JSON · Spring Boot</span></div></section>
    <div className="api-base-banner"><span>BASE URL</span><code>{apiBase}</code><small>Không ghi cứng token hoặc khóa API / No secrets committed</small></div>
    {groups.map((group) => <section className="endpoint-group" key={group}><div className="endpoint-group-title"><h3>{group}</h3><span>{endpoints.filter((endpoint) => endpoint.group === group).length} endpoints</span></div><div className="endpoint-list">{endpoints.filter((endpoint) => endpoint.group === group).map((endpoint) => <EndpointRow key={endpoint.id} endpoint={endpoint} apiBase={apiBase} />)}</div></section>)}
  </div>
}
