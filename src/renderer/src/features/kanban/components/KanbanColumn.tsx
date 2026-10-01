import { useAppDispatch } from '@/app/hooks'
import { Circle, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { NoteStatus, Note } from '@/shared/note/types'
import { createNote, reOrderNote } from '@/shared/note/notesSlice'
import { KanbanCard } from './KanbanCard'
import { useTranslation } from '@/shared/hooks'

interface KanbanColumnProps {
  status: NoteStatus
  label: string
  icon: typeof Circle
  notes: Note[]
  headerColor: string
  badgeBg: string
}

export const KanbanColumn = ({
  status,
  label,
  icon: Icon,
  notes,
  headerColor,
  badgeBg
}: KanbanColumnProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [isOver, setIsOver] = useState(false)

  const sortedNotes = [...notes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const handleCreateNoteInColumn = () => {
    dispatch(createNote({ status }))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (!isOver) setIsOver(true)
  }

  const handleDragLeave = () => {
    if (isOver) setIsOver(false)
  }

  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault()
    setIsOver(false)
    const noteId = e.dataTransfer.getData('text/plain')
    if (noteId) {
      dispatch(reOrderNote({ draggedId: noteId, targetStatus: status }))
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col w-72 shrink-0 rounded-xl border p-3 max-h-full transition-all duration-200 ${
        isOver
          ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-500/20 shadow-md'
          : 'border-neutral-200/80 bg-neutral-100/70 shadow-none'
      }`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-xs font-semibold ${headerColor} ${badgeBg}`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </span>
          <span className="text-xs text-neutral-400 font-medium">{notes.length}</span>
        </div>

        <button
          type="button"
          onClick={handleCreateNoteInColumn}
          className="p-1 text-neutral-400 hover:text-blue-600 hover:bg-neutral-200/80 rounded transition-colors cursor-pointer"
          title={t('Add note to column', { column: label })}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
        {sortedNotes.length === 0 ? (
          <div className="p-6 text-center text-xs text-neutral-400 italic border border-dashed border-neutral-200 rounded-lg">
            {t('No notes yet')}
          </div>
        ) : (
          sortedNotes.map((note) => <KanbanCard key={note.id} note={note} />)
        )}
      </div>
    </div>
  )
}
