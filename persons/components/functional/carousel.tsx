"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type CustomCarouselProps = {
  options?: any
  slides: React.ReactElement[]
}

export const CustomCarousel: React.FC<CustomCarouselProps> = ({
  options,
  slides,
}) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl  xl:max-w-7xl "
    >
      <CarouselContent>
        {slides?.map((slide, index) => (
          <CarouselItem
            className="basis-full md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
            key={index}
          >
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-8 min-[390px]:left-0 md:-left-12 xl:-left-2 2xl:-left-12" />
      <CarouselNext className="right-8 min-[390px]:right-0 md:-right-12 xl:-right-2 2xl:-right-12" />
    </Carousel>
  )
}
