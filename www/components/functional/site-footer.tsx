import Image from "next/image"
import Link from "next/link"

import { Icons } from "./icons"

export async function SiteFooter() {
  const responseCategories = await fetch(
    process.env.API_URL! + "/api/category/getAll",
    {
      headers: {
        id: process.env.API_KEY!,
      },
    }
  )

  const categories = await responseCategories.json()
  const currentYear = new Date().getFullYear()
  console.log(categories)

  if (!Array.isArray(categories) || categories.length === 0) {
    return null; 
  }
  

  return (
    <footer className="flex flex-col" id="contact">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 px-16 py-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-bebas text-2xl uppercase">Contacto Comercial</h2>
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
            <Link
              href="https://goo.gl/maps/2pH3KDzeW7bvhLcJ6"
              target="_blank"
              className="hover:underline"
              passHref
            >
              <p>Enrique Mac Iver 440 Oficina 702</p>
            </Link>
          </div>
          <div className="flex gap-5">
            <Link
              href="https://www.instagram.com/serviclick.cl"
              passHref
              target="_blank"
            >
              <Icons.instagram className="h-8 w-8 text-foreground" />
            </Link>
            <Link
              href="https://www.facebook.com/serviclick.cl"
              passHref
              target="_blank"
            >
              <Icons.facebook className="h-8 w-8 text-foreground" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/serviclick"
              passHref
              target="_blank"
            >
              <Icons.linkedin className="h-8 w-8 text-foreground" />
            </Link>
          </div>
        </div>
        <div className="w-full md:max-w-xs">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.453997366536!2d-70.64997342342978!3d-33.437476596849514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a2593b4d79%3A0xefa90de0cacfe9fc!2sEnrique%20Mac%20Iver%20440%2C%20oficina%20702%2C%208320123%20Santiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1686844453837!5m2!1ses!2scl"
            className="w-full border-none"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div>
          <Image src="/webpay.png" alt="webpay" width={235} height={100} />
        </div>
      </div>
      <div className="flex w-full cursor-pointer flex-wrap items-center justify-center gap-4 bg-[#222222] py-4 md:justify-between">
        <div className="flex flex-wrap gap-4 px-12 text-sm text-[#B2B2B2]">
          <div className="flex flex-col gap-1">
            <Link href="/termsandconditions" passHref>
              <p className="hover:underline">Términos y condiciones</p>
            </Link>
            <Link href="/aboutus" passHref>
              <p className="hover:underline">Trabaja con nostros</p>
            </Link>
            <Link href="/companies" passHref>
              <p className="hover:underline">Contacto empresas</p>
            </Link>
            <Link href="/people" passHref>
              <p className="hover:underline">Contacto personas</p>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 md:gap-x-4 md:gap-y-1">
            {categories.map((assistance: any) => (
              <Link
                href={`/family/${assistance.family_id}`}
                passHref
                key={assistance.id}
              >
                <p className="hover:underline">{assistance.name}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:pr-24">
          <Image
            src="/logo-blank.png"
            alt="logo"
            width={250}
            height={50}
            loading="lazy"
          />
          <p className="text-xs text-[#B2B2B2]">
            Serviclick {currentYear} - Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
