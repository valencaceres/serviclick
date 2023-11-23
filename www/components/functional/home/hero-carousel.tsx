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
    <section className="relative flex h-[250px] w-full items-center justify-center md:h-[550px] md:justify-start">
      <Image
        src="/slidee4.png"
        alt="Slide 4"
        fill
        quality={100}
        className="object-cover object-top"
        loading="lazy"
      />
      <h1 className="z-20 w-full max-w-xs text-center text-5xl uppercase text-white md:max-w-md md:pl-20 md:text-start md:text-6xl"></h1>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-30"></div>
    </section>,
    <section className="relative flex h-[250px] w-full items-center justify-center md:h-[550px] md:justify-start">
      <Image
        src="/slidee.jpg"
        alt="Slide 1"
        fill
        quality={100}
        className="object-cover object-center"
        loading="lazy"
      />
      <h1 className="z-20 w-full max-w-sm text-center text-5xl uppercase text-white md:pl-20 md:text-start md:text-6xl">
        Especialistas en protección
      </h1>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-30"></div>
    </section>,
    <section className="relative flex h-[250px] w-full items-center  justify-center md:h-[550px] md:justify-start">
      <Image
        src="/slidee2.jpg"
        alt="Slide 2"
        fill
        quality={100}
        className="object-cover object-top"
        loading="lazy"
      />
      <h1 className="z-20 w-full max-w-xs text-center text-5xl uppercase text-white md:max-w-md md:pl-20 md:text-start md:text-6xl">
        Te acompañamos en todo momento
      </h1>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-30"></div>
    </section>,
    <section className="relative flex h-[250px] w-full items-center justify-center md:h-[550px] md:justify-start">
      <Image
        src="/slidee3.jpg"
        alt="Slide 3"
        fill
        quality={100}
        className="object-cover object-top"
        loading="lazy"
      />
      <h1 className="z-20 w-full max-w-xs text-center text-5xl uppercase text-white md:max-w-md md:pl-20 md:text-start md:text-6xl">
        Protegerte es nuestra labor
      </h1>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-30"></div>
    </section>,
  ]

  return <CustomSwiper options={options} slides={slides} />
}
