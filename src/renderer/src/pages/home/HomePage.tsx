import { useEffect, useState } from 'react'
import { ChevronRight, Folder, PanelLeft } from 'lucide-react'
import { useAppSelector } from '@/app/hooks'
import { ViewMode } from '@/shared/note/types'
import { Sidebar } from '@/features/home/components'
import { KanbanView } from '@/features/kanban/components'
import { GraphView } from '@/features/graph/components'
import { NoteEditor } from '@/features/editor/components'
import { useAutoSave, useTranslation } from '@/shared/hooks'
import { WelcomeDashboard } from '@/features/home/components/WelcomeDashboard'

export const HomePage = () => {
  const { t } = useTranslation()
  useAutoSave()

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const activeNote = useAppSelector((state) =>
    state.notes.activeNoteId ? state.notes.notes[state.notes.activeNoteId] : null
  )

  const folders = useAppSelector((state) => state.notes.folders)
  const activeView = useAppSelector((state) => state.notes.activeView)
  const parentFolder = activeNote?.folderId ? folders[activeNote.folderId] : null

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '\\') {
        e.preventDefault()
        setIsSidebarOpen((prev) => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="flex h-full w-full overflow-hidden bg-white">
      {isSidebarOpen && <Sidebar />}

      <main className="flex-1 flex flex-col overflow-hidden">
        <header
          className="h-11 border-b border-neutral-200/80 px-4 flex items-center
        justify-between shrink-0 bg-white select-none"
        >
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              title={isSidebarOpen ? t('Collapse Sidebar (Ctrl+\\)') : t('Expand Sidebar (Ctrl+\\)')}
              className="p-1.5 text-neutral-500 hover:text-neutral-800
             hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              {activeView === ViewMode.KANBAN ? (
                <span className="font-medium text-neutral-700">{t('Kanban')}</span>
              ) : activeView === ViewMode.GRAPH ? (
                <span className="font-medium text-neutral-700">{t('Graph')}</span>
              ) : activeNote ? (
                <>
                  {parentFolder && (
                    <>
                      <div className="flex items-center gap-1 text-neutral-500">
                        <Folder className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{parentFolder.name}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                    </>
                  )}
                  <div className="flex items-center gap-1 font-medium text-neutral-800">
                    {activeNote.icon && <span>{activeNote.icon}</span>}
                    <span className="truncate max-w-[200px]">
                      {activeNote.title || t('Untitled Note')}
                    </span>
                  </div>
                </>
              ) : (
                <span>{t('No note selected')}</span>
              )}
            </div>{' '}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {activeView === ViewMode.KANBAN ? (
            <KanbanView />
          ) : activeView === ViewMode.GRAPH ? (
            <GraphView />
          ) : activeNote ? (
            <NoteEditor activeNote={activeNote} />
          ) : (
            <WelcomeDashboard />
          )}
        </div>
      </main>
    </div>
  )
}
