import { lazy } from "react"
import { Outlet } from "react-router"

const Header = lazy(() => import("@/components/header"));
const Footer = lazy(() => import("@/components/footer"));

export default function DashboardLayout() {
  return (
    <div className=" relative">
      <Header/>
      <main  className=" min-h-screen overflow-hidden">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}
