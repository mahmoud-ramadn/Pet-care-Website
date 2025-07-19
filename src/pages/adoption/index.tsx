import TopCollections from "@/components/ui/Adoption/top-collections/top-collections"

import { topCollectionsMock } from "@/Constants/main"

export default function Adoption() {
  return (
    <div className="   pt-40 pb-20">
      <TopCollections
        arr={topCollectionsMock}
        MainTitle="Top Collections"
        more={{
          MainTitle: "More Pets ",
          subTitle: "availabile on Scooby",
        }}
      />
    </div>
  )
}
