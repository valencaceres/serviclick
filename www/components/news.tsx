"use client"

import { Pagination, Scrollbar } from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"

import { CustomSwiper } from "./slider"

const news = [
  {
    id: "novedad-1",
    image: "/news1.png",
  },
  {
    id: "novedad-2",
    image: "/news2.png",
  },
  {
    id: "novedad-3",
    image: "/news3.png",
  },
]

export const News = () => {
  const options = {
    modules: [Scrollbar, Pagination],
    breakpoints: {
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
    loopedSlides: 1,
    centeredSlides: true,
    centeredSlidesBounds: true,
    pagination: true,
    scrollbar: { draggable: true, enabled: true },
  }

  const slides = news.map((news) => (
    <Image
      className="mx-auto"
      src={news.image}
      alt="News"
      width={300}
      height={300}
    />
  ))

  return <CustomSwiper options={options} slides={slides} />
}
