import { Folder, Note } from '@/app/store/types'
import {
  ChevronDown,
  ChevronRight,
  Folder as FolderIcon,
  FolderOpen,
  Plus,
  Trash2
} from 'lucide-react'
import { createNote, deleteFolder, toggleFolder, updateFolderName } from '@/app/store/notesSlice'
import { useAppDispatch } from '@/app/hooks'
import { useState } from 'react'
import { ConfirmModal } from '@/shared/components/ui/ConfirmModal'
import { NoteItem } from './NoteItem'
import { useTranslation } from '@/shared/hooks'

interface FolderItemProps {
  folder: Folder
  notes: Note[]
  activeNoteId: string | null
}

export const FolderItem = ({ folder, notes, activeNoteId }: FolderItemProps) => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [folderName, setFolderName] = useState(folder.name)
  const [isConfirmFolderOpen, setIsConfirmFolderOpen] = useState(false)

  const isOpenFolder = folder.isOpen
  const hasNotes = notes.length > 0
  const isEmptyFolder = notes.length === 0

  const handleRenameSubmit = () => {
    setIsEditing(false)
    if (folderName.trim() && folderName !== folder.name) {
      dispatch(updateFolderName({ id: folder.id, name: folderName.trim() }))
    } else {
      setFolderName(folder.name)
    }
  }

  const handleConfirmDeleteFolder = () => {
    dispatch(deleteFolder(folder.id))
    setIsConfirmFolderOpen(false)
  }
  return (
    <div className="flex flex-col">
      <div
        onClick={() => dispatch(toggleFolder(folder.id))}
        className="group flex items-center justify-between  gap-1.5 rounded-md px-2 py-1.5 text-sm
        cursor-pointer hover:bg-neutral-200/60 text-neutral-700 transition-colors"
      >
        <div className="flex items-center gap-1.5 truncate flex-1">
          <span className="text-neutral-400 hover:text-neutral-600">
            {isOpenFolder ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </span>

          {isOpenFolder ? (
            <FolderOpen className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
          ) : (
            <FolderIcon className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
          )}

          {isEditing ? (
            <input
              autoFocus
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleRenameSubmit()
                }
                if (e.key === 'Escape') {
                  setIsEditing(false)
                  setFolderName(folder.name)
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="px-1 text-xs font-medium border border-blue-400 rounded outline-none bg-white w-full text-neutral-800"
            />
          ) : (
            <span
              onDoubleClick={(e) => {
                e.stopPropagation()
                setFolderName(folder.name)
                setIsEditing(true)
              }}
              title={t('Double-click to rename')}
              className="truncate font-medium text-xs text-neutral-600"
            >
              {folder.name}
            </span>
          )}
          <span className="text-[10px] text-neutral-400 font-normal">({notes.length})</span>
        </div>

        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
          <button
            title={t('Add note to folder')}
            onClick={(e) => {
              e.stopPropagation()
              dispatch(createNote({ folderId: folder.id }))
            }}
            className="p-1 text-neutral-400 hover:text-blue-600 rounded hover:bg-neutral-200 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            title={t('Delete folder')}
            onClick={(e) => {
              e.stopPropagation()
              setIsConfirmFolderOpen(true)
            }}
            className="p-1 text-neutral-400 hover:text-red-600 rounded hover:bg-neutral-200 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {isOpenFolder && (
        <div className="pl-5 space-y-0.5 mt-0.5">
          {isEmptyFolder && (
            <div className="py-1 text-[11px] text-neutral-400 italic pl-3">{t('Empty Folder')}</div>
          )}

          {hasNotes &&
            notes.map((note) => {
              return <NoteItem key={note.id} note={note} activeNoteId={activeNoteId} />
            })}
        </div>
      )}

      <ConfirmModal
        isOpen={isConfirmFolderOpen}
        title={t('Delete folder?')}
        message={`"${folder.name}" ${notes.length > 0 ? `(${notes.length} notes)` : ''}`}
        confirmText={t('Delete')}
        cancelText={t('Cancel')}
        onConfirm={handleConfirmDeleteFolder}
        onCancel={() => setIsConfirmFolderOpen(false)}
      />
    </div>
  )
}
