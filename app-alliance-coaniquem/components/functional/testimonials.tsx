"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import SideScroll from "../ui/side-scroll"

export const TestimonialsSection = () => {
  const [shouldClick, setShouldClick] = useState(true)
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

  return (
    <section className="relative w-full py-20 md:py-24 lg:py-32">
      <div className="z-0 h-[250px]  w-full bg-[#03495C] md:h-[250px]"></div>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 60,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { delay: 1 * 0.1 },
          y: 0,
        }}
        transition={{
          duration: 0.75,
        }}
        className="relative -top-[300px] z-10 mx-auto w-full md:-top-[300px] "
      >
        <SideScroll setShouldClick={setShouldClick}>
          <div className="flex gap-4 px-8">
            {testimonialsArray.map((testimonial) => (
              <Card className="relative flex w-[390px] flex-col overflow-hidden rounded-[79px] bg-[#F3F4F6] p-6 shadow-md md:h-full md:w-[450px]">
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
                    <CardTitle className=" text-xl font-bold">
                      {testimonial.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-xl ">"{testimonial.text}</p>
                </CardContent>
                <CardFooter className=" flex h-auto justify-center">
                  <div className="h-3 w-32 rounded-3xl bg-[#E84155]" />
                </CardFooter>
              </Card>
            ))}{" "}
          </div>
        </SideScroll>
      </motion.div>
    </section>
  )
}
