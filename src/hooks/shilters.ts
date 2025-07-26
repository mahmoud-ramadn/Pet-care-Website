import { useAsyncRetry } from "react-use"

import { getShilters } from "@/apis/shilter"

export const useAllShilters = () => {
  return useAsyncRetry(async () => {
    const response = await getShilters()
    return response
  })
}
