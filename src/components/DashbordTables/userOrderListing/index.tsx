import type { ColumnDef } from "@tanstack/react-table"

import { useMemo } from "react"

import DataTable from "@/components/ui/data-table"

import { useOrderUser } from "@/hooks/user"

export default function UserOrderListing() {
  const { value: order, loading } = useOrderUser()
  const columns: ColumnDef<Order>[] = useMemo(() => {
    return [
      { accessorKey: "totalOrderPrice", header: "  total Order Price" },
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

  return <DataTable columns={columns} loading={loading} data={order ?? []} />
}
