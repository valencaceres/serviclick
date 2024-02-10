"use client"

import withScrollAnimation from "../withScrollAnimation"
import Faq from "./faq"

const FaqSection = () => {
  return (
    <section className="container flex flex-col items-center justify-center py-10">
      <h1 className="pb-6 font-bebas text-4xl uppercase">
        Preguntas frecuentes
      </h1>
      <Faq />
    </section>
  )
}
export default withScrollAnimation(FaqSection)
