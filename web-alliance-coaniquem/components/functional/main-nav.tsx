import * as React from "react"
import Link from "next/link"

import { SiteConfig } from "@/types/nav"
import { cn } from "@/lib/utils"

import { NavPrimary } from "./primary-nav"

function Secondary(siteConfig: SiteConfig) {
  function isExternalLink(href: string) {
    return href.startsWith("https://")
  }
  return (
    <div className="flex items-center gap-6 pr-6 md:gap-10">
      {siteConfig.secondaryNav?.length ? (
        <nav className="flex gap-6">
          {siteConfig.secondaryNav?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  target={isExternalLink(item.href) ? "_blank" : undefined}
                  scroll={item.scroll || true}
                  className={cn(
                    "flex items-center whitespace-nowrap text-sm font-semibold text-background transition-colors duration-200 hover:text-gray-200",
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
