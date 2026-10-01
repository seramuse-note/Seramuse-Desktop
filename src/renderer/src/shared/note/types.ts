export enum NoteStatus {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done'
}

export enum ViewMode {
  DASHBOARD = 'Dashboard',
  KANBAN = 'Kanban',
  GRAPH = 'Graph'
}

export interface Note {
  id: string
  title: string
  content: string
  icon?: string
  coverUrl?: string
  createdAt: string
  updatedAt: string
  folderId?: string
  status: NoteStatus
  tags: string[]
  order?: number
}

export interface Folder {
  id: string
  name: string
  isOpen: boolean
  createdAt: string
}

export interface NoteState {
  notes: Record<string, Note>
  folders: Record<string, Folder>
  activeNoteId: string | null
  activeView: ViewMode
  searchQuery: string
}
