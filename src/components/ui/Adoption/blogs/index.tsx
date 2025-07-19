import { BlogsMock } from "@/Constants/main"
import SwiperWrapper from "../../SwiperWrapper"
import UiTitle from "../../ui-title"
import BlogsCard from "./blogs-card"

export default function Blogs() {
  return (
    <div className=" container my-20">
      <UiTitle>Blogs</UiTitle>
      <p className=" text-gray-400 font-medium py-6">Because we love to talk about pets.</p>
      <SwiperWrapper>
        {BlogsMock.map((item) => (
          <BlogsCard {...item} />
        ))}

       </SwiperWrapper>
    </div>
  )
}
