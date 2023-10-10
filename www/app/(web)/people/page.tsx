import Image from "next/image"

import HeadPages from "@/components/functional/HeadPage"
import AssistanceSuggestionForm from "@/components/functional/people/assistance-suggestion-form"
import Faq from "@/components/functional/people/faq"
import { Interests } from "@/components/functional/people/interests"

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

  return (
    <>
      <section className="relative h-[550px] flex items-center px-20">
        <HeadPages
          title="Selecciona área de asistencia"
          description="Selecciona área de asistencia"
        />

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
        <div className="z-10 w-96 self-end pb-12 md:self-center md:pb-0 text-center md:text-left">
          <h1 className="uppercase text-6xl text-background font-bebas">
            Asistencias que facilitan tu vida.
          </h1>
        </div>
        <div className="bg-black absolute w-full h-full z-5 top-0 right-0 bg-opacity-30"></div>
      </section>
      <section className="container flex justify-center flex-col items-center pt-20 pb-12">
        <h1 className="pb-6 uppercase text-4xl md:text-5xl font-bebas text-center">
          Selecciona el área de tu interés
        </h1>
        <Interests families={uniqueFamilies} />
      </section>
      <section className="container flex justify-center flex-col items-center py-10">
        <h1 className="pb-6 uppercase text-4xl font-bebas">
          Te ayudamos a seleccionar la asistencia ideal para ti
        </h1>
        <AssistanceSuggestionForm families={uniqueFamilies} />
      </section>
      <section className="container flex justify-center flex-col items-center py-10">
        <h1 className="pb-6 uppercase text-4xl font-bebas">
          Preguntas frecuentes
        </h1>
        <Faq />
      </section>
      <section className="relative bg-background h-[480px] sm:h-[600px] lg:h-[600px] duration-75 font-bebas mb-28 md:mb-44 lg:mb-12">
        <div className="bg-foreground flex flex-col lg:flex-row items-center py-4 h-96 lg:justify-evenly">
          <div className="flex flex-col py-4 gap-4 items-center justify-center lg:order-2">
            <h2 className="uppercase text-5xl px-16 text-background flex justify-center lg:justify-start w-full text-center lg:text-start">
              ¿Cómo obtengo mi asistencia?
            </h2>
            <ul className="flex flex-col text-center lg:text-start px-12 md:px-24 justify-around gap-4 lg:gap-2 text-xl lg:justify-start flex-wrap w-full lg:list-disc uppercase text-background marker:text-primary">
              <li>Rápido</li>
              <li>En pocos pasos</li>
              <li>Accesible</li>
            </ul>
          </div>
          <div className="flex justify-center lg:w-[800px] lg:h-[450px] shadow-lg rounded-xl mx-4 items-center order-1 lg:order-2 relative lg:-bottom-24 lg:right-16">
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
