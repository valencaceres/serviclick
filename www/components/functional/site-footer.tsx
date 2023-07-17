import Link from "next/link"

import { SiteConfig } from "@/types/nav"

import { Button } from "../ui/button"
import { Icons } from "./icons"

export function SiteFooter({ siteConfig }: { siteConfig: SiteConfig }) {
  return (
    <footer className="flex flex-col" id="contact">
      <div className="bg-slate-50 flex gap-4 justify-between flex-wrap px-16 py-6">
        <div className="flex flex-col gap-2">
          <h2 className="uppercase font-bebas text-2xl">Contacto Comercial</h2>
          <div>
            <Link href="tel:6000860580" className="hover:underline" passHref>
              <p>600 0860 580</p>
            </Link>
            <Link
              href="mailto:comercial@serviclick.cl"
              className="hover:underline"
              passHref
            >
              <p>comercial@serviclick.cl</p>
            </Link>
          </div>
          <h2 className="uppercase font-bebas text-2xl">Dirección</h2>
          <div>
            <Link
              href="https://goo.gl/maps/2pH3KDzeW7bvhLcJ6"
              target="_blank"
              className="hover:underline"
              passHref
            >
              <p>Enrique Mac Iver 440 Oficina 702</p>
            </Link>
          </div>
        </div>
        <div className="w-full md:max-w-xs">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.453997366536!2d-70.64997342342978!3d-33.437476596849514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a2593b4d79%3A0xefa90de0cacfe9fc!2sEnrique%20Mac%20Iver%20440%2C%20oficina%20702%2C%208320123%20Santiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1686844453837!5m2!1ses!2scl"
            className="border-none w-full"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="bg-[#222222] w-full flex justify-between items-center flex-wrap py-4 gap-4">
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
          <Link href="/termsandconditions" className="hover:underline" passHref>
            <p>Términos y condiciones</p>
          </Link>
          <Link href="#" className="hover:underline" passHref>
            <p>Trabaja con nostros</p>
          </Link>
        </div>
      </div>
    </footer>
  )
}
