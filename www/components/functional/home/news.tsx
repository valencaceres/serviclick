"use client"

import { Navigation, SwiperOptions } from "swiper"

import "swiper/css"
import "swiper/css/pagination"
import Image from "next/image"
import Link from "next/link"

import { CustomSwiper } from "../slider"

const news = [
  {
    id: "novedad-6",
    image: "/news6.png",
    link: "/family/52257aa7-4a97-4d02-a08a-7d2324f49630",
  },
  {
    id: "novedad-5",
    image: "/news5.jpg",
    link: "/alianza/vinasanpedro",
  },
  {
    id: "novedad-1",
    image: "/news1.jpg",
    link: "https://alianza.serviclick.cl/prepago-los-heroes",
  },
  {
    id: "novedad-4",
    image: "/news4.jpg",
    link: "/alianza/sindicato1prosegur",
  },
  {
    id: "novedad-2",
    image: "/news2.jpg",
    link: "/family/290a790c-f7e3-491f-b528-c218401e5fe0",
  },
  {
    id: "novedad-3",
    image: "/news3.jpg",
    link: "/companies",
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
    <div className="relative mx-auto h-[240px] w-[300px]">
      <Link href={news.link} passHref>
        <Image
          className="cursor-pointer py-2 duration-75 hover:scale-105"
          src={news.image}
          alt="News"
          fill
        />
      </Link>
    </div>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
