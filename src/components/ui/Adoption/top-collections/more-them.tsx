import { cn } from "@/lib/utils"

import { ProjectImages } from "@/Constants/images"


export default function MoreThem({ MainTitle, subTitle, className }: Readonly<MoreThemCarType>) {
  return (
    <div className={cn("bg-primary h-full w-full rounded-lg text-center", className)}>
      <div className="p-6 border-b border-white flex flex-col gap-y-4 items-center">
        <img
          className="size-24 hover:rotate-12 hover:scale-105 transition-all duration-200"
          src={ProjectImages.adoption.planningToAdopt.petFoot}
          alt="pet-foot"
        />
        <h5 className="text-xl font-medium text-white">{MainTitle}</h5>
        <h5 className="text-xl font-medium text-white">{subTitle}</h5>
      </div>
      <p className="text-2xl font-bold text-white py-6">Meet them</p>
    </div>
  )
}
