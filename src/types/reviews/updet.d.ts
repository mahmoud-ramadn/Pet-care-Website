type updateReviewUser = {
  _id?: string
  name?: string
  profileImage?: string
  id?: string
}

type updateReview = {
  _id?: string
  review?: string
  rating?: number
  createdAt?: string
  service?: string
  user?: User
  __v?: number
  id?: string
}

type updateReviewResponse = {
  status?: "success"
  data?: {
    data?: updateReview
  }
}
