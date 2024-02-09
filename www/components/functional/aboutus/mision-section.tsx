"use client"

import Image from "next/image"

import withScrollAnimation from "../withScrollAnimation"

const MisionSection = () => {
  return (
    <section className="flex justify-center bg-foreground text-background">
      <div className="max-w-8xl flex flex-auto flex-wrap items-center justify-between">
        <div className="flex w-full flex-col gap-4 px-6 py-4 md:w-1/2 lg:px-20">
          <h1 className="text-center font-bebas text-4xl uppercase">
            Nuestra misión
          </h1>
          <p>
            En Serviclick, nuestro objetivo es brindar servicios que beneficien
            a todos nuestros grupos de interés, y es por eso que llevamos a cabo
            nuestro trabajo con respeto, promoviendo la confianza, la equidad y
            la transparencia. Buscamos impulsar una transformación social en la
            que la calidad de vida y el respeto por la dignidad de cada persona
            sean valores fundamentales.
          </p>
        </div>
        <div className="relative h-[300px] w-full object-cover md:w-1/2">
          <Image
            src="/ourmission.jpeg"
            alt="Nuestra misión"
            fill={true}
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
export default withScrollAnimation(MisionSection)
