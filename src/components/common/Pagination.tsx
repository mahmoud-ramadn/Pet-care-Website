import React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
  startIndex: number
  endIndex: number
  canGoNext: boolean
  canGoPrevious: boolean
  onPageChange: (page: number) => void
  onItemsPerPageChange: (items: number) => void
  onNextPage: () => void
  onPreviousPage: () => void
  getVisiblePages: () => (number | string)[]
  itemsPerPageOptions?: number[]
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  startIndex,
  endIndex,
  canGoNext,
  canGoPrevious,
  onPageChange,
  onItemsPerPageChange,
  onNextPage,
  onPreviousPage,
  getVisiblePages,
  itemsPerPageOptions = [5, 10, 20, 30, 50],
}) => {
  return (
    <div className="space-y-6">
      {/* Items per page and results info - Responsive layout */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200 w-fit">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Show:</span>
          <div className="relative">
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer min-w-0"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
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
          <span className="font-medium">{Math.min(endIndex, totalItems)}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </div>
      </div>

      {/* Pagination controls - Responsive */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        {/* Mobile pagination - Simple */}
        <div className="flex sm:hidden items-center gap-2 w-full">
          <button
            onClick={onPreviousPage}
            disabled={!canGoPrevious}
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
            onClick={onNextPage}
            disabled={!canGoNext}
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
            onClick={onPreviousPage}
            disabled={!canGoPrevious}
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
                    onClick={() => onPageChange(Number(page))}
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
            onClick={onNextPage}
            disabled={!canGoNext}
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

export default Pagination
