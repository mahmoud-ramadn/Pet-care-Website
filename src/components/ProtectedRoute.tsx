import { useAtomValue } from "jotai"

import { Navigate, Outlet } from "react-router-dom"

import { authLoadedAtom, tokenAtom } from "@/atoms"

export default function ProtectedRoute() {
  const token = useAtomValue(tokenAtom)
  const authLoaded = useAtomValue(authLoadedAtom)
 

  

  if (!authLoaded) {
    return null
  }

  if (!token) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}
