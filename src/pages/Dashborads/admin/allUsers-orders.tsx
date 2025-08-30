import { Helmet } from "react-helmet"

import AllUserOrdersListing from "@/components/DashbordTables/AllUsersOrdersListing"

export default function AllUserOrders() {
  return (
    <>
      <Helmet>
        <title>All User Orders</title>
        <meta name="description" content="Manage all user orders" />
      </Helmet>
      <AllUserOrdersListing />
    </>
  )
}
