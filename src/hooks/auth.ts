import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"

import { useEffect } from "react"

import { RegisterUser } from "@/apis/auth"
import { authLoadedAtom, tokenAtom } from "@/atoms"

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
    if (token) {
      setToken(token)
    }
    setAuthLoaded(true)
  }, [])
}
