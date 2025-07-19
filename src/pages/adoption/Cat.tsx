import TopCollections from "@/components/ui/Adoption/top-collections/top-collections"

import { topCollectionsMock } from "@/Constants/main"

export default function Cats() {
  return (
    <div className="   pt-40 pb-20">
      <TopCollections
        arr={topCollectionsMock}
        MainTitle="Top Collections"
        more={{
          MainTitle: "More Cats ",
          subTitle: "Collection on Scooby",
        }}
      />
    </div>
  )
}
