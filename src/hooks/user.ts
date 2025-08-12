import { useAsyncRetry } from "react-use"

import { getAllPosts, getOneUser, getUserMoments, userOrder } from "@/apis/user"

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
export const useOneUser = (id: string) => {
  return useAsyncRetry(async () => {
    const response = await getOneUser(id)

    return response
  })
}

export const useOrderUser = () => {
  return useAsyncRetry(async () => {
    const response = await userOrder()

    return response
  })
}
