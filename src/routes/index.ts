import { lazy } from "react"
import { createBrowserRouter } from "react-router"

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
