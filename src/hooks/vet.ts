import { useAsyncRetry } from "react-use"

import { getAllVet, getVet } from "@/apis/vet"

export const useVets = () => {
  return useAsyncRetry(async () => {
    const response = await getAllVet()

    return response
  })
}

export const useVet = (id: string) => {
  return useAsyncRetry(async () => {
    const response = await getVet(id)
    return response
  })
}
