export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  scroll?: boolean
}

export interface SiteConfig {
  name: string
  description: string
  secondaryNav: NavItem[]
  mainNav: NavItem[]
  links: {
    instagram: string
    facebook: string
    linkedin: string
    email: string
    whatsapp: string
  }
}
