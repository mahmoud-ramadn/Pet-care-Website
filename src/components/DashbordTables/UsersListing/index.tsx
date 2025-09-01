import type { ColumnDef } from "@tanstack/react-table"

import { useMemo } from "react"

import DataTable from "@/components/ui/data-table"

import Pagination from "@/components/common/Pagination"
import { useAllUsers } from "@/hooks/user"

export default function UsersListing() {
  const { value: user, loading } = useAllUsers()

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

  return (
    <div className="space-y-6">
      <DataTable columns={columns} loading={loading} data={user || []} />

      <Pagination totalItems={user?.length || 0} />
    </div>
  )
}
