import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DynamicFamily } from "@/components/functional/family/dinamyc_family"

let meta: Metadata

export default async function Page({ params }: { params: { id: string } }) {
  const responseFamilies = await fetch(
    process.env.API_URL! +
      "/api/product/listByFamilies/020579a3-8461-45ec-994b-ad22ff8e3275",
    {
      headers: {
        id: process.env.API_KEY!,
      },
      cache: "no-store",
    }
  )
  const families = await responseFamilies.json()

  const assistances = families.filter(
    (family: { family_id: string }) => family.family_id === params.id
  )
  console.log(assistances)
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
  meta = {
    title: {
      default: `Contrata - ${(uniqueAssistancesArray[0] as any)?.product_name}`,
      template: `%s - Contrata - ${
        (uniqueAssistancesArray[0] as any)?.product_name
      }`,
    },
    description: `Contrata - ${
      (uniqueAssistancesArray[0] as any)?.product_name
    }`,
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

  return (
    <>
      {params.id === "52257aa7-4a97-4d02-a08a-7d2324f49630" ? (
        <DynamicFamily uniqueAssistancesArray={uniqueAssistancesArray} />
      ) : (
        <>
          <section className="relative flex h-[450px] items-center px-20 pb-20">
            <Image
              src={`/families/${params.id}.jpg`}
              alt={"Familia " + params.id}
              quality={100}
              fill={true}
              className="absolute z-0 object-cover"
            />
            <div className="z-10 flex h-full w-full flex-col items-center justify-end gap-6 lg:flex-row lg:items-end lg:justify-center lg:gap-16">
              {uniqueAssistancesArray?.map((assistance: any) => (
                <>
                  <Link href={`#${assistance.product_name}`} passHref>
                    <Button
                      type="button"
                      key={assistance.product_id}
                      variant="secondary"
                      className="w-96 bg-secondary/90 px-6 py-8 text-xl uppercase hover:bg-secondary/90 lg:bg-secondary"
                    >
                      {assistance.product_name}
                    </Button>
                  </Link>
                </>
              ))}
            </div>
            <div className="z-5 absolute right-0 top-0 h-full w-full bg-black bg-opacity-30"></div>
          </section>
          <section className="flex flex-col items-center justify-center gap-32 py-10">
            {uniqueAssistancesArray?.map((assistance: any) => (
              <div
                id={assistance.product_name}
                key={assistance.product_id}
                className="flex w-full flex-col items-center gap-6"
              >
                <h1 className="text-center text-3xl font-bold uppercase">
                  {assistance.product_name}
                </h1>
                <div className="flex flex-col gap-4 md:flex-row lg:gap-20">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-center text-2xl font-bold uppercase text-primary">
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
                      href={`https://productos.serviclick.cl/contractor?productPlanId=${assistance.productplan_id}`}
                      passHref
                      target="_blank"
                    >
                      <Button className="w-full text-lg font-bold uppercase">
                        Contrata aquí
                      </Button>
                    </Link>
                  </div>
                  {assistance.family_price && (
                    <div className="flex flex-col gap-2">
                      <h2 className="text-center text-2xl font-bold uppercase text-primary">
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
                        href={`https://productos.serviclick.cl/contractor?productPlanId=${assistance.family_productplan_id}`}
                        passHref
                        target="_blank"
                      >
                        <Button className="w-full text-lg font-bold uppercase">
                          Contrata aquí
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="hidden w-full bg-slate-50 py-8 lg:block">
                  <div className="flex justify-center gap-2">
                    {assistance.coverages.slice(0, 5).map((coverage: any) => (
                      <div
                        key={coverage.coverage_name}
                        className="flex w-[300px] flex-col items-center justify-start gap-2 px-4"
                      >
                        <div className="relative h-32 w-32 rounded-sm border-b-8 border-b-primary bg-white shadow-none">
                          <Image
                            src={`/serviceIcon/${coverage.assistance_id}.png`}
                            alt={coverage.coverage_name}
                            fill
                          />
                        </div>
                        <h3 className="rounded-t-md text-center text-lg font-bold uppercase">
                          {coverage.coverage_name}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden w-full max-w-7xl md:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-lg uppercase">
                        <TableHead className="border-l-6 w-[300px] border-r-8 border-x-background">
                          Servicio
                        </TableHead>
                        <TableHead className="w-[300px] border-x-8 border-x-background">
                          Protección
                        </TableHead>
                        <TableHead className="w-[300px] border-x-8 border-r-background">
                          Límite
                        </TableHead>
                        <TableHead className="border-r-6 w-[300px] border-l-8 border-r-background">
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
                          <TableCell className="py-6 text-center text-lg font-bold uppercase">
                            {coverage.coverage_name}
                          </TableCell>
                          <TableCell className="py-6 text-center text-lg font-bold uppercase">
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
                          <TableCell className="py-6 text-center text-lg font-bold uppercase">
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
                          <TableCell className="py-6 text-center text-lg font-bold uppercase">
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
                  <div className="mx-2 rounded-md bg-foreground py-2">
                    <h1 className="text-center text-xl font-bold uppercase text-background">
                      Servicios
                    </h1>
                  </div>
                  {assistance.coverages.map((coverage: any) => (
                    <div
                      key={coverage.id}
                      className="m-2 rounded-md bg-slate-50 px-4 py-2 text-center"
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
                          : `${Number(
                              coverage.coverage_events
                            )} eventos al año`}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </>
  )
}
export { meta as metadata }
