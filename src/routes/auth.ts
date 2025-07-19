import { lazy } from "react"
import type { RouteObject } from "react-router"

import AuthLayout from "@/layouts/Auth"

const LoginPage = lazy(() => import("@/pages/login"));
const SignUpPage = lazy(() => import("@/pages/register"));

export const AuthRoutes: RouteObject = {
  path: "",
  Component: AuthLayout,
  children: [
    {
      path: "login",
      Component: LoginPage,
    },
    {
      path: 'Signup',
      Component:SignUpPage
    }
  ],
}
