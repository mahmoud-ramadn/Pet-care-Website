import { lazy } from "react"
import { createBrowserRouter } from "react-router"

import ProtectedRoute from "@/components/ProtectedRoute"
import Layout from "@/layouts"

import { AuthRoutes } from "./auth"
import { DashboardRoutes } from "./dashboard"
import { RoleBase } from "./role-base"

const NotFound = lazy(() => import("@/pages/not-found"))
const UI = lazy(() => import("@/pages/ui-components"))

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "",
        Component: ProtectedRoute,
        children: [DashboardRoutes],
      },
      AuthRoutes,
      RoleBase,
      {
        path: "ui",
        Component: UI,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
])
