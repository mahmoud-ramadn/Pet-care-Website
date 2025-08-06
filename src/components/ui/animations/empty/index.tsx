import Lottie from "lottie-react"

import EmptyJson from "@/assets/animations/empty.json"
import { cn } from "@/lib/utils";
interface props{
    className: string;
}
export default function Empty({className}:Readonly<props>) {
  return <Lottie animationData={EmptyJson} loop={true} className={cn(" w-[500px] h-[500px]",className)} />
}
