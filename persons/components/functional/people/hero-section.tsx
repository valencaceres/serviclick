"use client"

import withScrollAnimation from "../withScrollAnimation"

const HeroSection = ({ hero }: any) => {
  return (
    <section className="relative flex h-[550px] items-center px-20">
      <video
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          objectPosition: "top",
          top: 0,
          left: 0,
        }}
        autoPlay
        loop
        muted
        id="video"
      >
        <source src="/people.mp4" type="video/mp4" />
      </video>
      <div className="z-10 w-96 self-end pb-12 text-center md:self-center md:pb-0 md:text-left">
        <h1 className="font-bebas text-6xl uppercase text-background">
          Asistencias que facilitan tu vida.
        </h1>
      </div>
      <div className="z-5 absolute right-0 top-0 h-full w-full bg-black bg-opacity-30"></div>
    </section>
  )
}
export default withScrollAnimation(HeroSection)
