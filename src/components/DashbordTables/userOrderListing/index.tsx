import type { ColumnDef } from "@tanstack/react-table"

import { useMemo } from "react"

import DataTable from "@/components/ui/data-table"

import { useOrderUser } from "@/hooks/user"

export default function UserOrderListing() {
  const { value: order, loading } = useOrderUser()
  const columns: ColumnDef<Order>[] = useMemo(() => {
    return [
      { accessorKey: "totalOrderPrice", header: "  total Order Price" },
      { accessorKey: "taxPrice", header: "taxPrice" },
      { accessorKey: "paymentMethodType", header: " payment Method Type" },
      { accessorKey: "isPaidAndDelivered", header: "is Paid And Delivered" },
      { accessorKey: "shippingPrice", header: "shipping Price" },
      {
        accessorKey: "cartItems",
        header: "cartItems",
        cell: ({ row }) => {
          const quantity = row.original.cartItems[0]
          if (!quantity) return <span className="text-gray-400">No quantity</span>

          return <span>{quantity.quantity}</span>
        },
      },
    ]
  }, [])

  return <DataTable columns={columns} loading={loading} data={order ?? []} />
}
