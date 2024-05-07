"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Navigation, SwiperOptions } from "swiper"

import AssistanceCard from "../assistance-card"
import { CustomCarousel } from "../carousel"

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

export const AssistancesCarousel = ({
  assistances,
}: AssistancesCarouselProps) => {
  const filteredAssistances = assistances.filter(
    (assistance) => assistance.url !== null
  )

  const slides = filteredAssistances.map((assistance) => (
    <div
      className="mx-auto w-full max-w-[300px] gap-4 shadow-md duration-75 hover:shadow-none"
      key={assistance.id}
    >
      <AssistanceCard
        family_id={assistance.family_id}
        title={assistance.name}
        imageLink={assistance.url || ""}
        link={assistance.link || ""}
      />
    </div>
  ))

  return <CustomCarousel slides={slides} />
}
