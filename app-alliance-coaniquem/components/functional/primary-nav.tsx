"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { SiteConfig } from "@/types/nav"
import { cn } from "@/lib/utils"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Icons } from "./icons"
import Image from "next/image"

export function NavPrimary(siteConfig: SiteConfig) {
  const segment = useSelectedLayoutSegment()
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
            href={"https://coaniquem.cl/es/"}
            target="_blank"
            className={cn(
            
           
            )}
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
                        "text-foreground uppercase w-fit whitespace-nowrap flex items-center font-semibold bg-transparent hover:bg-foreground hover:text-background rounded-md px-2 py-1 duration-75"
                      )}
                    >
                      Inicio
                    </Link>
                  </SheetClose>
                  {siteConfig.mainNav?.map(
                    (item, index) =>
                      item.href && (
                        <SheetClose key={item.title} asChild>
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
                  {siteConfig.secondaryNav?.map(
                    (item, index) =>
                      item.href && (
                        <SheetClose key={item.title} asChild>
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
                    segment === item.href.slice(1)
                      ? "bg-foreground text-background"
                      : "text-foreground bg-transparent hover:bg-foreground hover:text-background",
                    "whitespace-nowrap flex items-center font-semibold rounded-md px-2 py-1 duration-75",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
          <Link
            href={"https://coaniquem.cl/es/"}
            target="_blank"
            className={cn(
            
           
            )}
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
