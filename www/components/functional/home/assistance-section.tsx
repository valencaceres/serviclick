"use client"

import withScrollAnimation from "../withScrollAnimation"
import { AssistancesCarousel } from "./assistances-carousel"

interface Assistance {
  id: string
  family_id: string
  family_name: string
  name: string
  url: string | null
  link: string | null
}

interface AssistancesCarouselProps {
  assistances: Assistance[]
}
const AssistanceSection = ({ assistances }: AssistancesCarouselProps) => {
  return (
    <section className="container flex flex-col items-center justify-center pb-20 font-bebas">
      <div className="py-4 md:pb-10 md:pt-20">
        <h1 className="text-center text-4xl uppercase md:text-5xl">
          SELECCIONA LA ASISTENCIA QUE NECESITAS
        </h1>
      </div>
      <AssistancesCarousel assistances={assistances} />
    </section>
  )
}

export default withScrollAnimation(AssistanceSection)
