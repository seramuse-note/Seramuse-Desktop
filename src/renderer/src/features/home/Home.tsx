import { useAppSelector } from '@/app/hooks'
import { Sidebar } from '../notes/components/Sidebar'
import { NoteEditor } from '../notes/components/NoteEditor'
import { ViewMode } from '../notes/types'
import { KanbanView } from '../notes/components/kanban/KanbanView'

export const Home = () => {
  const activeNoteId = useAppSelector((state) => state.notes.activeNoteId)
  const activeNote = useAppSelector((state) =>
    activeNoteId ? state.notes.notes[activeNoteId] : null
  )

  const activeView = useAppSelector((state) => state.notes.activeView)

  return (
    <div className="flex h-full w-full overflow-hidden bg-white">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {activeView === ViewMode.KANBAN ? (
            <KanbanView />
          ) : activeView === ViewMode.GRAPH ? (
            <div className="p-8 text-neutral-500 text-sm">Chỗ này chuẩn bị gắn Graph View</div>
          ) : activeNote ? (
            <NoteEditor activeNote={activeNote} />
          ) : (
            <div className="flex flex-1 flex-col  items-center justify-center text-neutral-400 text-sm h-full">
              <p className="text-center">
                Chọn một ghi chú ở danh sách bên trái hoặc tạo ghi chú mới.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
