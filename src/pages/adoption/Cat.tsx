import { Helmet } from "react-helmet"

import TopCollections from "@/components/ui/Adoption/top-collections/top-collections"

import { useCatsForKids, useTopCollectionCat } from "@/hooks/pet"

export default function Cats() {
  const { value: cats, loading: isloading } = useTopCollectionCat()
  const { value: CatsForKids, loading } = useCatsForKids()
  return (
    <>
      <Helmet>
        <title>Cats</title>
        <meta name="description" content="Find your perfect cat" />
      </Helmet>
      <div className="   pt-40 pb-20">
        <TopCollections
          arr={cats ?? []}
          loading={isloading}
          MainTitle="Top Collections"
          more={{
            MainTitle: "More Cats ",
            subTitle: "Collection on Scooby",
            path: "cat",
          }}
        />
        <TopCollections loading={loading} arr={CatsForKids ?? []} MainTitle="Best Cats for kids" />
      </div>
    </>
  )
}
