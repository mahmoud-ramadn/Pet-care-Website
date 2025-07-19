import { apiClient } from "@/lib/api-client"

export const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append("media", file)

    const response = await apiClient<UploadResponse[]>({
        url: "/upload",
        method: "POST",
        data: formData,
        auth: true,
    })
    return response
}
