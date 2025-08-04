import { merge } from "lodash-es"
import NProgress from "nprogress"
import { ofetch } from "ofetch"

// Configure NProgress
NProgress.configure({ showSpinner: false })

type Options = {
  url?: string
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  retry?: number
  timeout?: number
  headers?: HeadersInit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  auth?: boolean
}

/**
 * Unified API Client
 */
export const apiClient = async <T>(options: Options): Promise<T> => {
  try {
    const { url, method = "GET", retry = 0, timeout = 10000, data, auth = false } = options

    if (!url && !import.meta.env.VITE_API_URL) {
      throw new Error("❌ Missing API URL")
    }

    const base = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || ""
    const path = url?.replace(/^\/+/, "") || ""
    const fullURL = url?.includes("http") ? url : `${base}/${path}`

    let headers: Record<string, string> = {}

    // Add Authorization if needed
    if (auth) {
      const token = localStorage.getItem("token")
      if (!token) {
        console.warn("🔒 Token is missing. Request blocked.")
        return Promise.reject({
          statusCode: 401,
          message: "Unauthorized: No token found in localStorage",
        })
      }
      headers.Authorization = `Bearer ${token.replace(/"/g, "")}`
    }

    // Merge custom headers
    if (options.headers) {
      headers = merge(headers, options.headers as Record<string, string>)
    }

    // Don't set Content-Type for FormData - let the browser set it with boundary
    const isFormData = data instanceof FormData
    if (isFormData) {
      // Remove Content-Type header if it exists, let browser set it for FormData
      if (headers["Content-Type"]) {
        delete headers["Content-Type"]
      }
    }

    const response = await ofetch<T>(fullURL, {
      method,
      headers,
      retry,
      timeout,
      ...(data && { body: data }),
      onRequest: () => NProgress.start(),
      onResponse: () => NProgress.done(),
      onRequestError: () => NProgress.done(),
      onResponseError: () => NProgress.done(),
    })

    return response
  } catch (error) {
    console.error("🌐 API Error:", error)
    return Promise.reject(error)
  }
}
