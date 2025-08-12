import { useAsyncRetry } from "react-use"

import {
  getAllSuccessFullAdoptions,
  getCats,
  getCatsForKids,
  getDogs,
  getDogsForKids,
  getTopCollection,
  getTopCollectionCat,
  getTopCollectionDog,
} from "@/apis/pet"

export const useSuccessfulAdoption = () => {
  return useAsyncRetry(async () => {
    const response = await getAllSuccessFullAdoptions()
    return response
  })
}
export const useTopCollection = () => {
  return useAsyncRetry(async () => {
    const response = await getTopCollection()
    return response
  })
}
export const useTopCollectionDog = () => {
  return useAsyncRetry(async () => {
    const response = await getTopCollectionDog()
    return response
  })
}

export const useTopCollectionCat = () => {
  return useAsyncRetry(async () => {
    const response = await getTopCollectionCat()
    return response
  })
}

export const useDogsForKids = () => {
  return useAsyncRetry(async () => {
    const response = await getDogsForKids()
    return response
  })
}
export const useCatsForKids = () => {
  return useAsyncRetry(async () => {
    const response = await getCatsForKids()
    return response
  })
}
export const useCats = () => {
  return useAsyncRetry(async () => {
    const response = await getCats()
    return response
  })
}
export const useDogs = () => {
  return useAsyncRetry(async () => {
    const response = await getDogs()
    return response
  })
}
