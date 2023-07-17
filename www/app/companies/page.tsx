import Image from "next/image"

import AssistanceQuoteForm from "@/components/functional/companies/assistance-quote-form"
import { Details } from "@/components/functional/companies/details"

import { GrupoMHM } from "../aboutus/page"

export default function CompaniesPage() {
  return (
    <>
      <section className="relative h-[550px] flex items-center px-20">
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
        <AssistanceQuoteForm />
      </section>
      <GrupoMHM />
    </>
  )
}
