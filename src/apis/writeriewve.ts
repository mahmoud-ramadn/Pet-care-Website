import { apiClient } from "@/lib/api-client";





export const serviceWritereivew = async (inputs: InputReviewType,id:string ) => {
  const response = await apiClient<NewReviewType>({
    url: `reviews/createReviewService/${id}`,
    method: "POST",
    data: inputs,
    auth: true,
  })
  return response
}
export const DeleteReivew = async (id:string ) => {
  const response = await apiClient<NewReviewType>({
    url: `reviews/deleteReview/${id}`,
    method: "DELETE",
    auth: true,
  })
  return response
}