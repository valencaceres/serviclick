"use client"

import { Navigation, SwiperOptions } from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { CustomSwiper } from "../slider"

interface News {
  id: number
  url: string
  link: string
  number: number
  text: string
}

export const News = ({ news }: { news: { data: News[] } | undefined }) => {
  const options: SwiperOptions = {
    modules: [Navigation],
    breakpoints: {
      1280: {
        slidesPerView: 4,
      },
      960: {
        slidesPerView: 3,
      },
      480: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
    navigation: true,
  }

  if (!news || !news.data) return null

  const slides = news.data.map((newsItem) => (
    <div className="relative mx-auto h-[240px] w-[300px]" key={newsItem.id}>
      <Link href={newsItem.link} passHref key={newsItem.id}>
        <div className="relative mx-auto h-[240px] w-[300px]">
          <Image
            className="cursor-pointer py-2 duration-75 hover:scale-105"
            src={newsItem.url}
            alt="News"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 70vw, 100vw"
          />
          <h1 className="absolute z-40 w-full max-w-xs text-center text-3xl uppercase text-white md:max-w-md md:py-20 md:text-start md:text-5xl">
            {newsItem.text}
          </h1>{" "}
        </div>
      </Link>
    </div>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
