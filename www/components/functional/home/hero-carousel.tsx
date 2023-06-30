"use client"

import { Navigation, Pagination, SwiperOptions } from "swiper"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "next/image"

import { CustomSwiper } from "../slider"

export const HeroCarousel = () => {
  const options: SwiperOptions = {
    modules: [Pagination, Navigation],
    slidesPerView: 1,
    loop: true,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  }

  const slides = [
    <Image
      src="/slide.png"
      alt="Slide 1"
      width={1280}
      height={450}
      loading="lazy"
    />,
    <Image
      src="/slide2.jpg"
      alt="Slide 2"
      width={1280}
      height={450}
      loading="lazy"
    />,
    <Image
      src="/slide3.png"
      alt="Slide 3"
      width={1280}
      height={450}
      loading="lazy"
    />,
  ]

  return <CustomSwiper options={options} slides={slides} />
}
