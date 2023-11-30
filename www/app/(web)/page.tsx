import "swiper/css"
import "swiper/css/navigation"
import { Metadata } from "next"

import { Alliances } from "@/components/functional/home/alliances"
import { AssistancesCarousel } from "@/components/functional/home/assistances-carousel"
import { Clients } from "@/components/functional/home/clients"
import { HeroCarousel } from "@/components/functional/home/hero-carousel"
import { News } from "@/components/functional/home/news"

export const metadata: Metadata = {
  title: {
    default: "Serviclick - Todas las soluciones en la palma de tu mano",
    template: `%s - ${"Soluciones en la palma de tu mano."}`,
  },
  description: "Soluciones en la palma de tu mano.",
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

export default async function IndexPage() {
  const responseCategories = await fetch(
    process.env.API_URL! + "/api/category/getAll",
    {
      headers: {
        id: process.env.API_KEY!,
      },
      cache: "no-store",
    }
  )

  const responseHero = await fetch(
    process.env.API_URL! + "/api/web/getHero?type=hero",
    {
      headers: {
        id: process.env.API_KEY!,
      },
      cache: "no-store",
    }
  )
  const responseNews = await fetch(
    process.env.API_URL! + "/api/web/getHero?type=news",
    {
      headers: {
        id: process.env.API_KEY!,
      },
      cache: "no-store",
    }
  )
  const news = await responseNews.json()
  const hero = await responseHero.json()
  const categories = await responseCategories.json()
  return (
    <>
      <section className="relative flex h-[250px] items-center font-bebas md:h-[550px]">
        <HeroCarousel hero={hero} />
      </section>
      <section className="container flex flex-col items-center justify-center pb-20 font-bebas">
        <div className="py-4 md:pb-10 md:pt-20">
          <h1 className="text-center text-4xl uppercase md:text-5xl">
            Selecciona la asistencia que necesitas
          </h1>
        </div>
        <AssistancesCarousel assistances={categories} />
      </section>
      <section
        id="about"
        className="relative h-[480px] bg-background duration-75 sm:h-[600px] lg:h-[600px]"
      >
        <div className="flex h-96 flex-col items-center bg-primary py-4 font-bebas lg:flex-row-reverse lg:justify-evenly">
          <div className="flex flex-col items-center justify-center gap-4 py-4 lg:order-2">
            <h2 className="flex w-full justify-center px-16 text-center text-5xl uppercase text-background lg:justify-start lg:text-start">
              ¿Por qué Serviclick?
            </h2>
            <ul className="flex w-full justify-evenly gap-4 px-16 text-2xl uppercase text-background marker:text-foreground  md:list-disc md:px-24 lg:flex-col lg:justify-start lg:gap-2">
              <li>Confiable</li>
              <li>Rápido</li>
              <li>Oportuno</li>
            </ul>
          </div>
          <div className="relative order-1 mx-4 flex items-center justify-center rounded-xl shadow-lg lg:-bottom-24 lg:left-16 lg:order-2 lg:h-[450px] lg:w-[800px]">
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
      <section className="container flex flex-col items-center justify-center pb-12">
        <h1 className="pb-6 font-bebas text-4xl uppercase">Novedades</h1>
        <News news={news} />
      </section>
      <section className="container flex flex-col items-center justify-center pb-12">
        <h1 className="pb-6 text-center font-bebas text-4xl uppercase">
          Clientes
        </h1>
        <Clients />
      </section>
      <section className="container flex flex-col items-center justify-center pb-20">
        <h1 className="pb-6 text-center font-bebas text-4xl uppercase">
          Alianzas
        </h1>
        <Alliances />
      </section>
    </>
  )
}
