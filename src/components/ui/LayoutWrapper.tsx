import type { ReactNode } from "react"
import { useRouteError } from "react-router"

import ErrorPage from "@/pages/error-page"

interface LayoutWrapperProps {
  children: ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const error = useRouteError()

  if (error) {
    return <ErrorPage />
  }

  return <>{children}</>
}
