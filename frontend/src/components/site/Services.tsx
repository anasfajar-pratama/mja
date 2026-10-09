import { useState } from 'react'
import type { Service, SettingMap } from '../../types'
import { mediaUrl } from '../../lib/media'
import Icon from '../common/Icon'

function chipClass(label: string, index: number) {
  if (label.trim().startsWith('+')) return 'chip chip-blue'
  if (index === 0) return 'chip chip-highlight'
  return 'chip'
}

function ServiceModal({
  service,
  whatsapp,
  onClose,
}: {
  service: Service
  whatsapp: string
  onClose: () => void
}) {
  const waText = encodeURIComponent(
    `Halo PT. Magali Jaya Abadi,\n\nSaya tertarik dengan layanan *${service.title}*.\nMohon informasi penawaran dan jadwal survei lokasi. Terima kasih.`,
  )

  return (
    <div className="svc-modal open" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="svc-modal-card">
        <button className="svc-modal-close" type="button" aria-label="Tutup modal layanan" onClick={onClose}>
          ×
        </button>
        <div className="svc-modal-head">
          <img src={mediaUrl(service.image_path)} alt={service.title} />
          <div className="svc-modal-head-body">
            <span>{service.category || 'Layanan Utama'}</span>
            <h2>{service.title}</h2>
          </div>
        </div>
        <div className="svc-modal-content">
          <div className="svc-modal-sec">
            <h4>
              <Icon name="i-badge" /> Deskripsi &amp; Ruang Lingkup
            </h4>
            <p>{service.description || service.summary}</p>
          </div>
          {!!service.benefits?.length && (
            <div className="svc-modal-sec">
              <h4>
                <Icon name="i-check" /> Keunggulan &amp; Nilai Tambah
              </h4>
              <ul>
                {service.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}
          {!!service.sectors?.length && (
            <div className="svc-modal-sec">
              <h4>
                <Icon name="i-target" /> Cakupan Sektor &amp; Fasilitas
              </h4>
              <div className="svc-modal-chips">
                {service.sectors.map((s, i) => (
                  <span className="chip" key={i}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="svc-modal-actions">
            <a className="btn" href={`https://wa.me/${whatsapp}?text=${waText}`} target="_blank" rel="noopener noreferrer">
              <Icon name="i-phone" /> Konsultasi Layanan via WhatsApp
            </a>
            <button className="btn ghost" style={{ color: 'var(--ink)', borderColor: 'var(--line)' }} type="button" onClick={onClose}>
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Services({
  services,
  settings,
  whatsapp,
}: {
  services: Service[]
  settings: SettingMap
  whatsapp: string
}) {
  const [active, setActive] = useState<Service | null>(null)

  return (
    <section id="layanan" className="section dark-sec">
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 24,
            flexWrap: 'wrap',
            marginBottom: 40,
          }}
        >
          <div style={{ maxWidth: 680 }}>
            <div className="eyebrow on-dark">{settings['services.eyebrow']}</div>
            <h2>{settings['services.title']}</h2>
            <p className="lead on-dark">{settings['services.lead']}</p>
          </div>
          <a className="btn" href="#kontak">
            {settings['services.cta_label']}
          </a>
        </div>

        <div className="svc-grid">
          {services.map((service) => (
            <article
              key={service.id}
              className={`svc-card${service.is_featured ? ' featured' : ''}`}
              tabIndex={0}
              role="button"
              aria-label={`Buka detail ${service.title}`}
              onClick={() => setActive(service)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActive(service)
                }
              }}
            >
              <div className="svc-media">
                <img src={mediaUrl(service.image_path)} alt={service.title} loading="lazy" />
                {service.tag_label && (
                  <span className="svc-tag">
                    <Icon name={service.icon || 'i-check'} /> {service.tag_label}
                  </span>
                )}
                <span className="svc-click-hint">{service.is_featured ? 'Lihat Detail ↗' : 'Detail ↗'}</span>
              </div>
              <div className="svc-body">
                <h3>
                  {service.title} <span>↗</span>
                </h3>
                <p>{service.summary}</p>
                <div className="svc-chips">
                  {(service.chips || []).map((chip, i) => (
                    <span key={i} className={chipClass(chip, i)}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {active && <ServiceModal service={active} whatsapp={whatsapp} onClose={() => setActive(null)} />}
    </section>
  )
}
