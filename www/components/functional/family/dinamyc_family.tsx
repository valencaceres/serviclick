"use client"

import { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { config } from "@/utils/config"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DynamicFamilyProps {
  uniqueAssistancesArray: any[]
}

export const DynamicFamily: FC<DynamicFamilyProps> = ({
  uniqueAssistancesArray,
}: DynamicFamilyProps) => {
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
  const icons = [
    {
      number: 1,
      text: "SERVICIOS DENTALES",
    },
    {
      number: 2,
      text: "ATENCIÓN DE URGENCIA",
    },
    {
      number: 3,
      text: "CONSULTA CON ESPECIALISTAS",
    },
    {
      number: 4,
      text: "PREVENTIVO ONCOLÓGICO",
    },
    {
      number: 5,
      text: "PARTO NORMAL  Y CESÁREA",
    },
    {
      number: 6,
      text: "ATENCIÓN PSICOLÓGICA",
    },
  ]
  const uniqueAssistance = uniqueAssistancesArray[0]
  const normalizeName = (name: string) => name.toLowerCase().trim()

  const dentalArray = uniqueAssistance?.coverages
    ?.filter((item: any) =>
      [
        "urgencia dental",
        "exodoncia simple",
        "exodoncia colgajo",
        "radiografía panorámica",
        "limpieza dental",
      ].includes(normalizeName(item?.coverage_name))
    )
    ?.map((item: any) => ({ ...item }))

  const urgenciaArray = uniqueAssistance?.coverages
    ?.filter((item: any) =>
      [
        "atención en sala de urgencia por accidente",
        "atención en sala de urgencia por enfermedad",
        "parto normal",
        "parto cesárea",
        "orientación médica telefónica",
        "orientación maternal telefónica",
        "urgencia médica por accidente",
        "urgencia médica por enfermedad",
      ].includes(normalizeName(item?.coverage_name))
    )
    ?.map((item: any) => ({ ...item }))

  const ambulatoriaArray = uniqueAssistance?.coverages
    ?.filter((item: any) =>
      [
        "consulta médica general",
        "consulta médica especialista",
        "consulta médica psicológica",
        "exámen médico",
        "exámen preventivo oncológico",
        "telemedicina general",
        "telemedicina especialista",
        "descuentos en farmacias",
        "descuento en farmacias",
        "examen médico",
        "examen preventivo oncológico",
        "telemedicina",
      ].includes(normalizeName(item?.coverage_name))
    )
    ?.map((item: any) => ({ ...item }))

  const combinedArray = [
    { name: "DENTAL", coverages: dentalArray },
    { name: "URGENCIA", coverages: urgenciaArray },
    { name: "AMBULATORIA", coverages: ambulatoriaArray },
  ]

  return (
    <>
      <section className="relative flex h-[450px] items-center px-20 pb-20">
        <Image
          src={`/families/dynamic/herodynamic.jpg`}
          alt={"Familia " + "Asistencia integral pro"}
          quality={100}
          fill={true}
          className="absolute z-0 object-cover"
        />
        <div className="z-10 flex h-full w-full flex-col items-center justify-end gap-6 lg:flex-row lg:items-end lg:justify-center lg:gap-16">
          {uniqueAssistancesArray?.map((assistance: any) => (
            <>
              <Link
                key={assistance.product_id}
                href={`#${assistance.product_name}`}
                passHref
              >
                <Button
                  type="button"
                  key={assistance.product_id}
                  variant="secondary"
                  className="w-96 bg-secondary/90 px-6 py-8 text-xl uppercase hover:bg-secondary/90 lg:bg-secondary"
                >
                  ASISTENCIA INTEGRAL PRO
                </Button>
              </Link>
            </>
          ))}
        </div>
        <div className="z-5 absolute right-0 top-0 h-full w-full bg-black bg-opacity-30"></div>
      </section>
      <section className="flex flex-col items-center justify-center gap-32 py-10">
        {uniqueAssistancesArray?.slice()?.map((assistance: any) => (
          <div
            id={assistance.product_name}
            key={assistance.product_id}
            className="flex w-full flex-col items-center gap-6"
          >
            <h1 className="text-center text-3xl font-bold uppercase">
              ASISTENCIA INTEGRAL PRO
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
                  {assistance.beneficiary_price && (
                    <div>
                      <h2 className="text-center text-2xl font-bold uppercase text-primary">
                        Por carga
                      </h2>
                      <h3 className="text-center text-2xl font-extrabold">
                        {assistance.beneficiary_price
                          ? assistance.beneficiary_price.toLocaleString(
                              "es-CL",
                              {
                                style: "currency",
                                currency: "CLP",
                              }
                            )
                          : "No disponible"}
                      </h3>
                    </div>
                  )}
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
                {icons?.map((icon) => (
                  <div
                    key={icon.number}
                    className="flex w-[300px] flex-col items-center justify-start gap-2 px-4"
                  >
                    <div className="relative h-32 w-32 rounded-sm border-b-8 border-b-primary bg-white shadow-none">
                      <Image
                        src={`/families/dynamic/icons/${icon.number}.png`}
                        alt={icon.text}
                        fill
                      />
                    </div>
                    <h3 className="rounded-t-md text-center text-lg font-bold uppercase">
                      {icon.text}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            {combinedArray?.map((item) => (
              <div className="hidden w-full max-w-7xl md:block">
                <div className="mb-16 mt-16 flex justify-center">
                  <h2 className="text-center text-4xl font-bold uppercase text-primary">
                    {item.name}
                  </h2>
                </div>
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
                    {item.coverages.map((coverage: any) => (
                      <TableRow
                        className="bg-slate-50"
                        key={coverage.assistance_id}
                      >
                        <TableCell className="py-6 text-center text-lg font-bold uppercase">
                          {coverage.coverage_name}
                        </TableCell>
                        <TableCell className="py-6 text-center text-2xl font-bold uppercase">
                          <div className="flex flex-col">
                            <p>
                              {coverage.coverage_maximum != "0" && (
                                <>
                                  <span
                                    className="text-2xl"
                                    dangerouslySetInnerHTML={{
                                      __html: coverage.coverage_maximum.replace(
                                        /(\d+%)/g,
                                        '<span class="text-red-500">$1</span>'
                                      ),
                                    }}
                                  />
                                  <span>
                                    {coverage.coverage_amount > 0 &&
                                    coverage.coverage_maximum !== ""
                                      ? ` ARANCEL HASTA: `
                                      : ""}
                                  </span>
                                </>
                              )}

                              <span className="">
                                <span className="text-red-500">
                                  {`${
                                    coverage.coverage_currency === "P" &&
                                    coverage.coverage_amount > 0
                                      ? "$"
                                      : ""
                                  }${
                                    coverage.coverage_amount > 0
                                      ? Number(
                                          coverage.coverage_amount
                                        ).toLocaleString("es-CL", {
                                          minimumFractionDigits: 0,
                                          maximumFractionDigits:
                                            coverage.coverage_amount % 1 === 0
                                              ? 0
                                              : 1,
                                        })
                                      : ""
                                  }`}
                                </span>
                                <span className="text-red-500">
                                  {`${
                                    coverage.coverage_currency === "U" &&
                                    coverage.coverage_amount > 0
                                      ? "UF"
                                      : ""
                                  }`.replace(".0", "")}
                                </span>
                              </span>
                            </p>
                          </div>
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
            ))}

            {combinedArray?.map((item) => (
              <div className="w-full max-w-7xl md:hidden">
                <div className="mb-16 mt-16 flex justify-center">
                  <h2 className="text-center text-4xl font-bold uppercase text-primary">
                    {item.name}
                  </h2>
                </div>
                <div className="mx-2 rounded-md bg-foreground py-2">
                  <h1 className="text-center text-xl font-bold uppercase text-background">
                    Servicios
                  </h1>
                </div>
                {item.coverages.map((coverage: any) => (
                  <div
                    key={coverage.assistance_id}
                    className="m-2 rounded-md bg-slate-50 px-4 py-2 text-center"
                  >
                    <h2 className="font-bold uppercase">
                      {coverage.coverage_name}
                    </h2>
                    <div className="flex flex-col">
                      <p>
                        {coverage.coverage_maximum != "0" && (
                          <>
                            <span
                              className="text-2xl"
                              dangerouslySetInnerHTML={{
                                __html: coverage.coverage_maximum.replace(
                                  /(\d+%)/g,
                                  '<span class="text-red-500">$1</span>'
                                ),
                              }}
                            />
                            <span>
                              {coverage.coverage_amount > 0 &&
                              coverage.coverage_maximum !== ""
                                ? ` ARANCEL HASTA: `
                                : ""}
                            </span>
                          </>
                        )}

                        <span className="">
                          <span className="text-red-500">
                            {`${
                              coverage.coverage_currency === "P" &&
                              coverage.coverage_amount > 0
                                ? "$"
                                : ""
                            }${
                              coverage.coverage_amount > 0
                                ? Number(
                                    coverage.coverage_amount
                                  ).toLocaleString("es-CL", {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits:
                                      coverage.coverage_amount % 1 === 0
                                        ? 0
                                        : 1,
                                  })
                                : ""
                            }`}
                          </span>
                          <span className="text-red-500">
                            {`${
                              coverage.coverage_currency === "U" &&
                              coverage.coverage_amount > 0
                                ? "UF"
                                : ""
                            }`.replace(".0", "")}
                          </span>
                        </span>
                      </p>
                    </div>

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
            ))}
          </div>
        ))}
        <div className="rounded-3xl border-4 border-[#B4CD25] p-4 px-12">
          <div className="flex flex-col justify-center">
            <h2 className=" mb-8  text-center text-3xl font-bold uppercase text-secondary">
              EDADES DE SUSCRIPCIÓN
            </h2>
            <div className="mb-12 flex max-w-3xl  flex-col gap-4 text-xl font-semibold">
              <h3>
                1. Restricción edad contratante: Desde los 18 años hasta 69 años
                182 días.
              </h3>
              <h3>
                2. Restricción de edad beneficiarios: hijos y hermanos menores
                de 24 años 365 días y padres o suegros menores de 69 años 182
                días.
              </h3>
              <h3>
                3. Restricción parentesco beneficiarios: Familiares 1er grado,
                como padres, suegros, hermanos, hijos y cónyuges.
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
