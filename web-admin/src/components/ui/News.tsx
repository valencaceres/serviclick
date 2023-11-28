"use client";

import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { type SwiperOptions } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { CustomSwiper } from "./slider";
import { HeroItem } from "~/interfaces/hero";

export const NewsCarousel = ({ news }: { news: HeroItem[] | undefined }) => {
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
  };
  if (!news) return null;
  const slides = news.map((news) => (
    <div key={news.id} className="relative mx-auto h-[240px] w-[300px]">
      <Link href={news.link} passHref>
        <Image
          className="cursor-pointer py-2 duration-75 hover:scale-105"
          src={news.url}
          alt="News"
          fill
        />
      </Link>
    </div>
  ));

  return <CustomSwiper options={options} slides={slides} />;
};
