"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import withScrollAnimation from "./withScrollAnimation"

type AssistanceCardProps = {
  family_id: string
  title: string
  imageLink: string
  link: string
}

const AssistanceCard = ({
  family_id,
  title,
  imageLink,
  link,
}: AssistanceCardProps) => {
  return (
    <div>
      <Card className="border-t-4 border-t-primary">
        <div className="p-0">
          <div className="relative h-[250px] w-full  ">
            <Image
              src={imageLink}
              alt="Slide 1"
              fill={true}
              className="rounded-lg object-cover object-center"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 70vw, 100vw"
            />
          </div>
        </div>
        <CardContent className="flex h-24 content-center items-center justify-center ">
          <h2 className="mt-4  text-center font-bebas text-2xl uppercase">
            {title}
          </h2>
        </CardContent>
        <CardFooter className="flex p-0 ">
          {link ? (
            <Link href={link} className="w-full rounded-b-xl" passHref={true}>
              <Button className="w-full rounded-none rounded-b-xl bg-foreground font-bebas text-2xl uppercase">
                Ver más
              </Button>{" "}
            </Link>
          ) : (
            <Link
              href={`/family/${family_id}`}
              passHref={true}
              className="w-full rounded-b-xl"
            >
              <Button className="w-full  rounded-none rounded-b-xl bg-foreground font-bebas text-2xl uppercase">
                Ver más
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default withScrollAnimation(AssistanceCard)
