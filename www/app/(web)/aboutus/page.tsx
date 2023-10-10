import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import HeadPages from "@/components/functional/HeadPage"

export default function AboutUsPage() {
  return (
    <>
      <section className="relative h-[450px] flex items-center px-20">
        <HeadPages title="Sobre nosotros" description="Sobre nosotros" />
        <Image
          src="/quienessomos.jpeg"
          alt="Quienes somos"
          quality={100}
          fill={true}
          className="absolute z-0 object-cover object-right md:object-center"
        />
        <div className="z-10 w-full flex items-center">
          <h1 className="text-6xl font-bebas uppercase text-white">
            Sobre nosotros
          </h1>
        </div>
        <div className="bg-black absolute w-full h-full z-5 top-0 right-0 bg-opacity-30"></div>
      </section>
      <section className="py-12 w-full flex justify-start">
        <div className="w-[60px] md:w-[120px] mt-2 pr-6 lg:w-[300px] h-3 bg-primary rounded-r-full"></div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 px-4 max-w-4xl">
            <h1 className="uppercase text-4xl font-bebas">Nuestra historia</h1>
            <p>
              Nuestra compañía fue fundada en 2002 con el propósito de brindar
              servicios de protección integral que mejoren la calidad de vida de
              las personas. Formamos parte de MHM Empresas y tenemos presencia
              en Chile y Latinoamérica. Nos enfocamos en resolver todas tus
              necesidades de manera accesible, eficiente y dinámica, con el
              objetivo de mejorar tu vida.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-foreground text-background flex justify-center">
        <div className="flex flex-auto items-center justify-between flex-wrap max-w-8xl">
          <div className="py-4 px-6 lg:px-20 w-full md:w-2/3 flex flex-col gap-4">
            <h1 className="uppercase text-4xl font-bebas text-center">
              Nuestra misión
            </h1>
            <p>
              En Serviclick, nuestro objetivo es brindar servicios que
              beneficien a todos nuestros grupos de interés, y es por eso que
              llevamos a cabo nuestro trabajo con respeto, promoviendo la
              confianza, la equidad y la transparencia. Buscamos impulsar una
              transformación social en la que la calidad de vida y el respeto
              por la dignidad de cada persona sean valores fundamentales.
            </p>
          </div>
          <div className="w-full md:w-1/3 h-[300px] object-cover relative">
            <Image
              src="/ourmission.jpeg"
              alt="Nuestra misión"
              fill={true}
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <section className="bg-primary text-background flex justify-center">
        <div className="flex flex-auto items-center justify-between flex-wrap-reverse max-w-8xl">
          <div className="w-full md:w-1/3 h-[300px] object-cover relative">
            <Image
              src="/ourvision.jpeg"
              alt="Nuestra visión"
              fill={true}
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="py-4 px-6 lg:px-20 w-full md:w-2/3 flex flex-col gap-4">
            <h1 className="uppercase text-4xl font-bebas text-center">
              Nuestra visión
            </h1>
            <p>
              Nuestro objetivo es convertirnos en un referente mundial en la
              calidad de servicio, brindando protección y facilitando medidas de
              seguridad ante imprevistos. Buscamos proporcionar un acceso
              sencillo a nuestros servicios, mejorando así las expectativas y la
              calidad de vida de todas las personas. Nos esforzamos por crear un
              futuro mejor, donde todos puedan sentirse protegidos y confiados
              gracias a nuestra destacada calidad de servicio.
            </p>
          </div>
        </div>
      </section>
      <section className="text-center bg-slate-50 py-24 flex flex-col gap-6 items-center">
        <h1 className="text-6xl text-foreground uppercase font-bebas">
          ¡Trabaja con nosotros!
        </h1>
        <h2 className="text-4xl text-foreground uppercase font-bebas">
          Únete a MHM Empresas
        </h2>
        <Link
          href={
            "https://docs.google.com/forms/d/e/1FAIpQLSfLbQMt9eU4nCMWl2Ny26GqRb2E-3BDYn3G8ifLwVqEQQTcRg/viewform?usp=sf_link"
          }
          target="_blank"
          passHref
        >
          <Button className="w-[250px] text-2xl uppercase font-bebas">
            Enviar CV
          </Button>
        </Link>
      </section>
      <GrupoMHM />
    </>
  )
}

export function GrupoMHM() {
  return (
    <section className="py-20 flex flex-col gap-8 items-center justify-center">
      <h1 className="uppercase text-4xl text-center font-bebas">Grupo MHM</h1>
      <div className="flex flex-wrap w-full max-w-5xl justify-center items-center">
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
