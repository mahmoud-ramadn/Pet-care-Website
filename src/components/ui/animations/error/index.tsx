import Lottie from "lottie-react"

import ErrorJson from "@/assets/animations/error.json"

export default function Error() {
  return <Lottie animationData={ErrorJson} loop={true} className=" max-w-[500px] max-h-[500px]" />
}
