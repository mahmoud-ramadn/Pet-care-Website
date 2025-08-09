import { apiClient } from "@/lib/api-client";





export const getUserMoments = async (id: string) => {
  const response = await apiClient<PostApiResponse>({
    url: `community/userMoments/${id}`,
    method: "GET",
    auth: true,
  })
  return response.processedPosts
}
export const getAllPosts = async () => {
  const response = await apiClient<PostApiResponse>({
    url: `community/getAllPosts`,
    method: "GET",
    auth: true,
  })
  return response.processedPosts
}

export const CreatePostCommunity = async (inputs: CreatePostInputs) => {
  const response = await apiClient<CreatePostApi>({
    url: "community/addPost",
    method: "POST",
    data: inputs,
    auth: true,
  })

  return response
}
export const MakeReact = async (id:string) => {
  const response = await apiClient<CreatePostApi>({
    url: `community/likeAndDisLike?postId=${id}`,
    method: "PATCH",
    auth: true,
  })

  return response
}