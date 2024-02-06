"use client"

import withScrollAnimation from "../withScrollAnimation"
import { Clients } from "./clients"

const CustomerSection = () => {
  return (
    <section className="container flex flex-col items-center justify-center pb-12">
      <h1 className="pb-6 text-center font-bebas text-4xl uppercase">
        Clientes
      </h1>
      <Clients />
    </section>
  )
}

export default withScrollAnimation(CustomerSection)
