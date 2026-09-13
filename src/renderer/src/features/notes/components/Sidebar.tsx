import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { createNote, deleteNote, selectNote } from '../notesSlice'
import { FileText, Plus, Trash2 } from 'lucide-react'

export const Sidebar = () => {
  const dispatch = useAppDispatch()

  const notes = useAppSelector((state) => state.notes.notes)
  const activeNoteId = useAppSelector((state) => state.notes.activeNoteId)

  const noteList = Object.values(notes)

  const handleDelete = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation()
    dispatch(deleteNote(noteId))
  }
  return (
    <aside className="flex h-full w-64 flex-col border-r border-neutral-200 bg-neutral-50 select-none">
      <div className="p-3 border-b border-neutral-200">
        <button
          onClick={() => dispatch(createNote(''))}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors duration-150"
        >
          <Plus className="w-4 h-4" />
          <span>Ghi chú mới</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {noteList.length === 0 ? (
          <div className="p-4 text-center text-xs text-neutral-400">
            Chưa có ghi chú nào. Bấm nút phía trên để tạo mới.
          </div>
        ) : (
          noteList.map((note) => {
            const isActive = note.id === activeNoteId
            return (
              <div
                key={note.id}
                onClick={() => dispatch(selectNote(note.id))}
                className={`group flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${isActive ? 'bg-blue-100 text-blue-900 font-medium' : 'text-neutral-700 hover:bg-neutral-200/70'}`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileText
                    className={`h-4 w-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-neutral-500'}`}
                  />
                  <span className="truncate">{note.title || 'Untitled Note'}</span>
                </div>
                <button
                  title="Xóa ghi chú"
                  onClick={(e) => {
                    handleDelete(e, note.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-red-600  rounded transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )
          })
        )}
      </div>
    </aside>
  )
}
