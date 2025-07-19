import { cn } from "@/lib/utils"

import { Button } from "../button"

export default function PlanningCard({ icon, title, description, className }: Readonly<PlanningCardType>) {
  return (
    <div className={cn("border rounded  bg-primary/15 flex items-center flex-col  gap-y-7 justify-center p-6", className)}>
      <div className="  flex items-center flex-col gap-y-7 justify-center">
        <img className=" size-32" src={icon} alt="icon" />
        <h4 className=" font-semibold  text-primary text-2xl">{title}</h4>
        <p className=" text-lg text-center   text-primary">{description}</p>
      </div>

      <Button variant="outline" className=" rounded-3xl text-primary  border-primary">
        Learn More
      </Button>
    </div>
  )
}
