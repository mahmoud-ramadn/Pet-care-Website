import { lazy } from "react"
import { createBrowserRouter } from "react-router"

import ProtectedRoute from "@/components/ProtectedRoute"
import Layout from "@/layouts"

import { AuthRoutes } from "./auth"
import { DashboardRoutes } from "./dashboard"

const NotFound = lazy(() => import("@/pages/not-found"))

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

      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
])
