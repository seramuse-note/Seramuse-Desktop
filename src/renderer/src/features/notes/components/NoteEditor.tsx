import { Note } from '../types'
import { useAppDispatch } from '@/app/hooks'
import { updateNoteContent, updateNoteIcon, updateNoteTitle } from '../notesSlice'
import { TipTapEditor } from './TiptapEditor'
import { NoteProperties } from './NoteProperties'
import { IconPicker } from './IconPicker'

interface NoteEditorProps {
  activeNote: Note
}

export const NoteEditor = ({ activeNote }: NoteEditorProps) => {
  const dispatch = useAppDispatch()

  const handleContentChange = (html: string) => {
    dispatch(updateNoteContent({ id: activeNote.id, content: html }))
  }

  return (
    <div className="flex flex-col h-full max-w-4xl w-full mx-auto p-8 gap-3">
      <IconPicker
        currentIcon={activeNote.icon || ''}
        onSelectIcon={(icon) => dispatch(updateNoteIcon({ id: activeNote.id, icon }))}
        onRemoveIcon={() => dispatch(updateNoteIcon({ id: activeNote.id, icon: '' }))}
      />
      <input
        type="text"
        value={activeNote.title}
        placeholder="Tiêu đề ghi chú..."
        onChange={(e) => dispatch(updateNoteTitle({ id: activeNote.id, title: e.target.value }))}
        className="w-full text-3xl font-bold border-none outline-none placeholder:text-neutral-300 bg-transparent"
      />
      <NoteProperties note={activeNote} />

      <TipTapEditor
        key={activeNote.id}
        content={activeNote.content}
        onContentChange={handleContentChange}
      />
    </div>
  )
}
