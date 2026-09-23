import { ImageIcon, Palette, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export const COVER_PRESETS = [
  { id: 'sunset', label: 'Sunset Glow', bg: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)' },
  { id: 'aurora', label: 'Aurora Night', bg: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)' },
  {
    id: 'lavender',
    label: 'Lavender Dream',
    bg: 'linear-gradient(135deg, #c471ed 0%, #f64f59 100%)'
  },
  { id: 'ocean', label: 'Ocean Breeze', bg: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)' },
  {
    id: 'emerald',
    label: 'Emerald Forest',
    bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
  },
  {
    id: 'midnight',
    label: 'Midnight Slate',
    bg: 'linear-gradient(135deg, #232526 0%, #414345 100%)'
  },
  { id: 'peach', label: 'Warm Peach', bg: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)' },
  {
    id: 'neon',
    label: 'Cyberpunk Neon',
    bg: 'linear-gradient(135deg, #8a2387 0%, #e94057 50%, #f27121 100%)'
  }
]

interface CoverBannerProps {
  currentCover?: string
  onSelectCover: (coverUrl: string) => void
  onRemoveCover: () => void
}

export const CoverBanner = ({ currentCover, onSelectCover, onRemoveCover }: CoverBannerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleCliclkOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleCliclkOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleCliclkOutside)
    }
  }, [isOpen])

  return (
    <div className={`relative ${currentCover ? 'w-full' : 'w-fit'}`}>
      {!currentCover ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors w-fit"
        >
          <ImageIcon className="w-3.5 h-3.5" /> Thêm ảnh bìa
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
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white hover:bg-white/20 rounded transition-colors"
            >
              <Palette className="w-3.5 h-3.5" /> Đổi ảnh bìa
            </button>
            <button
              type="button"
              onClick={onRemoveCover}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white/90 hover:text-white hover:bg-red-500/80 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Gỡ
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-30 mt-2 p-3 bg-white rounded-xl shadow-xl border border-neutral-200 w-72 flex flex-col gap-2"
          style={{
            top: currentCover ? '48px' : '32px',
            right: currentCover ? '12px' : 'auto'
          }}
        >
          <div className="text-xs font-semibold text-neutral-600 px-1">Chọn màu Gradient</div>
          <div className="grid grid-cols-2 gap-2">
            {COVER_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  onSelectCover(preset.bg)
                  setIsOpen(false)
                }}
                className="h-12 rounded-lg border border-neutral-200/60 hover:scale-[1.02] hover:shadow-md transition-all relative overflow-hidden group/btn"
                style={{ background: preset.bg }}
                title={preset.label}
              >
                <span className="absolute inset-0 bg-black/20 opacity-0 group-hover/btn:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-medium text-white">
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
