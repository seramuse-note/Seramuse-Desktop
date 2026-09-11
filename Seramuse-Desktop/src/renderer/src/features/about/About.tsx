import { environment } from '@/shared/lib/environment'
import { Info } from 'lucide-react'

export const About = () => {
  return (
    <div className="flex max-w-md flex-col items-center gap-4 text-center">
      <Info className="h-16 w-16 text-blue-600" />
      <h1 className="text-3xl font-bold">Về dự án</h1>
      <p className="text-gray-600">
        Knowledge Library — frontend dùng Vite, React, TypeScript, Tailwind CSS v4 và Redux Toolkit.
        Routing bằng TanStack Router.
      </p>
      <p className="text-sm text-gray-400">Mode: {environment.mode}</p>
    </div>
  )
}
