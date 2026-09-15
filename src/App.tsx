import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { ApiLabPage } from './pages/ApiLabPage'
import { ChecklistPage } from './pages/ChecklistPage'
import { DataCatalogPage } from './pages/DataCatalogPage'
import { DatabasePage } from './pages/DatabasePage'
import { DataExplorerPage } from './pages/DataExplorerPage'
import { OverviewPage } from './pages/OverviewPage'
import { ProjectPage } from './pages/ProjectPage'
import type { DataMode, PageId } from './types'

const DEFAULT_API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://hardened-taekwondo-likewise.ngrok-free.dev'

function getPageFromHash(): PageId {
  const value = window.location.hash.replace('#/', '') as PageId
  return ['overview', 'project', 'explorer', 'catalog', 'api', 'database', 'checklist'].includes(value) ? value : 'overview'
}

function App() {
  const [activePage, setActivePage] = useState<PageId>(getPageFromHash)
  const [dataMode, setDataMode] = useState<DataMode>('demo')
  const [apiBase, setApiBase] = useState(() => window.localStorage.getItem('finscope-api-base') || DEFAULT_API_BASE)

  useEffect(() => {
    const onHashChange = () => setActivePage(getPageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function navigate(page: PageId) {
    window.location.hash = `/${page}`
    setActivePage(page)
  }

  function updateApiBase(value: string) {
    setApiBase(value)
    window.localStorage.setItem('finscope-api-base', value)
  }

  let page: React.ReactNode
  switch (activePage) {
    case 'project': page = <ProjectPage />; break
    case 'explorer': page = <DataExplorerPage apiBase={apiBase} dataMode={dataMode} />; break
    case 'catalog': page = <DataCatalogPage />; break
    case 'api': page = <ApiLabPage apiBase={apiBase} />; break
    case 'database': page = <DatabasePage />; break
    case 'checklist': page = <ChecklistPage />; break
    default: page = <OverviewPage apiBase={apiBase} dataMode={dataMode} onNavigate={navigate} />
  }

  return <Layout activePage={activePage} onPageChange={navigate} dataMode={dataMode} onDataModeChange={setDataMode} apiBase={apiBase} onApiBaseChange={updateApiBase}>{page}</Layout>
}

export default App
