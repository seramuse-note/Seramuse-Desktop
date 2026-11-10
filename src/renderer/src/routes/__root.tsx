import { createRootRoute, Outlet } from '@tanstack/react-router'
import { environment } from '@/app/config/environment'
import { Toaster } from '@/shared/components/ui/Toaster'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const RootComponent = () => {
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-100 text-gray-800">
      <main className="flex-1 h-full w-full overflow-hidden">
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
