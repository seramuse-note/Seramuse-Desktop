import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { createFolder, createNote, selectNote, setActiveView } from '@/shared/note/notesSlice'
import { NoteStatus, ViewMode } from '@/shared/note/types'
import { useTranslation } from '@/shared/hooks'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Columns3,
  FileText,
  FolderPlus,
  Network,
  Sparkles
} from 'lucide-react'

export const WelcomeDashboard = () => {
  const { t, currentLanguage } = useTranslation()
  const dispatch = useAppDispatch()

  const notes = useAppSelector((state) => state.notes.notes)

  const noteList = Object.values(notes)

  const recentNotes = [...noteList]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)

  const totalNotes = noteList.length
  const inProgressCount = noteList.filter((n) => n.status === NoteStatus.IN_PROGRESS).length
  const doneCount = noteList.filter((n) => n.status === NoteStatus.DONE).length

  const dateLocale = currentLanguage === 'vi' ? 'vi-VN' : 'en-US'

  const tagCountMap: Record<string, number> = {}
  noteList.forEach((n) => {
    n.tags?.forEach((tag) => {
      tagCountMap[tag] = (tagCountMap[tag] || 0) + 1
    })
  })

  const topTags = Object.entries(tagCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  const renderStatusBadge = (status?: NoteStatus) => {
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

  if (totalNotes === 0) {
    return (
      <div className="flex-1 h-full w-full flex flex-col justify-center items-center p-8 bg-neutral-50/50 select-none overflow-y-auto">
        <div className="max-w-xl w-full flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-800 tracking-tight">
              {t('Welcome to Seramuse')}
            </h1>
            <p className="text-xs text-neutral-500 max-w-md leading-relaxed">
              {t('Welcome Description')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={() => dispatch(createNote())}
              className="flex items-start gap-3 p-3.5 bg-white border border-neutral-200/80 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-neutral-800">{t('New Note')}</span>
                  <span className="text-[10px] px-1 py-0.5 rounded bg-neutral-100 text-neutral-500 font-mono">
                    Ctrl+N
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400 mt-0.5">
                  {t('Rich-Text document editing')}
                </span>
              </div>
            </button>

            <button
              onClick={() => dispatch(setActiveView(ViewMode.KANBAN))}
              className="flex items-start gap-3 p-3.5 bg-white border border-neutral-200/80 rounded-xl hover:border-indigo-400 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Columns3 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-neutral-800">{t('Kanban')}</span>
                <span className="text-[11px] text-neutral-400 mt-0.5">
                  {t('Manage workflow and task progress')}
                </span>
              </div>
            </button>

            <button
              onClick={() => dispatch(setActiveView(ViewMode.GRAPH))}
              className="flex items-start gap-3 p-3.5 bg-white border border-neutral-200/80 rounded-xl hover:border-purple-400 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Network className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-neutral-800">{t('Graph')}</span>
                <span className="text-[11px] text-neutral-400 mt-0.5">
                  {t('Note link and reference network')}
                </span>
              </div>
            </button>

            <button
              onClick={() => dispatch(createFolder(t('New Folder')))}
              className="flex items-start gap-3 p-3.5 bg-white border border-neutral-200/80 rounded-xl hover:border-neutral-400 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-neutral-100 text-neutral-600 group-hover:bg-neutral-800 group-hover:text-white transition-colors">
                <FolderPlus className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-neutral-800">{t('New Folder')}</span>
                <span className="text-[11px] text-neutral-400 mt-0.5">
                  {t('Organize and classify documents')}
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-400 border-t border-neutral-200/60 pt-4">
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[10px]">
                Ctrl + \
              </kbd>
              <span>{t('Toggle Sidebar')}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[10px]">
                Esc
              </kbd>
              <span>{t('Close dialog')}</span>
            </div>
          </div>
        </div>
      </div>
    )
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

      {/* 2. Momentum Bar (Tương tác sống: bấm để mở Kanban) */}
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

        {/* Thẻ 2: In Progress -> Click để mở Kanban xem việc đang làm */}
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

        {/* Thẻ 3: Done -> Click để mở Kanban xem thành tựu */}
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

      <div className="flex flex-col gap-2.5">
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
                  <h4 className="text-xs font-semibold text-neutral-800 truncate group-hover:text-blue-600 transition-colors">
                    {note.title || t('Untitled Note')}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    {/* Badge trạng thái Kanban */}
                    {renderStatusBadge(note.status)}

                    <span className="text-[11px] text-neutral-400">
                      {new Date(note.updatedAt).toLocaleDateString(dateLocale, {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    {note.tags && note.tags.length > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 truncate max-w-[100px]">
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

        {/* 5. Top Topics: Tàng hình nếu chưa có tag, chỉ hiện khi đã có ít nhất 1 tag */}
        {topTags.length > 0 && (
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
        )}
      </div>
    </div>
  )
}
