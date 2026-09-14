export enum NoteStatus {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done'
}

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  folderId?: string
  status: NoteStatus
  tags: string[]
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
}
