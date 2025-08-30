import { Helmet } from "react-helmet"

import GroomingReviews from "@/components/ui/Grooming-Reviews"
import Hero from "@/components/ui/Home/hero"
import SquiresNav from "@/components/ui/Home/squers-nav"
import PetLives from "@/components/ui/pet_lives"

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Welcome to the pet website" />
      </Helmet>
      <div>
        <Hero />
        <SquiresNav />
        <PetLives />
        <GroomingReviews />
      </div>
    </>
  )
}
