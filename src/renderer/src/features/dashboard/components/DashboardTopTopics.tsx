import { useTranslation } from '@/shared/hooks'

interface DashboardTopTopicsProps {
  topTags: [string, number][]
}

export const DashboardTopTopics = ({ topTags }: DashboardTopTopicsProps) => {
  const { t } = useTranslation()

  if (topTags.length === 0) return null

  return (
    <div className="flex flex-col gap-2 pt-2 border-t border-neutral-200/60">
      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
        {t('Top Topics')}
      </span>
      <div className="flex flex-wrap gap-2">
        {topTags.map(([tag, count]) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-neutral-200/80 text-xs text-neutral-600 shadow-xs"
          >
            <span className="text-neutral-400 font-semibold">#</span>
            <span className="font-medium text-neutral-800">{tag}</span>
            <span className="text-[10px] text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded-full font-mono">
              {count}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
