import UiTitle from "@/components/ui/ui-title"

import { MeetOurBestDoctorsMock } from "@/Constants/main"
import CircleCard from "@/layouts/Vet/circel-card"

export default function Clinics() {
  return (
    <div className=" container">
      <UiTitle>Meet Our Best Clinics</UiTitle>
      <p className=" py-4">We change your life & world with valuable expert Clinics</p>
      <div className=" grid lg:grid-cols-4  my-10 md:grid-cols-2 grid-cols-1 ">
        {MeetOurBestDoctorsMock.map((item) => (
          <CircleCard {...item} />
        ))}
      </div>
    </div>
  )
}
