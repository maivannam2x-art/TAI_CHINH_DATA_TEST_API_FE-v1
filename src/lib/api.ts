export interface ApiResult {
  ok: boolean
  status: number
  statusText: string
  durationMs: number
  data: unknown
}

export function normalizeApiBase(value: string) {
  const trimmed = value.trim().replace(/\/$/, '')
  if (!trimmed) return ''
  const parsed = new URL(trimmed)
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('URL API phải dùng giao thức HTTP hoặc HTTPS.')
  }
  return trimmed
}

export async function requestApi(
  apiBase: string,
  path: string,
  init: RequestInit = {},
): Promise<ApiResult> {
  const normalizedBase = normalizeApiBase(apiBase)
  if (!normalizedBase) throw new Error('Chưa cấu hình URL backend.')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const startedAt = performance.now()
  const response = await fetch(`${normalizedBase}${normalizedPath}`, {
    ...init,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'ngrok-skip-browser-warning': 'true',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  })
  const text = await response.text()
  let data: unknown = text
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    // Preserve plain-text provider responses for the API playground.
  }
  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    durationMs: Math.round(performance.now() - startedAt),
    data,
  }
}

export function readCollection(data: unknown): Record<string, unknown>[] {
  if (Array.isArray(data)) return data as Record<string, unknown>[]
  if (data && typeof data === 'object') {
    const object = data as Record<string, unknown>
    for (const key of ['content', 'items', 'data', 'results']) {
      if (Array.isArray(object[key])) return object[key] as Record<string, unknown>[]
    }
  }
  return data && typeof data === 'object' ? [data as Record<string, unknown>] : []
}
