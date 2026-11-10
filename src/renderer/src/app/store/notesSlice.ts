import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NoteState, ViewMode, NoteStatus, Folder, Note } from '../types'

const initialState: NoteState = {
  notes: {},
  folders: {},
  activeNoteId: null,
  activeView: ViewMode.DASHBOARD,
  searchQuery: ''
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    selectNote(state, action: PayloadAction<string | null>) {
      state.activeNoteId = action.payload
      if (action.payload) {
        state.activeView = ViewMode.DASHBOARD
      }
    },

    createNote(
      state,
      action: PayloadAction<
        | { title?: string; content?: string; folderId?: string; status?: NoteStatus }
        | string
        | undefined
      >
    ) {
      const id = crypto.randomUUID()
      const now = new Date().toISOString()

      const title =
        typeof action.payload === 'object' && action.payload?.title?.trim()
          ? action.payload.title.trim()
          : 'Untitled Note'

      const content =
        typeof action.payload === 'string' ? action.payload : action.payload?.content || ''

      const folderId = typeof action.payload === 'object' ? action.payload?.folderId : undefined

      const status =
        typeof action.payload === 'object' && action.payload?.status
          ? action.payload.status
          : NoteStatus.TODO

      const existingOrders = Object.values(state.notes).map((n) => n.order ?? 0)

      const maxOrder = existingOrders.length > 0 ? Math.max(...existingOrders) : 0

      const newNote: Note = {
        id,
        title,
        content,
        folderId,
        createdAt: now,
        updatedAt: now,
        status,
        tags: [],
        order: maxOrder + 1000
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
        name: action.payload.trim() || 'New Folder',
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
    },

    updateNoteIcon(state, action: PayloadAction<{ id: string; icon: string }>) {
      const { id, icon } = action.payload
      if (state.notes[id]) {
        state.notes[id].icon = icon
        state.notes[id].updatedAt = new Date().toISOString()
      }
    },

    updateNoteCover(state, action: PayloadAction<{ id: string; coverUrl: string }>) {
      const { id, coverUrl } = action.payload
      if (state.notes[id]) {
        state.notes[id].coverUrl = coverUrl
        state.notes[id].updatedAt = new Date().toISOString()
      }
    },

    hasLoaded(state, action: PayloadAction<Partial<NoteState>>) {
      if (action.payload.notes) {
        state.notes = action.payload.notes
      }

      if (action.payload.folders) {
        state.folders = action.payload.folders
      }

      if (action.payload.activeNoteId !== undefined) {
        state.activeNoteId = action.payload.activeNoteId
      }

      if (action.payload.activeView !== undefined) {
        state.activeView = action.payload.activeView
      }

      let defaultOrder = 1000
      Object.values(state.notes).forEach((note) => {
        if (note.order === undefined) {
          note.order = defaultOrder
          defaultOrder += 1000
        }
      })
    },

    reOrderNote(
      state,
      action: PayloadAction<{
        draggedId: string
        targetStatus: NoteStatus
        targetId?: string
        position?: 'before' | 'after'
      }>
    ) {
      const { draggedId, targetStatus, targetId, position } = action.payload
      const draggingNote = state.notes[draggedId]
      if (!draggingNote) return

      const columnNotes = Object.values(state.notes)
        .filter((n) => n.id !== draggedId && (n.status || NoteStatus.TODO) === targetStatus)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

      let newOrder = 1000
      if (columnNotes.length === 0) {
        newOrder = 1000
      } else if (!targetId) {
        const lastOrder = columnNotes[columnNotes.length - 1].order ?? 0
        newOrder = lastOrder + 1000
      } else {
        const targetIndex = columnNotes.findIndex((n) => n.id === targetId)

        const getOrder = (idx: number) => columnNotes[idx].order ?? (idx + 1) * 1000

        if (targetIndex === -1) {
          const lastOrder = columnNotes.length > 0 ? getOrder(columnNotes.length - 1) : 0
          newOrder = lastOrder + 1000
        } else if (position === 'before') {
          if (targetIndex === 0) {
            const nextOrder = getOrder(0)
            newOrder = nextOrder > 0 ? nextOrder / 2 : nextOrder - 1000
          } else {
            const prevNoteOrder = getOrder(targetIndex - 1)
            const nextOrder = getOrder(targetIndex)
            newOrder = (nextOrder + prevNoteOrder) / 2
          }
        } else {
          if (targetIndex === columnNotes.length - 1) {
            const prevOrder = getOrder(targetIndex)
            newOrder = prevOrder + 1000
          } else {
            const prevOrder = getOrder(targetIndex)
            const nextOrder = getOrder(targetIndex + 1)
            newOrder = (prevOrder + nextOrder) / 2
          }
        }
      }

      draggingNote.status = targetStatus
      draggingNote.order = newOrder
      draggingNote.updatedAt = new Date().toISOString()
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
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
  setActiveView,
  updateNoteIcon,
  updateNoteCover,
  hasLoaded,
  reOrderNote,
  setSearchQuery
} = notesSlice.actions

export default notesSlice.reducer
