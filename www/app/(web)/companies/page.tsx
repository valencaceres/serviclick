import { Metadata } from "next"

import AssistanceQuoteForm from "@/components/functional/companies/assistance-quote-form"
import { Details } from "@/components/functional/companies/details"
import DetailsSection from "@/components/functional/companies/details-section"
import HeroCompaniesSection from "@/components/functional/companies/hero-companies-section"
import Mainteance from "@/components/functional/maintenance"
import GrupoMHM from "@/components/functional/mhm-group"

export const metadata: Metadata = {
  title: {
    default: "Cotizacion empresa",
    template: `%s - ${"Cotizacion empresa"}`,
  },
  description: "Cotiza la asistencia para tu empresa",
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
  if (!Array.isArray(families) || families.length === 0) {
    return <Mainteance />
  }
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
      <HeroCompaniesSection />
      <DetailsSection />
      <section className="container flex w-full flex-col items-center justify-center py-10">
        <h1 className="pb-6 text-center font-bebas text-4xl uppercase">
          Cotiza la asistencia para tu empresa
        </h1>

        <AssistanceQuoteForm families={uniqueFamilies} />
      </section>
      <GrupoMHM />
    </>
  )
}
