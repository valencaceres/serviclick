import * as React from "react"
import Link from "next/link"

import { SiteConfig } from "@/types/nav"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/functional/icons"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

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
                <SheetTitle className="self-start">Menu</SheetTitle>
                <div className="py-5 gap-2 flex flex-col">
                  <SheetClose asChild>
                    <Link
                      href={"https://asegurado.serviclick.cl"}
                      target="_blank"
                      className={cn(
                        "text-background mb-1 w-fit whitespace-nowrap flex items-center font-semibold bg-primary hover:bg-primary/80 uppercase shadow-lg hover:shadow-none hover:text-background rounded-md px-2 py-1 duration-75"
                      )}
                    >
                      Mis asistencias
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href={"/"}
                      className={cn(
                        "text-foreground uppercase w-fit whitespace-nowrap flex items-center font-semibold bg-transparent hover:bg-foreground hover:text-background rounded-md px-2 py-1 duration-75"
                      )}
                    >
                      Inicio
                    </Link>
                  </SheetClose>
                  {siteConfig.mainNav?.map(
                    (item, index) =>
                      item.href && (
                        <SheetClose asChild>
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
                        </SheetClose>
                      )
                  )}
                  <SheetClose asChild>
                    <Link
                      href={"/assistances"}
                      className={cn(
                        "text-foreground uppercase w-fit whitespace-nowrap flex items-center font-semibold bg-transparent hover:bg-foreground hover:text-background rounded-md px-2 py-1 duration-75"
                      )}
                    >
                      Asistencias
                    </Link>
                  </SheetClose>
                  {siteConfig.secondaryNav?.map(
                    (item, index) =>
                      item.href && (
                        <SheetClose asChild>
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
                        </SheetClose>
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
            href={"https://asegurado.serviclick.cl"}
            target="_blank"
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
