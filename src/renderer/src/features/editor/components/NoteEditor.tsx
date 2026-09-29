import { useEffect, useRef } from 'react'
import { useAppDispatch } from '@/app/hooks'
import {
  updateNoteContent,
  updateNoteCover,
  updateNoteIcon,
  updateNoteTitle
} from '../../../shared/note/notesSlice'
import { Note } from '../../../shared/note/types'
import { NoteProperties } from './NoteProperties'
import { IconPicker } from './IconPicker'
import { TipTapEditor } from './TiptapEditor'
import { CoverBanner } from './CoverBanner'

interface NoteEditorProps {
  activeNote: Note
}

export const NoteEditor = ({ activeNote }: NoteEditorProps) => {
  const dispatch = useAppDispatch()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleContentChange = (html: string) => {
    dispatch(updateNoteContent({ id: activeNote.id, content: html }))
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [activeNote.title, activeNote.id])

  return (
    <div className="flex flex-col h-full max-w-4xl w-full mx-auto p-8 pt-2 gap-3">
      {activeNote.coverUrl && (
        <CoverBanner
          currentCover={activeNote.coverUrl}
          onSelectCover={(coverUrl) => dispatch(updateNoteCover({ id: activeNote.id, coverUrl }))}
          onRemoveCover={() => dispatch(updateNoteCover({ id: activeNote.id, coverUrl: '' }))}
        />
      )}

      <div className={`flex items-center gap-2 ${activeNote.coverUrl ? '-mt-10 z-10 pl-2' : ''}`}>
        <IconPicker
          currentIcon={activeNote.icon || ''}
          onSelectIcon={(icon) => dispatch(updateNoteIcon({ id: activeNote.id, icon }))}
          onRemoveIcon={() => dispatch(updateNoteIcon({ id: activeNote.id, icon: '' }))}
        />

        {!activeNote.coverUrl && (
          <CoverBanner
            currentCover=""
            onSelectCover={(coverUrl) => dispatch(updateNoteCover({ id: activeNote.id, coverUrl }))}
            onRemoveCover={() => dispatch(updateNoteCover({ id: activeNote.id, coverUrl: '' }))}
          />
        )}
      </div>

      <textarea
        ref={textareaRef}
        rows={1}
        value={activeNote.title}
        placeholder="Tiêu đề ghi chú..."
        onChange={(e) => dispatch(updateNoteTitle({ id: activeNote.id, title: e.target.value }))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }}
        className="w-full text-3xl font-bold tracking-tight border-none outline-none placeholder:text-neutral-300 bg-transparent resize-none overflow-hidden leading-tight"
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
