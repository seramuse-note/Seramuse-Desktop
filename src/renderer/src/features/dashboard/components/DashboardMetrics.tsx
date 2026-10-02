import { useAppDispatch } from '@/app/hooks'
import { setActiveView } from '@/shared/note/notesSlice'
import { ViewMode } from '@/shared/note/types'
import { useTranslation } from '@/shared/hooks'
import { CheckCircle2, Clock, FileText } from 'lucide-react'

interface DashboardMetricsProps {
  totalNotes: number
  inProgressCount: number
  doneCount: number
}

export const DashboardMetrics = ({
  totalNotes,
  inProgressCount,
  doneCount
}: DashboardMetricsProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="flex items-center gap-3 p-3.5 bg-white border border-neutral-200/80 rounded-xl shadow-xs">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          <FileText className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-neutral-400 font-medium">{t('Total Notes')}</span>
          <span className="text-lg font-bold text-neutral-800">{totalNotes}</span>
        </div>
      </div>

      <button
        onClick={() => dispatch(setActiveView(ViewMode.KANBAN))}
        className="flex items-center gap-3 p-3.5 bg-white border border-neutral-200/80 rounded-xl shadow-xs hover:border-amber-400 hover:shadow-md transition-all text-left cursor-pointer group active:scale-[0.99]"
        title={t('View Kanban')}
      >
        <div className="p-2 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
          <Clock className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-neutral-400 font-medium group-hover:text-amber-700 transition-colors">
            {t('In Progress')}
          </span>
          <span className="text-lg font-bold text-amber-600">{inProgressCount}</span>
        </div>
      </button>

      <button
        onClick={() => dispatch(setActiveView(ViewMode.KANBAN))}
        className="flex items-center gap-3 p-3.5 bg-white border border-neutral-200/80 rounded-xl shadow-xs hover:border-emerald-400 hover:shadow-md transition-all text-left cursor-pointer group active:scale-[0.99]"
        title={t('View Kanban')}
      >
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-neutral-400 font-medium group-hover:text-emerald-700 transition-colors">
            {t('Done')}
          </span>
          <span className="text-lg font-bold text-emerald-600">{doneCount}</span>
        </div>
      </button>
    </div>
  )
}
