import { useTranslation } from '@/shared/hooks'
import { Globe } from 'lucide-react'

export const LanguageSwitcher = () => {
  const { i18n, changeLanguage } = useTranslation()
  const isVi = i18n.language === 'vi'

  const toggleLanguage = () => {
    changeLanguage(isVi ? 'en' : 'vi')
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      title={isVi ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
      className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/80 transition-colors cursor-pointer"
    >
      <Globe className="w-3.5 h-3.5 text-neutral-500" />
      <span>{isVi ? '🇻🇳 VI' : '🇬🇧 EN'}</span>
    </button>
  )
}
