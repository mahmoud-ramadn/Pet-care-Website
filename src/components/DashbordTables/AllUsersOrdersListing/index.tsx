import type { ColumnDef } from "@tanstack/react-table"

import { useMemo } from "react"

import { formatPriceEGP } from "@/lib/FormatPriceEGp"

import DataTable from "@/components/ui/data-table"

import Pagination from "@/components/common/Pagination"
import { useAllOrderUsers } from "@/hooks/user"

export default function AllUserOrdersListing() {
  const { value: order, loading } = useAllOrderUsers()

  const columns: ColumnDef<Order>[] = useMemo(
    () => [
      {
        accessorKey: "totalOrderPrice",
        header: "Total Order Price",
        cell: ({ row }) => {
          const totalPrice = row.original.totalOrderPrice
          return totalPrice ? (
            <span className="font-medium">{formatPriceEGP(totalPrice)}</span>
          ) : (
            <span className="text-gray-400">Zero</span>
          )
        },
      },
      {
        accessorKey: "paymentMethodType",
        header: "Payment Method",
        cell: ({ row }) => {
          const method = row.original.paymentMethodType
          return (
            <span
              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                method === "cash" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
              }`}
            >
              {method}
            </span>
          )
        },
      },
      {
        accessorKey: "isPaidAndDelivered",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.isPaidAndDelivered
          return (
            <span
              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {status ? "Delivered" : "Pending"}
            </span>
          )
        },
      },
      {
        accessorKey: "cartItems",
        header: "Items Count",
        cell: ({ row }) => {
          const cartItems = row.original?.cartItems
          return cartItems?.length ? (
            <span className="font-medium">{cartItems.length}</span>
          ) : (
            <span className="text-gray-400">No items</span>
          )
        },
      },
      {
        accessorKey: "shippingAddress.city",
        header: "City",
        cell: ({ row }) => row.original?.shippingAddress?.city || <span className="text-gray-400">No city</span>,
      },
      {
        accessorKey: "shippingAddress.phone",
        header: "Phone",
        cell: ({ row }) =>
          row.original?.shippingAddress?.phone ? (
            <span className="font-mono text-sm">{row.original.shippingAddress.phone}</span>
          ) : (
            <span className="text-gray-400">No phone</span>
          ),
      },
      {
        accessorKey: "shippingAddress.details",
        header: "Address Details",
        cell: ({ row }) => {
          const details = row.original?.shippingAddress?.details
          return details ? (
            <span className="max-w-xs truncate block" title={details}>
              {details}
            </span>
          ) : (
            <span className="text-gray-400">No details</span>
          )
        },
      },
    ],
    []
  )

  return (
    <div className="space-y-6">
      <DataTable columns={columns} loading={loading} data={order || []} />

      <Pagination totalItems={order?.length || 0} />
    </div>
  )
}
