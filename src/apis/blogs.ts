import { apiClient } from "@/lib/api-client"

export const getAllBlogs = async () => {
  const response = await apiClient<BlogApiResponse>({
    url: "Plogs/getallplogs",
    method: "GET",
  })
  return response.data
}
