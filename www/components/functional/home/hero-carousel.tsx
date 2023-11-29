"use client"

import { EffectFade, Navigation, Pagination, SwiperOptions } from "swiper"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { CustomSwiper } from "../slider"

interface HeroItem {
  url: string
  alt: string
  text: string
  number: number
  id: string
  link: string
}

export const HeroCarousel = ({
  hero,
}: {
  hero: { data: HeroItem[] } | undefined
}) => {
  const router = useRouter()

  if (!hero) return null

  const heroData = hero.data

  if (!Array.isArray(heroData)) {
    console.error("Hero data is not an array:", heroData)
    return null
  }

  const options: SwiperOptions = {
    modules: [Pagination, Navigation, EffectFade],
    effect: "fade",
    slidesPerView: 1,
    loop: true,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  }

  const slides = heroData.map((heroItem) => (
    <section className="relative flex h-[250px] w-full cursor-pointer items-center justify-center md:h-[550px] md:justify-start">
      <Link
        key={heroItem.id}
        href={`${heroItem.link}`}
        passHref
        target="_blank"
        className="z-50 border border-blue-500"
      >
        <Image
          src={heroItem.url}
          alt={heroItem.alt}
          fill
          quality={100}
          className="cursor-pointer object-cover object-top"
          loading="lazy"
        />
        <h1 className="absolute z-40 w-full max-w-xs text-center text-5xl uppercase text-white md:max-w-md md:pl-20 md:text-start md:text-6xl">
          {heroItem.text}
        </h1>
      </Link>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-30"></div>
    </section>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
