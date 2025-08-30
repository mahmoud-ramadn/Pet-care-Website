import { apiClient } from "@/lib/api-client"




export const getallBookings = async () => {
  const response = await apiClient<BookingResponse>({
    url: `request/pastBooking`,
    method: "GET",
    auth: true,
  })

  return response.request
}