import { Outlet, useLocation } from "react-router"

import LayoutWrapper from "@/components/ui/LayoutWrapper"
import Hero from "@/components/ui/common/Hero"

import { ProjectImages } from "@/Constants/images"
import { VetNavigationLink } from "@/Constants/main"

export default function VeterinaryLayout() {
  const location = useLocation()
  const currentPath = location.pathname
  const segments = currentPath.split("/")
  const lastSegment = segments[segments.length - 1]

  return (
    <LayoutWrapper>
      <div>
        <Hero
          preview={2}
          className="bg-primary"
          array={VetNavigationLink}
          cardUrl={lastSegment}
          imageHero={ProjectImages.vet.vetHeroIMage}
          MainTitle="Veterinary.description"
        />
        <main className="pt-40 pb-20">
          <Outlet />
        </main>
      </div>
    </LayoutWrapper>
  )
}
