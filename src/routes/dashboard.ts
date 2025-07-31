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

const CatsAvilabile = lazy(() => import("@/pages/adoption/cat-availabile"))
const DogsAvilabile = lazy(() => import("@/pages/adoption/dogs-availabile"))
const Services = lazy(() => import("@/pages/services/index"))
const Description = lazy(() => import("@/pages/services/service-profile"))

const VeterinaryLayout = lazy(() => import("@/layouts/Vet"))
const Vet = lazy(() => import("@/pages/vet"))
const Clinics = lazy(() => import("@/pages/vet/clinics"))
const Doctors = lazy(() => import("@/pages/vet/doctors"))
const SingalDoctor = lazy(() => import("@/pages/vet/singal-doctor"))
const SuccessfulAdoptions = lazy(() => import("@/pages/adoption/sucessfull-adoption"))

const Shop = lazy(() => import("@/pages/shop/index"))
const Fav = lazy(() => import("@/pages/shop/fav"))
const Checkout = lazy(() => import("@/pages/shop/checkout"))
const Cart = lazy(() => import("@/pages/shop/cart"))
const SingleShilter = lazy(() => import("@/pages/adoption/singl-shilter"))
const BlogsPage = lazy(() => import("@/pages/blogs"))
const SingalClinic = lazy(() => import("@/pages/vet/singal-clinic"))

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
          children: [
            {
              path: "",
              index: true,
              Component: Doctors,
            },
            {
              path: ":id",
              Component: SingalDoctor,
            },
          ],
        },
        {
          path: "clinics",
          children: [
            {
              path: "",
              index: true,
              Component: Clinics,
            },
            {
              path: ":id",
              Component: SingalClinic,
            },
          ],
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
    {
      path: "shop",
      children: [
        {
          path: "",
          index: true,
          Component: Shop,
        },
        {
          path: "fav",
          Component: Fav,
        },
        {
          path: "checkout",
          Component: Checkout,
        },
        {
          path: "cart",
          Component: Cart,
        },
      ],
    },
    {
      path: "blogs",
      Component: BlogsPage,
    },
    {
      path: "Adoption/SuccessfulAdopted",
      Component: SuccessfulAdoptions,
    },
    {
      path: "availabile/dog",
      Component: DogsAvilabile,
    },
    {
      path: "availabile/cat",
      Component: CatsAvilabile,
    },
    {
      path: "get-shilter/:id",
      Component: SingleShilter,
    },
  ],
}
