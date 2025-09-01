import type { ColumnDef } from "@tanstack/react-table"

import { useMemo } from "react"

import { formatPriceEGP } from "@/lib/FormatPriceEGp"

import DataTable from "@/components/ui/data-table"

import Pagination from "@/components/common/Pagination"
import { useOrderUser } from "@/hooks/user"

export default function UserOrderListing() {
  const { value: order, loading } = useOrderUser()

  const columns: ColumnDef<Order>[] = useMemo(() => {
    return [
      {
        accessorKey: "totalOrderPrice",
        header: "  total Order Price",
        cell: ({ row }) => {
          const TotalPirc = row?.original.totalOrderPrice
          if (!TotalPirc) return <span className="text-gray-400"> zero</span>

          return <span>{formatPriceEGP(TotalPirc)}</span>
        },
      },
      { accessorKey: "paymentMethodType", header: " payment Method Type" },
      { accessorKey: "isPaidAndDelivered", header: "is Paid And Delivered" },
      {
        accessorKey: "cartItems",
        header: "cartItems",
        cell: ({ row }) => {
          const quantity = row?.original?.cartItems
          if (!quantity) return <span className="text-gray-400">No quantity</span>

          return <span>{quantity.length}</span>
        },
      },
      {
        accessorKey: "shippingAddress",
        header: "shipping Address",
        cell: ({ row }) => {
          const Addresss = row.original?.shippingAddress?.city
          if (!Addresss) return <span className="text-gray-400">No quantity</span>

          return <span>{Addresss}</span>
        },
      },
      {
        accessorKey: "shipping Address details ",
        header: "shipping Address",
        cell: ({ row }) => {
          const Addresss = row.original?.shippingAddress?.details
          if (!Addresss) return <span className="text-gray-400">No quantity</span>

          return <span>{Addresss}</span>
        },
      },
    ]
  }, [])

  return (
    <div className="space-y-6">
      <DataTable columns={columns} loading={loading} data={order || []} />

      <Pagination totalItems={order?.length || 0} />
    </div>
  )
}
