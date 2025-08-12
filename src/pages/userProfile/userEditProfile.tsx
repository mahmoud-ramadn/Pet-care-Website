import { useParams } from "react-router"

import UserProfileUpdateForm from "@/components/forms/updateUserForm"
import { useOneUser } from "@/hooks/user"

export default function UserEditProfile() {
  const id = useParams().id
  const { value: userData } = useOneUser(id ?? "")

  return <UserProfileUpdateForm value={userData} />
}
