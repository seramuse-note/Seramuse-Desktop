import { Note } from '../types'
import { useAppDispatch } from '@/app/hooks'
import { updateNoteContent, updateNoteTitle } from '../notesSlice'

interface NoteEditorProps {
  activeNote: Note
}

export const NoteEditor = ({ activeNote }: NoteEditorProps) => {
  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-col h-full max-w-4xl w-full mx-auto p-8 gap-4">
      <input
        type="text"
        value={activeNote.title}
        placeholder="Tiêu đề ghi chú..."
        onChange={(e) => dispatch(updateNoteTitle({ id: activeNote.id, title: e.target.value }))}
        className="w-full text-3xl font-bold border-none outline-none text-neutral-800 placeholder:text-neutral-300 bg-transparent"
      />
      <div className="text-sm text-neutral-400 flex items-center gap-2 border-b border-neutral-200 pb-2">
        <span>Tạo lúc: {new Date(activeNote.createdAt).toLocaleDateString('vi-VN')}</span>
        <span>Cập nhật: {new Date(activeNote.updatedAt).toLocaleDateString('vi-VN')}</span>
      </div>

      <textarea
        value={activeNote.content}
        placeholder="Gõ nội dung ghi chú ở đây..."
        onChange={(e) =>
          dispatch(updateNoteContent({ id: activeNote.id, content: e.target.value }))
        }
        className="w-full flex-1 resize-none border-none outline-none text-neutral-700 leading-relaxed placeholder:text-neutral-300 bg-transparent text-base"
      />
    </div>
  )
}
