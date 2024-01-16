import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export const AssistanceSection = ({
  uniqueAssistancesArray
  }: any) => {
    return ( 
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
          href={`https://productos.serviclick.cl/contractor?productPlanId=${assistance.productplan_id}`}
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
            href={`https://productos.serviclick.cl/contractor?productPlanId=${assistance.family_productplan_id}`}
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
  
    <div className="w-full max-w-7xl hidden md:block">
      <Table>
        <TableHeader>
          <TableRow className="uppercase text-lg">
            <TableHead className="w-[300px] border-l-6 border-r-8 border-x-background">
              Servicio
            </TableHead>
            <TableHead className="w-[300px] border-x-8 border-x-background">
              Limite
            </TableHead>
            <TableHead className="w-[300px] border-x-8 border-r-background">
            Max Eventos Al Año
            </TableHead>
            <TableHead className="w-[300px] border-r-6 border-l-8 border-r-background">
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
              <TableCell className="py-6 text-center font-bold text-lg uppercase">
                {coverage.coverage_name}
              </TableCell>
              <TableCell className="py-6 text-center font-bold text-lg uppercase">
  {coverage.coverage_maximum.includes("%") ? (
    <span
      className="text-2xl"
      dangerouslySetInnerHTML={{
        __html: coverage.coverage_maximum.replace(
          /(\d+)%\$?0?$/,
          '<span class="text-red-500">$1%</span>'
        ),
      }}
    />
  ) : (
    coverage.coverage_maximum.replace(/^0+/, '')
  )}
  {coverage.coverage_currency === "P" ? (
    Number(coverage.coverage_amount.replace(/\$|,/g, "")).toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    })
  ) : coverage.coverage_currency === "U" ? (
    <span className="text-red-500">{`${Number(coverage.coverage_amount.replace(/\$|,/g, "")).toString()} UF`}</span>
  ) : null}
</TableCell>
<TableCell className="py-6 text-center font-bold text-lg uppercase">
  {coverage.coverage_events !== undefined && !isNaN(coverage.coverage_events) ? (
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
              <TableCell className="py-6 text-center font-bold text-lg uppercase">
                {coverage.coverage_carency}
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
)
}