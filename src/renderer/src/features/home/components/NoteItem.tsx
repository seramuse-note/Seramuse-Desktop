import { FileText, Trash2 } from 'lucide-react'
import { useAppDispatch } from '@/app/hooks'
import { Note } from '@/shared/note/types'
import { deleteNote, selectNote } from '@/shared/note/notesSlice'

interface NoteItemProps {
  note: Note
  activeNoteId: string | null
}

export const NoteItem = ({ note, activeNoteId }: NoteItemProps) => {
  const dispatch = useAppDispatch()
  const isActive = activeNoteId === note.id

  const handleDelete = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation()
    dispatch(deleteNote(noteId))
  }

  return (
    <div
      key={note.id}
      onClick={() => dispatch(selectNote(note.id))}
      className={`group  flex items-center justify-between gap-2 rounded-md px-3 py-1.5 text-xs cursor-pointer transition-colors
                  ${
                    isActive
                      ? 'bg-blue-100 text-blue-900 font-medium'
                      : 'text-neutral-700 hover:bg-neutral-200/70'
                  }
                `}
    >
      <div className="flex items-center gap-2 truncate">
        {note.icon ? (
          <span className="text-xs shrink-0 leading-none">{note.icon}</span>
        ) : (
          <FileText
            className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-neutral-500'}`}
          />
        )}
        <span className="truncate">{note.title || 'Untitled Note'}</span>
      </div>
      <button
        title="Xóa ghi chú"
        onClick={(e) => {
          handleDelete(e, note.id)
        }}
        className="p-1 opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-600 rounded hover:bg-neutral-200"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
