export type PageId = 'overview' | 'project' | 'explorer' | 'catalog' | 'api' | 'database' | 'checklist'
export type DataMode = 'demo' | 'live'

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiEndpoint {
  id: string
  group: string
  method: ApiMethod
  path: string
  examplePath: string
  title: string
  description: string
  body?: string
}

export interface SchemaField {
  name: string
  type: string
  length: string
  constraint: string
  description: string
}

export interface SchemaTable {
  name: string
  group: string
  purpose: string
  fields: SchemaField[]
}
