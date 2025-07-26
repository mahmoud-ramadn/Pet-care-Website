import ShelterCard from "@/components/ui/Adoption/shelter-card"
import { ShelterCardSkeleton } from "@/components/ui/feedbacks/shilter-card-skeleton"

import { useAllShilters } from "@/hooks/shilters"

export default function Shelter() {
  const { value: shilters, loading } = useAllShilters()

  return (
    <div className="pt-40 pb-20 container mx-auto px-4">
      <div className="grid grid-cols-1 my-10 lg:grid-cols-3 md:grid-cols-2 gap-6 mb-20">
        {loading
          ? [...Array(10)].map((_, i) => <ShelterCardSkeleton key={i} />)
          : shilters?.map((item) => <ShelterCard key={item._id || item.id} {...item} />)}
      </div>
    </div>
  )
}
