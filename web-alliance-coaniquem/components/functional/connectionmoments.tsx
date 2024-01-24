"use client"

import Image from "next/image"
import { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import SideScroll from "../ui/side-scroll"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/bundle"

export const ConnectionMoments = () => {
  const options = {
    modules: [Navigation, Pagination],
    breakpoints: {
      1800: {
        slidesPerView: 4,
      },
      1280: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 2,
      },
      960: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
    loop: true,
    navigation: true,
  }
  const imagePaths = [
    "/connection-moments/1.png",
    "/connection-moments/2.png",
    "/connection-moments/3.png",
    "/connection-moments/4.png",
    "/connection-moments/5.png",
    "/connection-moments/6.png",
    "/connection-moments/7.png",
  ]

  return (
    <section className="relative w-full py-12  md:py-24 lg:py-32">
      <div className="z-0 h-[150px]  w-full bg-slate-200 md:h-[250px]"></div>
      <Swiper
        className="relative -top-[170px] z-10 mx-auto w-full md:-top-[300px] "
        {...options}
      >
        {imagePaths.map((imagePath, index) => (
          <SwiperSlide key={index}>
            <div className=" flex h-[200px] gap-4 px-8 md:h-[350px]">
              <Image
                src={imagePath}
                alt={`momento de conexión ${index + 1}`}
                width={700}
                height={400}
                loading="lazy"
                unoptimized
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
