"use client"

import Image from "next/image"
import { useParams } from "next/navigation"

export function AllianceLogo() {
  const params = useParams()

  const agent = params.slug

  return (
    <Image
      src={`/alliance/logo/${agent}.png`}
      alt={`${agent} logo`}
      width={250}
      height={100}
    />
  )
}
