"use client"

import withScrollAnimation from "../withScrollAnimation"
import { HeroCarousel } from "./hero-carousel"

const HeroSection = ({ hero }: any) => {
  return (
    <section className="relative flex h-[250px] items-center font-bebas md:h-[550px]">
      <HeroCarousel hero={hero} />
    </section>
  )
}
export default withScrollAnimation(HeroSection)
