import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const isAuthenticated = Boolean(localStorage.getItem('token'))

    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
    throw redirect({ to: '/home' })
  }
})
