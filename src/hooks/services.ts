import { parseAsString, useQueryStates } from "nuqs"

import { useAsyncRetry } from "react-use"

import { getParamsEncodedQuery } from "@/lib/map"

import { getServiceProfile, getServices } from "@/apis/services"

export const useServicesQueryFilter = () => {
  const [query, setQuery] = useQueryStates({
    serviceType: parseAsString.withDefault(""),
    location: parseAsString.withDefault(""),
  })

  const mutate = (input: Partial<typeof query>) => {
    setQuery({
      ...query,
      ...input,
    })
  }
  return { query, mutate }
}

export const useServices = () => {
  const { query } = useServicesQueryFilter()
  return useAsyncRetry(async () => {
    const apiParams = {
      serviceType: query?.serviceType,
      location: query?.location,
    }
    const response = await getServices(getParamsEncodedQuery(apiParams))
    return response
  })
}

export const useServiceProfile = (serviceId: string) => {
  return useAsyncRetry(async () => {
    const response = await getServiceProfile(serviceId)
    return response
  })
}
