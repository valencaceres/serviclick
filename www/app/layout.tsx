import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/functional/icons"
import { LayoutButtons } from "@/components/functional/layout-buttons"
import { SiteFooter } from "@/components/functional/site-footer"
import { SiteHeader } from "@/components/functional/site-header"
import { TailwindIndicator } from "@/components/functional/tailwind-indicator"
import { ThemeProvider } from "@/components/functional/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
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
              <SiteHeader siteConfig={siteConfig} />
              <div className="flex-1">{children}</div>
              <SiteFooter siteConfig={siteConfig} />
            </div>
            <TailwindIndicator />
          </ThemeProvider>
          <LayoutButtons />
        </body>
      </html>
    </>
  )
}
