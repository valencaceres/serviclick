import { Metadata } from "next"
import Image from "next/image"

import Mainteance from "@/components/functional/maintenance"
import AssistanceObtainSection from "@/components/functional/people/assistance-obtain-section"
import AssistanceSuggestionForm from "@/components/functional/people/assistance-suggestion-form"
import AssistanceSuggestionSection from "@/components/functional/people/assistance-suggestion-section"
import Faq from "@/components/functional/people/faq"
import FaqSection from "@/components/functional/people/faq-section"
import HeroSection from "@/components/functional/people/hero-section"
import InterestSection from "@/components/functional/people/interest-section"
import { Interests } from "@/components/functional/people/interests"

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

  if (!Array.isArray(families) || families.length === 0) {
    return <Mainteance />
  }

  return (
    <>
      <HeroSection />
      <InterestSection uniqueFamilies={uniqueFamilies} />
      <AssistanceSuggestionSection uniqueFamilies={uniqueFamilies} />
      <FaqSection />
      <AssistanceObtainSection />
    </>
  )
}
