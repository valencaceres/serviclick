"use client"

import withScrollAnimation from "../withScrollAnimation"
import { News } from "./news"

const NewsSection = ({ news }: any) => {
  return (
    <section className="container flex flex-col items-center justify-center pb-24 min-[850px]:pt-24 lg:pt-0">
      <h1 className="pb-6 font-bebas text-4xl uppercase">Novedades</h1>
      <News news={news} />
    </section>
  )
}

export default withScrollAnimation(NewsSection)
