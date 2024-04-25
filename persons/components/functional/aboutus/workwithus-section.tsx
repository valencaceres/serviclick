"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import withScrollAnimation from "../withScrollAnimation"

const WorkWithUsSection = () => {
  return (
    <section className="flex flex-col items-center gap-6 bg-slate-50 py-24 text-center">
      <h1 className="font-bebas text-6xl uppercase text-foreground">
        ¡Trabaja con nosotros!
      </h1>
      <h2 className="font-bebas text-4xl uppercase text-foreground">
        Únete a MHM Empresas
      </h2>
      <Link
        href={
          "https://docs.google.com/forms/d/e/1FAIpQLSfLbQMt9eU4nCMWl2Ny26GqRb2E-3BDYn3G8ifLwVqEQQTcRg/viewform?usp=sf_link"
        }
        target="_blank"
        passHref
      >
        <Button className="w-[250px] font-bebas text-2xl uppercase">
          Enviar CV
        </Button>
      </Link>
    </section>
  )
}

export default withScrollAnimation(WorkWithUsSection)
