import type { ColumnDef } from "@tanstack/react-table"

import { useMemo } from "react"

import DataTable from "@/components/ui/data-table"

import Pagination from "@/components/common/Pagination"
import { useServices } from "@/hooks/services"

export default function ServiceListing() {
  const { value: services, loading } = useServices()

  const columns: ColumnDef<ShuffledServiceType>[] = useMemo(() => {
    return [
      { accessorKey: "serviceType", header: "Service Type" },
      { accessorKey: "city", header: "City" },
      {
        accessorKey: "serviceImage",
        header: "Service Image",
        cell: ({ row }) => {
          const image = row.original.serviceImage
          if (!image) return <span className="text-gray-400">No Image</span>
          return <img src={image} alt="Service" className="size-16 rounded-md object-cover border" />
        },
      },
      { accessorKey: "rate", header: "Rate" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "pricePer", header: "Price Per" },
      {
        id: "profileName",
        header: "Profile Name",
        cell: ({ row }) => row.original.serviceProfile?.name || <span className="text-gray-400">N/A</span>,
      },
      {
        id: "profileIcon",
        header: "Profile Icon",
        cell: ({ row }) => {
          const icon = row.original.serviceProfile?.icon
          if (!icon) return <span className="text-gray-400">No Icon</span>
          return <img src={icon} alt="Profile Icon" className="size-10 rounded-full object-cover border" />
        },
      },
      {
        id: "profileDescription",
        header: "Profile Description",
        cell: ({ row }) => row.original.serviceProfile?.description || <span className="text-gray-400">N/A</span>,
      },
      {
        id: "profileRate",
        header: "Profile Rate",
        cell: ({ row }) => row.original.serviceProfile?.rate ?? <span className="text-gray-400">N/A</span>,
      },
      {
        id: "profileNumberOfRate",
        header: "Number Of Rates",
        cell: ({ row }) => row.original.serviceProfile?.numberOfRate ?? <span className="text-gray-400">N/A</span>,
      },
      {
        id: "acceptedPetTypes",
        header: "Accepted Pet Types",
        cell: ({ row }) => {
          const types = row.original.serviceProfile?.accepted_pet_types
          return types && types.length > 0 ? types.join(", ") : "لايوجد"
        },
      },
      {
        id: "question1",
        header: "Question 1",
        cell: ({ row }) => {
          const q = row.original.serviceProfile?.question1
          if (!q) return <span className="text-gray-400">N/A</span>
          return (
            <div>
              <div className="font-semibold">{q[0]}</div>
              <div className="text-sm text-gray-500">{q[1]}</div>
            </div>
          )
        },
      },
      {
        id: "question2",
        header: "Question 2",
        cell: ({ row }) => {
          const q = row.original.serviceProfile?.question2
          if (!q) return <span className="text-gray-400">N/A</span>
          return (
            <div>
              <div className="font-semibold">{q[0]}</div>
              <div className="text-sm text-gray-500">{q[1]}</div>
            </div>
          )
        },
      },
      {
        id: "question3",
        header: "Question 3",
        cell: ({ row }) => {
          const q = row.original.serviceProfile?.question3
          if (!q) return <span className="text-gray-400">N/A</span>
          return (
            <div>
              <div className="font-semibold">{q[0]}</div>
              <div className="text-sm text-gray-500">{q[1]}</div>
            </div>
          )
        },
      },
    ]
  }, [])

  return (
    <div className="space-y-6">
      <DataTable columns={columns} loading={loading} data={services || []} />

      <Pagination totalItems={services?.length || 0} />
    </div>
  )
}
