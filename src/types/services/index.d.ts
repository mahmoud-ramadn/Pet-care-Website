type ServicesCardType = {
  image: string
  title: string
  price: string
  address: string
  description: string
  rate: number
}

type ServiceProfileType = {
  _id: string
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
  question1?: [string, string]
  question2?: [string, string]
  question3?: [string, string]
  __v?: number
  serviceProfile?: string
  id?: string
}

type ShuffledServiceType = {
  serviceId?: string
  _id?: string
  serviceType?: string
  city?: string
  serviceImage?: string
  rate?: number
  price?: number
  pricePer?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
  serviceProfile?: ServiceProfileType
}

type ServiceDataType = {
  length?: number
  shuffledServices?: ShuffledServiceType[]
}

type request = {
  userId: string
  serviceImage: string
  serviceType: string
  servicePrice: number
  requestTotalPrice: number
  location: string[] // مثال: ["1.1", "2.2"]
  petsId: string[]
  date: string // ISO Date
  time: string
  duration: string
  notes: string
  pickUp: boolean
  payment: string
  paymentImage: string
  country: string
  number: string
  petsNumber: number | null
  completed: boolean
  remindMe3Hours: boolean
  cardNumber: string
  cardExpireDate: string // ISO Date
  cardSecurityCode: string
  saveCard: boolean
  _id: string
  createdAt: string // ISO Date
  updatedAt: string // ISO Date
  __v: number
}

interface RequestResponse {
  status: "success" | "error"
  request: {
    userId: string
    serviceImage: string
    serviceType: string
    servicePrice: number
    requestTotalPrice: number
    location: string[] // مثال: ["1.1", "2.2"]
    petsId: string[]
    date: string // ISO Date
    time: string
    duration: string
    notes: string
    pickUp: boolean
    payment: string
    paymentImage: string
    country: string
    number: string
    petsNumber: number | null
    completed: boolean
    remindMe3Hours: boolean
    cardNumber: string
    cardExpireDate: string // ISO Date
    cardSecurityCode: string
    saveCard: boolean
    _id: string
    createdAt: string // ISO Date
    updatedAt: string // ISO Date
    __v: number
  }
}
