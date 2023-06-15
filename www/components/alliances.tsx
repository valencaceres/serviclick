"use client"

import Image from "next/image"
import { Scrollbar, SwiperOptions } from "swiper"

import { CustomSwiper } from "./slider"

const alliances = [
  { image: "/alliance1.png" },
  { image: "/alliance2.png" },
  { image: "/alliance3.png" },
  { image: "/alliance4.png" },
  { image: "/alliance5.png" },
]

export const Alliances = () => {
  const options: SwiperOptions = {
    modules: [Scrollbar],
    breakpoints: {
      960: {
        slidesPerView: 4,
      },
      480: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
    loop: true,
    scrollbar: { draggable: true, enabled: true },
  }

  const slides = alliances.map((client) => (
    <Image
      className="mx-auto cursor-pointer hover:scale-105 duration-75 py-2"
      src={client.image}
      alt="Alliance"
      width={200}
      height={100}
      loading="lazy"
    />
  ))

  return <CustomSwiper options={options} slides={slides} />
}
