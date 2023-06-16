import "swiper/css"
import "swiper/css/navigation"
import Image from "next/image"

import { Alliances } from "@/components/functional/home/alliances"
import { AssistancesCarousel } from "@/components/functional/home/assistances-carousel"
import { Clients } from "@/components/functional/home/clients"
import { HeroCarousel } from "@/components/functional/home/hero-carousel"
import { News } from "@/components/functional/home/news"

export default function IndexPage() {
  return (
    <>
      <HeroCarousel />
      <section className="container flex justify-center flex-col items-center pb-20">
        <div className="md:pt-20 md:pb-10 py-4">
          <h1 className="uppercase font-bold text-xl text-center md:text-4xl">
            Selecciona la asistencia que necesitas
          </h1>
        </div>
        <AssistancesCarousel />
      </section>
      <section
        id="about"
        className="relative bg-background h-[480px] sm:h-[600px] lg:h-[600px] duration-75"
      >
        <div className="bg-primary flex flex-col lg:flex-row-reverse items-center py-4 h-96 lg:justify-evenly">
          <div className="flex flex-col py-4 gap-4 items-center justify-center lg:order-2">
            <h2 className="uppercase text-4xl px-16 text-background font-bold flex justify-center lg:justify-start w-full">
              ¿Por qué Serviclick?
            </h2>
            <ul className="flex lg:flex-col px-16 md:px-24 justify-around gap-4 lg:gap-2 text-lg lg:justify-start flex-wrap w-full list-disc uppercase font-semibold text-background marker:text-foreground">
              <li>Confiable</li>
              <li>Rápido</li>
              <li>Oportuno</li>
            </ul>
          </div>
          <div className="flex justify-center mx-4 items-center order-1 lg:order-2 relative lg:-bottom-24 lg:left-16">
            <Image
              src={"/videopreview.png"}
              alt="Video Preview"
              width={800}
              height={450}
              sizes="(max-width: 640px) 100vw, 640px"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
      <section className="container flex justify-center flex-col items-center pb-20">
        <h1 className="pb-6 uppercase text-2xl font-bold">Novedades</h1>
        <News />
      </section>
      <section className="container flex justify-center flex-col items-center pb-20">
        <h1 className="text-3xl font-bold uppercase text-center pb-6">
          Clientes
        </h1>
        <Clients />
      </section>
      <section className="container flex justify-center flex-col items-center pb-20">
        <h1 className="text-3xl font-bold uppercase text-center pb-6">
          Alianzas
        </h1>
        <Alliances />
      </section>
    </>
  )
}
