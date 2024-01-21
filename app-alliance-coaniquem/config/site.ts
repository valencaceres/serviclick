import { SiteConfig } from "@/types/nav"

export const siteConfig: SiteConfig = {
  name: "Serviclick - Todas las soluciones en la palma de tu mano",
  description: "Soluciones en la palma de tu mano.",
  secondaryNav: [
    {
      title: "Serviclick",
      href: "https://www.serviclick.cl/",
    },
    {
      title: "contacto & ubicación",
      href:"#contact"
    }
    
  ],
  mainNav: [
    {
      title: "Sobre nuestra alianza",
      href:"/aboutus"
    },
    {
      title: "Volver a planes", 
      href:"/"
    }
   
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
