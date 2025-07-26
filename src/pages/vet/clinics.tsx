import { CircleCardSkeleton } from "@/components/ui/feedbacks/circle-card-skeleton"
import UiTitle from "@/components/ui/ui-title"

import { useVets } from "@/hooks/vet"
import ClinicsCard from "@/layouts/Vet/clinics/clinics-card"

export default function Clinics() {
  const { value: vets, loading } = useVets()

  return (
    <div className="container">
      <UiTitle>Meet Our Best Clinics</UiTitle>
      <p className="py-4">We change your life & world with valuable expert Clinics</p>

      <div className="grid lg:grid-cols-4 gap-y-20 my-10 md:grid-cols-2 grid-cols-1">
        {loading
          ? [...Array(8)].map((_, index) => <CircleCardSkeleton key={`skeleton-${index}`} />)
          : vets?.map((item) => <ClinicsCard key={item._id} {...item} />)}
      </div>
    </div>
  )
}
