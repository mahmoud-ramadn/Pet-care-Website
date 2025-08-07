import { apiClient } from "@/lib/api-client";

export const getAllSuccessFullAdoptions = async () => {
  const response = await apiClient<PostApiResponse>({
    url: "community/getAllPosts",
    method: "GET",
  })
  return response.processedPosts
}