"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import SideScroll from "../ui/side-scroll"

export const ConnectionMoments = () => {
  const [shouldClick, setShouldClick] = useState(true)

  return (
    <section className="relative w-full py-12  md:py-24 lg:py-32">
      <div className="z-0 h-[150px]  w-full bg-slate-200 md:h-[250px]"></div>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 60,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { delay: 1 * 0.1 },
          y: 0,
        }}
        transition={{
          duration: 0.75,
        }}
        className="relative -top-[170px] z-10 mx-auto w-full md:-top-[300px] "
      >
        <SideScroll setShouldClick={setShouldClick}>
          <div className=" flex h-[200px] gap-4 px-8 md:h-[350px]">
            <Image
              src="/connection-moments/1.png"
              alt="momentos de conexion"
              width={700}
              height={400}
              loading="lazy"
              unoptimized
            />
            <Image
              src="/connection-moments/2.png"
              alt="momentos de conexion"
              width={700}
              height={400}
              loading="lazy"
              unoptimized
            />
            <Image
              src="/connection-moments/3.png"
              alt="momentos de conexion"
              width={700}
              height={400}
              loading="lazy"
              unoptimized
            />
            <Image
              src="/connection-moments/4.png"
              alt="momentos de conexion"
              width={700}
              height={400}
              loading="lazy"
              unoptimized
            />
            <Image
              src="/connection-moments/5.png"
              alt="momentos de conexion"
              width={700}
              height={400}
              loading="lazy"
              unoptimized
            />
            <Image
              src="/connection-moments/6.png"
              alt="momentos de conexion"
              width={700}
              height={400}
              loading="lazy"
              unoptimized
            />
            <Image
              src="/connection-moments/7.png"
              alt="momentos de conexion"
              width={700}
              height={400}
              loading="lazy"
              unoptimized
            />
          </div>
        </SideScroll>
      </motion.div>
    </section>
  )
}
