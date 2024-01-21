"use client"

import { useSelectedLayoutSegment } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import Nav from "./main-nav"

export function NavSecondary() {
  const segment = useSelectedLayoutSegment()
  return (
    <div
      className={cn(
        segment === "companies" ? "bg-secondary" : "bg-primary",
        "w-full md:flex justify-end h-8 hidden"
      )}
    >
      <Nav.Secondary {...siteConfig} />
    </div>
  )
}
