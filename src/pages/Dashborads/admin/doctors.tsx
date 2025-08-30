import { Helmet } from "react-helmet"

import DoctorsListing from "@/components/DashbordTables/DoctorsListing"

export default function doctorsTable() {
  return (
    <>
      <Helmet>
        <title>Doctors Management</title>
        <meta name="description" content="Manage doctors and their details" />
      </Helmet>
      <DoctorsListing />
    </>
  )
}
