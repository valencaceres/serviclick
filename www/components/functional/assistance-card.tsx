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
    <article className="bg-slate-50 border-t-4 border-primary">
      <div className="p-2">
        <div className="w-full h-[250px] relative">
          <Image
            src={imageLink}
            alt="Slide 1"
            fill={true}
            objectFit="cover"
            objectPosition="center"
            loading="lazy"
          />
        </div>
      </div>
      <div className="h-24 flex items-center w-full justify-center">
        <h2 className="uppercase text-2xl text-center font-bebas">{title}</h2>
      </div>
      <Link href={`/family/${family_id}`} passHref={true}>
        <Button className="w-full rounded-none bg-foreground uppercase text-2xl font-bebas">
          Ver más
        </Button>
      </Link>
    </article>
  )
}
