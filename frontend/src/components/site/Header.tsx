import { useState } from 'react'
import type { SettingMap } from '../../types'
import { mediaUrl } from '../../lib/media'

const LINKS: [string, string][] = [
  ['#tentang', 'Tentang'],
  ['#layanan', 'Layanan'],
  ['#strategic', 'Strategic'],
  ['#legalitas', 'Legalitas'],
  ['#customer', 'Customer'],
  ['#gallery', 'Documentation'],
  ['#faq', 'FAQ'],
  ['#kontak', 'Kontak'],
]

export default function Header({ settings }: { settings: SettingMap }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container nav">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <img src={mediaUrl(settings['brand.logo'])} alt={settings['brand.name'] || 'Logo'} />
          <span>
            {settings['brand.name']}
            <small>{settings['brand.tagline']}</small>
          </span>
        </a>
        <button
          className="menu"
          type="button"
          aria-label="Buka menu navigasi"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">☰</span>
        </button>
        <nav className={`navlinks${open ? ' open' : ''}`} aria-label="Menu utama">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="navcta" href="#kontak" onClick={() => setOpen(false)}>
            Hubungi Kami
          </a>
        </nav>
      </div>
    </header>
  )
}
