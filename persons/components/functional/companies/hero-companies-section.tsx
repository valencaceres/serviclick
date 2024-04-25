"use client"

import withScrollAnimation from "../withScrollAnimation"

const HeroCompaniesSection = () => {
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
        <source src="/companies.mp4" type="video/mp4" />
      </video>
      <div className="z-10 w-96">
        <h1 className="text-center font-bebas text-6xl uppercase text-background md:text-start">
          Juntos somos un gran equipo.
        </h1>
      </div>
      <div className="z-5 absolute right-0 top-0 h-full w-full bg-black bg-opacity-30"></div>
    </section>
  )
}
export default withScrollAnimation(HeroCompaniesSection)
