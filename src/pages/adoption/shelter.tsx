import ShelterCard from "@/components/ui/Adoption/shelter-card"

import { shelterMockData } from "@/Constants/main"

export default function Shelter() {
  return (
    <div className="pt-40 pb-20 container mx-auto px-4">
      <div className="grid grid-cols-1 my-10  md:grid-cols-2 gap-6 mb-20">
        {shelterMockData.map((item) => (
          <ShelterCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}
