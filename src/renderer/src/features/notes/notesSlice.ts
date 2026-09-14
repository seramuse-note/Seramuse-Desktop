import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Folder, Note, NoteState, NoteStatus, ViewMode } from './types'

const initialState: NoteState = {
  notes: {},
  folders: {},
  activeNoteId: null,
  activeView: ViewMode.DOCUMENT
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    selectNote(state, action: PayloadAction<string>) {
      state.activeNoteId = action.payload
      state.activeView = ViewMode.DOCUMENT
    },

    createNote(
      state,
      action: PayloadAction<
        { content?: string; folderId?: string; status?: NoteStatus } | string | undefined
      >
    ) {
      const id = crypto.randomUUID()
      const now = new Date().toISOString()

      const folderId = typeof action.payload === 'object' ? action.payload?.folderId : undefined
      const content =
        typeof action.payload === 'string' ? action.payload : action.payload?.content || ''
      const status =
        typeof action.payload === 'object' && action.payload?.status
          ? action.payload.status
          : NoteStatus.TODO

      const newNote: Note = {
        id,
        title: 'Untitled Note',
        content,
        folderId,
        createdAt: now,
        updatedAt: now,
        status,
        tags: []
      }
      state.notes[id] = newNote
      state.activeNoteId = id
    },

    updateNoteTitle(state, action: PayloadAction<{ id: string; title: string }>) {
      const { id, title } = action.payload
      if (state.notes[id]) {
        state.notes[id].title = title
        state.notes[id].updatedAt = new Date().toISOString()
      }
    },

    updateNoteContent(state, action: PayloadAction<{ id: string; content: string }>) {
      const { id, content } = action.payload
      if (state.notes[id]) {
        state.notes[id].content = content
        state.notes[id].updatedAt = new Date().toISOString()
      }
    },

    deleteNote(state, action: PayloadAction<string>) {
      const id = action.payload
      delete state.notes[id]
      if (state.activeNoteId === id) {
        const remainingIds = Object.keys(state.notes)
        state.activeNoteId = remainingIds.length > 0 ? remainingIds[0] : null
      }
    },

    createFolder(state, action: PayloadAction<string>) {
      const id = crypto.randomUUID()
      const now = new Date().toISOString()
      const newFolder: Folder = {
        id,
        name: action.payload.trim() || 'Thư mục mới',
        createdAt: now,
        isOpen: true
      }
      state.folders[id] = newFolder
    },

    toggleFolder(state, action: PayloadAction<string>) {
      const folderId = action.payload
      const folder = state.folders[folderId]
      if (folder) {
        folder.isOpen = !folder.isOpen
      }
    },

    updateFolderName(state, action: PayloadAction<{ id: string; name: string }>) {
      const { id, name } = action.payload
      const folder = state.folders[id]
      if (folder) {
        folder.name = name
      }
    },

    deleteFolder(state, action: PayloadAction<string>) {
      const folderId = action.payload
      delete state.folders[folderId]

      Object.values(state.notes).forEach((note) => {
        if (note.folderId === folderId) {
          delete note.folderId
        }
      })
    },

    moveNoteToFolder(state, action: PayloadAction<{ noteId: string; folderId?: string }>) {
      const { noteId, folderId } = action.payload
      const note = state.notes[noteId]
      if (note) {
        note.folderId = folderId
      }
    },

    updateNoteStatus(state, action: PayloadAction<{ id: string; status: NoteStatus }>) {
      const { id, status } = action.payload
      if (state.notes[id]) {
        state.notes[id].status = status
        state.notes[id].updatedAt = new Date().toISOString()
      }
    },

    addNoteTag(state, action: PayloadAction<{ id: string; tag: string }>) {
      const { id, tag } = action.payload
      const note = state.notes[id]
      if (note) {
        note.tags.push(tag)
        note.updatedAt = new Date().toISOString()
      }
    },

    removeNoteTag(state, action: PayloadAction<{ id: string; tag: string }>) {
      const { id, tag } = action.payload
      const note = state.notes[id]
      if (note) {
        note.tags = note.tags.filter((t) => t !== tag)
      }
    },

    setActiveView(state, action: PayloadAction<ViewMode>) {
      state.activeView = action.payload
    }
  }
})

export const {
  selectNote,
  createNote,
  updateNoteTitle,
  updateNoteContent,
  deleteNote,
  createFolder,
  toggleFolder,
  updateFolderName,
  deleteFolder,
  moveNoteToFolder,
  updateNoteStatus,
  addNoteTag,
  removeNoteTag,
  setActiveView
} = notesSlice.actions

export default notesSlice.reducer
