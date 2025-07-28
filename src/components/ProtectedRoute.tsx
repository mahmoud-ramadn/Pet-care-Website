import { useAtomValue } from "jotai"

import { useEffect } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"

import { authLoadedAtom, tokenAtom } from "@/atoms"

export default function ProtectedRoute() {
  const token = useAtomValue(tokenAtom)
  const authLoaded = useAtomValue(authLoadedAtom)

  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])

  if (!authLoaded) {
    return null
  }

  if (!token) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
