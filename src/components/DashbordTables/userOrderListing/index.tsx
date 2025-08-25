import type { ColumnDef } from "@tanstack/react-table"

import { useEffect, useMemo, useState } from "react"

import { formatPriceEGP } from "@/lib/FormatPriceEGp"

import DataTable from "@/components/ui/data-table"

import { useOrderUser } from "@/hooks/user"

export default function UserOrderListing() {
  const { value: order, loading } = useOrderUser()
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      return parseInt(urlParams.get("page") || "1", 10)
    }
    return 1
  })

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      return parseInt(urlParams.get("perPage") || "5", 10)
    }
    return 5
  })

  // Update URL when page or itemsPerPage changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      params.set("page", currentPage.toString())
      params.set("perPage", itemsPerPage.toString())

      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.replaceState({}, "", newUrl)
    }
  }, [currentPage, itemsPerPage])

  // Reset to page 1 if current page exceeds total pages when data changes
  useEffect(() => {
    if (order && order?.length > 0) {
      const totalPages = Math.ceil(order?.length / itemsPerPage)
      if (currentPage > totalPages) {
        setCurrentPage(1)
      }
    }
  }, [order, itemsPerPage, currentPage])

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

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = order?.slice(startIndex, endIndex) || []
  const totalPages = order ? Math.ceil(order?.length / itemsPerPage) : 1

  // Helper function to get visible page numbers
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <div className="space-y-6">
      <DataTable columns={columns} loading={loading} data={paginatedData} />

      {/* Items per page and results info - Responsive layout */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200 w-fit">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Show:</span>
          <div className="relative">
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => {
                const newItemsPerPage = Number(e.target.value)
                setItemsPerPage(newItemsPerPage)
                setCurrentPage(1) // Reset to first page when changing items per page
              }}
              className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer min-w-0"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Results info */}
        <div className="text-sm text-gray-600 text-center sm:text-right">
          Showing <span className="font-medium">{startIndex + 1}</span>-
          <span className="font-medium">{Math.min(endIndex, order?.length || 0)}</span> of{" "}
          <span className="font-medium">{order?.length || 0}</span> results
        </div>
      </div>

      {/* Pagination controls - Responsive */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        {/* Mobile pagination - Simple */}
        <div className="flex sm:hidden items-center gap-2 w-full">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg min-w-0">
            {currentPage} / {totalPages}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Desktop pagination - Full featured */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Previous button */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {totalPages > 1 &&
              getVisiblePages().map((page, index) => {
                if (page === "...") {
                  return (
                    <span key={`dots-${index}`} className="px-2 text-gray-400">
                      ...
                    </span>
                  )
                }

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(Number(page))}
                    className={`w-10 h-10 text-sm font-medium rounded-lg transition-all ${
                      currentPage === page
                        ? "bg-blue-600 text-white border border-blue-600 shadow-md"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
          </div>

          {/* Next button */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
