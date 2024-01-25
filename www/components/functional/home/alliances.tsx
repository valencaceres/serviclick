"use client"

import Image from "next/image"
import { Pagination, SwiperOptions } from "swiper"

import { CustomSwiper } from "../slider"

const alliances = [
  { image: "/alliance1.png" },
  { image: "/alliance3.png" },
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
    <div key={client.image} className="relative mx-auto h-[120px] w-[200px]">
      <Image
        className="cursor-pointer pb-8 duration-75 hover:scale-105"
        src={client.image}
        alt="Alliance"
        loading="lazy"
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 70vw, 100vw"
      />
    </div>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
