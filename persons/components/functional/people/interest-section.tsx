"use client"

import withScrollAnimation from "../withScrollAnimation"
import { Interests } from "./interests"

const InterestSection = ({ uniqueFamilies }: any) => {
  return (
    <section className="container flex flex-col items-center justify-center pb-12 pt-20">
      <h1 className="pb-6 text-center font-bebas text-4xl uppercase md:text-5xl">
        Selecciona el área de tu interés
      </h1>
      <Interests families={uniqueFamilies} />
    </section>
  )
}
export default withScrollAnimation(InterestSection)
