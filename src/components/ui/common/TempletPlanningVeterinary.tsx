import PlanningCard from "../common/planning-card"
import UiTitle from "../ui-title"

type TemplatePlanningVeterinaryType = {
    title: string
    array:PlanningCardType[]
}
export default function TemplatePlanningVeterinary({ title,array }: Readonly<TemplatePlanningVeterinaryType>) {
  return (
    <div className=" container">
      <UiTitle className="text-center">{title}</UiTitle>
      <div className=" grid lg:grid-cols-3 md:grid-cols-2  place-content-center gap-4 mt-16 grid-cols-1">
        {array.map((item) => (
          <PlanningCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}
