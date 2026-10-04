import { useAppSelector } from '@/app/hooks'
import { NoteStatus } from '@/app/store/types'
import { useMemo } from 'react'

export const useDashboardData = () => {
  const notes = useAppSelector((state) => state.notes.notes)

  return useMemo(() => {
    const noteList = Object.values(notes)

    const recentNotes = [...noteList]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3)

    const totalNotes = noteList.length
    const inProgressCount = noteList.filter((n) => n.status === NoteStatus.IN_PROGRESS).length
    const doneCount = noteList.filter((n) => n.status === NoteStatus.DONE).length

    const tagCountMap: Record<string, number> = {}
    noteList.forEach((n) => {
      n.tags?.forEach((tag) => {
        tagCountMap[tag] = (tagCountMap[tag] || 0) + 1
      })
    })

    const topTags = Object.entries(tagCountMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)

    return {
      recentNotes,
      totalNotes,
      inProgressCount,
      doneCount,
      topTags
    }
  }, [notes])
}
