 type ShelterResponse = {
  _id?: string
  id?: string
  shelterName?: string
  shelterImage?: string
  shelterImages: string[]
  shelterNumber?: string
  description?: string
  rate?: number
  numberOfRates?: number
  about?: string
  pets_Id?: string[]
  createdAt?: string
  updatedAt?: string
  __v?: number
  locations?: {
    coordinates?: [number, number]
    address?: string
    type?: string
  }
  reviewsOfShelter?: {
    _id?: string
    id?: string
    name?: string
    email?: string
    review?: string
    rating?: number
    createdAt?: string
    shelter?: string
    __v?: number
    user?: {
      _id?: string
      id?: string
      name?: string
      profileImage?: string
    }
  }[]
}
