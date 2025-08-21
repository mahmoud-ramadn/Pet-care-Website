import { useParams } from "react-router"

import UserProfileUpdateForm from "@/components/forms/updateUserForm"
import { useOneUser } from "@/hooks/user"

export default function UserEditProfile() {
  const id = useParams().id
  const { value: userData } = useOneUser(id ?? "")

  const formattedUserData = userData
    ? {
        ...userData,
        role: userData.role as "admin" | "user",
        pets: userData.pets || [],
        pet: undefined,
      }
    : undefined

  return <UserProfileUpdateForm value={formattedUserData} />
}
