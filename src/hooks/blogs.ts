import { useAsyncRetry } from "react-use"

import { getAllBlogs } from "@/apis/blogs"

export const useBlog = () => {
  return useAsyncRetry(async () => {
    const response = await getAllBlogs()
    return response
  })
}
