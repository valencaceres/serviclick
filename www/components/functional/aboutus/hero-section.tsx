"use client"

import Image from "next/image"

import withScrollAnimation from "../withScrollAnimation"

const HeroSection = () => {
  return (
    <section className="relative flex h-[450px] items-center px-20">
      <Image
        src="/quienessomos.jpeg"
        alt="Quienes somos"
        quality={100}
        fill={true}
        className="absolute z-0 object-cover object-right md:object-center"
      />
      <div className="z-10 flex w-full items-center">
        <h1 className="font-bebas text-6xl uppercase text-white">
          Sobre nosotros
        </h1>
      </div>
      <div className="z-5 absolute right-0 top-0 h-full w-full bg-black bg-opacity-30"></div>
    </section>
  )
}

export default withScrollAnimation(HeroSection)
