type Blog = {
  _id?: string
  link?: string
  description?: string
  plogImage?: string
}

interface BlogApiResponse {
  status: "success" | "error"
  data: Blog[]
}
