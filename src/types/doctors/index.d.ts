interface User {
  _id: string
  name: string
  profileImage: string
  id: string
}

interface Review {
  _id: string
  name: string
  email: string
  review: string
  rating: number
  createdAt: string
  shelter?: string
  doctor?: string
  user?: User
  __v?: number
  id?: string
}

interface Doctor {
  viewBtm?: boolean
  _id?: string
  id?: string
  name?: string
  doctorImage?: string
  description?: string
  review?: string
  __v?: number
  numberOfRate?: number
  rate?: number
  about?: string
  accepted_pet_types?: string[]
  imagesProfile?: string[]
  phone?: string
  specialized_in?: string[]
  reviewsOfDoctor?: Review[]
}

interface DoctorApiResponse {
  updatedDoc?: Doctor
}

type DoctorsResponse = {
  doctors: Doctor[]
}

