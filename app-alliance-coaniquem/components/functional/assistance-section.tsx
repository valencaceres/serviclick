"use client"

import Image from "next/image"
import Link from "next/link"

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

  return (
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
                    /*  href={`https://productos.serviclick.cl/contractor?productPlanId=${assistance.productplan_id}`} */
                    href={`http://localhost:3012/contractor?productPlanId=${assistance.productplan_id}`}
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
              {assistance.coverages.slice(0, 5).map((coverage: any) => (
                <div
                  key={coverage.coverage_name}
                  className="flex w-[300px] flex-col items-center justify-start gap-2 px-4"
                >
                  <div className="relative h-32 w-32 rounded-sm border-b-8 border-b-primary bg-white shadow-none">
                    <Image
                      src={`/serviceIcons/${coverage.assistance_id}.png`}
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
                              /(\d+)\s*%(\s*([\w\s]+)?\s*TOPE\s*\$?\d+\$?0?)?$/,
                              '<span class="text-red-500">$1%</span> '
                            ),
                          }}
                        />
                      ) : (
                        coverage.coverage_maximum.replace(/^0+/, "")
                      )}
                      {coverage.coverage_currency === "P" ? (
                        Number(
                          coverage.coverage_amount.replace(/\$|,/g, "")
                        ).toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })
                      ) : coverage.coverage_currency === "U" ? (
                        <span className="text-red-500">{`${Number(
                          coverage.coverage_amount.replace(/\$|,/g, "")
                        ).toString()} UF`}</span>
                      ) : null}
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
                    : `${Number(coverage.coverage_events)} eventos al año`}
                </h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
