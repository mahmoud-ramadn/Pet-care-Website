import { Helmet } from "react-helmet"

import UsersListing from "@/components/DashbordTables/UsersListing"

export default function Users() {
  return (
    <>
      <Helmet>
        <title>User Management</title>
        <meta name="description" content="Manage users and their roles" />
      </Helmet>
      <UsersListing />
    </>
  )
}
