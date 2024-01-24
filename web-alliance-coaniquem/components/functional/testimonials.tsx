"use client"

import Image from "next/image"
import { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/bundle"

const testimonialsArray = [
  {
    name: "María G. - Santiago",
    text: "Estoy super agradecida por la asistencia que recibí de Serviclick. Además estoy donando al mismo tiempo lo que me parece ¡genial!”",
    image: "/coaniquem/testimonialsjpg/maria.png",
  },
  {
    name: "Carlos M. - Las condes",
    text: "No suelo decir esto, pero estoy sorprendido con el servicio y ser un aporte a esta causa.",
    image: "/coaniquem/testimonialsjpg/carlos.png",
  },
  {
    name: "Ana R. - Maipú",
    text: "Cuando llamé me explicaron todo, y entendí como usar este beneficio aparte de mi previsión. Y siento un doble beneficio al saber que parte de mi Asistencia va en ayuda para Coaniquem”.",
    image: "/coaniquem/testimonialsjpg/ana.png",
  },
  {
    name: "Luis N. -Providencia",
    text: "Pude contratar para mi y mi familia, la verdad que ha sido un ahorro para el bolsillo y mi señora se siente feliz de ayudar a los niños en su rehabilitación”.",
    image: "/coaniquem/testimonialsjpg/luis.png",
  },
]

export const TestimonialsSection = () => {
  const options = {
    modules: [Navigation, Pagination],
    breakpoints: {
      1280: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 1,
      },
      960: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 1,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
    loop: true,
    navigation: true,
  }

  return (
    <section className="relative w-full py-20 md:py-24 lg:py-32">
      <div className="z-0 h-[250px]  w-full bg-[#03495C] md:h-[250px]"></div>
      <Swiper
        className="relative -top-[300px] z-10 mx-auto w-full md:-top-[320px] "
        {...options}
      >
        {testimonialsArray.map((testimonial, index) => (
          <SwiperSlide key={index} className="mx-auto flex  md:justify-end  ">
            <div className="flex h-full w-full content-center items-center justify-center">
              <Card className="relative flex min-h-[400px] w-[400px] flex-col overflow-hidden rounded-[79px] bg-[#F3F4F6] p-6 shadow-md md:h-full md:min-h-[400px] md:w-[550px] min-[1840px]:h-[350px] min-[1840px]:w-[700px]">
                <div className="absolute right-10 top-3">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={90}
                    height={90}
                    loading="lazy"
                    unoptimized
                    className=" rounded-full"
                  />
                </div>
                <CardHeader className="flex h-auto items-start justify-start">
                  <div>
                    <CardTitle className=" text-base font-bold md:text-xl">
                      {testimonial.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className=" flex-grow">
                  <p className="text-lg md:text-2xl ">"{testimonial.text}</p>
                </CardContent>
                <CardFooter className=" flex h-auto justify-center">
                  <div className="h-3 w-32 rounded-3xl bg-[#E84155]" />
                </CardFooter>
              </Card>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
