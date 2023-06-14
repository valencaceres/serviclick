import Link from "next/link"

import { SiteConfig } from "@/types/nav"

import { Icons } from "./icons"
import { Button } from "./ui/button"

export function SiteFooter({ siteConfig }: { siteConfig: SiteConfig }) {
  return (
    <footer className="bg-[#222222] py-4 flex gap-4 justify-between items-center flex-wrap">
      <div className="px-12 flex gap-5">
        <Link
          href="https://www.instagram.com/serviclick"
          passHref
          target="_blank"
        >
          <Icons.instagram className="w-8 h-8 text-background" />
        </Link>
        <Link
          href="https://www.facebook.com/serviclick.cl"
          passHref
          target="_blank"
        >
          <Icons.facebook className="w-8 h-8 text-background" />
        </Link>
        <Link
          href="https://www.linkedin.com/company/serviclick"
          passHref
          target="_blank"
        >
          <Icons.linkedin className="w-8 h-8 text-background" />
        </Link>
      </div>
      <div className="text-[#B2B2B2] px-12 text-sm flex flex-col gap-2">
        <p>Serviclick 2023 - Todos los derechos reservados.</p>
        <Link href="#" className="hover:underline" passHref>
          <p>Términos y condiciones</p>
        </Link>
        <Link href="#" className="hover:underline" passHref>
          <p>Trabaja con nostros</p>
        </Link>
      </div>
    </footer>
  )
}
