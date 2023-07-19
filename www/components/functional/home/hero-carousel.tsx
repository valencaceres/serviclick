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
    <section className="relative h-[250px] md:h-[550px] w-full flex items-center justify-center md:justify-start">
      <Image
        src="/slidee.jpg"
        alt="Slide 1"
        fill
        quality={100}
        className="object-cover object-center"
        loading="lazy"
      />
      <h1 className="z-20 text-white md:pl-20 w-full text-5xl md:text-6xl uppercase max-w-sm text-center md:text-start">
        Especialistas en protección
      </h1>
      <div className="w-full h-full absolute top-0 left-0 bg-black z-10 bg-opacity-30"></div>
    </section>,
    <section className="relative h-[250px] md:h-[550px] w-full flex  items-center justify-center md:justify-start">
      <Image
        src="/slidee2.jpg"
        alt="Slide 2"
        fill
        quality={100}
        className="object-cover object-top"
        loading="lazy"
      />
      <h1 className="z-20 text-white md:pl-20 w-full text-5xl md:text-6xl uppercase max-w-xs md:max-w-md text-center md:text-start">
        Te acompañamos en todo momento
      </h1>
      <div className="w-full h-full absolute top-0 left-0 bg-black z-10 bg-opacity-30"></div>
    </section>,
    <section className="relative h-[250px] md:h-[550px] w-full flex items-center justify-center md:justify-start">
      <Image
        src="/slidee3.jpg"
        alt="Slide 3"
        fill
        quality={100}
        className="object-cover object-top"
        loading="lazy"
      />
      <h1 className="z-20 text-white md:pl-20 w-full text-5xl md:text-6xl uppercase max-w-xs md:max-w-md text-center md:text-start">
        Protegerte es nuestra labor
      </h1>
      <div className="w-full h-full absolute top-0 left-0 bg-black z-10 bg-opacity-30"></div>
    </section>,
  ]

  return <CustomSwiper options={options} slides={slides} />
}
