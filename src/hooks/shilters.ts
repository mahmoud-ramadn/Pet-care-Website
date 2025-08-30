import { useAsyncRetry } from "react-use"

import { getallBookings } from "@/apis/requests"
import { getShilter, getShilters } from "@/apis/shilter"

export const useAllShilters = () => {
  return useAsyncRetry(async () => {
    const response = await getShilters()
    return response
  })
}

export const useShilter = (id: string) => {
  return useAsyncRetry(async () => {
    const response = await getShilter(id)
    return response
  })
}
export const useBookingService = () => {
  return useAsyncRetry(async () => {
    const response = await getallBookings()
    return response
  })
}
