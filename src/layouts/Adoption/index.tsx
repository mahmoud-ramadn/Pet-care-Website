import { Outlet, useLocation } from "react-router"

import Blogs from "@/components/ui/Adoption/blogs"
import SuccessfulAdoptions from "@/components/ui/Adoption/successfull-adoption/successful-adoption"
import Hero from "@/components/ui/common/Hero"
import TemplatePlanningVeterinary from "@/components/ui/common/TempletPlanningVeterinary"

import { AdoptionNavigationLink, PlanningToAdoptData } from "@/Constants/main"
import HeroImage from "@/assets/images/adoption/hero.jpg"

export default function AdoptionLayout() {
  const location = useLocation()
  const currentPath = location.pathname
  const segments = currentPath.split("/")
  const lastSegment = segments[segments.length - 1]
  return (
    <div>
      <Hero
        preview={3}
        className=" bg-black"
        MainTitle="Find your new best friend"
        cardUrl={lastSegment}
        array={AdoptionNavigationLink}
        imageHero={HeroImage}
      />
      <main>
        <Outlet />
      </main>
      <TemplatePlanningVeterinary title="Planning to Adopt" array={PlanningToAdoptData} />
      <SuccessfulAdoptions />
      <Blogs />
    </div>
  )
}
