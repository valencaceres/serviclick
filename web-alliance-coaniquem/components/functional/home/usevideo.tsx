"use client"

import { useCallback, useEffect, useRef } from "react"

export const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const loadVideoCb = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current
      video.controls = false
      video.muted = true
      video.autoplay = true

      setTimeout(() => {
        const promise = video?.play()
        if (promise?.then) {
          promise.then(() => {}).catch(() => {})
        }
      }, 0)
    }
  }, [])

  useEffect(() => {
    loadVideoCb()
  }, [loadVideoCb])

  return (
    <section className="relative flex h-[500px] items-center px-20">
      <video
        ref={videoRef}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "14px",
          position: "absolute",
          objectPosition: "top",
          top: 0,
          left: 0,
        }}
        autoPlay
        loop
        muted
        id="video1"
      >
        <source src="/coaniquem/herovideo.mp4" type="video/mp4" />
      </video>

      <div className="z-10 w-[400px] self-end pb-12 text-center md:self-center md:pb-0 md:text-left">
        <h1
          className="font-bebas text-6xl uppercase text-background"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <span>CUIDA DE TI,</span>
          <span>CUIDA DE ELLOS</span>
        </h1>
      </div>
    </section>
  )
}
