import { NoteStatus } from '@/shared/note/types'
import { useTranslation } from '@/shared/hooks'

interface StatusBadgeProps {
  status?: NoteStatus
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { t } = useTranslation()

  switch (status) {
    case NoteStatus.IN_PROGRESS:
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          {t('In Progress')}
        </span>
      )
    case NoteStatus.DONE:
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {t('Done')}
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">
          {t('To Do')}
        </span>
      )
  }
}
