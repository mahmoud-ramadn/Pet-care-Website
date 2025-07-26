type ShelterLocation = {
  coordinates?: [number, number]
  address?: string
  type?: "Point"
}

type ShelterItem = {
  id?: string
  _id?: string
  shelterName?: string
  shelterImage?: string
  shelterNumber?: string
  description?: string
  rate?: number
  numberOfRates?: number
  pets_Id?: string[]
  createdAt?: string
  updatedAt?: string
  __v?: number
  about?: string
  shelterImages?: string[]
  locations?: ShelterLocation
}

type AllSheltersResponse = {
  allShelters?: ShelterItem[]
}
