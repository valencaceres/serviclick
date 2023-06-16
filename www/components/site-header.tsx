import Link from "next/link"

import { SiteConfig } from "@/types/nav"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Nav from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

export function SiteHeader({ siteConfig }: { siteConfig: SiteConfig }) {
  return (
    <header className="bg-background sticky top-0 z-40 w-full shadow-sm">
      <div className="w-full md:flex justify-end bg-primary h-8 hidden">
        <Nav.Secondary {...siteConfig} />
      </div>
      <div className="container flex h-16 items-center sm:justify-between sm:space-x-0">
        <Nav.Main {...siteConfig} />
      </div>
    </header>
  )
}
