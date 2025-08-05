import { lazy } from "react"
import type { RouteObject } from "react-router"

import UserDashboardLayout from "@/layouts/userDashbord"

const User = lazy(() => import("@/pages/Dashborads/user"))
const Admin = lazy(() => import("@/pages/Dashborads/admin"))
const products = lazy(() => import("@/pages/Dashborads/admin/products"))
const services = lazy(() => import("@/pages/Dashborads/admin/services"))

export const RoleBase: RouteObject = {
  path: "",
  Component: UserDashboardLayout,
  children: [
    {
      path: "use-dashboard",
      Component: User,
    },
    {
      path: "admin-dashboard",
      Component: Admin,
    },
    {
      path: "products",
      Component: products,
    },
    {
      path: "services-board",
      Component: services,
    },
  ],
}
