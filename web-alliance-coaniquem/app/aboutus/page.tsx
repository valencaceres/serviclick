import { Metadata } from "next"
import Image from "next/image"
import { config } from "@/utils/config"

import { ConnectionMoments } from "@/components/functional/connectionmoments"
import { TestimonialsSection } from "@/components/functional/testimonials"
import { HeroCarousel } from "@/components/functional/video-section"

export const metadata: Metadata = {
  title: {
    default: "Sobre nosotros",
    template: `%s - ${"Sobre nosotros"}`,
  },
  description: "Sobre nosotros",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default async function AboutUsPage() {
  const responseSuscriptions = await fetch(
    config.server! +
      "/api/product/getSuscriptionsByAgentId/3abd9e95-4883-46bb-aaa9-c00e221cfd0b",
    {
      headers: {
        id: config.apiKey!,
      },
      cache: "no-store",
    }
  )
  const suscriptions = await responseSuscriptions.json()

  return (
    <>
      <section className="relative flex h-[450px] items-center px-20">
        <Image
          src="/coaniquem/banner-aboutus.jpg"
          alt="Sobre nosotros"
          quality={100}
          fill={true}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
          className="absolute z-0 object-cover object-right md:object-center"
        />
        <div className="z-10 flex w-full items-center">
          <h1 className="font-bebas text-6xl uppercase text-white">
            doble razón para unirte
          </h1>
        </div>
      </section>

      <section className="container flex flex-col items-start justify-center  py-12 pb-20">
        <div className="flex flex-col gap-8  px-4 py-4 md:pb-10 md:pt-20">
          <div className="flex flex-col gap-2">
            <h2 className=" text-2xl  font-semibold md:text-4xl">
              Nuestra Misión
            </h2>
            <p className=" text-xl md:text-2xl">
              En Serviclick, nuestro propósito es proteger a las familias ante
              imprevistos, otorgando servicios de protección integral. Hoy
              donaremos por ti a esta causa que permitirá financiar parte de la
              rehabilitación de todos los niños que han sufrido quemaduras.
              Súmate a esta noble causa y protégete al mismo tiempo que apoyas a
              Coaniquem.
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold md:text-3xl">
              ¿Cómo ayudamos a COANIQUEM?
            </h2>

            <div className="flex flex-row justify-between">
              <Image
                src="/coaniquem/icons/iconhands.png"
                alt="Sobre nosotros"
                quality={100}
                width={100}
                height={50}
                className="w-1/3 md:w-1/6"
              />
              <Image
                src="/coaniquem/icons/iconarrow.png"
                alt="Sobre nosotros"
                quality={100}
                width={100}
                height={50}
                className="w-1/3 md:w-1/6"
              />
              <Image
                src="/coaniquem/icons/iconheart.png"
                alt="Sobre nosotros"
                quality={100}
                width={100}
                height={50}
                className="w-1/3 md:w-1/6"
              />
            </div>
          </div>
          <h2 className="text-center text-xl font-semibold md:text-2xl">
            Al suscribir tu Asistencia, Serviclick donará a COANIQUEM para
            ayudar a los niños, niñas y adolescentes en su rehabilitación.
          </h2>
        </div>
      </section>
      <HeroCarousel suscriptions={suscriptions} />
      <section className="w-full  py-12 md:py-24 lg:py-32">
        <div className="flex items-center justify-center">
          <div className="h-4 w-1/4 rounded-r-full border-r  border-white bg-red-500 md:w-full" />
          <h2 className=" w-full  text-center text-2xl font-semibold md:text-4xl">
            Momentos de conexión
          </h2>
          <div className="h-4 w-1/4 rounded-l-full border-l border-white bg-red-500  md:w-full" />
        </div>

        <ConnectionMoments />
      </section>
      <section className="  -mt-[200px] w-full py-12  md:-mt-[500px] md:py-24 lg:py-32">
        <div className="flex items-center justify-center">
          <h2 className=" w-full  text-center text-2xl font-semibold md:text-4xl">
            Testimonios
          </h2>
        </div>

        <TestimonialsSection />
      </section>

      <section className=" -mt-[275px]  flex flex-col items-center justify-center  gap-8 py-20 md:-mt-[500px]">
        <Image
          src="/logomhm.png"
          alt="MHM1"
          width={300}
          height={80}
          loading="lazy"
          quality={100}
          unoptimized
        />
        <div className="flex w-full max-w-5xl  flex-wrap items-center justify-center gap-4">
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
            src="/mhm4.png"
            alt="MHM4"
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
        </div>
      </section>
    </>
  )
}
