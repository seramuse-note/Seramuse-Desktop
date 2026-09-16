import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useEffect, useMemo, useRef, useState } from 'react'
import { selectNote } from '../../notesSlice'

interface GraphNote {
  id: string
  title: string
  x: number
  y: number
  radius: number
}

interface GraphEdge {
  id: string
  sourceId: string
  targetId: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}

export const GraphView = () => {
  const dispatch = useAppDispatch()

  const notes = useAppSelector((state) => state.notes.notes)

  const activeNoteId = useAppSelector((state) => state.notes.activeNoteId)

  const containerRef = useRef<HTMLDivElement>(null)

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [hoveredNoteId, setHoveredNoteId] = useState<string | null>(null)

  useEffect(() => {
    const currentElement = containerRef.current
    if (!currentElement) return

    const updateSize = () => {
      if (currentElement) {
        console.log('update size')

        setDimensions({
          width: Math.max(currentElement.clientWidth, 400),
          height: Math.max(currentElement.clientHeight, 400)
        })
      }
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(currentElement)
    return () => observer.disconnect()
  }, [])

  const graphNodes: GraphNote[] = useMemo(() => {
    const total = Object.keys(notes).length
    if (total === 0) return []

    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2
    const radius = Math.min(centerX, centerY) * 0.65

    return Object.keys(notes).map((noteId, index) => {
      const note = notes[noteId]
      const angle = (index / total) * 2 * Math.PI - Math.PI / 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      return {
        id: note.id,
        title: note.title.trim() || 'Untitled Note',
        x,
        y,
        radius: note.id === activeNoteId ? 18 : 14
      }
    })
  }, [notes, activeNoteId, dimensions])

  const graphEdges: GraphEdge[] = useMemo(() => {
    const edges: GraphEdge[] = []
    const nodeMap = new Map(graphNodes.map((n) => [n.id, n]))

    for (let i = 0; i < graphNodes.length; i++) {
      for (let j = i + 1; j < graphNodes.length; j++) {
        const noteA = notes[graphNodes[i].id]
        const noteB = notes[graphNodes[j].id]

        if (!noteA || !noteB) continue

        const sameFolder = Boolean(noteA.folderId && noteA.folderId == noteB.folderId)
        const shareTags = Boolean(
          noteA.tags &&
          noteB.tags &&
          noteA.tags.length > 0 &&
          noteA.tags.some((tag) => noteB.tags.includes(tag))
        )

        if (sameFolder || shareTags) {
          const source = nodeMap.get(noteA.id)
          const target = nodeMap.get(noteB.id)
          if (source && target) {
            edges.push({
              id: `${source.id}-${target.id}`,
              sourceId: source.id,
              targetId: target.id,
              sourceX: source.x,
              sourceY: source.y,
              targetX: target.x,
              targetY: target.y
            })
          }
        }
      }
    }
    return edges
  }, [graphNodes, notes])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full bg-neutral-900 overflow-hidden select-none"
    >
      <svg width={dimensions.width} height={dimensions.height} className="cursor-default">
        <g className="edges">
          {graphEdges.map((edge) => {
            const isHovered =
              hoveredNoteId && (edge.sourceId === hoveredNoteId || edge.targetId === hoveredNoteId)

            return (
              <line
                key={edge.id}
                x1={edge.sourceX}
                y1={edge.sourceY}
                x2={edge.targetX}
                y2={edge.targetY}
                stroke={isHovered ? '#818cf8' : '#374151'}
                strokeWidth={isHovered ? 2 : 1}
                strokeOpacity={isHovered ? 0.9 : 0.4}
                className="transition-all duration-300"
              />
            )
          })}
        </g>
        <g className="node">
          {graphNodes.map((node) => {
            const isActive = node.id === activeNoteId
            const isHovered = node.id === hoveredNoteId

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNoteId(node.id)}
                onMouseLeave={() => setHoveredNoteId(null)}
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(selectNote(node.id))
                }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius}
                  fill={isActive ? '#6366f1' : isHovered ? '#38bdf8' : '#262626'}
                  stroke={isActive ? '#a5b4fc' : isHovered ? '#7dd3fc' : '#525252'}
                  strokeWidth={isActive || isHovered ? 2 : 1}
                  className="transition-all duration-300"
                />
                <text
                  x={node.x}
                  y={node.y + node.radius + 20}
                  textAnchor="middle"
                  className={`text-xs select-none pointer-events-none transition-colors duration-200 ${
                    isActive
                      ? 'fill-indigo-300 font-semibold'
                      : isHovered
                        ? 'fill-sky-300'
                        : 'fill-neutral-400'
                  }`}
                  style={{ fontSize: '11px' }}
                >
                  {node.title.length > 18 ? `${node.title.slice(0, 16)}...` : node.title}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
