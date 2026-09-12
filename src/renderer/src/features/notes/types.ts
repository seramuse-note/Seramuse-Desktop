export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface NoteState {
  notes: Record<string, Note>
  activeNoteId: string | null
}
