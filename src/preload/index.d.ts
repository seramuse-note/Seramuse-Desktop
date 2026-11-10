import { NoteState } from '@/app/types'
import { ElectronAPI } from '@electron-toolkit/preload'

export interface CustomAPI {
  loadNotes: () => Promise<NoteState | null>
  saveNotes: (data: NoteState) => Promise<{ success: boolean; error?: string }>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}
