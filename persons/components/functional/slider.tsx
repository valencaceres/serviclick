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
    <div className="h-full w-full select-none">
      <Swiper className="mx-auto" {...options}>
        {slides?.map((slide, index) => (
          <SwiperSlide
            className="mx-auto flex items-center justify-center"
            key={index}
          >
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
