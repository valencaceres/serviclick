import Image from "next/image"
import Link from "next/link"

import { AllianceLogo } from "./alliance-logo"
import { Icons } from "./icons"

export async function LandingHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full shadow-sm">
      <div className="h-8 bg-primary"></div>
      <div className="container flex h-16 items-center sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo />
        </Link>
        <AllianceLogo />
      </div>
    </header>
  )
}
