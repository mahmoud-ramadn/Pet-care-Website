import { apiClient } from "@/lib/api-client"

export const getAllDoctors = async () => {
  const response = await apiClient<DoctorsResponse>({
    url: "doctors/getdoctors",
    method: "GET",
  })
  return response.doctors
}

export const getDoctor = async (id: string) => {
  const response = await apiClient<DoctorApiResponse>({
    url: `doctors/get-doctor/${id}`,
    method: "GET",
  })
  return response.updatedDoc
}
