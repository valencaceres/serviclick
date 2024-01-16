import * as React from "react"
import Link from "next/link"

import { SiteConfig } from "@/types/nav"
import { cn } from "@/lib/utils"

import { NavPrimary } from "./primary-nav"

function Secondary(siteConfig: SiteConfig) {
  return (
    <div className="flex gap-6 md:gap-10 items-center pr-6">
      {siteConfig.secondaryNav?.length ? (
        <nav className="flex gap-6">
          {siteConfig.secondaryNav?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  scroll={item.scroll || true}
                  className={cn(
                    "text-background whitespace-nowrap flex items-center text-sm font-semibold hover:text-gray-200 transition-colors duration-200",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}

function Main(siteConfig: SiteConfig) {
  return <NavPrimary {...siteConfig} />
}

const Nav = { Main, Secondary }

export default Nav
