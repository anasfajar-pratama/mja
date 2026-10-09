import type {
  CompanyValue,
  ContactLine,
  Faq as FaqType,
  Feature,
  FooterLink,
  Legality,
  MissionItem,
  Partner,
  SettingMap,
  Testimonial,
} from '../../types'
import { mediaUrl } from '../../lib/media'
import Icon from '../common/Icon'

export function FeatureStrip({ features }: { features: Feature[] }) {
  return (
    <div className="feat-strip">
      <div className="container">
        <div className="feat-row">
          {features.map((f) => (
            <div className="feat" key={f.id}>
              <div className="icon">
                <Icon name={f.icon || 'i-check'} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function About({ settings }: { settings: SettingMap }) {
  return (
    <section id="tentang" className="section light-pearl">
      <div className="container about-grid">
        <div className="about-collage">
          <img className="main" src={mediaUrl(settings['about.main_image'])} alt={settings['about.title_html'] || 'About'} />
          <img className="mini" src={mediaUrl(settings['about.mini_image'])} alt="" loading="lazy" />
          <div className="exp">
            <b>{settings['about.experience_value']}</b>
            <span>{settings['about.experience_label']}</span>
          </div>
        </div>
        <div>
          <div className="eyebrow">{settings['about.eyebrow']}</div>
          <h2 dangerouslySetInnerHTML={{ __html: settings['about.title_html'] || '' }} />
          <p className="lead">{settings['about.paragraph_1']}</p>
          <p className="lead" style={{ marginTop: 12 }}>
            {settings['about.paragraph_2']}
          </p>
          <div className="vm-item">
            <div className="icon">
              <Icon name="i-eye" />
            </div>
            <div>
              <h3>{settings['about.vision_title']}</h3>
              <p>{settings['about.vision']}</p>
            </div>
          </div>
          <div className="vm-item">
            <div className="icon">
              <Icon name="i-target" />
            </div>
            <div>
              <h3>{settings['about.mission_title']}</h3>
              <p>{settings['about.mission']}</p>
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            <a className="btn" href={settings['about.cta_href'] || '#layanan'}>
              {settings['about.cta_label']}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Strategic({
  settings,
  values,
  missions,
}: {
  settings: SettingMap
  values: CompanyValue[]
  missions: MissionItem[]
}) {
  return (
    <section id="strategic" className="section light-pearl">
      <div className="container">
        <div className="sec-head center">
          <div className="eyebrow">{settings['strategic.eyebrow']}</div>
          <h2>{settings['strategic.title']}</h2>
          <p className="lead">{settings['strategic.lead']}</p>
        </div>

        <div className="vm-grid-sec">
          <div className="vm-card" tabIndex={0}>
            <h3>
              <Icon name="i-eye" /> {settings['strategic.vision_title']}
            </h3>
            <p>{settings['strategic.vision']}</p>
          </div>
          <div className="vm-card" tabIndex={0}>
            <h3>
              <Icon name="i-target" /> {settings['strategic.mission_title']}
            </h3>
            <ul>
              {missions.map((m) => (
                <li key={m.id}>{m.text}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="values-box">
          <div className="values-head">
            <div className="eyebrow on-dark">{settings['strategic.values_eyebrow']}</div>
            <h2>{settings['strategic.values_title']}</h2>
            <p className="lead on-dark" style={{ margin: '0 auto' }}>
              {settings['strategic.values_lead']}
            </p>
          </div>
          <div className="values">
            {values.map((v) => (
              <article className="value" key={v.id}>
                <div className="letter">{v.letter}</div>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Legalities({ settings, legalities }: { settings: SettingMap; legalities: Legality[] }) {
  return (
    <section id="legalitas" className="section light-pure">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow">{settings['legal.eyebrow']}</div>
          <h2>{settings['legal.title']}</h2>
          <p className="lead">{settings['legal.lead']}</p>
        </div>
        <div className="legal-grid">
          {legalities.map((l) => (
            <div className="legal" key={l.id} style={l.is_full_width ? { gridColumn: '1/-1' } : undefined}>
              <strong>{l.label}</strong>
              <span>{l.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Customers({ settings, partners }: { settings: SettingMap; partners: Partner[] }) {
  return (
    <section id="customer" className="section customer-section">
      <div className="container">
        <div className="sec-head center">
          <div className="eyebrow">{settings['customer.eyebrow']}</div>
          <h2>{settings['customer.title']}</h2>
          <p className="lead">{settings['customer.lead']}</p>
        </div>
        <div className="logos">
          {partners.map((p) => (
            <div className="logo-tile" key={p.id} title={p.name}>
              <img loading="lazy" src={mediaUrl(p.logo_path)} alt={p.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Faq({ settings, faqs }: { settings: SettingMap; faqs: FaqType[] }) {
  return (
    <section id="faq" className="section light-pearl">
      <div className="container">
        <div className="sec-head center">
          <div className="eyebrow">{settings['faq.eyebrow']}</div>
          <h2>{settings['faq.title']}</h2>
          <p className="lead">{settings['faq.lead']}</p>
        </div>
        <div className="faq">
          {faqs.map((f, i) => (
            <details key={f.id} open={i === 0}>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Testimonials({ settings, testimonials }: { settings: SettingMap; testimonials: Testimonial[] }) {
  return (
    <section className="section dark-sec-alt">
      <div className="container">
        <div className="sec-head center">
          <div className="eyebrow on-dark">{settings['testimonial.eyebrow']}</div>
          <h2>{settings['testimonial.title']}</h2>
          <p className="lead on-dark">{settings['testimonial.lead']}</p>
        </div>
        <div className="tst">
          {testimonials.map((t) => (
            <article className="tst-card" key={t.id}>
              <div className="stars">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Icon name="i-star" key={i} />
                ))}
              </div>
              <p>{t.quote}</p>
              <div className="tst-who">
                <div className="av">{t.initials}</div>
                <div>
                  <b>{t.name}</b>
                  <small>{t.role}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaBanner({ settings }: { settings: SettingMap }) {
  return (
    <section className="section light-pure" style={{ paddingBottom: 'clamp(36px,5vw,56px)' }}>
      <div className="container">
        <div className="cta">
          <h2 dangerouslySetInnerHTML={{ __html: settings['cta.title_html'] || '' }} />
          <p>{settings['cta.text']}</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn" href={settings['cta.phone_href'] || '#'}>
              <Icon name="i-phone" /> {settings['cta.phone_label']}
            </a>
            <a className="btn ghost" href={settings['cta.email_href'] || '#'}>
              <Icon name="i-mail" /> {settings['cta.email_label']}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact({ settings, contactLines }: { settings: SettingMap; contactLines: ContactLine[] }) {
  return (
    <section id="kontak" className="section light-pearl" style={{ paddingTop: 0 }}>
      <div className="container contact-grid">
        <div>
          <div className="eyebrow">{settings['contact_section.eyebrow']}</div>
          <h2>{settings['contact_section.title']}</h2>
          <p className="lead">{settings['contact_section.lead']}</p>
          <div className="map-wrap">
            <iframe
              title="Peta lokasi Head Office PT. Magali Jaya Abadi"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              src={settings['contact_section.map_embed'] || ''}
            />
          </div>
        </div>
        <div className="contact-box">
          <h3>{settings['contact_section.company_name']}</h3>
          {contactLines.map((line) => (
            <div className="contact-line" key={line.id}>
              <small>{line.label}</small>
              <div>{line.is_link && line.href ? <a href={line.href}>{line.value}</a> : line.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SiteFooter({
  settings,
  footerLinks,
}: {
  settings: SettingMap
  footerLinks: { nav: FooterLink[]; services: FooterLink[] }
}) {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <img src={mediaUrl(settings['brand.logo'])} alt={settings['brand.name'] || 'Logo'} /> {settings['brand.name']}
            </div>
            <p style={{ color: '#94a8c2', margin: 0, lineHeight: 1.65 }}>{settings['footer.description']}</p>
          </div>
          <div>
            <h4>Navigasi</h4>
            <ul>
              {footerLinks.nav.map((l) => (
                <li key={l.id}>
                  <a href={l.href || '#'}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Layanan Utama</h4>
            <ul>
              {footerLinks.services.map((l) => (
                <li key={l.id}>
                  <a href={l.href || '#'}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Kontak Cepat</h4>
            <ul>
              <li>
                <a href={settings['contact.phone_head_href'] || '#'}>📞 {settings['contact.phone_head_display']} (Head Office)</a>
              </li>
              <li>
                <a href={settings['contact.phone_branch_href'] || '#'}>📞 {settings['contact.phone_branch_display']} (Branch)</a>
              </li>
              <li>
                <a href={`mailto:${settings['contact.email']}`}>✉️ {settings['contact.email']}</a>
              </li>
              <li>{settings['contact.location']}</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{settings['footer.copyright']}</span>
          <span>{settings['footer.tagline']}</span>
        </div>
      </div>
    </footer>
  )
}
