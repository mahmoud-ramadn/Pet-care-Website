import { apiClient } from "@/lib/api-client";





export const getShilters = async () => {
  const response = await apiClient<AllSheltersResponse>({
    url: "shelters/allShelters",
    method: "GET",
  })
  return response.allShelters
}




export const getShilter = async (id:string) => {
    const response = await apiClient<ShelterResponse>({
      url: `shelters/getShelter/${id}`,
      method: "GET",
    })
  return response
}