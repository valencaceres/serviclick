"use client"

import withScrollAnimation from "../withScrollAnimation"

const AboutUsSection = () => {
  return (
    <section
      id="about"
      className="relative h-[480px] bg-background duration-75 sm:h-[600px] lg:h-[600px]"
    >
      <div className="flex h-96 flex-col items-center bg-primary py-4 font-bebas lg:flex-row-reverse lg:justify-evenly">
        <div className="flex flex-col items-center justify-center gap-4 py-4 lg:order-2">
          <h2 className="flex w-full justify-center px-16 text-center text-5xl uppercase text-background lg:justify-start lg:text-start">
            ¿Por qué Serviclick?
          </h2>
          <ul className="flex w-full justify-evenly gap-4 px-16 text-2xl uppercase text-background marker:text-foreground  md:list-disc md:px-24 lg:flex-col lg:justify-start lg:gap-2">
            <li>Confiable</li>
            <li>Rápido</li>
            <li>Oportuno</li>
          </ul>
        </div>
        <div className="relative order-1 mx-4 flex items-center justify-center rounded-xl shadow-lg lg:-bottom-24 lg:left-16 lg:order-2 lg:h-[450px] lg:w-[800px]">
          <video
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "14px",
            }}
            controls
            loop
            id="video1"
          >
            <source src="/videocorp.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
export default withScrollAnimation(AboutUsSection)
