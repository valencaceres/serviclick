import "swiper/css"
import "swiper/css/navigation"
import Image from "next/image"

import { Alliances } from "@/components/functional/home/alliances"
import { AssistancesCarousel } from "@/components/functional/home/assistances-carousel"
import { Clients } from "@/components/functional/home/clients"
import { HeroCarousel } from "@/components/functional/home/hero-carousel"
import { News } from "@/components/functional/home/news"

export default async function IndexPage() {
  const responseCategories = await fetch(
    process.env.API_URL! + "/api/category/getAll",
    {
      headers: {
        id: process.env.API_KEY!,
      },
    }
  )

  const categories = await responseCategories.json()

  return (
    <>
      <section className="relative h-[250px] md:h-[550px] flex items-center font-bebas">
        <HeroCarousel />
      </section>
      <section className="container flex justify-center flex-col items-center pb-20 font-bebas">
        <div className="md:pt-20 md:pb-10 py-4">
          <h1 className="uppercase text-4xl text-center md:text-5xl">
            Selecciona la asistencia que necesitas
          </h1>
        </div>
        <AssistancesCarousel assistances={categories} />
      </section>
      <section
        id="about"
        className="relative bg-background h-[480px] sm:h-[600px] lg:h-[600px] duration-75"
      >
        <div className="bg-primary flex flex-col lg:flex-row-reverse items-center py-4 h-96 lg:justify-evenly font-bebas">
          <div className="flex flex-col py-4 gap-4 items-center justify-center lg:order-2">
            <h2 className="uppercase text-5xl px-16 text-background text-center lg:text-start flex justify-center lg:justify-start w-full">
              ¿Por qué Serviclick?
            </h2>
            <ul className="flex lg:flex-col px-16 md:px-24 justify-evenly gap-4 lg:gap-2 text-2xl lg:justify-start  w-full md:list-disc uppercase text-background marker:text-foreground">
              <li>Confiable</li>
              <li>Rápido</li>
              <li>Oportuno</li>
            </ul>
          </div>
          <div className="flex justify-center lg:w-[800px] lg:h-[450px] shadow-lg rounded-xl mx-4 items-center order-1 lg:order-2 relative lg:-bottom-24 lg:left-16">
            <video
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "14px",
              }}
              controls
              loop
              id="video1"
            >
              <source src="/videocorp.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
      <section className="container flex justify-center flex-col items-center pb-12">
        <h1 className="pb-6 uppercase text-4xl font-bebas">Novedades</h1>
        <News />
      </section>
      <section className="container flex justify-center flex-col items-center pb-12">
        <h1 className="text-4xl font-bebas uppercase text-center pb-6">
          Clientes
        </h1>
        <Clients />
      </section>
      <section className="container flex justify-center flex-col items-center pb-20">
        <h1 className="text-4xl font-bebas uppercase text-center pb-6">
          Alianzas
        </h1>
        <Alliances />
      </section>
    </>
  )
}
