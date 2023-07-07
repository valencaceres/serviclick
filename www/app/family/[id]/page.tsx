import Image from "next/image"
import Link from "next/link"

import { getServiceImage } from "@/lib/images"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function Page({ params }: { params: { id: string } }) {
  const responseFamilies = await fetch(
    process.env.API_URL! + "/api/product/listByFamilies",
    {
      headers: {
        id: process.env.API_KEY!,
      },
      next: {
        revalidate: 1,
      },
    }
  )
  const families = await responseFamilies.json()

  const assistances = families.filter(
    (family: { family_id: string }) => family.family_id === params.id
  )

  let uniqueAssistances = assistances.reduce((acc: any, current: any) => {
    let key = current.product_name.replace(" Familiar", "")

    if (!acc[key]) {
      acc[key] = {
        product_id: current.product_id,
        productplan_id: current.productplan_id,
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
      } else {
        acc[key].price = current.price
      }
    }

    if (!current.product_name.includes("Familiar")) {
      let coverage = {
        coverage_name: current.coverage_name,
        coverage_amount: current.coverage_amount,
        coverage_maximum: current.coverage_maximum,
        coverage_lack: current.coverage_lack,
        coverage_events: current.coverage_events,
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
      <section className="relative h-[450px] flex items-center px-20 pb-20">
        <Image
          src="/peoplecover.png"
          alt="Picture of the author"
          quality={100}
          fill={true}
          className="absolute z-0 object-cover" // This will position the image below the text.
        />
        <div className="z-10 w-full hidden md:flex lg:items-end lg:justify-center gap-6 lg:gap-16 flex-col lg:flex-row items-center justify-end h-full">
          {uniqueAssistancesArray?.map((assistance: any) => (
            <Button
              key={assistance.product_id}
              variant="secondary"
              className="text-xl py-8 px-6 bg-secondary/70 hover:bg-secondary/90 uppercase w-96"
            >
              {assistance.product_name}
            </Button>
          ))}
        </div>
        <div className="bg-black absolute w-full h-full z-5 top-0 right-0 bg-opacity-30"></div>
      </section>
      <section className="flex justify-center flex-col items-center py-10 gap-32">
        {uniqueAssistancesArray?.map((assistance: any) => (
          <div
            key={assistance.product_id}
            className="w-full flex flex-col items-center gap-6"
          >
            <h1 className="text-3xl font-bold uppercase">
              {assistance.product_name}
            </h1>
            <div className="flex gap-20">
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
                  href={`https://productos.serviclick.cl/contractor?productPlanId=${assistance.productplan_id}`}
                  passHref
                >
                  <Button className="uppercase w-full font-bold text-lg ">
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
                    href={`https://productos.serviclick.cl/contractor?productPlanId=${assistance.productplan_id}`}
                    passHref
                  >
                    <Button className="uppercase w-full font-semibold">
                      Contrata aquí
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="bg-[#F3F4F6] py-8 w-full hidden lg:block">
              <div className="flex justify-center gap-2">
                {assistance.coverages.map((coverage: any) => (
                  <div
                    key={coverage.coverage_name}
                    className="flex justify-start max-w-[300px] items-center px-4 flex-col gap-2"
                  >
                    <div className="bg-[#ebecee] w-32 h-32 relative shadow-none rounded-sm border-b-8 border-b-primary hover:scale-105 duration-75 hover:shadow-lg">
                      <Image
                        src={getServiceImage(coverage.coverage_name)}
                        alt={coverage.coverage_name}
                        fill
                      />
                    </div>
                    <h3 className="text-lg font-bold uppercase text-center">
                      {coverage.coverage_name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full max-w-7xl">
              <Table>
                <TableHeader>
                  <TableRow className="uppercase text-lg">
                    <TableHead className="w-[300px] border-x-8 border-x-background">
                      Servicio
                    </TableHead>
                    <TableHead className="w-[300px] border-x-8 border-x-background">
                      Protección
                    </TableHead>
                    <TableHead className="w-[300px] border-x-8 border-r-background">
                      Límite
                    </TableHead>
                    <TableHead className="w-[300px] border-x-8 border-r-background">
                      Max Eventos al Año
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assistance.coverages.map((coverage: any) => (
                    <TableRow
                      className="bg-[#F3F4F6]"
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
                        {coverage.coverage_amount === "Ilimitado"
                          ? coverage.coverage_amount
                          : Number(
                              coverage.coverage_amount.replace(/\$|,/g, "")
                            ).toLocaleString("es-CL", {
                              style: "currency",
                              currency: "CLP",
                            })}
                      </TableCell>
                      <TableCell className="py-6 text-center font-bold text-lg uppercase">
                        {coverage.coverage_events}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
