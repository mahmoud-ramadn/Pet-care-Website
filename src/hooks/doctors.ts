import { useAsyncRetry } from "react-use"

import { getAllDoctors, getDoctor } from "@/apis/doctors"

export const useDoctors = () => {
  return useAsyncRetry(async () => {
    const response = await getAllDoctors()

    return response
  })
}

export const useDoctor = (id: string) => {
  return useAsyncRetry(async () => {
    const response = await getDoctor(id)
    return response
  })
}
