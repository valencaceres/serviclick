import { type SwiperOptions } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

type CustomSwiperProps = {
  options: SwiperOptions
  slides: React.ReactElement[]
}

export const CustomSwiper: React.FC<CustomSwiperProps> = ({
  options,
  slides,
}) => {
  return (
    <div className="select-none w-full h-full">
      <Swiper className="mx-auto" {...options}>
        {slides?.map((slide, index) => (
          <SwiperSlide
            className="flex justify-center items-center mx-auto"
            key={index}
          >
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
