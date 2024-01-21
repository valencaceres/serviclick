"use client"

import Image from "next/image"
import { Pagination, SwiperOptions } from "swiper"

import { CustomSwiper } from "../slider"

const clients = [
  { image: "/client1.png" },
  { image: "/client2.png" },
  { image: "/client3.png" },
  { image: "/client4.png" },
  { image: "/client5.png" },
  { image: "/client6.png" },
  { image: "/client7.png" },
  { image: "/client8.png" },
  { image: "/client9.png" },
  { image: "/client10.png" },
  { image: "/client11.png" },
]

export const Clients = () => {
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
    pagination: {
      enabled: true,
    },
    loop: true,
    centeredSlidesBounds: true,
  }

  const slides = clients.map((client) => (
    <div className="h-[120px] w-[200px] relative mx-auto">
      <Image
        className="cursor-pointer hover:scale-105 duration-75 pb-8"
        src={client.image}
        alt="News"
        loading="lazy"
        fill
      />
    </div>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
