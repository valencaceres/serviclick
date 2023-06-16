import Image from "next/image"
import {
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Moon,
  Search,
  SunMedium,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  search: Search,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  menu: Menu,
  logo: () => (
    <Image src="/logoo.png" width={270} height={57} alt="Serviclick logo" />
  ),
}
