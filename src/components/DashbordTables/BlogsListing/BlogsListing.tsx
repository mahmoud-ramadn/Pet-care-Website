import type { ColumnDef } from "@tanstack/react-table";



import { useMemo } from "react";



import DataTable from "@/components/ui/data-table";



import Pagination from "@/components/common/Pagination";
import { useBlog } from "@/hooks/blogs";



import { AddBlogDialog } from "./AddBlogDialog";
import { usePagination } from "@/hooks/usePagination";





export default function BlogsListing() {
  const { value: blog, loading } = useBlog()
  const totalItems = Array.isArray(blog) ? blog.length : 0

  const pagination = usePagination({
    totalItems,
    defaultItemsPerPage: 5,
      defaultPage: 1,
    })
  

  const columns: ColumnDef<Blog>[] = useMemo(
    () => [
      {
        accessorKey: "description",
        header: "Blog description",
      },
      {
        accessorKey: "link",
        header: "Blog Link",
        cell: ({ row }) => {
          const Blog = row.original
          if (!Blog?.plogImage) return <span className="text-gray-400"> لايوجد </span>
          return (
            <a href={Blog.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {Blog.link}
            </a>
          )
        },
        id: "blog-link", // ✅ unique id
      },
      {
        accessorKey: "plogImage",
        header: "Blog Image",
        cell: ({ row }) => {
          const product = row.original
          if (!product?.plogImage) return <span className="text-gray-400"> لايوجد </span>
          return <img className="size-20 rounded-md object-cover border" src={product?.plogImage} alt={product?._id} />
        },
        id: "blog-image", // ✅ unique id
      },
    ],
    []
  )

  const paginatedData = Array.isArray(blog) ? blog.slice(pagination.startIndex, pagination.endIndex) : []

  return (
    <div className=" space-y-7">
      <AddBlogDialog />
      <DataTable columns={columns} loading={loading} data={paginatedData} />

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        itemsPerPage={pagination.itemsPerPage}
        totalItems={totalItems}
        startIndex={pagination.startIndex}
        endIndex={pagination.endIndex}
        canGoNext={pagination.canGoNext}
        canGoPrevious={pagination.canGoPrevious}
        onPageChange={pagination.setCurrentPage}
        onItemsPerPageChange={pagination.setItemsPerPage}
        onNextPage={pagination.goToNextPage}
        onPreviousPage={pagination.goToPreviousPage}
        getVisiblePages={pagination.getVisiblePages}
      />
    </div>
  )
}