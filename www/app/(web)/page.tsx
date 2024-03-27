import "swiper/css"
import "swiper/css/navigation"
import { Metadata } from "next"

import AboutUsSection from "@/components/functional/home/aboutSection"
import AllianceSection from "@/components/functional/home/alliance-section"
import AssistanceSection from "@/components/functional/home/assistance-section"
import CustomerSection from "@/components/functional/home/customer-section"
import { HeroCarousel } from "@/components/functional/home/hero-carousel"
import HeroSection from "@/components/functional/home/hero-section"
import NewsSection from "@/components/functional/home/newsSection"
import Mainteance from "@/components/functional/maintenance"

export const metadata: Metadata = {
  title: {
    default: "Serviclick - Todas las soluciones en la palma de tu mano",
    template: `%s - ${"Soluciones en la palma de tu mano."}`,
  },
  description: "Soluciones en la palma de tu mano.",
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

export default async function IndexPage() {
  const responseCategories = await fetch(
    process.env.API_URL! + "/api/category/getAll",
    {
      headers: {
        id: process.env.API_KEY!,
      },
      cache: "no-store",
    }
  )

  const responseHero = await fetch(
    process.env.API_URL! + "/api/web/getHero?type=hero",
    {
      headers: {
        id: process.env.API_KEY!,
      },
      cache: "no-store",
    }
  )
  const responseNews = await fetch(
    process.env.API_URL! + "/api/web/getHero?type=news",
    {
      headers: {
        id: process.env.API_KEY!,
      },
      cache: "no-store",
    }
  )
  const news = await responseNews.json()
  const hero = await responseHero.json()
  const categories = await responseCategories.json()

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    return <Mainteance />
  }

  return (
    <>
      {/* <HeroSection hero={hero} />
      <AssistanceSection assistances={categories} />
      <AboutUsSection />
      <NewsSection news={news} />
      <CustomerSection />
      <AllianceSection /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img src="/banner.png" alt="Serviclick" />
        <img src="/footer.png" alt="Serviclick" />
      </div>
    </>
  )
}
