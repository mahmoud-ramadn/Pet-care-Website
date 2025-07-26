import { apiClient } from "@/lib/api-client"

export const getAllVet = async () => {
  const response = await apiClient<VetResponse>({
    url: "vet/getallvet",
    method: "GET",
  })
  return response.data
}

export const getVet = async (id: string) => {
  const response = await apiClient<VetApiResponse>({
    url: `vet/getvet/${id}`,
    method: "GET",
  })
  return response.data.data
}
