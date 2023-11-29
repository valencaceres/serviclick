import Image from "next/image"
import Link from "next/link"

import { Button } from "../ui/button"

type AssistanceCardProps = {
  family_id: string
  title: string
  imageLink: string
}

export const AssistanceCard = ({
  family_id,
  title,
  imageLink,
}: AssistanceCardProps) => {
  return (
    <article className="border-t-4 border-primary bg-slate-50">
      <div className="p-2">
        <div className="relative h-[250px] w-full">
          <Image
            src={imageLink}
            alt="Slide 1"
            fill={true}
            className="object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex h-24 w-full items-center justify-center">
        <h2 className="text-center font-bebas text-2xl uppercase">{title}</h2>
      </div>
      <Link href={`/family/${family_id}`} passHref={true}>
        <Button className="w-full rounded-none bg-foreground font-bebas text-2xl uppercase">
          Ver más
        </Button>
      </Link>
    </article>
  )
}
