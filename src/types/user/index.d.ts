type Post = {
  _id: string
  userId: string
  userImage: string
  userName: string
  postImage: string
  description: string
  likesNumber: number
  likes_Id: string[]
  onlyMe: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

type ProcessedPost = {
  post: Post
  liked: boolean
}

type PostApiResponse = {
  processedPosts: ProcessedPost[]
}

type CreatePostApi = {
  userId: string
  userImage: string
  userName: string
  postImage: string
  description: string
  likesNumber: number
  likes_Id: string[]
  onlyMe: boolean
  _id: string
  createdAt: string // أو Date لو هتحوله
  updatedAt: string // أو Date
  __v: number
}

interface CreatePostInputs {
  postImage: string
  description: string
  onlyMe: boolean
}
