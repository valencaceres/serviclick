export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  subNav: NavItem[]
  links: {
    instagram: string
    facebook: string
    linkedin: string
    email: string
    whatsapp: string
  }
}
