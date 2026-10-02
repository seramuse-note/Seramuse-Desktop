import { useAppDispatch } from '@/app/hooks'
import { reOrderNote, selectNote } from '@/shared/note/notesSlice'
import { Note } from '@/shared/note/types'
import { FileText, Calendar } from 'lucide-react'
import { useTranslation } from '@/shared/hooks'
import React, { useState } from 'react'

interface KanbanCardProps {
  note: Note
}

export const KanbanCard = ({ note }: KanbanCardProps) => {
  const { t, currentLanguage } = useTranslation()
  const dispatch = useAppDispatch()

  const safeTags = note.tags || []
  const visibleTags = safeTags.slice(0, 3)
  const remainingTagsCount = safeTags.length - visibleTags.length
  const dateLocale = currentLanguage === 'vi' ? 'vi-VN' : 'en-US'

  const [dropPosition, setDropPosition] = useState<'before' | 'after' | null>(null)

  const handleClick = () => {
    dispatch(selectNote(note.id))
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', note.id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleCardDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    e.dataTransfer.dropEffect = 'move'

    const react = e.currentTarget.getBoundingClientRect()
    const middleY = react.top + react.height / 2
    const position = e.clientY < middleY ? 'before' : 'after'

    if (dropPosition != position) {
      setDropPosition(position)
    }
  }

  const handleCardDragLeave = () => {
    setDropPosition(null)
  }

  const handleCardDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const draggedId = e.dataTransfer.getData('text/plain')

    if (draggedId && draggedId !== note.id && dropPosition) {
      dispatch(
        reOrderNote({
          draggedId,
          targetStatus: note.status,
          targetId: note.id,
          position: dropPosition
        })
      )
    }
    setDropPosition(null)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleCardDragOver}
      onDragLeave={handleCardDragLeave}
      onDrop={handleCardDrop}
      onClick={handleClick}
      className="group relative flex flex-col gap-2.5  rounded-lg border border-neutral-200/80 bg-white p-3 shadow-xs
      hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer select-none"
    >
      {dropPosition === 'before' && (
        <div className="absolute left-0 right-0 h-0.5 bg-blue-500 -top-0.5 pointer-events-none z-10"></div>
      )}
      {dropPosition === 'after' && (
        <div className="absolute left-0 right-0 h-0.5 bg-blue-500 -bottom-0.5 pointer-events-none z-10"></div>
      )}

      <div className="flex items-center gap-2">
        {note.icon ? (
          <span className="text-sm shrink-0 leading-none">{note.icon}</span>
        ) : (
          <FileText className="w-3.5 h-3.5 text-neutral-400 shrink-0 group-hover:text-blue-600 transition-colors" />
        )}
        <h4 className="text-xs font-semibold text-neutral-800 leading-snug line-clamp-2 overflow-hidden">
          {note.title.trim() || t('Untitled Note')}
        </h4>
      </div>
      {safeTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 shrink-0 p-0.5">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 border border-neutral-300 rounded text-neutral-600 text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
          {remainingTagsCount > 0 && (
            <span className="text-[10px] text-neutral-400 font-medium ">+{remainingTagsCount}</span>
          )}
        </div>
      )}
      <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[11px] text-neutral-400">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{new Date(note.updatedAt).toLocaleDateString(dateLocale)}</span>
        </div>
      </div>
    </div>
  )
}
