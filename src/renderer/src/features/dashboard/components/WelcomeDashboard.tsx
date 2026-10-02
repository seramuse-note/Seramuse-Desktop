import { useTranslation } from '@/shared/hooks'
import { useDashboardData } from '../hooks/useDashboardData'
import { DashboardEmptyState, DashboardMetrics, DashboardRecentNotes, DashboardTopTopics } from '.'

export const WelcomeDashboard = () => {
  const { t } = useTranslation()

  const { totalNotes, inProgressCount, doneCount, recentNotes, topTags } = useDashboardData()

  if (totalNotes === 0) {
    return <DashboardEmptyState />
  }

  return (
    <div className="flex-1 h-full w-full flex flex-col p-8 max-w-4xl mx-auto overflow-y-auto select-none gap-6 animate-in fade-in duration-200">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-neutral-800 tracking-tight">
          {t('Welcome to Seramuse')}
        </h1>
        <p className="text-sm text-neutral-500">
          {inProgressCount > 0
            ? t('You have {{count}} notes in progress', { count: inProgressCount })
            : t('All tasks are clear for today')}
        </p>
      </div>

      <DashboardMetrics
        totalNotes={totalNotes}
        inProgressCount={inProgressCount}
        doneCount={doneCount}
      />

      <div className="flex flex-col gap-2.5">
        <DashboardRecentNotes recentNotes={recentNotes} />
        <DashboardTopTopics topTags={topTags} />
      </div>
    </div>
  )
}
