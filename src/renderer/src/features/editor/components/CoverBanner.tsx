import { COVER_PRESETS } from '@/features/editor/constants/coverPresets'
import { useClickOutside } from '@/shared/hooks/useClickOutside'
import { useTranslation } from '@/shared/hooks'
import { ImageIcon, Palette, X } from 'lucide-react'
import { useState } from 'react'

interface CoverBannerProps {
  currentCover?: string
  onSelectCover: (coverUrl: string) => void
  onRemoveCover: () => void
}

export const CoverBanner = ({ currentCover, onSelectCover, onRemoveCover }: CoverBannerProps) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false)
  })

  return (
    <div className={`relative ${currentCover ? 'w-full' : 'w-fit'}`}>
      {!currentCover ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors w-fit cursor-pointer"
        >
          <ImageIcon className="w-3.5 h-3.5" /> {t('Add cover')}
        </button>
      ) : (
        <div
          className="relative w-full h-20 rounded-xl overflow-hidden group shadow-xs transition-all"
          style={{ background: currentCover }}
        >
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-black/40 backdrop-blur-xs p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white hover:bg-white/20 rounded transition-colors cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5" /> {t('Change cover')}
            </button>
            <button
              type="button"
              onClick={onRemoveCover}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white/90 hover:text-white hover:bg-red-500/80 rounded transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> {t('Remove')}
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute z-30 mt-2 p-3 bg-white rounded-xl shadow-xl border border-neutral-200 w-72 flex flex-col gap-2  ${currentCover ? 'top-12' : 'top-8'}`}
        >
          <div className="text-xs font-semibold text-neutral-600 px-1">{t('Choose gradient')}</div>
          <div className="grid grid-cols-2 gap-2">
            {COVER_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  onSelectCover(preset.gradient)
                  setIsOpen(false)
                }}
                className={`h-12 rounded-lg border border-neutral-200/60 hover:scale-[1.02] hover:shadow-md transition-all relative overflow-hidden group/btn cursor-pointer`}
                title={preset.label}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-medium text-white"
                  style={{ background: preset.gradient }}
                >
                  {preset.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
