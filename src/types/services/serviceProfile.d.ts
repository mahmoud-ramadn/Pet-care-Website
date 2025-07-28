type ServiceProfile = {
  _id?: string
  icon?: string
  name?: string
  description?: string
  rate?: number
  numberOfRate?: number
  imagesProfile?: string[]
  price?: number
  from?: number
  to?: number
  pricePer?: string
  about?: string
  accepted_pet_types?: string[]
  accepted_pet_sizes?: string[]
  question1?: string[]
  question2?: string[]
  question3?: string[]
  __v?: number
  serviceProfile?: string
  reviewsOfService?: Review[]
  id?: string
}
type Review = {
  _id?: string
  name?: string
  email?: string
  review?: string
  rating?: number
  createdAt?: string
  service?: string
  user?: ReviewUser
  __v?: number
  id?: string
}
type ReviewUser = {
  _id?: string
  name?: string
  profileImage?: string
  id?: string
}

type ServiceProfileResponse = {
  updatedDoc?: ServiceProfile
}
