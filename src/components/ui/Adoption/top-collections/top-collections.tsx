import { PetCardSkeleton } from "../../feedbacks/pet-card-skeleton"
import UiTitle from "../../ui-title"
import MoreThem from "./more-them"
import TopCollectionsCard from "./top-collections-card"

type TopCollectionsSectionType = {
  MainTitle: string
  arr?: PetItem[]
  more?: MoreThemCarType
  loading?: boolean
}

export default function TopCollections({ MainTitle, arr, more, loading }: Readonly<TopCollectionsSectionType>) {
  const petsToShow = arr ?? []

  return (
    <div className="container">
      <UiTitle>{MainTitle}</UiTitle>
      <div className="flex flex-col md:flex-row items-start gap-5 pt-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:basis-3/4 w-full h-full">
          {loading
            ? [...Array(3)].map((_, idx) => <PetCardSkeleton key={idx} />)
            : petsToShow.map((item) => <TopCollectionsCard key={item.id} {...item} />)}
        </div>
        {more && <MoreThem className="md:basis-1/4 h-full" {...more} />}
      </div>
    </div>
  )
}
