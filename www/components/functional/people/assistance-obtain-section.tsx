"use client"

import withScrollAnimation from "../withScrollAnimation"

const AssistanceSection = () => {
  return (
    <section className="relative mb-28 h-[480px] bg-background font-bebas duration-75 sm:h-[600px] md:mb-44 lg:mb-12 lg:h-[600px]">
      <div className="flex h-96 flex-col items-center bg-foreground py-4 lg:flex-row lg:justify-evenly">
        <div className="flex flex-col items-center justify-center gap-4 py-4 lg:order-2">
          <h2 className="flex w-full justify-center px-16 text-center text-5xl uppercase text-background lg:justify-start lg:text-start">
            ¿Cómo obtengo mi asistencia?
          </h2>
          <ul className="flex w-full flex-col flex-wrap justify-around gap-4 px-12 text-center text-xl uppercase text-background marker:text-primary md:px-24 lg:list-disc lg:justify-start lg:gap-2 lg:text-start">
            <li>Rápido</li>
            <li>En pocos pasos</li>
            <li>Accesible</li>
          </ul>
        </div>
        <div className="relative order-1 mx-4 flex items-center justify-center rounded-xl shadow-lg lg:-bottom-24 lg:right-16 lg:order-2 lg:h-[450px] lg:w-[800px]">
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
            <source src="/videoiconografico.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
export default withScrollAnimation(AssistanceSection)
