"use client"

import { Navigation, SwiperOptions } from "swiper"

import { AssistanceCard } from "../assistance-card"
import { CustomSwiper } from "../slider"

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
  // Filtrar asistencias con URL no nula
  const filteredAssistances = assistances.filter(
    (assistance) => assistance.url !== null
  )

  const options: SwiperOptions = {
    modules: [Navigation],
    breakpoints: {
      1280: {
        slidesPerView: 4,
      },
      960: {
        slidesPerView: 3,
      },
      480: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
    loop: true,
    navigation: true,
  }

  const slides = filteredAssistances.map((assistance) => (
    <div
      className="mx-auto w-full max-w-[300px] shadow-md duration-75 hover:shadow-none"
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

  return <CustomSwiper options={options} slides={slides} />
}
