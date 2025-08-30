import { Helmet } from "react-helmet"

import UserOrderListing from "@/components/DashbordTables/userOrderListing"

export default function UserDashborad() {
  return (
    <>
      <Helmet>
        <title>User Dashboard</title>
        <meta name="description" content="Manage your orders and account settings" />
      </Helmet>
      <UserOrderListing />
    </>
  )
}
