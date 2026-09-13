import { Note } from '../types'
import { useAppDispatch } from '@/app/hooks'
import { updateNoteContent, updateNoteTitle } from '../notesSlice'
import { TipTapEditor } from './TiptapEditor'

interface NoteEditorProps {
  activeNote: Note
}

export const NoteEditor = ({ activeNote }: NoteEditorProps) => {
  const dispatch = useAppDispatch()

  const handleContentChange = (html: string) => {
    dispatch(updateNoteContent({ id: activeNote.id, content: html }))
  }

  return (
    <div className="flex flex-col h-full max-w-4xl w-full mx-auto p-8 gap-4">
      <input
        type="text"
        value={activeNote.title}
        placeholder="Tiêu đề ghi chú..."
        onChange={(e) => dispatch(updateNoteTitle({ id: activeNote.id, title: e.target.value }))}
        className="w-full text-3xl font-bold border-none outline-none placeholder:text-neutral-300 bg-transparent"
      />
      <div className="text-sm text-neutral-400 flex items-center gap-2 border-b border-neutral-200 pb-2">
        <span>Tạo lúc: {new Date(activeNote.createdAt).toLocaleDateString('vi-VN')}</span>
        <span>Cập nhật: {new Date(activeNote.updatedAt).toLocaleDateString('vi-VN')}</span>
      </div>

      <TipTapEditor
        key={activeNote.id}
        content={activeNote.content}
        onContentChange={handleContentChange}
      />
    </div>
  )
}
