"use client"

import withScrollAnimation from "../withScrollAnimation"
import { Details } from "./details"

const DetailsSection = () => {
  return (
    <section className="container flex flex-col items-center justify-center py-10">
      <Details />
    </section>
  )
}
export default withScrollAnimation(DetailsSection)
