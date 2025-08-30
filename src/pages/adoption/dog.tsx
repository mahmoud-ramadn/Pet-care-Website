import { Helmet } from "react-helmet"

import TopCollections from "@/components/ui/Adoption/top-collections/top-collections"

import { useDogsForKids, useTopCollectionDog } from "@/hooks/pet"

export default function Dogs() {
  const { value: dogs, loading } = useTopCollectionDog()
  const { value: DogsForKids, loading: isloading } = useDogsForKids()
  return (
    <>
      <Helmet>
        <title>Dogs</title>
        <meta name="description" content="Find your perfect dog" />
      </Helmet>
      <div className="   pt-40 pb-20">
        <TopCollections
          arr={dogs ?? []}
          MainTitle="Top Collections"
          loading={loading}
          more={{
            MainTitle: "More dogs",
            subTitle: "Collection on Scooby",
            path: "dog",
          }}
        />
        <TopCollections
          arr={DogsForKids ?? []}
          loading={isloading}
          MainTitle="Best Dogs for kids"
          more={{
            MainTitle: "More dogs",
            subTitle: "Collection on Scooby",
          }}
        />
      </div>
    </>
  )
}
