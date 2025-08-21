import type { ColumnDef } from "@tanstack/react-table";



import { useMemo, useState } from "react";



import DataTable from "@/components/ui/data-table";



import { useBlog } from "@/hooks/blogs";
import { AddBlogDialog } from "./AddBlogDialog";





export default function BlogsListing() {
    const {value:blog,loading}=useBlog();
    
      const [currentPage, setCurrentPage] = useState(1)
      const [itemsPerPage, setItemsPerPage] = useState(5) // Default 10

      const columns: ColumnDef<Blog>[] = useMemo(
        () => [
          {
            accessorKey: "description",
            header: "Blog description",
          },
          {
            accessorKey: "link",
            header: "Blog description",
            cell: ({ row }) => {
              const Blog = row.original
              if (!Blog?.plogImage) return <span className=" text-gray-400"> لايوجد </span>

              return (
                <a
                   href={Blog.link}
                 target="_blank"
                   >
                    {Blog.link}
                   </a>
              )
            },
            id: "product-image",
          },
          {
            accessorKey: "plogImage",
            header: "Blog Image",
            cell: ({ row }) => {
              const product = row.original
              if (!product?.plogImage) return <span className=" text-gray-400"> لايوجد </span>

              return (
                <img className="size-20 rounded-md object-cover border" src={product?.plogImage} alt={product?._id} />
              )
            },
            id: "product-image",
          },
        ],
        []
      )
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = blog?.slice(startIndex, endIndex) || []

  const totalPages = blog ? Math.ceil(blog.length / itemsPerPage) : 1

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(1) 
  }


    
  return (
 <div className=" space-y-7">
    <AddBlogDialog/>
      <DataTable columns={columns} loading={loading} data={paginatedData} />
       <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="itemsPerPage">Show:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
       <div className="flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

    )
}