"use client"

import { Scrollbar } from "swiper"

import "swiper/css"
import { AssistanceCard } from "./assistance-card"
import { CustomSwiper } from "./slider"

const assistances = [
  {
    id: "asistencia-al-ciclista",
    title: "Asistencia al ciclista",
    imageLink: "/assistance1.png",
  },
  {
    id: "asistencia-salud-universal",
    title: "Asistencia salud universal",
    imageLink: "/assistance2.png",
  },
  {
    id: "asistencia-salud-joven",
    title: "Asistencia salud joven",
    imageLink: "/assistance3.png",
  },
  {
    id: "asistencia-escolar",
    title: "Asistencia escolar",
    imageLink: "/assistance4.png",
  },
  {
    id: "asistencia-mascota",
    title: "Asistencia mascota",
    imageLink: "/assistance5.png",
  },
  {
    id: "asistencia-hogar",
    title: "Asistencia hogar",
    imageLink: "/assistance6.png",
  },
  {
    id: "asistencia-vehicular",
    title: "Asistencia vehicular",
    imageLink: "/assistance7.png",
  },
  {
    id: "asistencia-total-ultra",
    title: "Asistencia total ultra",
    imageLink: "/assistance8.png",
  },
]

export const AssistancesCarousel = () => {
  const options = {
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
