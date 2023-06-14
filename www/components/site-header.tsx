import Link from "next/link"

import { SiteConfig } from "@/types/nav"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
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
        <MainNav items={siteConfig.mainNav} />
      </div>
      <div className="container flex h-16 items-center sm:justify-between sm:space-x-0">
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
                    {siteConfig.subNav?.map(
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
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {siteConfig.subNav?.map(
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
      </div>
    </header>
  )
}
