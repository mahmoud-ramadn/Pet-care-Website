import ScrollToTop from "@/components/ui/scroll-to-top"
import { lazy } from "react"
import { Outlet } from "react-router"
const Header = lazy(() => import("@/components/header"))
const Footer = lazy(() => import("@/components/footer"))

export default function DashboardLayout() {
  return (
    <div className="relative">
      <Header />
      <main className="min-h-screen overflow-hidden">
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
