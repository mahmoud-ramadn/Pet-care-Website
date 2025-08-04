import { useMemo, useState } from "react"

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

  return (
    <div>
      <Hero MainTitle="Find what you are looking for near you" imageHero={ProjectImages.services.HeroServices} />

      <div className="container lg:p-10 p-5 flex flex-wrap gap-5 items-center justify-between">
        <SelectList
          className="basis-[45%]"
          selectedValue={query.serviceType}
          handleValueChange={(value: string) => mutate({ serviceType: value })}
          placeholder="Services"
          selectList={servicesMenu}
        />

        <SelectList
          className="basis-[45%]"
          selectedValue={query.location}
          handleValueChange={(value: string) => mutate({ location: value })}
          placeholder="All Governorates"
          selectList={allEgyptGovernorates}
        />

        <SelectList
          selectList={pageSizeOptions.map(String)}
          className="basis-[20%] min-w-[120px]"
          selectedValue={String(itemsPerPage)}
          handleValueChange={handleItemsPerPageChange}
          placeholder="Items per page"
        />
      </div>

      <div className="container my-16">
        <UiTitle>Browse Pet Services Near You</UiTitle>
        <div className="grid gap-5 my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {loading
            ? [...Array(Math.min(itemsPerPage, 8))].map((_, index) => <ServicesCardSkeleton key={index} />)
            : currentPageItems.map((item) => <ServicesCard key={item._id} {...item} />)}

          {!loading && currentPageItems.length === 0 && (
            <div className="text-center  col-span-4 text-gray-500 py-12">
              No services found for the selected filters.
              <br />
              Please try different filters or check back later.
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-sm font-medium my-10 space-x-3">
        <button
          disabled={page === 1}
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page <strong>{page}</strong> of <strong>{totalPages}</strong> — Showing{" "}
          <strong>{currentPageItems.length}</strong> of <strong>{services?.length ?? 0}</strong> items
        </span>

        <button
          disabled={page === totalPages}
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
