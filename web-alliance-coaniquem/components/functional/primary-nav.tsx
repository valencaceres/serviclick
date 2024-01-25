"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useSelectedLayoutSegment } from "next/navigation"

import { SiteConfig } from "@/types/nav"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Icons } from "./icons"

export function NavPrimary(siteConfig: SiteConfig) {
  const segment = useSelectedLayoutSegment()

  const pathName = usePathname()

  return (
    <>
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo />
      </Link>
      <div className="flex flex-1 items-center justify-end">
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>
              <Icons.menu className="h-10 w-10 rounded-md text-primary duration-75 hover:bg-primary hover:text-background" />
            </SheetTrigger>
            <SheetContent size={"full"}>
              <SheetHeader>
                <SheetTitle className="self-start">Menu</SheetTitle>
                <div className="flex flex-col gap-2 py-5">
                  <SheetClose asChild>
                    <Link
                      href={"https://coaniquem.cl/es/"}
                      target="_blank"
                      className={cn()}
                    >
                      <Image
                        src="/LogoCoaniquem.png"
                        alt="Coaniquem"
                        width={200}
                        height={100}
                      />
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href={"/"}
                      className={cn(
                        "flex w-fit items-center whitespace-nowrap rounded-md bg-transparent px-2 py-1 font-semibold uppercase text-foreground duration-75 hover:bg-foreground hover:text-background"
                      )}
                    >
                      Inicio
                    </Link>
                  </SheetClose>
                  {pathName === "/" ? (
                    <SheetClose asChild>
                      <Link
                        key={0}
                        href={"/aboutus"}
                        className={cn(
                          "w-1/2 bg-red-500 text-white hover:bg-red-800 hover:text-white",
                          "flex items-center whitespace-nowrap rounded-md px-2 py-1 font-semibold duration-75"
                        )}
                      >
                        Sobre nuestra alianza
                      </Link>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        key={1}
                        href={"/"}
                        className={cn(
                          "w-1/2 bg-red-500 text-white hover:bg-red-800 hover:text-white",
                          "flex items-center whitespace-nowrap rounded-md px-2 py-1 font-semibold duration-75"
                        )}
                      >
                        Volver a nuestros planes
                      </Link>
                    </SheetClose>
                  )}

                  {siteConfig.secondaryNav?.map(
                    (item, index) =>
                      item.href && (
                        <SheetClose key={item.title} asChild>
                          <Link
                            key={index}
                            href={item.href}
                            className={cn(
                              "flex w-fit items-center whitespace-nowrap rounded-md bg-transparent px-2 py-1 font-semibold uppercase text-foreground duration-75 hover:bg-foreground hover:text-background",
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
        <nav className="hidden items-center gap-6 md:flex">
          {pathName === "/" ? (
            <Link
              key={0}
              href={"/aboutus"}
              className={cn(
                "bg-red-500 text-white hover:bg-red-800 hover:text-white",
                "flex items-center whitespace-nowrap rounded-md px-2 py-1 font-semibold duration-75"
              )}
            >
              Sobre nuestra alianza
            </Link>
          ) : (
            <Link
              key={1}
              href={"/"}
              className={cn(
                "bg-red-500 text-white hover:bg-red-800 hover:text-white",
                "flex items-center whitespace-nowrap rounded-md px-2 py-1 font-semibold duration-75"
              )}
            >
              Volver a nuestros planes
            </Link>
          )}

          <Link
            href={"https://coaniquem.cl/es/"}
            target="_blank"
            className={cn()}
          >
            <Image
              src="/LogoCoaniquem.png"
              alt="Coaniquem"
              width={200}
              height={100}
            />
          </Link>
          {/* <ThemeToggle /> */}
        </nav>
      </div>
    </>
  )
}
