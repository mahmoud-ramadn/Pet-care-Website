import type { ColumnDef } from "@tanstack/react-table";



import { useMemo } from "react";



import { formatPriceEGP } from "@/lib/FormatPriceEGp";



import DataTable from "@/components/ui/data-table";



import { usePagination } from "@/hooks/usePagination";
import { useAllOrderUsers } from "@/hooks/user";
import Pagination from "@/components/common/Pagination";





export default function AllUserOrdersListing() {
  const { value: order, loading } = useAllOrderUsers()

  const totalItems = Array.isArray(order) ? order.length : 0

  const pagination = usePagination({
    totalItems,
    defaultItemsPerPage: 5,
      defaultPage: 1,
    })
  
  const columns: ColumnDef<Order>[] = useMemo(() => {
    return [
      {
        accessorKey: "totalOrderPrice",
        header: "Total Order Price",
        cell: ({ row }) => {
          const totalPrice = row?.original.totalOrderPrice
          if (!totalPrice) return <span className="text-gray-400">Zero</span>

          return <span className="font-medium">{formatPriceEGP(totalPrice)}</span>
        },
      },
      {
        accessorKey: "paymentMethodType",
        header: "Payment Method",
        cell: ({ row }) => {
          const method = row?.original.paymentMethodType
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
          const status = row?.original.isPaidAndDelivered
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
          const cartItems = row?.original?.cartItems
          if (!cartItems) return <span className="text-gray-400">No items</span>

          return <span className="font-medium">{cartItems.length}</span>
        },
      },
      {
        accessorKey: "shippingAddress.city",
        header: "City",
        cell: ({ row }) => {
          const city = row.original?.shippingAddress?.city
          if (!city) return <span className="text-gray-400">No city</span>

          return <span>{city}</span>
        },
      },
      {
        accessorKey: "shippingAddress.phone",
        header: "Phone",
        cell: ({ row }) => {
          const phone = row.original?.shippingAddress?.phone
          if (!phone) return <span className="text-gray-400">No phone</span>

          return <span className="font-mono text-sm">{phone}</span>
        },
      },
      {
        accessorKey: "shippingAddress.details",
        header: "Address Details",
        cell: ({ row }) => {
          const details = row.original?.shippingAddress?.details
          if (!details) return <span className="text-gray-400">No details</span>

          return (
            <span className="max-w-xs truncate block" title={details}>
              {details}
            </span>
          )
        },
      },
    ]
  }, [])

  const paginatedData = Array.isArray(order) ? order.slice(pagination.startIndex, pagination.endIndex) : []


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