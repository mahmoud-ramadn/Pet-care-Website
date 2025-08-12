import TopCollections from "@/components/ui/Adoption/top-collections/top-collections"

import { useTopCollection } from "@/hooks/pet"

export default function Adoption() {
  const { value: collections } = useTopCollection()
  return (
    <div className="   pt-40 pb-20">
      <TopCollections
        arr={collections}
        MainTitle="Top Collections"
        more={{
          MainTitle: "More Pets ",
          subTitle: "availabile on Scooby",
        }}
      />
    </div>
  )
}
