"use client"

import Image from "next/image"
import { Pagination, SwiperOptions } from "swiper"

import { CustomSwiper } from "../slider"

const alliances = [
  { image: "/alliance1.png" },
  { image: "/alliance2.png" },
  { image: "/alliance3.png" },
  { image: "/alliance4.png" },
  { image: "/alliance5.png" },
  { image: "/alliance6.png" },
  { image: "/alliance7.png" },
  { image: "/alliance8.png" },
]

export const Alliances = () => {
  const options: SwiperOptions = {
    modules: [Pagination],
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
    pagination: { enabled: true },
  }

  const slides = alliances.map((client) => (
    <div className="h-[120px] w-[200px] relative mx-auto">
      <Image
        className="cursor-pointer hover:scale-105 duration-75 pb-8"
        src={client.image}
        alt="Alliance"
        loading="lazy"
        fill
      />
    </div>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
