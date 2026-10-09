export interface SettingMap {
  [key: string]: string | null
}

export interface HeroStat {
  value: string
  label: string
}

export interface HeroHighlight {
  icon: string
  title: string
  subtitle: string
}

export interface HeroSlide {
  id: number
  variant: 'dark' | 'light'
  eyebrow: string | null
  title_html: string | null
  lead: string | null
  btn_primary_label: string | null
  btn_primary_href: string | null
  btn_secondary_label: string | null
  btn_secondary_href: string | null
  image_path: string | null
  image_mini: string | null
  badge_title: string | null
  badge_text: string | null
  stats: HeroStat[] | null
  highlights: HeroHighlight[] | null
  sort: number
  is_active: boolean
}

export interface Feature {
  id: number
  icon: string | null
  title: string
  text: string | null
  sort: number
  is_active: boolean
}

export interface Service {
  id: number
  slug: string
  icon: string | null
  tag_label: string | null
  category: string | null
  title: string
  summary: string | null
  description: string | null
  image_path: string | null
  chips: string[] | null
  benefits: string[] | null
  sectors: string[] | null
  is_featured: boolean
  sort: number
  is_active: boolean
}

export interface Partner {
  id: number
  name: string
  logo_path: string | null
  sort: number
  is_active: boolean
}

export interface GalleryImage {
  id: number
  category: string
  image_path: string
  sort: number
  is_active: boolean
}

export interface Legality {
  id: number
  label: string
  value: string | null
  is_full_width: boolean
  sort: number
  is_active: boolean
}

export interface CompanyValue {
  id: number
  letter: string
  title: string
  description: string | null
  sort: number
  is_active: boolean
}

export interface MissionItem {
  id: number
  text: string
  sort: number
  is_active: boolean
}

export interface Faq {
  id: number
  question: string
  answer: string | null
  sort: number
  is_active: boolean
}

export interface Testimonial {
  id: number
  quote: string
  name: string
  role: string | null
  initials: string | null
  rating: number
  sort: number
  is_active: boolean
}

export interface ContactLine {
  id: number
  label: string
  value: string | null
  href: string | null
  is_link: boolean
  sort: number
  is_active: boolean
}

export interface FooterLink {
  id: number
  area: 'nav' | 'services'
  label: string
  href: string | null
  sort: number
}

export interface SiteData {
  settings: SettingMap
  hero_slides: HeroSlide[]
  features: Feature[]
  services: Service[]
  partners: Partner[]
  gallery_categories: string[]
  gallery_images: GalleryImage[]
  legalities: Legality[]
  values: CompanyValue[]
  mission_items: MissionItem[]
  faqs: Faq[]
  testimonials: Testimonial[]
  contact_lines: ContactLine[]
  footer_links: { nav: FooterLink[]; services: FooterLink[] }
}
