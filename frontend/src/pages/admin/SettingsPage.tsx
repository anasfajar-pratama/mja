import { useEffect, useMemo, useState } from 'react'
import { api } from '../../api/client'

const GROUP_LABELS: Record<string, string> = {
  brand: 'Brand / Logo',
  meta: 'Meta & SEO',
  contact: 'Kontak Utama (WhatsApp, Telepon, Email)',
  about: 'Section Tentang Kami',
  strategic: 'Section Strategic (Visi, Misi, Nilai)',
  services: 'Section Layanan',
  legal: 'Section Legalitas',
  customer: 'Section Customer',
  gallery: 'Section Dokumentasi',
  faq: 'Section FAQ',
  testimonial: 'Section Testimoni',
  cta: 'CTA Banner',
  contact_section: 'Section Kontak & Peta',
  footer: 'Footer',
}

const GROUP_ORDER = ['brand', 'meta', 'contact', 'about', 'strategic', 'services', 'legal', 'customer', 'gallery', 'faq', 'testimonial', 'cta', 'contact_section', 'footer']

const prettify = (key: string) =>
  key
    .replace(/_html$/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get<Record<string, string>>('/admin/settings')
      .then(({ data }) => setSettings(data))
      .catch(() => setError('Gagal memuat pengaturan.'))
      .finally(() => setLoading(false))
  }, [])

  const grouped = useMemo(() => {
    const groups: Record<string, string[]> = {}
    for (const key of Object.keys(settings)) {
      const group = key.split('.')[0]
      groups[group] = groups[group] || []
      groups[group].push(key)
    }
    return groups
  }, [settings])

  const orderedGroups = useMemo(() => {
    const keys = Object.keys(grouped)
    return [
      ...GROUP_ORDER.filter((g) => keys.includes(g)),
      ...keys.filter((g) => !GROUP_ORDER.includes(g)),
    ]
  }, [grouped])

  const save = async () => {
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const { data } = await api.put('/admin/settings', { settings })
      setSettings(data)
      setMessage('Pengaturan tersimpan.')
    } catch {
      setError('Gagal menyimpan pengaturan.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="adm-content">Memuat…</div>

  return (
    <>
      <div className="adm-top">
        <div>
          <h1>Pengaturan Situs</h1>
          <small>Teks, nomor kontak, dan meta situs</small>
        </div>
        <button className="adm-btn" type="button" disabled={saving} onClick={save}>
          {saving ? 'Menyimpan…' : 'Simpan Perubahan'}
        </button>
      </div>

      <div className="adm-content">
        {error && <div className="adm-alert error">{error}</div>}
        {message && <div className="adm-alert ok">{message}</div>}

        {orderedGroups.map((group) => (
          <div className="adm-card" key={group} style={{ marginBottom: 20 }}>
            <div className="adm-group-title" style={{ marginTop: 0 }}>
              {GROUP_LABELS[group] || group}
            </div>
            <div className="adm-grid2">
              {grouped[group].map((key) => {
                const value = settings[key] ?? ''
                const isLong = value.length > 70 || key.endsWith('_html') || key.endsWith('_lead') || key.endsWith('_description') || key.endsWith('_map_embed')
                return (
                  <div className="adm-field" key={key} style={isLong ? { gridColumn: 'span 2' } : undefined}>
                    <label>{prettify(key.split('.').slice(1).join('.'))}</label>
                    {isLong ? (
                      <textarea value={value} onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))} />
                    ) : (
                      <input type="text" value={value} onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))} />
                    )}
                    <div className="adm-help">{key}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <button className="adm-btn" type="button" disabled={saving} onClick={save}>
          {saving ? 'Menyimpan…' : 'Simpan Perubahan'}
        </button>
      </div>
    </>
  )
}
