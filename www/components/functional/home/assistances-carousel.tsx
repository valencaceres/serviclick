"use client"

import Link from "next/link"
import { Navigation, Pagination, Scrollbar, SwiperOptions } from "swiper"

import { getCategoryImage, getFamilyImage } from "@/lib/images"

import { AssistanceCard } from "../assistance-card"
import { CustomSwiper } from "../slider"

interface Assistance {
  id: string
  family_id: string
  family_name: string
  name: string
}

interface AssistancesCarouselProps {
  assistances: Assistance[]
}

export const AssistancesCarousel = ({
  assistances,
}: AssistancesCarouselProps) => {
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

  const slides = assistances?.map((assistance) => (
    <div className="shadow-md hover:shadow-none duration-75 w-full max-w-[300px] mx-auto">
      <AssistanceCard
        key={assistance.id}
        family_id={assistance.family_id}
        title={assistance.name}
        imageLink={getCategoryImage(assistance.name)}
      />
    </div>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
