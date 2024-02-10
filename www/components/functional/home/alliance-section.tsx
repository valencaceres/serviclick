"use client"

import withScrollAnimation from "../withScrollAnimation"
import { Alliances } from "./alliances"

const AllianceSection = () => {
  return (
    <section className="container flex flex-col items-center justify-center pb-20">
      <h1 className="pb-6 text-center font-bebas text-4xl uppercase">
        Alianzas
      </h1>
      <Alliances />
    </section>
  )
}

export default withScrollAnimation(AllianceSection)
