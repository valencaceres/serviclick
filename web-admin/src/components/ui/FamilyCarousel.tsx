"use client";

import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { type SwiperOptions } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";

import { AssistanceCard } from "./AssistanceCard";
import { CustomSwiper } from "./slider";
import { HeroItem, Family } from "~/interfaces/hero";

interface FamiliesCarouselProps {
  families: Family[];
  imageList: HeroItem[] | undefined;
}

export const Interests = ({ families, imageList }: FamiliesCarouselProps) => {
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
    loop: true,
    navigation: true,
  };

  const slides = imageList?.map((image, index) => (
    <div
      key={image.id}
      className="mx-auto w-full max-w-[300px] shadow-md duration-75 hover:shadow-none"
    >
      <AssistanceCard
        key={image.id}
        family_id={families?.[index]?.id}
        title={families?.[index]?.name}
        imageLink={image.url}
      />
    </div>
  ));

  return <CustomSwiper options={options} slides={slides} />;
};
