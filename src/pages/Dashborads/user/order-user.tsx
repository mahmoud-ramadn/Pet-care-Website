import { Helmet } from "react-helmet"

import UserOrderListing from "@/components/DashbordTables/userOrderListing"

export default function OrderUser() {
  return (
    <>
      <Helmet>
        <title>User Orders</title>
        <meta name="description" content="Manage your orders and account settings" />
      </Helmet>
      <UserOrderListing />
    </>
  )
}
