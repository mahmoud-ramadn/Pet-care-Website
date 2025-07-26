import { useEffect } from "react"

import Hero from "@/components/ui/common/Hero"
import SelectList from "@/components/ui/common/select"
import { ServicesCardSkeleton } from "@/components/ui/feedbacks/services-card-skeleton"
import ServicesCard from "@/components/ui/services/services-card"
import UiTitle from "@/components/ui/ui-title"

import { ProjectImages } from "@/Constants/images"
import { allEgyptGovernorates, servicesMenu } from "@/Constants/main"
import { useServices, useServicesQueryFilter } from "@/hooks/services"

export default function Services() {
  const { value: services, loading, retry } = useServices()
  const { query, mutate } = useServicesQueryFilter()

  useEffect(() => {
    if (query.serviceType && query.location) {
      retry()
    }
  }, [query.serviceType, query.location])

  return (
    <div>
      <Hero MainTitle="Find what you are looking for near you" imageHero={ProjectImages.services.HeroServices} />

      <div className="container p-10 flex flex-wrap items-center justify-between">
        <SelectList
          className="basis-1/2"
          selectedValue={query.serviceType}
          handleValueChange={(value: string) => mutate({ serviceType: value })}
          placeholder="Services"
          selectList={servicesMenu}
        />

        <SelectList
          selectedValue={query.location}
          handleValueChange={(value: string) => mutate({ location: value })}
          placeholder="All Governorates"
          selectList={allEgyptGovernorates}
        />
      </div>

      <div className="container my-16">
        <UiTitle>browse Pet Services near you</UiTitle>
        <div className="grid gap-5 my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {loading
            ? [...Array(8)].map((_, index) => <ServicesCardSkeleton key={index} />)
            : services?.map((item) => <ServicesCard key={item._id} {...item} />)}
        </div>
      </div>
    </div>
  )
}
