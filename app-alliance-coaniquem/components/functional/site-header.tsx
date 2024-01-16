import { SiteConfig } from "@/types/nav"
import Nav from "@/components/functional/main-nav"

import { NavSecondary } from "./secondary-nav"

export function SiteHeader({ siteConfig }: { siteConfig: SiteConfig }) {
  return (
    <header className="bg-background sticky top-0 z-40 w-full shadow-sm">
      <NavSecondary />
      <div className="container flex h-16 items-center sm:justify-between sm:space-x-0">
        <Nav.Main {...siteConfig} />
      </div>
    </header>
  )
}
