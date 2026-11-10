import { useState } from 'react'
import { ChevronDown, Circle, Plus, Tag, X } from 'lucide-react'
import { Note, NoteStatus } from '@/app/types'
import { useAppDispatch } from '@/app/hooks'
import { addNoteTag, removeNoteTag, updateNoteStatus } from '@/app/store/notesSlice'
import { useClickOutside } from '@/shared/hooks'
import { useTranslation } from '@/shared/hooks'

const STATUS_CONFIG: Record<
  NoteStatus,
  { labelKey: string; bg: string; text: string; icon: typeof Circle }
> = {
  [NoteStatus.TODO]: {
    labelKey: 'To Do',
    bg: 'bg-indigo-100/80',
    text: 'text-indigo-600',
    icon: Circle
  },
  [NoteStatus.IN_PROGRESS]: {
    labelKey: 'In Progress',
    bg: 'bg-orange-100/80',
    text: 'text-orange-600',
    icon: Circle
  },
  [NoteStatus.DONE]: {
    labelKey: 'Done',
    bg: 'bg-green-100/80',
    text: 'text-green-600',
    icon: Circle
  }
}

interface NotePropertiesProps {
  note: Note
}

export const NoteProperties = ({ note }: NotePropertiesProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const safeTags = note.tags || []
  const safeStatus = note.status || NoteStatus.TODO

  const currentStatus = STATUS_CONFIG[safeStatus] || STATUS_CONFIG[NoteStatus.TODO]
  const StatusIcon = currentStatus.icon

  const [isAddingTag, setIsAddingTag] = useState(false)
  const [tagInput, setTagInput] = useState('')

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsStatusDropdownOpen(false)
  })

  const handleStatusChange = (status: NoteStatus) => {
    dispatch(updateNoteStatus({ id: note.id, status }))
  }

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim()

    if (trimmedTag && !safeTags.includes(trimmedTag)) {
      dispatch(addNoteTag({ id: note.id, tag: trimmedTag }))
    }
    setTagInput('')
    setIsAddingTag(false)
  }

  const handleRemoveTag = (tagToRemove: string) => {
    dispatch(removeNoteTag({ id: note.id, tag: tagToRemove }))
  }

  return (
    <div className="flex flex-col gap-2 text-xs border-b border-neutral-100 pb-3">
      <div className="flex items-center gap-4 min-h-8">
        <div className="flex items-center gap-1.5 w-24 text-neutral-400 shrink-0 font-medium">
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{t('Status')}</span>
        </div>
        <div ref={dropdownRef} className="relative inline-flex items-center">
          <button
            type="button"
            onClick={() => setIsStatusDropdownOpen((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 cursor-pointer rounded-md border px-2.5 py-1 pr-6 font-medium text-xs outline-none transition-all duration-200 ease-in-out ${currentStatus.bg} ${currentStatus.text}`}
          >
            <span>{t(currentStatus.labelKey)}</span>
            <ChevronDown
              className={`w-3 h-3 absolute right-2 pointer-events-none text-current opacity-70 ${
                isStatusDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isStatusDropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-36 rounded-md border border-neutral-200 bg-white p-1 shadow-lg z-20 flex flex-col gap-0.5">
              <div className="px-2 py-1 text-[10px] font-semibold text-neutral-400 uppercase tracking-wide">
                {t('Update status')}
              </div>
              {Object.entries(STATUS_CONFIG).map(([key, value]) => {
                const isSelected = note.status === key
                const ItemIcon = value.icon
                return (
                  <button
                    key={key}
                    onClick={() => {
                      handleStatusChange(key as NoteStatus)
                      setIsStatusDropdownOpen((prev) => !prev)
                    }}
                    className={`flex items-center gap-2 w-full rounded-md px-2 py-1.5 text-xs text-left font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? `${value.bg} ${value.text}`
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <ItemIcon className="w-3.5 h-3.5" />
                    <span>{t(value.labelKey)}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start gap-4 min-h-8 pt-1.5">
        <div className="flex items-center gap-1.5 w-24 text-neutral-400 shrink-0 font-medium">
          <Tag className="w-3.5 h-3.5" /> <span>{t('Tags')}</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 max-h-20 overflow-y-auto pr-1 flex-1">
          {safeTags.map((tag) => (
            <span
              key={tag}
              className="group inline-flex items-center gap-1 rounded-md bg-neutral-100 border border-neutral-200 px-2 py-0.5 text-neutral-700 font-medium "
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                title={t('Remove tag')}
                className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          {isAddingTag ? (
            <input
              autoFocus
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onBlur={handleAddTag}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTag()
                if (e.key === 'Escape') {
                  setIsAddingTag(false)
                  setTagInput('')
                }
              }}
              placeholder={t('Press Enter to add tag')}
              className="rounded-md border border-neutral-400 px-2 py-0.5 text-xs outline-none bg-white text-neutral-800"
            />
          ) : (
            <button
              onClick={() => setIsAddingTag(true)}
              className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-all duration-300 ease-in-out cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t('Add tag')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
