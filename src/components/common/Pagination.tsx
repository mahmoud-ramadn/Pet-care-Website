"use client"

import { useEffect, useMemo, useState } from "react"

type PaginationProps = {
  totalItems: number
}

export default function Pagination({ totalItems }: PaginationProps) {
  // Initialize from URL or fallback
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

  // Update URL when page or perPage changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      params.set("page", currentPage.toString())
      params.set("perPage", itemsPerPage.toString())
      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.replaceState({}, "", newUrl)
    }
  }, [currentPage, itemsPerPage])

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  // Compute visible page numbers with dots
  const visiblePages = useMemo(() => {
    const delta = 2
    const range: (number | string)[] = []
    const rangeWithDots: (number | string)[] = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "…")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("…", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }, [currentPage, totalPages])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  return (
    <div className="space-y-4">
      {/* Items per page selector + info */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200 w-fit">
          <span className="text-sm font-medium text-gray-700">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value))
              setCurrentPage(1) // reset when perPage changes
            }}
            className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          >
            {[5, 10, 20, 30, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-600 text-center sm:text-right">
          Showing <span className="font-medium">{totalItems === 0 ? 0 : startIndex + 1}</span>-
          <span className="font-medium">{endIndex}</span> of <span className="font-medium">{totalItems}</span> results
        </div>
      </div>

      {/* Pagination buttons */}
      <div className="flex justify-center sm:justify-between items-center gap-2 flex-wrap">
        {/* Prev */}
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium rounded-lg border bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Prev
        </button>

        {/* Numbers */}
        <div className="flex items-center gap-1">
          {visiblePages.map((p, i) =>
            p === "…" ? (
              <span key={i} className="px-2 text-gray-400">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(Number(p))}
                className={`w-10 h-10 rounded-lg text-sm font-medium ${
                  currentPage === p
                    ? "bg-blue-600 text-white border border-blue-600 shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium rounded-lg border bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
