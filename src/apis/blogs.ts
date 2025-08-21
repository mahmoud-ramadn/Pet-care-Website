import { apiClient } from "@/lib/api-client";





export const getAllBlogs = async () => {
  const response = await apiClient<BlogApiResponse>({
    url: "Plogs/getallplogs",
    method: "GET",
  })
  return response.data
}

export const creatblog = async (inputs:Blog) => {
  const response = await apiClient<CreateBlogApiResponse>({
    url: "Plogs/createplog",
    data:inputs,
    auth:true,
    method: "POST",
  })
  return response
}