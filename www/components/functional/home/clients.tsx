"use client"

import Image from "next/image"
import { Scrollbar, SwiperOptions } from "swiper"

import { CustomSwiper } from "../slider"

const clients = [
  { image: "/client1.png" },
  { image: "/client2.png" },
  { image: "/client3.png" },
  { image: "/client4.png" },
  { image: "/client5.png" },
]

export const Clients = () => {
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

  const slides = clients.map((client) => (
    <Image
      className="mx-auto cursor-pointer hover:scale-105 duration-75 py-2"
      src={client.image}
      alt="News"
      width={200}
      height={100}
      loading="lazy"
    />
  ))

  return <CustomSwiper options={options} slides={slides} />
}
