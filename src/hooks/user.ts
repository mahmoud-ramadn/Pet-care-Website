import { useAsyncRetry } from "react-use"

import { getAllPosts, getUserMoments } from "@/apis/user"

export const useUserMoments = (id: string) => {
  return useAsyncRetry(async () => {
    const response = await getUserMoments(id)

    return response
  })
}
export const useAllPosts = () => {
  return useAsyncRetry(async () => {
    const response = await getAllPosts()

    return response
  })
}
