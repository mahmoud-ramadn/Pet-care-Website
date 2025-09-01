import { useEffect, useState } from "react"

interface UsePaginationProps {
  totalItems: number
  defaultItemsPerPage?: number
  defaultPage?: number
}

interface UsePaginationReturn {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  setCurrentPage: (page: number) => void
  setItemsPerPage: (items: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  getVisiblePages: () => (number | string)[]
}

export function usePagination({
  totalItems,
  defaultItemsPerPage = 5,
  defaultPage = 1,
}: UsePaginationProps): UsePaginationReturn {
  // Initialize state from URL params or defaults
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      return parseInt(urlParams.get("page") || defaultPage.toString(), 10)
    }
    return defaultPage
  })

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      return parseInt(urlParams.get("perPage") || defaultItemsPerPage.toString(), 10)
    }
    return defaultItemsPerPage
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

  // Calculate derived values
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Reset to page 1 if current page exceeds total pages when data changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [totalItems, itemsPerPage, currentPage, totalPages])

  // Navigation functions
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  // Helper function to get visible page numbers
  const getVisiblePages = (): (number | string)[] => {
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

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    setCurrentPage,
    setItemsPerPage: handleItemsPerPageChange,
    goToNextPage,
    goToPreviousPage,
    canGoNext: currentPage < totalPages,
    canGoPrevious: currentPage > 1,
    getVisiblePages,
  }
}
