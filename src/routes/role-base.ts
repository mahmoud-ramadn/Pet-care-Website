import { lazy } from "react"
import type { RouteObject } from "react-router"

import UserDashboardLayout from "@/layouts/userDashbord"

const User = lazy(() => import("@/pages/Dashborads/user/user"))
const Admin = lazy(() => import("@/pages/Dashborads/admin"))
const products = lazy(() => import("@/pages/Dashborads/admin/products"))
const services = lazy(() => import("@/pages/Dashborads/admin/services"))
const orders = lazy(() => import("@/pages/Dashborads/user/order-user"))
const users=lazy(()=>import('@/pages/Dashborads/admin/users'))
const blogs = lazy(() => import("@/pages/Dashborads/admin/blogs"))

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
      path: "table-blogs",
      Component: blogs,
    },
    {
      path: "table-users",
      Component: users,
    },
    {
      path: "services-board",
      Component: services,
    },
    {
      path: "orders",
      Component: orders,
    },
  ],
}
