import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useEffect, useRef, useState } from 'react'
import { hasLoaded } from '@/app/store/notesSlice'

export const useAutoSave = () => {
  const dispatch = useAppDispatch()
  const notes = useAppSelector((state) => state.notes)
  const [isHydrated, setIsHydrated] = useState(false)

  const isFirstLoadRef = useRef(true)

  useEffect(() => {
    const initData = async () => {
      try {
        const savedData = await window.api.loadNotes()

        if (savedData) {
          dispatch(hasLoaded(savedData))
        }
      } catch (error) {
        console.error('Lỗi khi nạp dữ liệu từ ổ cứng:', error)
      } finally {
        setIsHydrated(true)
      }
    }

    initData()
  }, [dispatch])

  useEffect(() => {
    if (!isHydrated) return

    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false
      return
    }

    const timer = setTimeout(() => {
      window.api.saveNotes(notes)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [isHydrated, notes])
}
