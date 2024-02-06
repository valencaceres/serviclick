"use client"

import withScrollAnimation from "../withScrollAnimation"

const HistorySection = () => {
  return (
    <section className="flex w-full justify-start py-12">
      <div className="mt-2 h-3 w-[60px] rounded-r-full bg-primary pr-6 md:w-[120px] lg:w-[300px]"></div>
      <div className="flex gap-4">
        <div className="flex max-w-4xl flex-col gap-4 px-4">
          <h1 className="font-bebas text-4xl uppercase">Nuestra historia</h1>
          <p>
            Nuestra compañía fue fundada en 2002 con el propósito de brindar
            servicios de protección integral que mejoren la calidad de vida de
            las personas. Formamos parte de MHM Empresas y tenemos presencia en
            Chile y Latinoamérica. Nos enfocamos en resolver todas tus
            necesidades de manera accesible, eficiente y dinámica, con el
            objetivo de mejorar tu vida.
          </p>
        </div>
      </div>
    </section>
  )
}
export default withScrollAnimation(HistorySection)
