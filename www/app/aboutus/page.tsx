import Image from "next/image"

export default function AboutUsPage() {
  return (
    <>
      <section className="py-4 w-full flex justify-start">
        <div className="w-[60px] md:w-[120px] mt-2 pr-6 lg:w-[300px] h-3 bg-primary rounded-r-full"></div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 px-4 max-w-4xl">
            <h1 className="uppercase text-2xl font-bold">Nuestra historia</h1>
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
            <h1 className="uppercase text-2xl font-bold text-center">
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
              alt="Nuestra misión"
              fill={true}
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="py-4 px-6 lg:px-20 w-full md:w-2/3 flex flex-col gap-4">
            <h1 className="uppercase text-2xl font-bold text-center">
              Nuestra visión
            </h1>
            <p>
              Nuestro objetivo es convertirnos en un referente mundial en la
              calidad de servicio, brindando protección y facilitando medidas de
              seguridad ante riesgos imprevistos. Buscamos proporcionar un
              acceso sencillo a nuestros servicios, mejorando así las
              expectativas y la calidad de vida de todas las personas. Nos
              esforzamos por crear un futuro mejor, donde todos puedan sentirse
              protegidos y confiados gracias a nuestra destacada calidad de
              servicio.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 flex flex-col gap-8 items-center justify-center">
        <h1 className="uppercase text-2xl font-bold text-center">Grupo MHM</h1>
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
    </>
  )
}
