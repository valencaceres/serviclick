"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export const HeroCarousel = ({ suscriptions }: any) => {
  const videoProgress = 100000 /* Array.isArray(suscriptions) ? suscriptions.length : 0 */

  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const currentPercentage =
          (videoRef.current.currentTime / videoRef.current.duration) * 100000

        if (currentPercentage >= videoProgress) {
          const newTime = (videoProgress / 100000) * videoRef.current.duration
          videoRef.current.currentTime = newTime
          videoRef.current.pause()

          videoRef.current.removeEventListener("timeupdate", handleTimeUpdate)
        }
      }
    }

    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate)
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate)
      }
    }
  }, [videoProgress])
  return (
    <section className="container flex flex-col items-center justify-center pb-20">
      <div className=" flex flex-col gap-8 py-4 md:pb-10 md:pt-20">
        <h1 className="text-center text-2xl font-semibold md:text-4xl">
          Nuestra Meta 2024
        </h1>
        <div className="relative flex items-center justify-center ">
          <p className="absolute left-0 top-0 text-left text-xl font-semibold md:text-2xl">
            Diciembre 2024
          </p>
          <p className="absolute bottom-0 left-0 text-left text-xl font-semibold md:text-2xl">
            Enero 2024
          </p>

          <video
            ref={videoRef}
            style={{
              width: "50%",
              height: "50%",
              objectPosition: "center",
              top: 0,
              left: 0,
            }}
            autoPlay
            loop
            muted
            id="video"
          >
            <source src={`/coaniquem/icons/heartvideo.mp4`} type="video/mp4" />
          </video>
          <p className="absolute right-0 top-0 text-right text-xl font-semibold md:text-2xl">
            100.000 suscripciones
          </p>
          <p className="absolute bottom-0 right-0 text-right text-xl font-semibold md:text-2xl">
            0 suscripciones
          </p>
        </div>
      </div>
    </section>
  )
}
