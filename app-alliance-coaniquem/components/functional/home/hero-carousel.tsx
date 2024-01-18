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
      {/*   <video
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          objectPosition: "top",
          top: 0,
          left: 0,
        }}
        autoPlay
        loop
        muted
        id="video"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="z-10 w-[400px] self-end pb-12 text-center md:self-center md:pb-0 md:text-left">
        <h1 className="font-bebas text-6xl uppercase text-background">
          Pro.Defensa, tu mejor bienestar
        </h1>
      </div> */}
    </section>
  )
}
