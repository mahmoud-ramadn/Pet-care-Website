type LoginUser = {
  _id: string
  id: string
  name: string
  email: string
  profileImage: string
  phoneNumber: string
  role: "admin" | "user" | string
  followers: string[]
  following: string[]
  pets: string[]
  services_id: string[]
  favPet: string[]
  favProduct: string[]
  cards: string[]
  __v: number
}

type InputType = {
  email: string
  password: string
}

type AuthResponseSuccess<T> = {
  status: "success"
  token: string
  data: {
    result: T
  }
}
