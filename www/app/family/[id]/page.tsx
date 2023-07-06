import Image from "next/image"

import { Button } from "@/components/ui/button"

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
        product_name: current.product_name.replace(" Familiar", ""),
        price: current.product_name.includes("Familiar")
          ? undefined
          : current.price,
        covereages: [],
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

    let coverage = {
      coverage_name: current.coverage_name,
      coverage_amount: current.coverage_amount,
      coverage_maximum: current.coverage_maximum,
      coverage_lack: current.coverage_lack,
      coverage_events: current.coverage_events,
    }

    if (
      !acc[key].covereages.find(
        (c: any) => c.coverage_name === coverage.coverage_name
      )
    ) {
      acc[key].covereages.push(coverage)
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
        <div className="z-10 w-full flex items-end h-full justify-evenly gap-2">
          {uniqueAssistancesArray?.map((assistance: any) => (
            <Button
              key={assistance.product_id}
              variant="secondary"
              className="text-xl py-8 px-6 hover:bg-secondary/90 uppercase w-96"
            >
              {assistance.product_name}
            </Button>
          ))}
        </div>
        <div className="bg-black absolute w-full h-full z-5 top-0 right-0 bg-opacity-30"></div>
      </section>
      <section className="container flex justify-center flex-col items-center py-10 gap-4">
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
                  {assistance.family_price || assistance.price
                    ? (
                        assistance.family_price || assistance.price
                      ).toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })
                    : "No disponible"}
                </h3>
                <Button className="uppercase w-full font-semibold">
                  Contrata aquí
                </Button>
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
                  <Button className="uppercase w-full font-semibold">
                    Contrata aquí
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
