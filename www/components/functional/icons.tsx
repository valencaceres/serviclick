import Image from "next/image"
import {
  Building,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Moon,
  PhoneCall,
  Search,
  Share2,
  Store,
  SunMedium,
  Users2,
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
  building: Building,
  store: Store,
  share: Share2,
  users: Users2,
  phonecall: PhoneCall,
}
