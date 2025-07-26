type CircleCardType = {
  id: string
  image: string
  path?: string
  name: string
  specific: string
}

type VetLocation = {
  coordinates?: [number, number]
  address?: string
  type?: string
}

type VetDataItem = {
  locations?: VetLocation
  _id?: string
  vetName?: string
  vetImage?: string
  bio?: string
  rate?: number
  numberOfRate?: string
  review?: string
  callNumber?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
  desc?: string
}

type VetResponse = {
  results?: number
  data?: VetDataItem[]
}

interface Coordinates extends Array<number> {
  0: number // longitude
  1: number // latitude
}
interface Location {
  coordinates: Coordinates
  address: string
  type: "Point"
}

interface VetClinic {
  _id: string
  vetName: string
  vetImage: string
  bio: string
  rate: number
  numberOfRate: string
  review: string
  callNumber: string
  createdAt: string
  updatedAt: string
  desc: string
  locations: Location
  __v: number
}

interface VetApiResponse {
  status: "success" | "error"
  data: {
    data: VetClinic
  }
}
