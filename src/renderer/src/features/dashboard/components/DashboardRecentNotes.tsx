import { useAppDispatch } from '@/app/hooks'
import { selectNote } from '@/shared/note/notesSlice'
import { Note } from '@/shared/note/types'
import { useTranslation } from '@/shared/hooks'
import { ArrowRight, FileText } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { formatDate } from '@/shared/lib/utils'

interface DashboardRecentNotesProps {
  recentNotes: Note[]
}

export const DashboardRecentNotes = ({ recentNotes }: DashboardRecentNotesProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {t('Recent Notes')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {recentNotes.map((note) => (
          <button
            key={note.id}
            onClick={() => dispatch(selectNote(note.id))}
            className="flex items-start justify-between p-3.5 bg-white border border-neutral-200/80 hover:border-blue-400 hover:shadow-md rounded-xl transition-all text-left group cursor-pointer"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-neutral-100 text-neutral-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-neutral-800 truncate group-hover:text-blue-600 transition-colors">
                  {note.title || t('Untitled Note')}
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status={note.status} />

                  <span className="text-[11px] text-neutral-400">{formatDate(note.updatedAt)}</span>
                  {note.tags && note.tags.length > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 truncate max-w-25">
                      #{note.tags[0]}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
          </button>
        ))}
      </div>
    </>
  )
}
