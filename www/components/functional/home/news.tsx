"use client"

import { Navigation, SwiperOptions } from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
import Link from "next/link"

import { CustomSwiper } from "../slider"

const news = [
  {
    id: "novedad-1",
    image: "/news1.jpg",
    link: "https://alianza.serviclick.cl/prepago-los-heroes",
  },
  {
    id: "novedad-2",
    image: "/news2.jpg",
    link: "#",
  },
  {
    id: "novedad-3",
    image: "/news3.jpg",
    link: "https://www.serviclick.cl/companies",
  },
  {
    id: "novedad-4",
    image: "/news4.jpg",
    link: "#",
  },
  {
    id: "novedad-5",
    image: "/news5.jpg",
    link: "#",
  },
]

export const News = () => {
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

  const slides = news.map((news) => (
    <Link
      href={news.link}
      className="h-[240px] w-[300px] mx-auto relative"
      passHref
    >
      <Image
        className="cursor-pointer hover:scale-105 duration-75 py-2"
        src={news.image}
        alt="News"
        fill
      />
    </Link>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
