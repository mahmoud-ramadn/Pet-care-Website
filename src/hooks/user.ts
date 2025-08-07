import { useAsyncRetry } from "react-use"


import { getUserMoments } from "@/apis/user"
export const useUserMoments = (id:string) => {
  return useAsyncRetry(async () => {
    const response = await getUserMoments(id)

    return response
  })
}
