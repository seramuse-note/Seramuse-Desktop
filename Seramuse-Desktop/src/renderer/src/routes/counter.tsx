import { createFileRoute } from '@tanstack/react-router'
import { Counter } from '../features/counter/Counter'

export const Route = createFileRoute('/counter')({
  component: Counter
})
