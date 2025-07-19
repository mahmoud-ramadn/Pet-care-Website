import { cn } from "@/lib/utils"
import { Link } from "react-router"

type SquareType = {
  title: string
  image: string
  className?: string,
  path?:string
}

export default function SquareNavigation({ title, image, className ,path}: Readonly<SquareType>) {
  return (
    <Link  to={`${path}`} className={cn(` bg-white  rounded-lg`,className)}>
      <img className=" size-36 rounded-lg" src={image} alt="animal" />
      <h3 className=" text-2xl font-bold">{title}</h3>
    </Link>
  )
}
