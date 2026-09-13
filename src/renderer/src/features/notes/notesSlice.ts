import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Note, NoteState } from './types'

const initialState: NoteState = {
  notes: {},
  activeNoteId: null
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    selectNote(state, action: PayloadAction<string>) {
      state.activeNoteId = action.payload
    },

    createNote(state, action: PayloadAction<string>) {
      const id = crypto.randomUUID()
      const now = new Date().toISOString()
      const newNote: Note = {
        id,
        title: 'Untitled Note',
        content: action.payload,
        createdAt: now,
        updatedAt: now
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
    }
  }
})

export const { selectNote, createNote, updateNoteTitle, updateNoteContent, deleteNote } =
  notesSlice.actions

export default notesSlice.reducer
