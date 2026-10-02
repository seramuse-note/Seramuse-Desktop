import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import i18n from './i18n'

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
  const activeLocale = locale || (i18n.language === 'vi' ? 'vi-VN' : 'en-US')
  return d.toLocaleDateString(activeLocale, options)
}
