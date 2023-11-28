"use client";

import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { type SwiperOptions } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";

import { AssistanceCard } from "./AssistanceCard";
import { CustomSwiper } from "./slider";
import { HeroItem } from "~/interfaces/hero";
interface Assistance {
  id: string;
  family_id: string;
  family_name: string;
  name: string;
}

interface AssistancesCarouselProps {
  assistances: Assistance[];
  imageList: HeroItem[] | undefined;
}

export const AssistancesCarousel = ({
  assistances,
  imageList,
}: AssistancesCarouselProps) => {
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
    <SwiperSlide key={image.id}>
      <div className="mx-auto w-full max-w-[300px] shadow-md duration-75 hover:shadow-none">
        <AssistanceCard
          key={image.id}
          family_id={assistances?.[index]?.family_id}
          title={assistances?.[index]?.name}
          imageLink={image.url}
        />
      </div>
    </SwiperSlide>
  ));

  return <CustomSwiper options={options} slides={slides} />;
};
