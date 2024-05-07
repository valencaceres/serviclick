"use client"

import Image from "next/image"

import withScrollAnimation from "../withScrollAnimation"

const VisionSection = () => {
  return (
    <section className="flex justify-center bg-primary text-background">
      <div className="max-w-8xl flex flex-auto flex-wrap-reverse items-center justify-between">
        <div className="relative h-[300px] w-full object-cover md:w-1/2">
          <Image
            src="/ourvision.jpeg"
            alt="Nuestra visión"
            fill={true}
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex w-full flex-col gap-4 px-6 py-4 md:w-1/2 lg:px-20">
          <h1 className="text-center font-bebas text-4xl uppercase">
            Nuestra visión
          </h1>
          <p>
            Nuestro objetivo es convertirnos en un referente mundial en la
            calidad de servicio, brindando protección y facilitando medidas de
            seguridad ante imprevistos. Buscamos proporcionar un acceso sencillo
            a nuestros servicios, mejorando así las expectativas y la calidad de
            vida de todas las personas. Nos esforzamos por crear un futuro
            mejor, donde todos puedan sentirse protegidos y confiados gracias a
            nuestra destacada calidad de servicio.
          </p>
        </div>
      </div>
    </section>
  )
}
export default withScrollAnimation(VisionSection)
