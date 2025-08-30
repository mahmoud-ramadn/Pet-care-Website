import { Helmet } from "react-helmet"

import TemplatePlanningVeterinary from "@/components/ui/common/TempletPlanningVeterinary"

import { MeetOurBestDoctorsMock } from "@/Constants/main"
import { VeterinaryServicesData } from "@/Constants/main"
import MeetOur from "@/layouts/Vet/meet-our"

export default function Vet() {
  return (
    <>
      <Helmet>
        <title>Veterinary Services</title>
        <meta name="description" content="Providing the best veterinary services for your pets" />
      </Helmet>
      <TemplatePlanningVeterinary title="Providing our best veterinary Services" array={VeterinaryServicesData} />
      <MeetOur
        path="doctors"
        variant="default"
        ButtonText="See all doctors"
        array={MeetOurBestDoctorsMock}
        title="Meet Our Best Doctors"
        subTitle="We change your life & world with our valuable expert Doctors team"
        className=" bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"
      />
      <MeetOur
        path="clinics"
        variant="outline"
        ButtonText="See all Clinics"
        array={MeetOurBestDoctorsMock}
        title="Meet Our Best Clinics"
        className="  bg-white"
        subTitle="We change your life & world with valuable expert Clinics"
      />
    </>
  )
}
