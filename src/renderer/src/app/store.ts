import { counterReducer } from '@/features/counter'
import { configureStore } from '@reduxjs/toolkit'
import notesReducer from '@/features/notes/notesSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    notes: notesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
