import { ChevronLeft, ChevronRight, Filter, Grid, MapPin, Package, Search } from "lucide-react"

import { useMemo, useState } from "react"
import { Helmet } from "react-helmet"
import { useTranslation } from "react-i18next"

import Hero from "@/components/ui/common/Hero"
import SelectList from "@/components/ui/common/select"
import { ServicesCardSkeleton } from "@/components/ui/feedbacks/services-card-skeleton"
import ServicesCard from "@/components/ui/services/services-card"
import UiTitle from "@/components/ui/ui-title"

import { ProjectImages } from "@/Constants/images"
import { allEgyptGovernorates, servicesMenu } from "@/Constants/main"
import { useServices, useServicesQueryFilter } from "@/hooks/services"

const pageSizeOptions = [4, 8, 20, 30]

export default function Services() {
  const { t } = useTranslation()
  const { value: services, loading, retry } = useServices()
  const { query, mutate } = useServicesQueryFilter()

  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)

  const totalPages = useMemo(() => {
    return Math.ceil((services?.length ?? 0) / itemsPerPage)
  }, [services, itemsPerPage])

  const currentPageItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return services?.slice(startIndex, endIndex) || []
  }, [services, page, itemsPerPage])

  useMemo(() => {
    if (query.serviceType || query.location) {
      retry()
    }
  }, [query.serviceType, query.location])

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setPage(1)
  }

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
  }

  const clearFilters = () => {
    mutate({ serviceType: "", location: "" })
    setPage(1)
    retry()
  }

  const hasActiveFilters = query.serviceType || query.location

  return (
    <>
      <Helmet>
        <title>{t("services.HeroText")}</title>
        <meta name="description" content={t("services.HeroText")} />
      </Helmet>
      <div className="min-h-screen ">
        <Hero MainTitle={t("services.HeroText")} browser={true} imageHero={ProjectImages.services.HeroServices} />

        {/* Enhanced Filters Section */}
        <div className=" backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="container py-6">
            {/* Filter Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Filter Services</h2>
                  <p className="text-sm text-gray-600">Find exactly what you're looking for</p>
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Package className="w-4 h-4 text-blue-500" />
                  Service Type
                </label>
                <SelectList
                  className="w-full"
                  selectedValue={query.serviceType}
                  handleValueChange={(value: string) => mutate({ serviceType: value })}
                  placeholder="All Services"
                  selectList={servicesMenu}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4 text-green-500" />
                  Location
                </label>
                <SelectList
                  className="w-full"
                  selectedValue={query.location}
                  handleValueChange={(value: string) => mutate({ location: value })}
                  placeholder="All Governorates"
                  selectList={allEgyptGovernorates}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Grid className="w-4 h-4 text-purple-500" />
                  Items per page
                </label>
                <SelectList
                  selectList={pageSizeOptions.map(String)}
                  className="w-full"
                  selectedValue={String(itemsPerPage)}
                  handleValueChange={handleItemsPerPageChange}
                  placeholder="Items per page"
                />
              </div>

              {/* Results Summary */}
              <div className="flex items-end">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 w-full">
                  <p className="text-sm font-medium text-gray-700">Found Results</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {services?.length ?? 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap gap-2">
                {query.serviceType && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    <Package className="w-3 h-3" />
                    {query.serviceType}
                  </span>
                )}
                {query.location && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <MapPin className="w-3 h-3" />
                    {query.location}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Services Grid Section */}
        <div className="container py-12">
          <div className="text-center mb-10">
            <UiTitle>Browse Pet Services Near You</UiTitle>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Discover trusted pet care services in your area. From grooming to training, find everything your furry
              friend needs.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading
              ? [...Array(Math.min(itemsPerPage, 8))].map((_, index) => <ServicesCardSkeleton key={index} />)
              : currentPageItems.map((item) => <ServicesCard key={item._id} {...item} />)}

            {!loading && currentPageItems.length === 0 && (
              <div className="col-span-full">
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No services found</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We couldn't find any services matching your current filters. Try adjusting your search criteria.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Pagination */}
        {!loading && totalPages > 1 && (
          <div className="light:bg-white  light:border-t border-gray-200 py-8">
            <div className="container">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Results Info */}
                <div className="text-sm text-gray-600 font-medium">
                  Showing <span className="font-bold text-gray-800">{currentPageItems.length}</span> of{" "}
                  <span className="font-bold text-gray-800">{services?.length ?? 0}</span> results
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={handlePrev}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {[...Array(Math.min(5, totalPages))].map((_, index) => {
                      const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + index
                      if (pageNum > totalPages) return null

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                            pageNum === page
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                              : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    disabled={page === totalPages}
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Page Info */}
              <div className="text-center mt-4">
                <span className="text-sm text-gray-500">
                  Page <span className="font-semibold">{page}</span> of{" "}
                  <span className="font-semibold">{totalPages}</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
