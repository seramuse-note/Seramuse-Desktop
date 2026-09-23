import { Smile, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const COMMON_EMOJIS = [
  '📝',
  '💡',
  '🚀',
  '📚',
  '🎯',
  '🧠',
  '⚡',
  '🔥',
  '💻',
  '📌',
  '✨',
  '🎨',
  '☕',
  '❤️',
  '🌟',
  '🛠️',
  '📅',
  '📊',
  '📂',
  '🔖',
  '💬',
  '🏆',
  '🎉',
  '🍀'
]

interface IconPickerProps {
  currentIcon?: string
  onSelectIcon: (icon: string) => void
  onRemoveIcon: () => void
}

export const IconPicker = ({ currentIcon, onRemoveIcon, onSelectIcon }: IconPickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={popoverRef} className="relative inline-block">
      {currentIcon ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          title="Chọn biểu tượng"
          className="text-2xl bg-white/90 shadow-xs border border-neutral-200/50 hover:opacity-80 transition-opacity cursor-pointer p-1 rounded-lg hover:bg-neutral-100"
        >
          {currentIcon}
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 px-2 py-1 rounded-md transition-colors cursor-pointer"
        >
          <Smile className="w-3.5 h-3.5" />
          <span>Thêm biểu tượng</span>
        </button>
      )}

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-64 p-3 bg-white rounded-xl shadow-xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150 ">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100 text-xs text-neutral-500 font-medium">
            <span>Chọn biểu tượng</span>
            <button
              onClick={() => {
                onRemoveIcon()
                setIsOpen(false)
              }}
              title="Xóa biểu tượng"
              className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
            >
              <X className="w-3 h-3.5  shrink-0 leading-none" /> Xóa
            </button>
          </div>
          <div className="grid  grid-cols-6 gap-1.5">
            {COMMON_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  onSelectIcon(emoji)
                  setIsOpen(false)
                }}
                className="w-8 h-8 flex items-center justify-center text-lg rounded-lg hover:bg-neutral-100 hover:scale-110 transition-all cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
