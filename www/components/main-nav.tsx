import * as React from "react"
import Link from "next/link"

import { SiteConfig } from "@/types/nav"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

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

function Main(siteConfig: SiteConfig) {
  return (
    <>
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo />
      </Link>

      <div className="flex flex-1 items-center justify-end">
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>
              <Icons.menu className="h-10 w-10 text-primary hover:bg-primary hover:text-background rounded-md duration-75" />
            </SheetTrigger>
            <SheetContent size={"full"}>
              <SheetHeader>
                <SheetTitle>
                  <div className="relative w-4/5">
                    <Label
                      htmlFor="menuSearch"
                      className="absolute left-2 top-1 cursor-pointer"
                    >
                      <Icons.search className="h-5 text-foreground rotate-90" />
                    </Label>
                    <Input
                      type="search"
                      id="menuSearch"
                      autoFocus={false}
                      className="h-7 pl-10 border-none bg-[#F3F4F6] bg-opacity-80 focus:bg-opacity-100 rounded-sm"
                    />
                  </div>
                </SheetTitle>
                <div className="py-5 gap-2 flex flex-col">
                  <Link
                    href="#"
                    className={cn(
                      "text-background mb-1 w-fit whitespace-nowrap flex items-center font-semibold bg-primary hover:bg-primary/80 uppercase shadow-lg hover:shadow-none hover:text-background rounded-md px-2 py-1 duration-75"
                    )}
                  >
                    Mis asistencias
                  </Link>
                  <Link
                    href={"/"}
                    className={cn(
                      "text-foreground uppercase w-fit whitespace-nowrap flex items-center font-semibold bg-transparent hover:bg-foreground hover:text-background rounded-md px-2 py-1 duration-75"
                    )}
                  >
                    Inicio
                  </Link>
                  {siteConfig.mainNav?.map(
                    (item, index) =>
                      item.href && (
                        <Link
                          key={index}
                          href={item.href}
                          className={cn(
                            "text-foreground uppercase w-fit whitespace-nowrap flex items-center font-semibold bg-transparent hover:bg-foreground hover:text-background rounded-md px-2 py-1 duration-75",
                            item.disabled && "cursor-not-allowed opacity-80"
                          )}
                        >
                          {item.title}
                        </Link>
                      )
                  )}
                  <Link
                    href={"/assistances"}
                    className={cn(
                      "text-foreground uppercase w-fit whitespace-nowrap flex items-center font-semibold bg-transparent hover:bg-foreground hover:text-background rounded-md px-2 py-1 duration-75"
                    )}
                  >
                    Asistencias
                  </Link>
                  {siteConfig.secondaryNav?.map(
                    (item, index) =>
                      item.href && (
                        <Link
                          key={index}
                          href={item.href}
                          className={cn(
                            "text-foreground uppercase w-fit whitespace-nowrap flex items-center font-semibold bg-transparent hover:bg-foreground hover:text-background rounded-md px-2 py-1 duration-75",
                            item.disabled && "cursor-not-allowed opacity-80"
                          )}
                        >
                          {item.title}
                        </Link>
                      )
                  )}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {siteConfig.mainNav?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-foreground whitespace-nowrap flex items-center font-semibold bg-transparent hover:bg-foreground hover:text-background rounded-md px-2 py-1 duration-75",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
          <Link
            href="#"
            className={cn(
              "text-background whitespace-nowrap flex items-center font-semibold bg-primary hover:bg-primary/80 uppercase shadow-lg hover:shadow-none hover:text-background rounded-md px-2 py-1 duration-75"
            )}
          >
            Mis asistencias
          </Link>
          {/* <ThemeToggle /> */}
        </nav>
      </div>
    </>
  )
}

const Nav = { Main, Secondary }

export default Nav
