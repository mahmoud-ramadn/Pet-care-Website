import { Helmet } from "react-helmet"

import SuccessfullAdoptionCard from "@/components/ui/Adoption/successfull-adoption/successfull-adoption-card"
import { SuccessfullAdoptionCardSkeleton } from "@/components/ui/feedbacks/succefull-adoption-card-skeleton"
import UiTitle from "@/components/ui/ui-title"

import { useSuccessfulAdoption } from "@/hooks/pet"

export default function SucessfullAdoption() {
  const { value: adoptions, loading } = useSuccessfulAdoption()

  const adoptionList = adoptions?.data ?? []

  return (
    <>
      <Helmet>
        <title>Successful Adoptions</title>
        <meta name="description" content="View all successful adoptions" />
      </Helmet>
      <div className="container my-20">
        <UiTitle className=" my-10 text-center">Successful Adoptions</UiTitle>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
          {loading
            ? [...Array(8)].map((_, idx) => <SuccessfullAdoptionCardSkeleton key={idx} />)
            : adoptionList.map((item) => <SuccessfullAdoptionCard key={item._id} {...item} />)}
        </div>
      </div>
    </>
  )
}
