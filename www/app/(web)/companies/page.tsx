import HeadPages from "@/components/functional/HeadPage"
import AssistanceQuoteForm from "@/components/functional/companies/assistance-quote-form"
import { Details } from "@/components/functional/companies/details"

import { GrupoMHM } from "../aboutus/page"

export default async function CompaniesPage() {
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
          title="Cotizacion empresa"
          description="Cotiza la asistencia para tu empresa"
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
          <source src="/companies.mp4" type="video/mp4" />
        </video>
        <div className="z-10 w-96">
          <h1 className="uppercase text-6xl text-background font-bebas text-center md:text-start">
            Juntos somos un gran equipo.
          </h1>
        </div>
        <div className="bg-black absolute w-full h-full z-5 top-0 right-0 bg-opacity-30"></div>
      </section>
      <section className="container flex justify-center flex-col items-center py-10">
        <Details />
      </section>
      <section className="container flex justify-center flex-col items-center py-10">
        <h1 className="pb-6 uppercase text-4xl font-bebas text-center">
          Cotiza la asistencia para tu empresa
        </h1>
        <AssistanceQuoteForm families={uniqueFamilies} />
      </section>
      <GrupoMHM />
    </>
  )
}
