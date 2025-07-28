import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"

import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router"

import { RegisterUser } from "@/apis/auth"
import { authLoadedAtom, tokenAtom, userInfoAtom } from "@/atoms"

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: RegisterFormType) => RegisterUser(data),
  })
}

export function useAuthLoad() {
  const setToken = useSetAtom(tokenAtom)
  const setUserInfoAtom = useSetAtom(userInfoAtom)

  const setAuthLoaded = useSetAtom(authLoadedAtom)

  useEffect(() => {
    const token = localStorage.getItem("token")

    const user = localStorage.getItem("userInfoData")

    if (token && user) {
      setToken(token)
      setUserInfoAtom(user)
    }
    setAuthLoaded(true)
  }, [])
}

export function useLogout() {
  const setToken = useSetAtom(tokenAtom)
  const setUserInfo = useSetAtom(userInfoAtom)
  const navigate = useNavigate()

  return useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("userInfoData")

    setToken(null)
    setUserInfo("")
    navigate("/login")
  }, [setToken, setUserInfo, navigate])
}
