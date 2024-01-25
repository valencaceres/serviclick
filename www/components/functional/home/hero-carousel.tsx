"use client"

import { EffectFade, Navigation, Pagination, SwiperOptions } from "swiper"

import { cn } from "@/lib/utils"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { CustomSwiper } from "../slider"

interface HeroItem {
  url: string
  alt: string
  text: string
  number: number
  id: string
  link: string
  button_text: string
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
    <section
      key={heroItem.url}
      className="relative flex h-[250px] w-full  items-center justify-center md:h-[550px] md:justify-start"
    >
      <Image
        src={heroItem.url}
        alt={heroItem.alt}
        fill
        quality={100}
        className={`object-cover object-top${
          heroItem.link && heroItem.link !== "" ? " cursor-pointer" : ""
        }`}
        loading="lazy"
        onClick={() => {
          if (heroItem.link && heroItem.link !== "") {
            window.open(heroItem.link, "_blank")
          }
        }}
      />
      <h1 className="absolute z-40 w-full max-w-xs text-center text-5xl uppercase text-white md:max-w-md md:pl-20 md:text-start md:text-6xl">
        {heroItem.text}
      </h1>
      {heroItem.button_text && heroItem.link && (
        <div className="absolute z-50 flex h-full w-full items-center  justify-center ">
          <Button
            className="mt-32 cursor-pointer  p-4 text-2xl capitalize md:mt-80"
            onClick={() => router.push(heroItem.link)}
          >
            {heroItem.button_text}
          </Button>
        </div>
      )}

      {/*   <Link
        key={heroItem.id}
        href={`${heroItem.link}`}
        passHref
        target="_blank"
        className={cn("absolute left-0 top-0 z-30 h-full w-full", {
          "bg-black bg-opacity-30": heroItem.text,
        })}
      ></Link> */}
    </section>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
