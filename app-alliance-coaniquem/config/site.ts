import { SiteConfig } from "@/types/nav"

export const siteConfig: SiteConfig = {
  name: "Serviclick - Todas las soluciones en la palma de tu mano",
  description: "Soluciones en la palma de tu mano.",
  secondaryNav: [

  ],
  mainNav: [
    {
      title: "Contacto",
      href: "/people",
    },
    {
      title: "Sobre nosotros",
      href: "/companies",
    },
  ],
  links: {
    instagram: "https://www.instagram.com/serviclick.cl",
    facebook: "https://www.facebook.com/serviclick",
    linkedin: "https://www.linkedin.com/company/serviclick",
    email: "mailto:comercial@serviclick.cl",
    whatsapp:
      "https://api.whatsapp.com/send/?phone=56939325099&text&type=phone_number&app_absent=0",
  },
}
