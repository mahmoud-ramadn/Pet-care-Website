interface ApiResponse<T> {
  data: T[]
  results?: number
  status?: string
  status?: "success" | "error"
  totalPages?: number
  totalResults?: number
}
