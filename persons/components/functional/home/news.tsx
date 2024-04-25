"use client"

import { Navigation, SwiperOptions } from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { CustomCarousel } from "../carousel"

interface News {
  id: number
  url: string
  link: string
  number: number
  text: string
}

export const News = ({ news }: { news: { data: News[] } | undefined }) => {
  if (!news || !news.data) return null

  const slides = news.data.map((newsItem) => (
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
  ))

  return <CustomCarousel slides={slides} />
}
