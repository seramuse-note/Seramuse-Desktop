import { useAppDispatch } from '@/app/hooks'
import { createFolder, createNote, setActiveView } from '@/shared/note/notesSlice'
import { ViewMode } from '@/shared/note/types'
import { useTranslation } from '@/shared/hooks'
import { Columns3, FileText, FolderPlus, Network, Sparkles } from 'lucide-react'

export const DashboardEmptyState = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  return (
    <div className="flex-1 h-full w-full flex flex-col justify-center items-center p-8 bg-neutral-50/50 select-none overflow-y-auto">
      <div className="max-w-xl w-full flex flex-col items-center text-center gap-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
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
