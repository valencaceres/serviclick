import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { config } from "../../../../utils/config";

import { alliancesData } from "@/lib/alliance-data"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Mainteance from "@/components/functional/maintenance"

let meta: Metadata

export default async function Page({ params }: { params: { slug: string } }) {
  const responseFamilies = await fetch(
    process.env.API_URL! + `/api/product/listByFamilies/${params.slug}`,
    {
      headers: {
        id: process.env.API_KEY!,
      },
      cache: "no-store",
    }
  )

  const families = await responseFamilies.json()

  const assistances = families.filter(
    (family: { agent_slug: string }) => family.agent_slug === params.slug
  )

  let uniqueAssistances = assistances.reduce((acc: any, current: any) => {
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
  meta = {
    title: {
      default: `Alianza - ${families[0].agent_name}`,
      template: `%s - Alianza - ${families[0].agent_name}`,
    },
    description: `Alianza - ${families[0].agent_name}`,
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
  if (!Array.isArray(families) || families.length === 0){
    return (
      <Mainteance />
      )
  }
  return (
    <>
      <section className="relative h-[600px] flex items-center px-20">
        <video
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            position: "absolute",
            objectPosition: "center",
            top: 0,
            left: 0,
          }}
          autoPlay
          loop
          muted
          id="video"
        >
          <source
            src={`/alliance/header/${params.slug}.mp4`}
            type="video/mp4"
          />
        </video>
        <div className="z-10 w-96">
          <h1 className="uppercase text-6xl text-background font-bebas text-center md:text-start">
            {
              alliancesData.find((alliance) => alliance.slug === params.slug)
                ?.heroText
            }
          </h1>
        </div>
        <div className="bg-black absolute w-full h-full z-5 top-0 right-0 bg-opacity-30"></div>
      </section>
      <section className="flex py-10 justify-center bg-slate-50">
        <h2 className="text-center text-2xl max-w-2xl">
          {
            alliancesData.find((alliance) => alliance.slug === params.slug)
              ?.description
          }
        </h2>
      </section>
      <section className="flex justify-center flex-col items-center py-10 gap-32">
        {uniqueAssistancesArray?.map((assistance: any) => (
          <div
            id={assistance.product_name}
            key={assistance.product_id}
            className="w-full flex flex-col items-center gap-6"
          >
            <h1 className="text-3xl font-bold uppercase text-center">
              {assistance.product_name}
            </h1>
            <div className="flex gap-4 lg:gap-20 flex-col md:flex-row">
              <div className="flex-col gap-2 flex">
                <h2 className="text-primary uppercase text-2xl font-bold text-center">
                  {!assistance.family_price
                    ? "Valor Mensual"
                    : "Valor Individual"}
                </h2>
                <h3 className="text-center text-2xl font-extrabold">
                  {assistance.price
                    ? assistance.price.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })
                    : "No disponible"}
                </h3>
                <Link
                  href={`${config.products}/contractor?productPlanId=${assistance.productplan_id}`}
                  passHref
                  target="_blank"
                >
                  <Button className="uppercase w-full font-bold text-lg">
                    Contrata aquí
                  </Button>
                </Link>
              </div>
              {assistance.family_price && (
                <div className="flex-col gap-2 flex">
                  <h2 className="text-primary uppercase text-2xl font-bold text-center">
                    {"Valor familiar"}
                  </h2>
                  <h3 className="text-center text-2xl font-extrabold">
                    {assistance.family_price
                      ? assistance.family_price.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })
                      : "No disponible"}
                  </h3>
                  <Link
                    href={`${config.products}/contractor?productPlanId=${assistance.family_productplan_id}`}
                    passHref
                    target="_blank"
                  >
                    <Button className="uppercase w-full font-bold text-lg">
                      Contrata aquí
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="bg-slate-50 py-8 w-full hidden lg:block">
              <div className="flex justify-center gap-2">
                {assistance.coverages.slice(0, 5).map((coverage: any) => (
                  <div
                    key={coverage.coverage_name}
                    className="flex justify-start w-[300px] items-center px-4 flex-col gap-2"
                  >
                    <div className="bg-white w-32 h-32 relative shadow-none rounded-sm border-b-8 border-b-primary">
                      <Image
                        src={`/serviceIcon/${coverage.assistance_id}.png`}
                        alt={coverage.coverage_name}
                        fill
                      />
                    </div>
                    <h3 className="text-lg font-bold uppercase text-center rounded-t-md">
                      {coverage.coverage_name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full max-w-7xl hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="uppercase text-lg">
                    <TableHead className="w-[300px] border-l-6 border-r-8 border-x-background">
                      Servicio
                    </TableHead>
                    <TableHead className="w-[300px] border-x-8 border-x-background">
                      Protección
                    </TableHead>
                    <TableHead className="w-[300px] border-x-8 border-r-background">
                      Límite
                    </TableHead>
                    <TableHead className="w-[300px] border-r-6 border-l-8 border-r-background">
                      Max Eventos al Año
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assistance.coverages.map((coverage: any) => (
                    <TableRow
                      className="bg-slate-50"
                      key={coverage.coverage_name}
                    >
                      <TableCell className="py-6 text-center font-bold text-lg uppercase">
                        {coverage.coverage_name}
                      </TableCell>
                      <TableCell className="py-6 text-center font-bold text-lg uppercase">
                        {coverage.coverage_maximum.includes("%") ? (
                          <span
                            className="text-2xl"
                            dangerouslySetInnerHTML={{
                              __html: coverage.coverage_maximum.replace(
                                /(\d+%)/g,
                                '<span class="text-red-500">$1</span>'
                              ),
                            }}
                          />
                        ) : (
                          coverage.coverage_maximum
                        )}
                      </TableCell>
                      <TableCell className="py-6 text-center font-bold text-lg uppercase">
                        {coverage.coverage_amount === "0"
                          ? "Ilimitado"
                          : coverage.coverage_currency === "P"
                          ? Number(
                              coverage.coverage_amount.replace(/\$|,/g, "")
                            ).toLocaleString("es-CL", {
                              style: "currency",
                              currency: "CLP",
                            })
                          : coverage.coverage_currency === "U"
                          ? `${Number(
                              coverage.coverage_amount.replace(/\$|,/g, "")
                            )} UF`
                          : null}
                      </TableCell>
                      <TableCell className="py-6 text-center font-bold text-lg uppercase">
                        {coverage.coverage_events === 0
                          ? "Ilimitados"
                          : coverage.coverage_events}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="w-full max-w-7xl md:hidden">
              <div className="bg-foreground mx-2 py-2 rounded-md">
                <h1 className="text-background font-bold text-center uppercase text-xl">
                  Servicios
                </h1>
              </div>
              {assistance.coverages.map((coverage: any) => (
                <div
                  key={coverage.id}
                  className="bg-slate-50 m-2 rounded-md px-4 py-2 text-center"
                >
                  <h2 className="font-bold uppercase">
                    {coverage.coverage_name}
                  </h2>
                  {coverage.coverage_maximum.includes("%") ? (
                    <span
                      className="text-lg"
                      dangerouslySetInnerHTML={{
                        __html: coverage.coverage_maximum.replace(
                          /(\d+%)/g,
                          '<span class="text-red-500 font-bold">$1</span>'
                        ),
                      }}
                    />
                  ) : (
                    coverage.coverage_maximum
                  )}
                  <h3 className="font-bold uppercase">
                    {coverage.coverage_amount === "0" ||
                    coverage.coverage_amount === "Ilimitado"
                      ? "Sin monto límite"
                      : coverage.coverage_currency === "P"
                      ? Number(
                          coverage.coverage_amount.replace(/\$|,/g, "")
                        ).toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        }) + " máximo por evento"
                      : coverage.coverage_currency === "U"
                      ? `${Number(
                          coverage.coverage_amount.replace(/\$|,/g, "")
                        )} UF máximo por evento`
                      : null}
                  </h3>
                  <h3 className="font-bold uppercase">
                    {coverage.coverage_events === "0"
                      ? "Eventos ilimitados"
                      : coverage.coverage_events === "1"
                      ? "1 evento al año"
                      : `${Number(coverage.coverage_events)} eventos al año`}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
export { meta as metadata }
