import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { Service, SettingMap } from '../../types'

export default function WhatsAppFloat({ settings, services }: { settings: SettingMap; services: Service[] }) {
  const whatsapp = settings['contact.whatsapp_number'] || ''
  const defaultService = services[0]?.title || 'Konsultasi Umum'
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ nama: '', hp: '', email: '', layanan: defaultService, pesan: '' })

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  useEffect(() => {
    document.body.classList.toggle('modal-open', open)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
    }
  }, [open])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const message = `Halo PT. Magali Jaya Abadi,
Saya ingin berkonsultasi mengenai layanan facility care:

*Nama*: ${form.nama}
*No. WhatsApp/HP*: ${form.hp}
*Email*: ${form.email || '-'}
*Layanan yang Diminati*: ${form.layanan}

*Kebutuhan / Pesan*:
${form.pesan}

Mohon informasi dan tindak lanjutnya. Terima kasih.`

    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
    setOpen(false)
    setForm({ nama: '', hp: '', email: '', layanan: defaultService, pesan: '' })
  }

  const options = services.length ? services.map((s) => s.title) : ['Konsultasi Umum']

  return (
    <div className="wa-float-wrap">
      <div className={`wa-overlay${open ? ' open' : ''}`} onClick={() => setOpen(false)} />

      <div className={`wa-card${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Form Konsultasi WhatsApp">
        <div className="wa-card-head">
          <div>
            <b>Hubungi Kami via WhatsApp</b>
            <small>Respon Cepat Tim PT. Magali Jaya Abadi</small>
          </div>
          <button type="button" className="wa-card-close" aria-label="Tutup form" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>
        <form className="wa-card-body" onSubmit={submit}>
          <div className="wa-field">
            <label htmlFor="waNama">Nama Lengkap *</label>
            <input
              type="text"
              id="waNama"
              placeholder="Nama Anda atau Perusahaan"
              required
              value={form.nama}
              onChange={(e) => set('nama', e.target.value)}
            />
          </div>
          <div className="wa-field">
            <label htmlFor="waHp">Nomor WhatsApp / HP *</label>
            <input
              type="tel"
              id="waHp"
              placeholder="Contoh: 08123456789"
              required
              value={form.hp}
              onChange={(e) => set('hp', e.target.value)}
            />
          </div>
          <div className="wa-field">
            <label htmlFor="waEmail">Alamat Email</label>
            <input
              type="email"
              id="waEmail"
              placeholder="nama@perusahaan.com"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
            />
          </div>
          <div className="wa-field">
            <label htmlFor="waLayanan">Layanan yang Dibutuhkan</label>
            <select id="waLayanan" value={form.layanan} onChange={(e) => set('layanan', e.target.value)}>
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
              <option value="Konsultasi Umum">Konsultasi Umum Ketenagakerjaan</option>
            </select>
          </div>
          <div className="wa-field">
            <label htmlFor="waPesan">Pesan / Kebutuhan Fasilitas *</label>
            <textarea
              id="waPesan"
              placeholder="Tuliskan kebutuhan tenaga kerja, lokasi, atau pertanyaan Anda..."
              required
              value={form.pesan}
              onChange={(e) => set('pesan', e.target.value)}
            />
          </div>
          <button type="submit" className="wa-submit-btn">
            <svg className="ic" style={{ width: 18, height: 18, fill: 'currentColor' }} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.68 1.33-.45.07-1.02.1-3-.72-2.38-.99-3.9-3.41-4.02-3.57-.12-.16-.96-1.28-.96-2.44 0-1.16.61-1.73.83-1.96.22-.24.48-.3.64-.3.16 0 .32 0 .46.01.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.27.02.43-.08.16-.12.26-.24.4-.12.14-.25.32-.36.43-.12.12-.25.25-.11.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.16.61-.71.77-.96.16-.24.32-.2.55-.12.22.08 1.43.68 1.68.8.24.12.41.18.47.28.06.1.06.6-.18 1.28z" />
            </svg>
            Kirim Pesan ke WhatsApp
          </button>
        </form>
      </div>

      <button type="button" className="wa-float-btn" aria-label="Buka form chat WhatsApp" onClick={() => setOpen((v) => !v)}>
        <span className="pulse" />
        <svg className="wa-ic" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.68 1.33-.45.07-1.02.1-3-.72-2.38-.99-3.9-3.41-4.02-3.57-.12-.16-.96-1.28-.96-2.44 0-1.16.61-1.73.83-1.96.22-.24.48-.3.64-.3.16 0 .32 0 .46.01.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.27.02.43-.08.16-.12.26-.24.4-.12.14-.25.32-.36.43-.12.12-.25.25-.11.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.16.61-.71.77-.96.16-.24.32-.2.55-.12.22.08 1.43.68 1.68.8.24.12.41.18.47.28.06.1.06.6-.18 1.28z" />
        </svg>
        <span className="label">Chat WhatsApp</span>
      </button>
    </div>
  )
}
