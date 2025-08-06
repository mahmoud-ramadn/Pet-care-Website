import Lottie from "lottie-react"

import { cn } from "@/lib/utils"

import LoadingJson from "@/assets/animations/loading.json"

interface props {
  className?: string
}
export default function Loading({ className }: Readonly<props>) {
  return <Lottie animationData={LoadingJson} loop={true} className={cn(" max-w-[500px]  max-h-[500px] ", className)} />
}
