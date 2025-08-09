import { apiClient } from "@/lib/api-client";





export const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append("media", file)

    const response = await apiClient({
      url: "/community/addPost",
      method: "POST",
      data: formData,
      auth: true,
    })
    return response
}