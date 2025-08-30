import { Helmet } from "react-helmet"

import BlogsListing from "@/components/DashbordTables/BlogsListing/BlogsListing"

export default function blogs() {
  return (
    <>
      <Helmet>
        <title>Blogs Management</title>
        <meta name="description" content="Manage blogs and their content" />
      </Helmet>
      <BlogsListing />
    </>
  )
}
