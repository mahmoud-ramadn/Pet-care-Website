import TemplatePlanningVeterinary from "@/components/ui/common/TempletPlanningVeterinary"

import { MeetOurBestDoctorsMock } from "@/Constants/main"
import { VeterinaryServicesData } from "@/Constants/main"
import MeetOur from "@/layouts/Vet/meet-our"

export default function Vet() {
  return (
    <div>
      <TemplatePlanningVeterinary title="Providing our best veterinary Services" array={VeterinaryServicesData} />
      <MeetOur
        path="doctors"
        variant="default"
        ButtonText="See all doctors"
        array={MeetOurBestDoctorsMock}
        title="Meet Our Best Doctors"
        subTitle="We change your life & world with our valuable expert Doctors team"
        className="bg-primary"
      />
      <MeetOur
        path="clinics"
        variant="outline"
        ButtonText="See all Clinics"
        array={MeetOurBestDoctorsMock}
        title="Meet Our Best Clinics"
        subTitle="We change your life & world with valuable expert Clinics"
      />
    </div>
  )
}
