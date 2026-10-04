import { useAppSelector } from '@/app/hooks'
import { NoteStatus } from '@/app/store/types'
import { Circle, Clock, CheckCircle2 } from 'lucide-react'
import { KanbanColumn } from './KanbanColumn'
import { useTranslation } from '@/shared/hooks'

const COLUMNS_CONFIG = [
  {
    status: NoteStatus.TODO,
    labelKey: 'To Do',
    icon: Circle,
    headerColor: 'text-indigo-600',
    badgeBg: 'bg-indigo-50 border-indigo-200'
  },
  {
    status: NoteStatus.IN_PROGRESS,
    labelKey: 'In Progress',
    icon: Clock,
    headerColor: 'text-orange-600',
    badgeBg: 'bg-orange-50 border-orange-200'
  },
  {
    status: NoteStatus.DONE,
    labelKey: 'Done',
    icon: CheckCircle2,
    headerColor: 'text-green-600',
    badgeBg: 'bg-green-50 border-green-200'
  }
]

export const KanbanView = () => {
  const { t } = useTranslation()
  const notes = useAppSelector((state) => state.notes.notes)
  const noteList = Object.values(notes)

  return (
    <div className="flex h-full w-full gap-4 p-6 overflow-x-auto select-none bg-neutral-50/50 items-start">
      {COLUMNS_CONFIG.map((col) => {
        const columnNotes = noteList.filter((n) => (n.status || NoteStatus.TODO) === col.status)

        return (
          <KanbanColumn
            key={col.status}
            status={col.status}
            label={t(col.labelKey)}
            icon={col.icon}
            notes={columnNotes}
            headerColor={col.headerColor}
            badgeBg={col.badgeBg}
          />
        )
      })}
    </div>
  )
}
