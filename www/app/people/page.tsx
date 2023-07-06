import Image from "next/image"

import AssistanceSuggestionForm from "@/components/functional/people/assistance-suggestion-form"
import Faq from "@/components/functional/people/faq"
import { Interests } from "@/components/functional/people/interests"

export default async function PeoplePage() {
  const responseFamilies = await fetch(
    process.env.API_URL! + "/api/product/listByFamilies",
    {
      headers: {
        id: process.env.API_KEY!,
      },
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
      <section className="relative h-[450px] flex items-center px-20 pb-20">
        <Image
          src="/peoplecover.png"
          alt="Picture of the author"
          quality={100}
          fill={true}
          className="absolute z-0 object-cover" // This will position the image below the text.
        />
        <div className="z-10 w-96">
          <h1 className="uppercase text-4xl text-background font-bold">
            Asistencias que facilitan tu vida.
          </h1>
        </div>
        <div className="bg-black absolute w-full h-full z-5 top-0 right-0 bg-opacity-30"></div>
      </section>
      <section className="container flex justify-center flex-col items-center py-10">
        <h1 className="pb-6 uppercase text-2xl font-bold">
          Selecciona el área de tu interés
        </h1>
        <Interests families={uniqueFamilies} />
      </section>
      <section className="container flex justify-center flex-col items-center py-10">
        <h1 className="pb-6 uppercase text-2xl font-bold">
          Te ayudamos a seleccionar la asistencia ideal para ti
        </h1>
        <AssistanceSuggestionForm />
      </section>
      <section className="container flex justify-center flex-col items-center py-10">
        <h1 className="pb-6 uppercase text-2xl font-bold">
          Preguntas frecuentes
        </h1>
        <Faq />
      </section>
      <section className="relative bg-background h-[480px] sm:h-[600px] lg:h-[600px] duration-75">
        <div className="bg-foreground flex flex-col lg:flex-row items-center py-4 h-96 lg:justify-evenly">
          <div className="flex flex-col py-4 gap-4 items-center justify-center lg:order-2">
            <h2 className="uppercase text-4xl px-16 text-background font-bold flex justify-center lg:justify-start w-full">
              ¿Cómo obtengo mi asistencia?
            </h2>
            <ul className="flex lg:flex-col px-16 md:px-24 justify-around gap-4 lg:gap-2 text-lg lg:justify-start flex-wrap w-full list-disc uppercase font-semibold text-background marker:text-primary">
              <li>Rápido</li>
              <li>En pocos pasos</li>
              <li>Accesible</li>
            </ul>
          </div>
          <div className="flex justify-center mx-4 items-center order-1 lg:order-2 relative lg:-bottom-24 lg:right-16">
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
    </>
  )
}
