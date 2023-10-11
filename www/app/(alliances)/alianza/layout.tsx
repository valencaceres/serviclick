import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { LandingHeader } from "@/components/functional/landing-header"
import { LayoutButtons } from "@/components/functional/layout-buttons"
import { SiteFooter } from "@/components/functional/site-footer"
import { SiteHeader } from "@/components/functional/site-header"
import { TailwindIndicator } from "@/components/functional/tailwind-indicator"
import { ThemeProvider } from "@/components/functional/theme-provider"

interface LandingLayoutProps {
  children: React.ReactNode
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-background min-h-[100dvh] font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-[100dvh] flex-col">
              <LandingHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
            <TailwindIndicator />
          </ThemeProvider>
          <LayoutButtons />
          <Toaster />
        </body>
      </html>
    </>
  )
}
