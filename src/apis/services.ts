import { apiClient } from "@/lib/api-client"

export const getServices = async (queryString?: string) => {
  let url = "services/getAllServices"

  if (queryString) {
    const hasServiceType = queryString.includes("serviceType")
    const hasLocation = queryString.includes("location")
    const hasAllServics = queryString.includes("serviceType=All+Services&location")

    if (hasServiceType || hasLocation) {
      url = `services/getService?${queryString}`
    } else if (hasAllServics) {
      url = `services/getAllServices?${queryString}`
    } else {
      url = `services/getAllServices?${queryString}`
    }
  }

  const response = await apiClient<ServiceDataType>({
    url,
    method: "GET",
  })

  return response.shuffledServices
}
