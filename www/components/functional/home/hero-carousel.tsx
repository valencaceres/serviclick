"use client"

import { EffectFade, Navigation, Pagination, SwiperOptions } from "swiper"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import Image from "next/image"

import { CustomSwiper } from "../slider"

export const HeroCarousel = () => {
  const options: SwiperOptions = {
    modules: [Pagination, Navigation, EffectFade],
    effect: "fade",
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
      width={2560}
      height={450}
      quality={100}
      loading="lazy"
      className="object-cover object-center"
    />,
    <Image
      src="/slide2.jpg"
      alt="Slide 2"
      width={2560}
      height={450}
      quality={100}
      loading="lazy"
      className="object-cover object-center"
    />,
    <Image
      src="/slide3.png"
      alt="Slide 3"
      width={2560}
      height={450}
      quality={100}
      loading="lazy"
      className="object-cover object-center"
    />,
  ]

  return <CustomSwiper options={options} slides={slides} />
}
