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
        slidesPerView: 5,
      },
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
    pagination: { enabled: true },
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
