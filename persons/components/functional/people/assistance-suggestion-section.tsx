"use client"

import withScrollAnimation from "../withScrollAnimation"
import AssistanceSuggestionForm from "./assistance-suggestion-form"

const AssistanceSuggestionSection = ({ uniqueFamilies }: any) => {
  return (
    <section className="container flex flex-col items-center justify-center py-10">
      <h1 className="pb-6 font-bebas text-4xl uppercase">
        Te ayudamos a seleccionar la asistencia ideal para ti
      </h1>
      <AssistanceSuggestionForm families={uniqueFamilies} />
    </section>
  )
}
export default withScrollAnimation(AssistanceSuggestionSection)
