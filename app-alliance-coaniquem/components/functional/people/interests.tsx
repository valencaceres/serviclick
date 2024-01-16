"use client"

import { Navigation, SwiperOptions } from "swiper"

import { AssistanceCard } from "../assistance-card"
import { CustomSwiper } from "../slider"

interface Families {
  family_id: string
  family_name: string
  product_id: string
  product_name: string
  link: string
  url: string
}

interface FamiliesCarouselProps {
  families: Families[]
}

export const Interests = ({ families }: FamiliesCarouselProps) => {
  const filteredFamilies = families.filter(
    (family) => family.url && family.url.trim() !== ""
  )
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

  const slides = filteredFamilies.map((family) => (
    <div className="mx-auto w-full max-w-[300px] shadow-md duration-75 hover:shadow-none">
      <AssistanceCard
        key={family.family_id}
        family_id={family.family_id}
        title={family.family_name}
        imageLink={family.url}
        link={family.link}
      />
    </div>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
