"use client"

import Image from "next/image"
import Link from "next/link"
import { config } from "@/utils/config"

import { Button } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

export const AssistanceSection = ({ uniqueAssistancesArray }: any) => {
  const downloadFile = ({
    Base64Content,
    nameProduct,
  }: {
    Base64Content: string
    nameProduct: string
  }) => {
    const byteCharacters = Buffer.from(Base64Content, "base64").toString(
      "binary"
    )

    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)

    const blob = new Blob([byteArray], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = nameProduct || "contrato.pdf"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  const handleDownloadClick = (assistance: any) => {
    downloadFile({
      Base64Content: assistance.pdf_base64,
      nameProduct: assistance.product_name,
    })
  }
  const sortedAssistancesArray = [...uniqueAssistancesArray]

  sortedAssistancesArray?.sort((a, b) => {
    const priceA = a.price || 0
    const priceB = b.price || 0

    return priceA - priceB
  })

  const getCustomCoverageInfo = (coverage: any) => {
    switch (coverage.assistance_id) {
      case "d1af12a5-08fa-47cd-98f9-e5b98d2917e2":
        return {
          name: "ATENCIÓN DE URGENCIA",
          image: "d1af12a5-08fa-47cd-98f9-e5b98d2917e2",
        }

      case "f4b73c1f-990f-4bd0-9cc1-353bf5efe807":
        return {
          name: "TRANSLADO MÉDICO TERRESTRE",
          image: "f4b73c1f-990f-4bd0-9cc1-353bf5efe807",
        }
      case "16f9b7e9-63f8-4024-be64-83a57ebf8c02":
        return {
          name: "TELEMEDICINA GENERAL",
          image: "16f9b7e9-63f8-4024-be64-83a57ebf8c02",
        }
      case "722337ea-404b-4263-a0a9-e3099eebd04e":
        return {
          name: "CONSULTA CON ESPECIALISTAS",
          image: "42efc9bb-81c3-480a-bb93-099702c5740a",
        }
      case "fb36d896-5c12-41ca-b99e-1d0b3aa85a08":
        return {
          name: "EXAMENES",
          image: "fb36d896-5c12-41ca-b99e-1d0b3aa85a08",
        }

      case "42efc9bb-81c3-480a-bb93-099702c5740a":
        return {
          name: "MÉDICO A DOMICILIO",
          image: "42efc9bb-81c3-480a-bb93-099702c5740a",
        }
      case "8cebdd42-8636-4da7-9f28-a2458dc20370":
        return {
          name: "SERVICIOS DENTALES",
          image: "8cebdd42-8636-4da7-9f28-a2458dc20370",
        }
      case "80bf7afe-e9db-41f7-a8da-b8869f0811ac":
        return {
          name: "DESCUENTO EN FARMACIAS",
          image: "80bf7afe-e9db-41f7-a8da-b8869f0811ac",
        }
      case "53572f8e-ff02-4389-ae9b-2aed287ccf6c":
        return {
          name: "OMT",
          image: "53572f8e-ff02-4389-ae9b-2aed287ccf6c",
        }

      default:
        return {
          name: coverage.coverage_name,
          image: coverage.assistance_id,
        }
    }
  }
  console.log(sortedAssistancesArray[1])

  return (
    <section className="flex flex-col items-center justify-center gap-32 py-10">
      {sortedAssistancesArray?.slice()?.map((assistance: any) => (
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
              <div className="flex justify-center gap-8 ">
                <div>
                  <h2 className="text-center text-2xl font-bold uppercase text-primary">
                    Valor Base
                  </h2>
                  <h3 className="text-center text-2xl font-extrabold">
                    {assistance.price
                      ? assistance.price.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })
                      : "No disponible"}
                  </h3>
                </div>
                <div>
                  <h2 className="text-center text-2xl font-bold uppercase text-primary">
                    Por carga
                  </h2>
                  <h3 className="text-center text-2xl font-extrabold">
                    {assistance.beneficiary_price
                      ? assistance.beneficiary_price.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })
                      : "No disponible"}
                  </h3>
                </div>
              </div>

              <h2 className=" p-4 text-xl">
                Se pueden agregar hasta {assistance.beneficiaries} cargas
                adicionales (Pueden ser hijos, hermanos, padres, suegros o
                cónyuges)
              </h2>
              <div className="flex w-full items-center justify-center">
                <div className="flex  justify-evenly  md:w-1/2 ">
                  <Link
                    href={`${config.products}/contractor?productPlanId=${assistance.productplan_id}`}
                    passHref
                    target="_blank"
                  >
                    <Button className="w-full rounded-none text-lg font-bold uppercase">
                      Contrata aquí
                    </Button>
                  </Link>
                  {assistance.pdf_base64 && (
                    <Button
                      onClick={() => handleDownloadClick(assistance)}
                      className="rounded-none bg-foreground text-lg font-bold uppercase hover:bg-foreground"
                    >
                      Descargar pdf
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden w-full  max-w-7xl bg-slate-50 py-8 lg:block">
            <div className="flex justify-center gap-2">
              {assistance.coverages
                .filter((coverage: any) =>
                  [
                    "8cebdd42-8636-4da7-9f28-a2458dc20370",
                    "722337ea-404b-4263-a0a9-e3099eebd04e",
                    "722337ea-404b-4263-a0a9-e3099eebd04e",
                    "d1af12a5-08fa-47cd-98f9-e5b98d2917e2",
                    "f4b73c1f-990f-4bd0-9cc1-353bf5efe807",
                    "16f9b7e9-63f8-4024-be64-83a57ebf8c02",
                    "42efc9bb-81c3-480a-bb93-099702c5740a",
                    "80bf7afe-e9db-41f7-a8da-b8869f0811ac",
                    "53572f8e-ff02-4389-ae9b-2aed287ccf6c",
                    "fb36d896-5c12-41ca-b99e-1d0b3aa85a08",
                  ].includes(coverage.assistance_id)
                )

                ?.map((coverage: any) => {
                  const { name, image } = getCustomCoverageInfo(coverage)

                  return (
                    <div
                      key={coverage.assistance_id}
                      className="flex w-[300px] flex-col items-center justify-start gap-2 px-4"
                    >
                      <div className="relative h-32 w-32 rounded-sm border-b-8 border-b-primary bg-white shadow-none">
                        <Image
                          src={`/serviceIcons/${image}.png`}
                          alt={name}
                          fill
                        />
                      </div>
                      <h3 className="rounded-t-md text-center text-lg font-bold uppercase">
                        {name}
                      </h3>
                    </div>
                  )
                })}
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
                    Limite
                  </TableHead>
                  <TableHead className="w-[300px] border-x-8 border-r-background">
                    Max Eventos Al Año
                  </TableHead>
                  <TableHead className="border-r-6 w-[300px] border-l-8 border-r-background">
                    Carencia
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assistance.coverages.map((coverage: any) => (
                  <TableRow
                    className="bg-slate-50"
                    key={coverage.assistance_id}
                  >
                    <TableCell className="py-6 text-center text-lg font-bold uppercase">
                      {coverage.coverage_name}
                    </TableCell>
                    <TableCell className="py-6 text-center text-2xl font-bold uppercase">
                      {coverage.coverage_amount !== "0" ? (
                        <div className="flex flex-col text-red-500">
                          {coverage.coverage_currency === "P"
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
                        </div>
                      ) : (
                        <>
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
                            <span>{coverage.coverage_maximum}</span>
                          )}
                        </>
                      )}
                    </TableCell>
                    <TableCell className="py-6 text-center text-lg font-bold uppercase">
                      {coverage.coverage_events !== undefined &&
                      !isNaN(coverage.coverage_events) ? (
                        <>
                          <div className="flex flex-col">
                            <span className="text-red-500">
                              {coverage.coverage_events}
                            </span>
                            <span> Eventos</span>
                          </div>
                        </>
                      ) : (
                        "Eventos Ilimitados"
                      )}
                    </TableCell>
                    <TableCell className="flex flex-col py-6 text-center text-lg font-bold uppercase">
                      <span className="text-red-500">
                        {" "}
                        {coverage.coverage_lack}
                      </span>
                      <span>Días</span>
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
                key={coverage.assistance_id}
                className="m-2 rounded-md bg-slate-50 px-4 py-2 text-center"
              >
                <h2 className="font-bold uppercase">
                  {coverage.coverage_name}
                </h2>
                {coverage.coverage_amount !== "0" ? (
                  <div className="flex flex-col text-red-500">
                    {coverage.coverage_currency === "P"
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
                  </div>
                ) : (
                  <>
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
                      <span>{coverage.coverage_maximum}</span>
                    )}
                  </>
                )}
                <h3 className="font-bold uppercase">
                  {coverage.coverage_events !== undefined &&
                  !isNaN(coverage.coverage_events) ? (
                    <>
                      <div className="flex justify-center gap-1">
                        <span className="text-red-500">
                          {coverage.coverage_events}
                        </span>
                        <span> Eventos</span>
                      </div>
                    </>
                  ) : (
                    "Eventos Ilimitados"
                  )}
                </h3>
                <div className="flex justify-center gap-1 font-bold uppercase">
                  <span className="text-red-500">
                    {" "}
                    {coverage.coverage_lack}
                  </span>
                  <span>Días de carencia</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
