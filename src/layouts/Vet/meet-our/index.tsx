import { cn } from "@/lib/utils"

import SwiperWrapper from "@/components/ui/SwiperWrapper"
import { Button } from "@/components/ui/button"
import UiTitle from "@/components/ui/ui-title"

import CircleCard from "../circel-card"
import { Link } from "react-router"

type MeetOurType = {
  title: string
  ButtonText: string
  subTitle: string
  className?: string
  array: CircleCardType[]
  variant?: "default" | "destructive" | "outline" | "ghost" | "link" | "secondary"
  path:string
}

export default function MeetOur({ title, ButtonText, subTitle, className, array, variant,path}: Readonly<MeetOurType>) {
  return (
    <div className={cn("my-20 py-24 flex items-center justify-center", className)}>
      <div className="container text-center">
        <UiTitle>{title}</UiTitle>
        <p className="py-4">{subTitle}</p>
        <SwiperWrapper className="my-10" preview={4}>
          {array.map((item) => (
            <CircleCard key={item.id} {...item} />
          ))}
        </SwiperWrapper>
        <Link to={path}>
        <Button variant={variant} className=" bg-white hover:bg-bg-white text-primary rounded-full px-5 py-6">{ButtonText}</Button>
      
        </Link>
      </div>
    </div>
  )
}
