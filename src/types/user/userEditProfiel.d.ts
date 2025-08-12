type GetOneUserResponse = {
  status?: string
  data?: {
    data?: {
      _id?: string
      name?: string
      email?: string
      profileImage?: string
      phoneNumber?: string
      pets?: string[]
      role?: "user" | "admin"
      services_id?: string[]
      followers?: string[]
      following?: string[]
      favPet?: string[]
      favProduct?: string[]
      cards?: string[]
      __v?: number
      pet?: string[]
      id?: string
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
