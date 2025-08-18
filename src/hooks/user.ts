import { useAsyncRetry } from "react-use"

import { getAllPosts, getMe, getOneUser, getUserMoments, userOrder } from "@/apis/user"

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

    return response.data?.data
  })
}
export const useGetMe = () => {
  return useAsyncRetry(async () => {
    const response = await getMe()

    return response.data?.data
  })
}

export const useOrderUser = () => {
  return useAsyncRetry(async () => {
    const response = await userOrder()

    return response
  })
}
