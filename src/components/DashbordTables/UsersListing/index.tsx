import type { ColumnDef } from "@tanstack/react-table";



import { useMemo } from "react";



import DataTable from "@/components/ui/data-table";



import Pagination from "@/components/common/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { useAllUsers } from "@/hooks/user";





export default function UsersListing() {
  const { value: user, loading } = useAllUsers()

    const totalItems = Array.isArray(user) ? user.length : 0

    const pagination = usePagination({
      totalItems,
      defaultItemsPerPage: 5,
        defaultPage: 1,
      })
    


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

  const paginatedData = Array.isArray(user) ? user.slice(pagination.startIndex, pagination.endIndex) : []

  return (
    <div className="space-y-6">
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