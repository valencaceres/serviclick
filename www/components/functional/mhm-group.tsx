"use client"

import Image from "next/image"

import withScrollAnimation from "./withScrollAnimation"

const MhmGroup = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-20">
      <h1 className="text-center font-bebas text-4xl uppercase">Grupo MHM</h1>
      <div className="flex w-full max-w-5xl flex-wrap items-center justify-center">
        <Image
          src="/mhm1.png"
          alt="MHM1"
          width={300}
          height={80}
          loading="lazy"
          quality={100}
          unoptimized
        />
        <Image
          src="/mhm2.png"
          alt="MHM2"
          width={300}
          height={80}
          loading="lazy"
          quality={100}
          unoptimized
        />
        <Image
          src="/mhm3.png"
          alt="MHM3"
          width={300}
          height={80}
          loading="lazy"
          unoptimized
        />

        <Image
          src="/mhm5.png"
          alt="MHM5"
          width={300}
          height={80}
          loading="lazy"
          unoptimized
        />
        <Image
          src="/mhm6.png"
          alt="MHM5"
          width={300}
          height={80}
          loading="lazy"
          unoptimized
        />
        <Image
          src="/mhm7.png"
          alt="MHM5"
          width={300}
          height={80}
          loading="lazy"
          unoptimized
        />
      </div>
    </section>
  )
}

export default withScrollAnimation(MhmGroup)
