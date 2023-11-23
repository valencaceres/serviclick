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
  image_url: string
  link: string
  number: number
}

export const News = () => {
  const [news, setNews] = useState<News[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseNews = await fetch(
          process.env.API_URL! + "/api/web/getNews",
          {
            headers: {
              id: process.env.API_KEY!,
            },
            cache: "no-store",
          }
        )
        const newsData = await responseNews.json()
        setNews(newsData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

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
  if (!news) return null
  const slides = news.map((news) => (
    <div className="relative mx-auto h-[240px] w-[300px]">
      <Link href={news.link} passHref>
        <Image
          className="cursor-pointer py-2 duration-75 hover:scale-105"
          src={news.image_url}
          alt="News"
          fill
        />
      </Link>
    </div>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
