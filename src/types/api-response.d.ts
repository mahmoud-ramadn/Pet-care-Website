interface ApiResponse<T> {
  data: T[]
  results?: number
  status?: string
}
