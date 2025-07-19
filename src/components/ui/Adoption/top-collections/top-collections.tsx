import UiTitle from "../../ui-title"
import MoreThem from "./more-them"
import TopCollectionsCard from "./top-collections-card"

type TopCollectionsSectionType = {
  MainTitle: string
  arr: TopCollectionsCardType[]
  more: MoreThemCarType
}

export default function TopCollections({ MainTitle, arr, more }: Readonly<TopCollectionsSectionType>) {
  return (
    <div className="container">
      <UiTitle>{MainTitle}</UiTitle>
      <div className="flex flex-col md:flex-row items-start gap-5 pt-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:basis-3/4 w-full h-full">
          {arr.map((item) => (
            <TopCollectionsCard key={item.id} {...item} />
          ))}
        </div>
        <MoreThem className="md:basis-1/4 h-full" {...more} />
      </div>
    </div>
  )
}
