import { Helmet } from "react-helmet"

import { CircleCardSkeleton } from "@/components/ui/feedbacks/circle-card-skeleton"
import UiTitle from "@/components/ui/ui-title"

import { useDoctors } from "@/hooks/doctors"
import CircleCard from "@/layouts/Vet/circel-card"

export default function Doctors() {
  const { value: doctors, loading } = useDoctors()

  return (
    <>
      <Helmet>
        <title>Meet Our Best Doctors</title>
        <meta name="description" content="We change your life & world with our valuable expert Doctors team" />
      </Helmet>
      <div className="container">
        <UiTitle>Meet Our Best Doctors</UiTitle>
        <p className="py-4">We change your life & world with our valuable expert Doctors team</p>

        <div className="grid lg:grid-cols-4 gap-y-10 my-10 md:grid-cols-2 grid-cols-1">
          {loading
            ? [...Array(8)].map((_, index) => <CircleCardSkeleton key={`skeleton-${index}`} />)
            : doctors?.map((item) => <CircleCard key={item.id} {...item} />)}
        </div>
      </div>
    </>
  )
}
