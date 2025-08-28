import { lazy } from "react"
import { Outlet } from "react-router"

import LayoutWrapper from "@/components/ui/LayoutWrapper"

const Header = lazy(() => import("@/components/header"))
const Footer = lazy(() => import("@/components/footer"))

export default function DashboardLayout() {
  return (
    <LayoutWrapper>
      <div className="relative">
        <Header />
        <main className="min-h-screen overflow-hidden">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LayoutWrapper>
  )
}
