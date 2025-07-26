type PetItem = {
  _id?: string
  id?: string
  name?: string
  petImage?: string
  type?: "cat" | "dog" | string
  birthday?: string
  category?: string
  gender?: "Male" | "Female" | string
  profileBio?: string
  weight?: number
  size?: "small" | "medium" | "large" | string
  owner?: string
  vaccinations_id?: string[]
}

type PetApiResponse = {
  status?: string
  data?: PetItem[]
}
