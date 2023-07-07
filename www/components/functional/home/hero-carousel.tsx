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
      src="/slidee.jpg"
      alt="Slide 1"
      width={2560}
      height={450}
      quality={100}
      className="md:h-[550px] h-[200px] object-cover object-center w-full"
      loading="lazy"
    />,
    <Image
      src="/slidee2.jpg"
      alt="Slide 2"
      width={2560}
      height={450}
      quality={100}
      className="md:h-[550px] h-[200px] object-cover object-top w-full"
      loading="lazy"
    />,
    <Image
      src="/slidee3.jpg"
      alt="Slide 3"
      width={2560}
      height={450}
      quality={100}
      className="md:h-[550px] h-[200px] object-cover object-top w-full"
      loading="lazy"
    />,
  ]

  return <CustomSwiper options={options} slides={slides} />
}
