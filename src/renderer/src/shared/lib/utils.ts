import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatDate = (
  dateStr?: string,
  locale?: string,
  options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
): string => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ''

  const currentLang = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : 'en'
  const activeLocale = locale || (currentLang === 'vi' ? 'vi-VN' : 'en-US')

  return d.toLocaleDateString(activeLocale, options)
}
