interface RegisterFormType {
  name: string
  email: string
  password: string
  role: "admin" | "user"
  confirmPassword?: string
}

type AuthResponse<T> = {
  status: "success"
  token: string
  result: T
}

type User = {
  _id: string
  id: string
  name: string
  email: string
  role: "user" | "admin"
  phoneNumber?: string

  profileImage: string
  cards: unknown[] // استبدل unknown بنوع مناسب لاحقًا
  favPet: unknown[]
  favProduct: unknown[]
  followers: unknown[]
  following: unknown[]
  pets: unknown[]
  services_id: unknown[]
  __v: number
}

type AllUsersApiResponse = {
  results: number
  data: UserData[]
}

type ErrorResponse = {
  status: "fail" | "error"
  statusCode: number
  message: string
  isOperational: boolean
  stack?: string
  error: {
    statusCode: number
    status: "fail" | "error"
    isOperational: boolean
  }
}
