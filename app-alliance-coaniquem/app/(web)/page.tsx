import "swiper/css"
import "swiper/css/navigation"
import { Metadata } from "next"

import { Alliances } from "@/components/functional/home/alliances"
import { AssistanceSection } from "@/components/functional/assistance-section"
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
  
  const responseNews = await fetch(
    process.env.API_URL! + "/api/web/getHero?type=news",
    {
      headers: {
        id: process.env.API_KEY!,
      },
      cache: "no-store",
    }
  )
  const responseAssistances = await fetch(
    process.env.API_URL! +  "/api/product/listByFamilies/3abd9e95-4883-46bb-aaa9-c00e221cfd0b",
    {
      headers: {
        id: process.env.API_KEY!,
      },
      cache: "no-store",
    }
  )
  const news = await responseNews.json()
  const Assistances = await responseAssistances.json()
 let uniqueAssistances = Assistances.reduce((acc: any, current: any) => {
  let key = current.product_name.replace(" Familiar", "")

  if (!acc[key]) {
    acc[key] = {
      product_id: current.product_id,
      productplan_id: current.productplan_id,
      family_productplan_id: current.product_name.includes("Familiar")
        ? current.productplan_id
        : undefined,
      product_name: current.product_name.replace(" Familiar", ""),
      price: current.product_name.includes("Familiar")
        ? undefined
        : current.price,
      coverages: [],
      family_price: current.product_name.includes("Familiar")
        ? current.price
        : undefined,
    }
  } else {
    if (current.product_name.includes("Familiar")) {
      acc[key].family_price = current.price
      acc[key].family_productplan_id = current.productplan_id
    } else {
      acc[key].price = current.price
      acc[key].productplan_id = current.productplan_id
    }
  }

  if (!current.product_name.includes("Familiar")) {
    let coverage = {
      assistance_id: current.assistance_id,
      coverage_name: current.coverage_name,
      coverage_amount: current.coverage_amount,
      coverage_maximum: current.coverage_maximum,
      coverage_lack: current.coverage_lack,
      coverage_events: current.coverage_events,
      coverage_currency: current.coverage_currency,
    }

    if (
      !acc[key].coverages.find(
        (c: any) => c.coverage_name === coverage.coverage_name
      )
    ) {
      acc[key].coverages.push(coverage)
    }
  }

  return acc
}, {})

const uniqueAssistancesArray = Object.values(uniqueAssistances)
  return (
    <>
      <section className="relative flex h-[250px] items-center font-bebas md:h-[550px]">
        <HeroCarousel  />
      </section>
      <section className="container flex flex-col items-center justify-center pb-20">
        <div className="py-4 md:pb-10 md:pt-20 flex flex-col gap-8">
          <h1 className="text-center text-4xl uppercase md:text-5xl font-bebas">
          ¡SÚMATE  A ESTA NOBLE CAUSA!          </h1>
          <p className="text-center text-xl md:text-2xl font-semibold">
          Serviclick se unió a Coaniquem, solo faltas tú.  Suscribe tu asistencia y  nosotros donamos por ti. Estarás ayudando a los niños en su rehabilitación y únete a la mejor causa.
          </p>
        </div>
      </section>
      <section
        id="products"
        className=""
      >
        <AssistanceSection uniqueAssistancesArray={uniqueAssistancesArray}/>
     
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
