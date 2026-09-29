import { useState } from 'react'
import { Columns3, FileText, FolderPlus, Network, Plus, Search, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ViewMode } from '@/shared/note/types'
import { createFolder, createNote, setActiveView } from '@/shared/note/notesSlice'
import { NoteItem } from './NoteItem'
import { FolderItem } from './FolderItem'

const navItems = [
  { mode: ViewMode.DOCUMENT, label: 'Tài liệu', icon: FileText },
  { mode: ViewMode.KANBAN, label: 'Kanban', icon: Columns3 },
  { mode: ViewMode.GRAPH, label: 'Graph', icon: Network }
]

export const Sidebar = () => {
  const dispatch = useAppDispatch()

  const activeView = useAppSelector((state) => state.notes.activeView)

  const notes = useAppSelector((state) => state.notes.notes)
  const folders = useAppSelector((state) => state.notes.folders)
  const activeNoteId = useAppSelector((state) => state.notes.activeNoteId)

  const noteList = Object.values(notes)
  const folderList = Object.values(folders)
  const rootNotes = noteList.filter((note) => !note.folderId)

  const [searchQuery, setSearchQuery] = useState('')
  const trimmedQuery = searchQuery.trim().toLowerCase()
  const isSearching = trimmedQuery.length > 0
  const filteredNotes = isSearching
    ? noteList.filter((note) => (note.title || '').toLowerCase().includes(trimmedQuery))
    : []

  const hasFolder = folderList.length > 0
  const hasRootNotes = rootNotes.length > 0
  const isEmptyWorkspace = !hasFolder && !hasRootNotes

  return (
    <aside className="flex h-full w-64 flex-col border-r border-neutral-200 bg-neutral-50 select-none">
      <div className="p-3 border-b border-neutral-200 flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => dispatch(createNote())}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-2.5 py-1.5
            text-xs font-medium text-white shadow-sm hover:bg-blue-700 transition-colors duration-150"
          >
            <Plus className="w-3.5 h-3.5" /> <span>Ghi chú</span>
          </button>
          <button
            onClick={() => dispatch(createFolder('Thư mục mới'))}
            title="Tạo thư mục mới"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-neutral-300 bg-white
            px-2.5 py-1.5 text-xs font-medium text-neutral-700 shadow-sm hover:bg-neutral-100 transition-colors"
          >
            <FolderPlus className="w-3.5 h-3.5 text-neutral-500" />
            <span>Thư mục</span>
          </button>
        </div>

        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-2.5 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm ghi chú..."
            className="w-full pl-8 pr-7 py-1 text-xs bg-white border border-neutral-200
             rounded-md outline-none placeholder:text-neutral-400 text-neutral-700 focus:border-blue-400
             focus:ring-1 focus:ring-blue-100 transition-all "
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 text-neutral-400 hover:text-neutral-600 p-0.5"
              title="Xóa tìm kiếm"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        <div className="space-y-0.5">
          {isSearching && (
            <div className="px-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              <span>Kết quả tìm kiếm ({filteredNotes.length})</span>
            </div>
          )}

          {filteredNotes.length > 0 && (
            <div className="space-y-1">
              {filteredNotes.map((note) => (
                <NoteItem key={note.id} note={note} activeNoteId={activeNoteId} />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div className="px-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Góc nhìn
          </div>
          {navItems.map((item) => (
            <button
              key={item.mode}
              onClick={() => dispatch(setActiveView(item.mode))}
              className={`w-full flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                activeView === item.mode
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-neutral-700 hover:bg-neutral-200/60'
              }`}
            >
              <item.icon
                className={`h-3.5 w-3.5 ${activeView === item.mode ? 'text-blue-600' : 'text-neutral-500'}`}
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {isEmptyWorkspace && (
          <div className="p-4 text-center text-xs text-neutral-400">
            Chưa có ghi chú nào. Bấm nút phía trên để tạo mới.
          </div>
        )}

        {hasFolder && (
          <div className="space-y-1">
            <div className="px-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Thư mục
            </div>

            {folderList.map((folder) => {
              const notesInFolder = noteList.filter((n) => n.folderId === folder.id)
              return (
                <FolderItem
                  key={folder.id}
                  folder={folder}
                  notes={notesInFolder}
                  activeNoteId={activeNoteId}
                />
              )
            })}
          </div>
        )}

        {hasRootNotes && (
          <div className="space-y-1">
            {hasFolder && (
              <div className="px-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Ghi chú khác
              </div>
            )}

            {rootNotes.map((note) => {
              return <NoteItem key={note.id} note={note} activeNoteId={activeNoteId} />
            })}
          </div>
        )}
      </div>
    </aside>
  )
}
