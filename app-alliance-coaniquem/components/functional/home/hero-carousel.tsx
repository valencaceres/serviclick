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




export const HeroCarousel = () => {
  const router = useRouter()
  return (
    <section className="relative flex h-[250px] w-full  items-center justify-center md:h-[550px] md:justify-start">
      <Image
        src={"/BannerHero.png"}
        alt={"BannerHero"}  
        fill
        quality={100}
        className=" object-cover object-top"
        loading="lazy"
      />
     
    </section>

  )
}
