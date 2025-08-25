import { apiClient } from "@/lib/api-client"

export const getAllSuccessFullAdoptions = async () => {
  const response = await apiClient<SuccessfulAdoptionsApiResponse>({
    url: "Pets/successfullyAdaped",
    method: "GET",
  })
  return response
}

export const getTopCollection = async () => {
  const response = await apiClient<PetApiResponse>({
    url: "/Pets/get-top-collection",
    method: "GET",
  })
  return response.data
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

export const getAllPest = async () => {
  const response = await apiClient<PetApiResponse>({
    url: "Pets/getallpets",
    method: "GET",
  })
  return response.data
}

export const getMyPet = async () => {
  const response = await apiClient<PetApiResponse>({
    url: "Pets/getmypets",
    method: "GET",
    auth: true,
  })
  return response.data
}

export const DeletePet = async (id: string) => {
  const response = await apiClient<DeletePetApiResponse>({
    url: `Pets/deletePet/${id}`,
    method: "DELETE",
    auth: true,
  })
  return response.message
}

export const AddPet = async (inputs: string) => {
  const response = await apiClient<PetApiResponse>({
    url: `Pets/addpetuser`,
    method: "POST",
    data: inputs,
    auth: true,
  })
  return response.status
}
