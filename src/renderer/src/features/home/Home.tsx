import { useAppSelector } from '@/app/hooks'
import { Sidebar } from '../notes/components/Sidebar'
import { NoteEditor } from '../notes/components/NoteEditor'

export const Home = () => {
  const activeNoteId = useAppSelector((state) => state.notes.activeNoteId)
  const activeNote = useAppSelector((state) =>
    activeNoteId ? state.notes.notes[activeNoteId] : null
  )
  return (
    <div className="flex h-full  w-full overflow-hidden bg-white">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {activeNote ? (
          <NoteEditor activeNote={activeNote} />
        ) : (
          <div className="flex flex-1 flex-col  items-center justify-center text-neutral-400 text-sm">
            <p className="text-center">
              Chọn một ghi chú ở danh sách bên trái hoặc tạo ghi chú mới.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
