import { useEffect } from 'react'
import { useSite } from '../../hooks/useSite'
import Header from '../../components/site/Header'
import HeroSlider from '../../components/site/HeroSlider'
import Services from '../../components/site/Services'
import Gallery from '../../components/site/Gallery'
import WhatsAppFloat from '../../components/site/WhatsAppFloat'
import {
  About,
  Contact,
  CtaBanner,
  Customers,
  Faq,
  FeatureStrip,
  Legalities,
  SiteFooter,
  Strategic,
  Testimonials,
} from '../../components/site/Sections'

const center = { padding: '140px 24px', textAlign: 'center' as const, color: '#5f7087' }

export default function LandingPage() {
  const { data, isLoading, isError } = useSite()

  useEffect(() => {
    if (!data) return
    const s = data.settings
    if (s['meta.title']) document.title = s['meta.title']
    const setMeta = (name: string, content?: string | null) => {
      if (!content) return
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
    setMeta('description', s['meta.description'])
    setMeta('theme-color', s['meta.theme_color'])
  }, [data])

  if (isLoading) return <div style={center}>Memuat…</div>
  if (isError || !data) return <div style={center}>Gagal memuat data situs.</div>

  const s = data.settings

  return (
    <>
      <Header settings={s} />
      <main id="top">
        <HeroSlider slides={data.hero_slides} />
        <FeatureStrip features={data.features} />
        <About settings={s} />
        <Services services={data.services} settings={s} whatsapp={s['contact.whatsapp_number'] || ''} />
        <Strategic settings={s} values={data.values} missions={data.mission_items} />
        <Legalities settings={s} legalities={data.legalities} />
        <Customers settings={s} partners={data.partners} />
        <Gallery categories={data.gallery_categories} images={data.gallery_images} settings={s} />
        <Faq settings={s} faqs={data.faqs} />
        <Testimonials settings={s} testimonials={data.testimonials} />
        <CtaBanner settings={s} />
        <Contact settings={s} contactLines={data.contact_lines} />
      </main>
      <SiteFooter settings={s} footerLinks={data.footer_links} />
      <WhatsAppFloat settings={s} services={data.services} />
    </>
  )
}
