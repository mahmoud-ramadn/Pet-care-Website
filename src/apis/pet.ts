import { apiClient } from "@/lib/api-client"

export const getAllSuccessFullAdoptions = async () => {
  const response = await apiClient<SuccessfulAdoptionsApiResponse>({
    url: "Pets/successfullyAdaped",
    method: "GET",
  })
  return response
}

export const getTopCollectionCat = async () => {
  const response = await apiClient<PetApiResponse>({
    url: "Pets/get-top-collection-cat",
    method: "GET",
  })
  return response.data
}
export const getTopCollectionDog = async () => {
  const response = await apiClient<PetApiResponse>({
    url: "Pets/get-top-collection-dog",
    method: "GET",
  })
  return response.data
}
export const getDogsForKids = async () => {
  const response = await apiClient<PetApiResponse>({
    url: "Pets/filterdogsforkids",
    method: "GET",
  })
  return response.data
}
export const getCatsForKids = async () => {
  const response = await apiClient<PetApiResponse>({
    url: "Pets/filtercatsforkids",
    method: "GET",
  })
  return response.data
}

export const getCats = async () => {
  const response = await apiClient<PetApiResponse>({
    url: "Pets/getcats",
    method: "GET",
  })
  return response.data
}
export const getDogs = async () => {
  const response = await apiClient<PetApiResponse>({
    url: "Pets/getdogs",
    method: "GET",
  })
  return response.data
}
