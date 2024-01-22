import "swiper/css"
import "swiper/css/navigation"
import { Metadata } from "next"

import { AssistanceSection } from "@/components/functional/assistance-section"
import { config } from "@/utils/config"
export const metadata: Metadata = {
  title: {
    default: "Serviclick - Todas las soluciones en la palma de tu mano",
    template: `%s - ${"Soluciones en la palma de tu mano."}`,
  },
  description: "Soluciones en la palma de tu mano.",
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

export default async function IndexPage() {
  const responseAssistances = await fetch(
   config.server! +
      "/api/product/listByFamilies/3abd9e95-4883-46bb-aaa9-c00e221cfd0b",
    {
      headers: {
        id: config.apiKey!,
      },
      cache: "no-store",
    }
  )
  const Assistances = await responseAssistances.json()
  let uniqueAssistances = Assistances.reduce((acc: any, current: any) => {
    let key = current.product_name.replace(" Familiar", "")

    if (!acc[key]) {
      acc[key] = {
        product_id: current.product_id,
        productplan_id: current.productplan_id,
        family_productplan_id: current.product_name.includes("Familiar")
          ? current.productplan_id
          : undefined,
        product_name: current.product_name.replace(" Familiar", ""),
        price: current.product_name.includes("Familiar")
          ? undefined
          : current.price,
        coverages: [],
        family_price: current.product_name.includes("Familiar")
          ? current.price
          : undefined,
        beneficiaries: current.beneficiaries,
        beneficiary_price: current.beneficiary_price,
        pdf_base64: current.pdfbase,
      }
    } else {
      if (current.product_name.includes("Familiar")) {
        acc[key].family_price = current.price
        acc[key].family_productplan_id = current.productplan_id
      } else {
        acc[key].price = current.price
        acc[key].productplan_id = current.productplan_id
      }
    }

    if (!current.product_name.includes("Familiar")) {
      let coverage = {
        assistance_id: current.assistance_id,
        coverage_name: current.coverage_name,
        coverage_amount: current.coverage_amount,
        coverage_maximum: current.coverage_maximum,
        coverage_lack: current.coverage_lack,
        coverage_events: current.coverage_events,
        coverage_currency: current.coverage_currency,
      }

      if (
        !acc[key].coverages.find(
          (c: any) => c.coverage_name === coverage.coverage_name
        )
      ) {
        acc[key].coverages.push(coverage)
      }
    }

    return acc
  }, {})

  const uniqueAssistancesArray = Object.values(uniqueAssistances)
  return (
    <>
      <section className="relative flex h-[500px] items-center px-20">
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
      <section className="container flex flex-col items-center justify-center pb-20">
        <div className="flex flex-col gap-8 py-4 md:pb-10 md:pt-20">
          <h1 className="text-center font-bebas text-4xl uppercase md:text-5xl">
            ¡SÚMATE A ESTA NOBLE CAUSA!{" "}
          </h1>
          <p className="text-center text-xl font-semibold md:text-2xl">
            Serviclick se unió a COANIQUEM, solo faltas tú.  Suscribe tu
            Asistencia y  nosotros donamos por ti. Estarás ayudando a los niños,
            niñas y adolescentes en su rehabilitación. ¡Únete a la mejor causa!.
          </p>
        </div>
      </section>
      <section id="products" className="">
        <AssistanceSection uniqueAssistancesArray={uniqueAssistancesArray} />
      </section>
    </>
  )
}
