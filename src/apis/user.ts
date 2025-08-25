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
export const MakeReact = async (id: string) => {
  const response = await apiClient<CreatePostApi>({
    url: `community/likeAndDisLike?postId=${id}`,
    method: "PATCH",
    auth: true,
  })

  return response
}

export const userOrder = async () => {
  const response = await apiClient<OrderResponse>({
    url: `order/getallownorder`,
    method: "GET",
    auth: true,
  })

  return response.data
}

export const getOneUser = async (id: string) => {
  const response = await apiClient<GetOneUserResponse>({
    url: `user/getOneUser/${id}`,
    method: "GET",
    auth: true,
  })

  return response
}
export const getAllUser = async () => {
  const response = await apiClient<AllUsersApiResponse>({
    url: "user/getalluser",
    method: "GET",
    auth: true,
  })

  return response.data
}
export const getMe = async () => {
  const response = await apiClient<GetOneUserResponse>({
    url: `user/getuser`,
    method: "GET",
    auth: true,
  })

  return response
}

interface inputsValues {
  name: string
  email: string
  profileImage: string | File
  phoneNumber: string
}

export const updateUserProfile = async (inputs: inputsValues) => {
  const response = await apiClient<UpdateUserProfileResponse>({
    url: `/user/updateuser`,
    method: "PATCH",
    data: inputs,
    auth: true,
  })

  return response.data.data
}



export const getAllUsersOrder = async () => {
  const response = await apiClient<OrderResponse>({
    url: `order/getallorder`,
    method: "GET",
    auth: true,
  })

  return response
}