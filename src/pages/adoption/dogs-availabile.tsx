import { Helmet } from "react-helmet"

import TopCollectionsCard from "@/components/ui/Adoption/top-collections/top-collections-card"
import { PetCardSkeleton } from "@/components/ui/feedbacks/pet-card-skeleton"
import UiTitle from "@/components/ui/ui-title"

import { useDogs } from "@/hooks/pet"

export default function DogAvailabile() {
  const { value: dogs, loading } = useDogs()

  const DogssList = dogs ?? []

  return (
    <>
      <Helmet>
        <title>Dogs for Adoption</title>
        <meta name="description" content="Find your perfect dog for adoption" />
      </Helmet>
      <div className="container">
        <UiTitle className="my-10">Dogs for Adoption</UiTitle>

        <div className="grid  py-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {loading
            ? [...Array(8)].map((_, idx) => <PetCardSkeleton key={idx} />)
            : DogssList.map((item) => <TopCollectionsCard key={item._id} {...item} />)}
        </div>
      </div>
    </>
  )
}
