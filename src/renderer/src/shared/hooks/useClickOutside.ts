import { useEffect, useRef } from 'react'

/**
 * Hook lắng nghe sự kiện click bên ngoài một phần tử DOM được chỉ định
 * @param handler Hàm callback được gọi khi click ra ngoài
 */

export const useClickOutside = <T extends HTMLDivElement = HTMLDivElement>(
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const el = ref.current
      if (!el || el.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [handler])

  return ref
}
