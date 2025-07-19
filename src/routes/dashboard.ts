import { lazy } from "react"
import type { RouteObject } from "react-router"

import DashboardLayout from "@/layouts/Dashboard"

const ShelterPage = lazy(() => import("@/pages/adoption/shelter"))
const AdoptionIndexPage = lazy(() => import("@/pages/adoption/index"))
const DogPage = lazy(() => import("@/pages/adoption/dog"))
const CatPage = lazy(() => import("@/pages/adoption/Cat"))
const Home = lazy(() => import("@/pages/index"))
const UI = lazy(() => import("@/pages/ui-components"))
const AdoptionLayout = lazy(() => import("@/layouts/Adoption"))

const Services = lazy(() => import("@/pages/services/index"))
const Description = lazy(() => import("@/pages/services/description"))

const VeterinaryLayout = lazy(() => import("@/layouts/Vet"))
const Vet = lazy(() => import("@/pages/vet"))
const Clinics = lazy(() => import("@/pages/vet/clinics"))
const Doctors = lazy(() => import("@/pages/vet/doctors"))

export const DashboardRoutes: RouteObject = {
  path: "",
  Component: DashboardLayout,
  children: [
    {
      path: "",
      index: true,
      Component: Home,
    },
    {
      path: "ui",
      Component: UI,
    },
    {
      path: "adoption",
      Component: AdoptionLayout,
      children: [
        {
          path: "",
          index: true,
          Component: AdoptionIndexPage,
        },
        {
          path: "shilter",
          Component: ShelterPage,
        },
        {
          path: "dog",
          Component: DogPage,
        },
        {
          path: "cat",
          Component: CatPage,
        },
      ],
    },
    {
      path: "vet",
      Component: VeterinaryLayout,
      children: [
        {
          path: "",
          index: true,
          Component: Vet,
        },
        {
          path: "doctors",
          Component: Doctors,
        },
        {
          path: "clinics",
          Component: Clinics,
        },
      ],
    },
    {
      path: "services",
      children: [
        {
          path: "",
          Component: Services,
        },
        {
          path: "description/:id",
          Component: Description,
        },
      ],
    },
  ],
}
