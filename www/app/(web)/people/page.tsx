import { Metadata } from "next"
import Image from "next/image"

import AssistanceSuggestionForm from "@/components/functional/people/assistance-suggestion-form"
import Faq from "@/components/functional/people/faq"
import { Interests } from "@/components/functional/people/interests"
import Mainteance from "@/components/functional/maintenance"

export const metadata: Metadata = {
  title: {
    default: "Selecciona área de asistencia",
    template: `%s - ${"Selecciona área de asistencia"}`,
  },
  description: "Selecciona área de asistencia",
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

export default async function PeoplePage() {
  const responseFamilies = await fetch(
    process.env.API_URL! +
      "/api/product/listByFamilies/020579a3-8461-45ec-994b-ad22ff8e3275",
    {
      headers: {
        id: process.env.API_KEY!,
      },
      cache: "no-store",
    }
  )
  const families = await responseFamilies.json()

  let uniqueFamilyNames = new Set()
  let uniqueFamilies = families.filter((family: { family_name: unknown }) => {
    if (!uniqueFamilyNames.has(family.family_name)) {
      uniqueFamilyNames.add(family.family_name)
      return true
    }
    return false
  })

  if (!Array.isArray(families) || families.length === 0){
    return (
      <Mainteance />
      )
  }

  return (
    <>
      <section className="relative flex h-[550px] items-center px-20">
        <video
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            position: "absolute",
            objectPosition: "top",
            top: 0,
            left: 0,
          }}
          autoPlay
          loop
          muted
          id="video"
        >
          <source src="/people.mp4" type="video/mp4" />
        </video>
        <div className="z-10 w-96 self-end pb-12 text-center md:self-center md:pb-0 md:text-left">
          <h1 className="font-bebas text-6xl uppercase text-background">
            Asistencias que facilitan tu vida.
          </h1>
        </div>
        <div className="z-5 absolute right-0 top-0 h-full w-full bg-black bg-opacity-30"></div>
      </section>
      <section className="container flex flex-col items-center justify-center pb-12 pt-20">
        <h1 className="pb-6 text-center font-bebas text-4xl uppercase md:text-5xl">
          Selecciona el área de tu interés
        </h1>
        <Interests families={uniqueFamilies} />
      </section>
      <section className="container flex flex-col items-center justify-center py-10">
        <h1 className="pb-6 font-bebas text-4xl uppercase">
          Te ayudamos a seleccionar la asistencia ideal para ti
        </h1>
        <AssistanceSuggestionForm families={uniqueFamilies} />
      </section>
      <section className="container flex flex-col items-center justify-center py-10">
        <h1 className="pb-6 font-bebas text-4xl uppercase">
          Preguntas frecuentes
        </h1>
        <Faq />
      </section>
      <section className="relative mb-28 h-[480px] bg-background font-bebas duration-75 sm:h-[600px] md:mb-44 lg:mb-12 lg:h-[600px]">
        <div className="flex h-96 flex-col items-center bg-foreground py-4 lg:flex-row lg:justify-evenly">
          <div className="flex flex-col items-center justify-center gap-4 py-4 lg:order-2">
            <h2 className="flex w-full justify-center px-16 text-center text-5xl uppercase text-background lg:justify-start lg:text-start">
              ¿Cómo obtengo mi asistencia?
            </h2>
            <ul className="flex w-full flex-col flex-wrap justify-around gap-4 px-12 text-center text-xl uppercase text-background marker:text-primary md:px-24 lg:list-disc lg:justify-start lg:gap-2 lg:text-start">
              <li>Rápido</li>
              <li>En pocos pasos</li>
              <li>Accesible</li>
            </ul>
          </div>
          <div className="relative order-1 mx-4 flex items-center justify-center rounded-xl shadow-lg lg:-bottom-24 lg:right-16 lg:order-2 lg:h-[450px] lg:w-[800px]">
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
              <source src="/videoiconografico.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
    </>
  )
}
