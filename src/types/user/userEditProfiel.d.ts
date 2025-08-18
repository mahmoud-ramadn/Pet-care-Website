type Pet = {
  _id: string
  name: string
  type: string
  gender: string
  weight: number
  petImage: string
  owner: string
  user: string
  vaccinations_id: string[]
  __v?: number
}

type GetOneUserResponse = {
  status?: string
  data?: {
    data?: {
      _id: string
      id: string
      name: string
      email: string
      phoneNumber: string
      profileImage: string
      role: "user" | "admin" | string
      cards: string[]
      favPet: string[]
      favProduct: string[]
      followers: string[]
      following: string[]
      pets: string[]
      pet: Pet[]
      services_id: string[]
      __v?: number
    }
  }
}

type UpdateUserProfileResponse = {
  status: "success"
  data: {
    data: {
      _id: string
      name: string
      email: string
      profileImage: string
      pets: []
      role: "user" | "admin" | string
      services_id: []
      followers: []
      following: []
      favPet: []
      favProduct: []
      cards: []
      __v: number
      phoneNumber: string
      id: string
    }
  }
}
