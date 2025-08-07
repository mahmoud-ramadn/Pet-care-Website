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
