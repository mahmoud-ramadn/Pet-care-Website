import TopCollections from "@/components/ui/Adoption/top-collections/top-collections"

import { topCollectionsMock } from "@/Constants/main"

export default function Dogs() {
  return (
    <div className="   pt-40 pb-20">
      <TopCollections
        arr={topCollectionsMock}
        MainTitle="Top Collections"
        more={{
          MainTitle: "More dogs",
          subTitle: "Collection on Scooby",
        }}
      />
    </div>
  )
}
