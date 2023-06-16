import { type SwiperOptions } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

type CustomSwiperProps = {
  options: SwiperOptions
  slides: React.ReactElement[]
}

export const CustomSwiper: React.FC<CustomSwiperProps> = ({
  options,
  slides,
}) => {
  return (
    <div className="max-w-7xl select-none m-auto w-full">
      <Swiper {...options}>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
