import type { ColumnDef } from "@tanstack/react-table";



import { useMemo, useState } from "react";



import DataTable from "@/components/ui/data-table";



import { useAllUsers } from "@/hooks/user";





export default function UsersListing() {
    
  const { value: user, loading } = useAllUsers()
  

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5) // Default 10

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: "email",
        header: "emails",
      },
      {
        accessorKey: "name",
        header: "names",
      },
      {
        accessorKey: "role",
        header: "roles",
      },
      {
        accessorKey: "profileImage",
        header: "Profile Images",
        cell: ({ row }) => {
          const User = row.original
          if (!User?.profileImage) return <span className=" text-gray-400"> لايوجد </span>

          return <img className="size-20 rounded-md object-cover border" src={User?.profileImage} alt={User?._id} />
        },
        id: "users-image",
      },
    ],
    []
  )
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = user?.slice(startIndex, endIndex) || []

  const totalPages = user ? Math.ceil(user.length / itemsPerPage) : 1

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