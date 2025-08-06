import Lottie from "lottie-react"
import ErrorJson from "@/assets/animations/error.json"
export default function Error() {
  return <Lottie animationData={ErrorJson} loop={true}  className=" w-[500px] h-[500px]"/>
}
