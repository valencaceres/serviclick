import { Metadata } from "next"

import Dinamyc_family from "@/components/functional/family/dinamyc_family"
import Origin_family from "@/components/functional/family/origin_family"

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
        frequency: current.frequency,
        yearly_price: current.yearly_price,
        yearly_plan_id: current.yearly_plan_id,
        yearly_product_plan_id: current.yearly_product_plan_id,
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
        <Dinamyc_family uniqueAssistancesArray={uniqueAssistancesArray} />
      ) : (
        <Origin_family
          uniqueAssistancesArray={uniqueAssistancesArray}
          params={params}
        />
      )}
    </>
  )
}
export { meta as metadata }
