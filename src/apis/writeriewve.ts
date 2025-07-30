import { apiClient } from "@/lib/api-client"

export const serviceWritereivew = async (inputs: InputReviewType, id: string) => {
  const response = await apiClient<NewReviewType>({
    url: `reviews/createReviewService/${id}`,
    method: "POST",
    data: inputs,
    auth: true,
  })
  return response
}
export const DeleteReview = async (id: string) => {
  const response = await apiClient<NewReviewType>({
    url: `reviews/deleteReview/${id}`,
    method: "DELETE",
    auth: true,
  })
  return response
}

export const DoctorsWritereivew = async (inputs: InputReviewType, id: string) => {
  const response = await apiClient<NewReviewType>({
    url: `reviews/createReviewDoctor/${id}`,
    method: "POST",
    data: inputs,
    auth: true,
  })
  return response
}

export const ShilterWritereivew = async (inputs: InputReviewType, id: string) => {
  const response = await apiClient<NewReviewType>({
    url: `reviews/createReviewShelter/${id}`,
    method: "POST",
    data: inputs,
    auth: true,
  })
  return response
}

export const updateReview = async (inputs: InputReviewType, id: string) => {
  const response = await apiClient<updateReviewResponse>({
    url: `reviews/updateReview/${id}`,
    method: "PATCH",
    data: inputs,
    auth: true,
  })
  return response
}
