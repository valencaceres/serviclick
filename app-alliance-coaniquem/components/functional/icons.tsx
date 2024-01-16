import Image from "next/image"
import {
  Building,
  Facebook,
  Instagram,
  Linkedin,
  LucideIcon,
  Mail,
  Menu,
  Moon,
  PhoneCall,
  Search,
  Share2,
  Store,
  SunMedium,
  Users2,
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
  mail: Mail,
  triangle: () => (
    <svg
      width="40"
      height="20"
      viewBox="0 0 40 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="20,20 40,0 0,0" className="fill-secondary" />
    </svg>
  ),
}
