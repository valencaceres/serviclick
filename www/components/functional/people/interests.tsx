"use client"

import { Navigation, SwiperOptions } from "swiper"

import { getFamilyImage } from "@/lib/images"

import { AssistanceCard } from "../assistance-card"
import { CustomSwiper } from "../slider"

interface Families {
  family_id: string
  family_name: string
  product_id: string
  product_name: string
}

interface FamiliesCarouselProps {
  families: Families[]
}

export const Interests = ({ families }: FamiliesCarouselProps) => {
  const options: SwiperOptions = {
    modules: [Navigation],
    breakpoints: {
      1280: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
    loop: true,
    navigation: true,
  }

  const slides = families.map((family) => (
    <div className="shadow-md hover:shadow-none duration-75 w-full max-w-[300px]">
      <AssistanceCard
        key={family.family_id}
        family_id={family.family_id}
        title={family.family_name}
        imageLink={getFamilyImage(family.family_name)}
      />
    </div>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
