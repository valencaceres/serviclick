import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import HeroSection from "@/components/functional/aboutus/hero-section"
import HistorySection from "@/components/functional/aboutus/history-section"
import MisionSection from "@/components/functional/aboutus/mision-section"
import VisionSection from "@/components/functional/aboutus/vision-section"
import WorkwithusSection from "@/components/functional/aboutus/workwithus-section"
import GrupoMHM from "@/components/functional/mhm-group"

export const metadata: Metadata = {
  title: {
    default: "Sobre nosotros",
    template: `%s - ${"Sobre nosotros"}`,
  },
  description: "Sobre nosotros",
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

export default function AboutUsPage() {
  return (
    <>
      <HeroSection />
      <HistorySection />
      <MisionSection />
      <VisionSection />
      <WorkwithusSection />
      <GrupoMHM />
    </>
  )
}
