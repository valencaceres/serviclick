import { SiteConfig } from "@/types/nav"

export const siteConfig: SiteConfig = {
  name: "Serviclick - Todas las soluciones en la palma de tu mano",
  description: "Soluciones en la palma de tu mano.",
  secondaryNav: [
    {
      title: "¿Qué es serviclick?",
      href: "/#about",
      scroll: false,
    },
    {
      title: "Sobre nosotros",
      href: "/aboutus",
    },
    {
      title: "Ubicación & Contacto",
      href: "#contact",
      scroll: false,
    },
  ],
  mainNav: [
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
    whatsapp:
      "https://api.whatsapp.com/send/?phone=56956451904&text&type=phone_number&app_absent=0",
  },
}
