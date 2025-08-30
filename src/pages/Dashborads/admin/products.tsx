import { Helmet } from "react-helmet"

import ProductListing from "@/components/DashbordTables/ProductListing/ProductListing"

export default function products() {
  return (
    <>
      <Helmet>
        <title>Product Management</title>
        <meta name="description" content="Manage products and their details" />
      </Helmet>
      <ProductListing />
    </>
  )
}
