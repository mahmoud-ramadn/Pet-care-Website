import { apiClient } from "@/lib/api-client"

export const getShilters = async () => {
  const response = await apiClient<AllSheltersResponse>({
    url: "shelters/allShelters",
    method: "GET",
  })
  return response.allShelters
}
