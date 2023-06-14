import { SiteConfig } from "@/types/nav"

export const siteConfig: SiteConfig = {
  name: "Serviclick",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "¿Qué es serviclick?",
      href: "/about/what",
    },
    {
      title: "Sobre nosotros",
      href: "/about/us",
    },
    {
      title: "Ubicación",
      href: "/contact/location",
    },
    {
      title: "Contacto",
      href: "/contact",
    },
  ],
  subNav: [
    {
      title: "Personas",
      href: "/people",
    },
    {
      title: "Empresas",
      href: "/companies",
    },
  ],
  links: {
    instagram: "https://www.instagram.com/serviclick/",
    facebook: "https://www.facebook.com/serviclick",
    linkedin: "https://www.linkedin.com/company/serviclick",
    email: "mailto:comercial@serviclick.cl",
    whatsapp: "https://wa.me/56994444444",
  },
}
