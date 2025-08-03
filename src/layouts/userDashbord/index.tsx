import { Toaster } from "sonner"

import { Outlet } from "react-router-dom"

import { cn } from "@/lib/utils"

import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function UserDashboardLayout() {
  return (
    <SidebarProvider>
      <div className="relative flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          {/* Header with sidebar trigger for mobile */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <SidebarTrigger className="  text-primary " />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">PetCar Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Add your header controls here (search, notifications, etc.) */}
            </div>
          </header>

          {/* Main content with scrollable area */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
            <div
              className={cn(
                "mx-auto w-full",
                "max-w-[1800px]" // Optional: constrain max width for very large screens
              )}
            >
              <Outlet />
            </div>
          </main>

          {/* Optional footer */}
          <footer className="border-t p-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </footer>
        </div>

        {/* Toast notifications */}
        <Toaster />
      </div>
    </SidebarProvider>
  )
}
