import { useEffect, useRef, useState } from "react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ConnectionMoments } from "@/components/functional/connectionmoments"
import { HeroCarousel } from "@/components/functional/video-section"

export const metadata: Metadata = {
  title: {
    default: "Sobre nosotros",
    template: `%s - ${"Sobre nosotros"}`,
  },
  description: "Sobre nosotros",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default async function AboutUsPage() {
  const responseSuscriptions = await fetch(
    process.env.API_URL! +
      "/api/product/getSuscriptionsByAgentId/3abd9e95-4883-46bb-aaa9-c00e221cfd0b",
    {
      headers: {
        id: process.env.API_KEY!,
      },
      cache: "no-store",
    }
  )
  const suscriptions = await responseSuscriptions.json()

  return (
    <>
      <section className="relative flex h-[450px] items-center px-20">
        <Image
          src="/coaniquem/bannerphoto.jpg"
          alt="Sobre nosotros"
          quality={100}
          fill={true}
          className="absolute z-0 object-cover object-right md:object-center"
        />
        <div className="z-10 flex w-full items-center">
          <h1 className="font-bebas text-6xl uppercase text-white">
            doble razón para unirte
          </h1>
        </div>
        <div className="z-5 absolute right-0 top-0 h-full w-full bg-black bg-opacity-30"></div>
      </section>

      <section className="container flex flex-col items-start justify-center  py-12 pb-20">
        <div className="flex flex-col gap-8  px-4 py-4 md:pb-10 md:pt-20">
          <h2 className=" text-2xl  font-semibold md:text-4xl">
            Nuestra Misión
          </h2>
          <div className="text-center">
            <h2 className="text-xl font-semibold md:text-2xl">
              ¿Cómo ayudamos a COANIQUEM?
            </h2>

            <div className="flex flex-row justify-between">
              <Image
                src="/coaniquem/icons/iconhands.png"
                alt="Sobre nosotros"
                quality={100}
                width={100}
                height={50}
                className="w-1/3 md:w-1/6"
              />
              <Image
                src="/coaniquem/icons/iconarrow.png"
                alt="Sobre nosotros"
                quality={100}
                width={100}
                height={50}
                className="w-1/3 md:w-1/6"
              />
              <Image
                src="/coaniquem/icons/iconheart.png"
                alt="Sobre nosotros"
                quality={100}
                width={100}
                height={50}
                className="w-1/3 md:w-1/6"
              />
            </div>
          </div>
          <h2 className="text-center text-xl font-semibold md:text-2xl">
            Al suscribir tu Asistencia, Serviclick donará a COANIQUEM para
            ayudar a los niños, niñas y adolescentes en su rehabilitación.
          </h2>
        </div>
      </section>
      <HeroCarousel suscriptions={suscriptions} />
      <section className="w-full  py-12 md:py-24 lg:py-32">
        <div className="flex items-center justify-center">
          <div className="h-4 w-1/4 rounded-r-full border-r  border-white bg-red-500 md:w-full" />
          <h2 className=" w-full  text-center text-2xl font-semibold md:text-4xl">
            Momentos de conexión
          </h2>
          <div className="h-4 w-1/4 rounded-l-full border-l border-white bg-red-500  md:w-full" />
        </div>
      </section>

      <ConnectionMoments />
      <GrupoMHM />
    </>
  )
}

export function GrupoMHM() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-20">
      <h1 className="text-center font-bebas text-4xl uppercase">Grupo MHM</h1>
      <div className="flex w-full max-w-5xl flex-wrap items-center justify-center">
        <Image
          src="/mhm1.png"
          alt="MHM1"
          width={300}
          height={80}
          loading="lazy"
          quality={100}
          unoptimized
        />
        <Image
          src="/mhm2.png"
          alt="MHM2"
          width={300}
          height={80}
          loading="lazy"
          quality={100}
          unoptimized
        />
        <Image
          src="/mhm3.png"
          alt="MHM3"
          width={300}
          height={80}
          loading="lazy"
          unoptimized
        />
        <Image
          src="/mhm4.png"
          alt="MHM4"
          width={300}
          height={80}
          loading="lazy"
          unoptimized
        />
        <Image
          src="/mhm5.png"
          alt="MHM5"
          width={300}
          height={80}
          loading="lazy"
          unoptimized
        />
        <Image
          src="/mhm6.png"
          alt="MHM5"
          width={300}
          height={80}
          loading="lazy"
          unoptimized
        />
        <Image
          src="/mhm7.png"
          alt="MHM5"
          width={300}
          height={80}
          loading="lazy"
          unoptimized
        />
      </div>
    </section>
  )
}
