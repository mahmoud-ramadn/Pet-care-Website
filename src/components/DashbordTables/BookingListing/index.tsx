import type { ColumnDef } from "@tanstack/react-table"

import { useMemo } from "react"

import DataTable from "@/components/ui/data-table"

import Pagination from "@/components/common/Pagination"
import { useBookingService } from "@/hooks/shilters"

export default function BookingListing() {
  const { value: bookings, loading } = useBookingService()

  const columns: ColumnDef<Book>[] = useMemo(
    () => [
      {
        accessorKey: "serviceType",
        header: "Service Type",
      },
      {
        accessorKey: "notes",
        header: "Notes",
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "completed",
        header: "Completed",
      },
      {
        accessorKey: "time",
        header: "Time",
      },
      {
        accessorKey: "payment",
        header: "Payment",
      },
      {
        accessorKey: "duration",
        header: "Duration",
      },
      {
        accessorKey: "number",
        header: "Number",
      },
      {
        accessorKey: "serviceImage",
        header: "Service Images",
        cell: ({ row }) => {
          const User = row.original
          if (!User?.serviceImage) return <span className=" text-gray-400"> لايوجد </span>

          return <img className="size-20 rounded-md object-cover border" src={User?.serviceImage} alt={User?._id} />
        },
        id: "users-image",
      },
      {
        accessorKey: "paymentImage",
        header: "Payment Images",
        cell: ({ row }) => {
          const User = row.original
          if (!User?.paymentImage) return <span className=" text-gray-400"> لايوجد </span>

          return <img className="size-20 rounded-md object-cover border" src={User?.paymentImage} alt={User?._id} />
        },
      },
    ],
    []
  )

  return (
    <div className="space-y-6">
      <DataTable columns={columns} loading={loading} data={bookings || []} />

      <Pagination totalItems={bookings?.length || 0} />
    </div>
  )
}
