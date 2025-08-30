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

export const getServiceProfile = async (serviceId: string) => {
  const response = await apiClient<ServiceProfileResponse>({
    url: `serviceProfile/get-serviceProfile/${serviceId}`,
    method: "GET",
  })

  return response.updatedDoc
}

type CreateProductInputs = {
  serviceType: string
  servicePrice: number
  requestTotalPrice: number
  date: string
  time: string
  duration: string
  location: string[]
  notes: string
  pickUp: boolean
  payment: string
  country: string
  number: string
  petsNumber: number | null
  completed: boolean
  remindMe3Hours: boolean
  cardNumber: string
  cardExpireDate: string
  cardSecurityCode: string
  saveCard: boolean
}

export const CreateBookingRequest = async (inputs: CreateProductInputs) => {
  const response = await apiClient<RequestResponse>({
    url: "request/addRequest",
    method: "POST",
    data: inputs,
    auth: true,
  })

  return response.status
}
