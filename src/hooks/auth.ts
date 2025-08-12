import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"

import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router"

import { RegisterUser } from "@/apis/auth"
import { authLoadedAtom, tokenAtom} from "@/atoms"

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: RegisterFormType) => RegisterUser(data),
  })
}

export function useAuthLoad() {
  const setToken = useSetAtom(tokenAtom)

  const setAuthLoaded = useSetAtom(authLoadedAtom)

  useEffect(() => {
    const token = localStorage.getItem("token")

    const user = localStorage.getItem("userInfoData")

    if (token && user) {
      setToken(token)
    }
    setAuthLoaded(true)
  }, [])
}

export function useLogout() {
  const setToken = useSetAtom(tokenAtom)
  const navigate = useNavigate()

  return useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("userInfoData")

    setToken(null)
    navigate("/login")
  }, [setToken,  navigate])
}
