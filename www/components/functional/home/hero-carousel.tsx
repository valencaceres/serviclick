"use client"

import { EffectFade, Navigation, Pagination, SwiperOptions } from "swiper"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { useEffect, useState } from "react"
import Image from "next/image"

import { CustomSwiper } from "../slider"

interface Hero {
  id: number
  url: string
  alt: string
  text: string
  number: number
}
export const HeroCarousel = () => {
  const [hero, setHero] = useState<Hero[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseHero = await fetch(
          process.env.API_URL! + "/api/web/getHero",
          {
            headers: {
              id: process.env.API_KEY!,
            },
            cache: "no-store",
          }
        )
        const heroData = await responseHero.json()
        setHero(heroData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const options: SwiperOptions = {
    modules: [Pagination, Navigation, EffectFade],
    effect: "fade",
    slidesPerView: 1,
    loop: true,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  }
  if (!hero) return null
  const slides = hero?.map((heroData) => (
    <section
      key={heroData.id}
      className="relative flex h-[250px] w-full items-center justify-center md:h-[550px] md:justify-start"
    >
      <Image
        src={heroData.url}
        alt={heroData.alt}
        fill
        quality={100}
        className="object-cover object-top"
        loading="lazy"
      />
      <h1 className="z-20 w-full max-w-xs text-center text-5xl uppercase text-white md:max-w-md md:pl-20 md:text-start md:text-6xl">
        {heroData.text}
      </h1>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-30"></div>
    </section>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
