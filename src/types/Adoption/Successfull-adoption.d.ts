type Pet = {
  _id: string
  id: string
  name: string
  petImage: string
  type: "cat" | "dog" | string
  birthday: string
  category: string
  gender: "Male" | "Female" | string
  profileBio: string
  weight: number
  adoptionDay: string
  size: "small" | "medium" | "large" | string
  owner: string
  shelterInfo: string
  availableForAdoption: boolean
  vaccinations_id: string[]
  successflyAdaped: boolean
}

type PetCard = Pet & {
  className?: string
}
