import { Helmet } from "react-helmet"

import UserPetsListing from "@/components/DashbordTables/userPetsListing"

export default function MyPets() {
  return (
    <>
      <Helmet>
        <title>User Pets</title>
        <meta name="description" content="Manage your pets and their details" />
      </Helmet>
      <UserPetsListing />
    </>
  )
}
