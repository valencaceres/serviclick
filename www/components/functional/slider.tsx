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
    <div className="select-none m-auto w-full">
      <Swiper className="mx-auto" {...options}>
        {slides?.map((slide, index) => (
          <SwiperSlide
            className="w-full object-cover flex justify-center item-scenter mx-auto"
            key={index}
          >
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
