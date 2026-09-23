import { useAppDispatch } from '@/app/hooks'
import { Note } from '../../types'
import { selectNote } from '../../notesSlice'
import { FileText, Calendar } from 'lucide-react'

interface KanbanCardProps {
  note: Note
}

export const KanbanCard = ({ note }: KanbanCardProps) => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(selectNote(note.id))
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', note.id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const safeTags = note.tags || []
  const visibleTags = safeTags.slice(0, 3)
  const remainingTagsCount = safeTags.length - visibleTags.length

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      className="group flex flex-col gap-2.5  rounded-lg border border-neutral-200/80 bg-white p-3 shadow-xs
      hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer select-none"
    >
      <div className="flex items-center gap-2">
        {note.icon ? (
          <span className="text-sm shrink-0 leading-none">{note.icon}</span>
        ) : (
          <FileText className="w-3.5 h-3.5 text-neutral-400 shrink-0 group-hover:text-blue-600 transition-colors" />
        )}
        <h4 className="text-xs font-semibold text-neutral-800 leading-snug line-clamp-2 overflow-hidden">
          {note.title.trim() || 'Untitled Note'}
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
            <span className="text-[10px] text-neutral-400 font-medium ">
              +{remainingTagsCount} {''}more
            </span>
          )}
        </div>
      )}
      <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[11px] text-neutral-400">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{new Date(note.updatedAt).toLocaleDateString('vi-VN')}</span>
        </div>
      </div>
    </div>
  )
}
