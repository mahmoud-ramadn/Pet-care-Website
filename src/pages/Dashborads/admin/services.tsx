import { Helmet } from "react-helmet"

import ServiceListing from "@/components/DashbordTables/servicesListing"

export default function services() {
  return (
    <>
      <Helmet>
        <title>Service Management</title>
        <meta name="description" content="Manage services and their details" />
      </Helmet>
      <ServiceListing />
    </>
  )
}
