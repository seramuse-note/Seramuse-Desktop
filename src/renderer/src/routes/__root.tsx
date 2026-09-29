import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { environment } from '@/shared/lib/environment'
import { Toaster } from '@/shared/components/ui/Toaster'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const RootComponent = () => {
  return (
    <div className="flex  h-screen flex-col bg-gray-100 text-gray-800">
      <header className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
        <Link to="/home" className="text-lg font-bold text-blue-600">
          Seramuse
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/home" className="text-sm font-medium hover:text-blue-600">
            Home
          </Link>
          <Link to="/login" className="text-sm font-medium hover:text-blue-600">
            Login
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col justify-center items-center ">
        <Outlet />
      </main>
      <Toaster />
      {environment.isDev ? <TanStackRouterDevtools /> : null}
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent
})
