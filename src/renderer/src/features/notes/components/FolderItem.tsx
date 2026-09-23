import { Folder, Note } from '../types'
import {
  createNote,
  deleteFolder,
  deleteNote,
  selectNote,
  toggleFolder,
  updateFolderName
} from '../notesSlice'
import {
  ChevronDown,
  ChevronRight,
  Folder as FolderIcon,
  FolderOpen,
  FileText,
  Plus,
  Trash2
} from 'lucide-react'
import { useAppDispatch } from '@/app/hooks'
import { useState } from 'react'

interface FolderItemProps {
  folder: Folder
  notes: Note[]
  activeNoteId: string | null
}

export const FolderItem = ({ folder, notes, activeNoteId }: FolderItemProps) => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [folderName, setFolderName] = useState(folder.name)

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
              title="Double-click để đổi tên"
              className="truncate font-medium text-xs text-neutral-600"
            >
              {folder.name}
            </span>
          )}
          <span className="text-[10px] text-neutral-400 font-normal">({notes.length})</span>
        </div>

        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
          <button
            title="Thêm ghi chú vào thư mục"
            onClick={(e) => {
              e.stopPropagation()
              dispatch(createNote({ folderId: folder.id }))
            }}

            className="p-1 text-neutral-400 hover:text-blue-600 rounded hover:bg-neutral-200"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              dispatch(deleteFolder(folder.id))
            }}

            className="p-1 text-neutral-400 hover:text-red-600 rounded hover:bg-neutral-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {isOpenFolder && (
        <div className="pl-5 space-y-0.5 mt-0.5">
          {isEmptyFolder && (
            <div className="py-1 text-[11px] text-neutral-400 italic pl-3">Thư mục trống</div>
          )}

          {hasNotes &&
            notes.map((note) => {
              const isActive = note.id === activeNoteId
              return (
                <div
                  key={note.id}
                  onClick={() => dispatch(selectNote(note.id))}
                  className={`group flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-xs cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-900 font-medium'
                      : 'text-neutral-700 hover:bg-neutral-200/70'
                  }`}
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
                      e.stopPropagation()
                      dispatch(deleteNote(note.id))
                    }}
                    className="p-1 opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-600 rounded hover:bg-neutral-200"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
