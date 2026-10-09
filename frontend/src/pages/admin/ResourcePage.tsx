import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../../api/client'
import { mediaUrl } from '../../lib/media'
import type { ResourceDef } from '../../admin/resources'
import ResourceForm from '../../components/admin/ResourceForm'

type Row = Record<string, any>

export default function ResourcePage({ resource }: { resource: ResourceDef }) {
  const [items, setItems] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Row | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await api.get<Row[]>(`/admin/${resource.slug}`)
      setItems(data)
    } catch {
      setError('Gagal memuat data.')
    } finally {
      setLoading(false)
    }
  }, [resource.slug])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((it) => JSON.stringify(it).toLowerCase().includes(q))
  }, [items, query])

  const remove = async (id: number) => {
    if (!window.confirm('Hapus data ini?')) return
    await api.delete(`/admin/${resource.slug}/${id}`)
    load()
  }

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }
  const openEdit = (row: Row) => {
    setEditing(row)
    setFormOpen(true)
  }

  return (
    <>
      <div className="adm-top">
        <div>
          <h1>{resource.label}</h1>
          <small>{items.length} data</small>
        </div>
        <button className="adm-btn" type="button" onClick={openCreate}>
          + Tambah {resource.singular}
        </button>
      </div>

      <div className="adm-content">
        {error && <div className="adm-alert error">{error}</div>}

        <div className="adm-toolbar">
          <input
            type="text"
            placeholder="Cari…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '9px 12px', border: '1px solid var(--adm-line)', borderRadius: 9, minWidth: 240, fontSize: 13.5 }}
          />
          <small style={{ color: 'var(--adm-muted)' }}>Menampilkan {filtered.length} dari {items.length}</small>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                {resource.imageField && <th style={{ width: 78 }}>Gambar</th>}
                <th>{resource.singular}</th>
                <th style={{ width: 90 }}>Urutan</th>
                <th style={{ width: 110 }}>Status</th>
                <th style={{ width: 170 }}></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 28, color: 'var(--adm-muted)' }}>
                    Memuat…
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 28, color: 'var(--adm-muted)' }}>
                    Belum ada data.
                  </td>
                </tr>
              )}
              {filtered.map((row) => (
                <tr key={row.id}>
                  {resource.imageField && (
                    <td>
                      {row[resource.imageField] ? (
                        <img className="adm-thumb-sm" src={mediaUrl(row[resource.imageField])} alt="" />
                      ) : (
                        <div style={{ width: 54, height: 42, borderRadius: 8, background: '#f1f5fa' }} />
                      )}
                    </td>
                  )}
                  <td>
                    <b style={{ color: 'var(--adm-navy)' }}>{row[resource.titleField] || '(tanpa judul)'}</b>
                    {resource.subtitleField && row[resource.subtitleField] && (
                      <div style={{ color: 'var(--adm-muted)', fontSize: 12.5 }}>{row[resource.subtitleField]}</div>
                    )}
                  </td>
                  <td>{row.sort}</td>
                  <td>
                    {'is_active' in row ? (
                      <span className={`adm-badge ${row.is_active ? 'on' : 'off'}`}>{row.is_active ? 'Aktif' : 'Nonaktif'}</span>
                    ) : (
                      <span className="adm-badge info">—</span>
                    )}
                  </td>
                  <td>
                    <div className="adm-row-actions">
                      <button className="adm-btn ghost sm" type="button" onClick={() => openEdit(row)}>
                        Ubah
                      </button>
                      <button className="adm-btn danger sm" type="button" onClick={() => remove(row.id)}>
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {formOpen && (
        <ResourceForm
          resource={resource}
          record={editing}
          onCancel={() => setFormOpen(false)}
          onSaved={() => {
            setFormOpen(false)
            load()
          }}
        />
      )}
    </>
  )
}
