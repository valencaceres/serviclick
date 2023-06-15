"use client"

import { Scrollbar, SwiperOptions } from "swiper"

import "swiper/css"
import { AssistanceCard } from "./assistance-card"
import { CustomSwiper } from "./slider"

const assistances = [
  {
    id: "asistencia-al-ciclista",
    title: "Ciclista",
    imageLink: "/assistance1.png",
  },
  {
    id: "asistencia-salud-universal",
    title: "Salud",
    imageLink: "/assistance2.png",
  },
  {
    id: "asistencia-salud-joven",
    title: "Protección total ultra",
    imageLink: "/assistance3.png",
  },
  {
    id: "asistencia-escolar",
    title: "Escolar",
    imageLink: "/assistance4.png",
  },
]

export const Interests = () => {
  const options: SwiperOptions = {
    modules: [Scrollbar],
    breakpoints: {
      1280: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
    loop: true,
    scrollbar: { draggable: true, enabled: true },
  }

  const slides = assistances.map((assistance) => (
    <div className="shadow-md hover:shadow-none duration-75 w-full max-w-[300px]">
      <AssistanceCard
        key={assistance.id}
        id={assistance.id}
        title={assistance.title}
        imageLink={assistance.imageLink}
      />
    </div>
  ))

  return <CustomSwiper options={options} slides={slides} />
}
