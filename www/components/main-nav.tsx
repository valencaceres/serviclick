import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10 items-center pr-6">
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-background whitespace-nowrap flex items-center text-sm font-semibold",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
      <div className="relative">
        <Label htmlFor="search" className="absolute right-0 cursor-pointer">
          <Icons.search className="h-4 text-foreground" />
        </Label>
        <Input
          type="search"
          id="search"
          className="h-4 border-none bg-white bg-opacity-80 focus:bg-opacity-100 rounded-sm"
        />
      </div>
    </div>
  )
}
