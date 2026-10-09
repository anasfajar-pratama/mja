import { useState } from 'react'
import { api } from '../../api/client'
import { mediaUrl } from '../../lib/media'
import type { FieldDef, ResourceDef } from '../../admin/resources'

type EditorValue = string | number | boolean
type EditorState = Record<string, EditorValue>

const isList = (f: FieldDef) => f.type === 'list'
const isJson = (f: FieldDef) => f.type === 'json'

function buildEditor(resource: ResourceDef, record: Record<string, unknown> | null): EditorState {
  const state: EditorState = {}
  for (const f of resource.fields) {
    const raw = record ? record[f.name] : undefined
    if (f.type === 'checkbox') state[f.name] = Boolean(raw ?? true)
    else if (f.type === 'number') state[f.name] = raw == null ? '' : Number(raw)
    else if (isList(f)) state[f.name] = Array.isArray(raw) ? (raw as string[]).join('\n') : ''
    else if (isJson(f)) state[f.name] = JSON.stringify(raw ?? [], null, 2)
    else state[f.name] = (raw as string) ?? ''
  }
  return state
}

function toPayload(resource: ResourceDef, editor: EditorState): Record<string, unknown> {
  const payload: Record<string, unknown> = {}
  for (const f of resource.fields) {
    const value = editor[f.name]
    if (f.type === 'checkbox') payload[f.name] = Boolean(value)
    else if (f.type === 'number') payload[f.name] = value === '' || value == null ? null : Number(value)
    else if (isList(f)) payload[f.name] = String(value).split('\n').map((s) => s.trim()).filter(Boolean)
    else if (isJson(f)) payload[f.name] = JSON.parse(String(value || '[]'))
    else payload[f.name] = value === '' ? null : String(value)
  }
  return payload
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FieldDef
  value: EditorValue
  onChange: (v: EditorValue) => void
}) {
  const { type } = field

  if (type === 'checkbox') {
    return (
      <div className="adm-field adm-check">
        <input id={`f-${field.name}`} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        <label htmlFor={`f-${field.name}`}>{field.label}</label>
      </div>
    )
  }

  if (type === 'select') {
    return (
      <div className="adm-field">
        <label>{field.label}</label>
        <select value={String(value ?? '')} onChange={(e) => onChange(e.target.value)}>
          <option value="">— pilih —</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {field.help && <div className="adm-help">{field.help}</div>}
      </div>
    )
  }

  if (type === 'image') {
    return (
      <div className="adm-field">
        <label>{field.label}</label>
        <div className="adm-image-field">
          {value ? <img src={mediaUrl(String(value))} alt="" /> : <div style={{ width: 120, height: 84, borderRadius: 10, border: '1px dashed var(--adm-line)' }} />}
          <div style={{ flex: 1 }}>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const fd = new FormData()
                fd.append('file', file)
                const { data } = await api.post<{ path: string }>('/admin/uploads', fd)
                onChange(data.path)
              }}
            />
            <input
              type="text"
              style={{ marginTop: 8 }}
              placeholder="atau tempel path gambar, mis. media/img01.webp"
              value={String(value ?? '')}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </div>
        {field.help && <div className="adm-help">{field.help}</div>}
      </div>
    )
  }

  if (type === 'textarea' || isList(field) || isJson(field)) {
    return (
      <div className="adm-field">
        <label>{field.label}</label>
        <textarea
          value={String(value ?? '')}
          style={isJson(field) ? { fontFamily: 'ui-monospace, monospace', fontSize: 12.5, minHeight: 140 } : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
        {field.help && <div className="adm-help">{field.help}</div>}
      </div>
    )
  }

  return (
    <div className="adm-field">
      <label>{field.label}</label>
      <input type={type === 'number' ? 'number' : 'text'} value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} />
      {field.help && <div className="adm-help">{field.help}</div>}
    </div>
  )
}

export default function ResourceForm({
  resource,
  record,
  onSaved,
  onCancel,
}: {
  resource: ResourceDef
  record: Record<string, unknown> | null
  onSaved: () => void
  onCancel: () => void
}) {
  const [editor, setEditor] = useState<EditorState>(() => buildEditor(resource, record))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const set = (name: string, value: EditorValue) => setEditor((s) => ({ ...s, [name]: value }))

  const save = async () => {
    setError('')
    let payload: Record<string, unknown>
    try {
      payload = toPayload(resource, editor)
    } catch {
      setError('Format JSON tidak valid. Periksa kembali field statistik/highlights.')
      return
    }
    setSaving(true)
    try {
      if (record?.id) await api.put(`/admin/${resource.slug}/${record.id}`, payload)
      else await api.post(`/admin/${resource.slug}`, payload)
      onSaved()
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'Gagal menyimpan data.'
      const errors = e?.response?.data?.errors
      setError(errors ? `${msg} (${Object.values(errors).flat().join(', ')})` : msg)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="adm-modal-bg" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="adm-modal">
        <div className="adm-modal-head">
          <h2>
            {record?.id ? 'Ubah' : 'Tambah'} {resource.singular}
          </h2>
          <button className="adm-x" type="button" onClick={onCancel} aria-label="Tutup">
            ×
          </button>
        </div>
        <div className="adm-modal-body">
          {error && <div className="adm-alert error">{error}</div>}
          <div className="adm-form">
            <div className="adm-grid2">
              {resource.fields.map((field) => (
                <div key={field.name} style={field.span && field.span > 1 ? { gridColumn: `span ${field.span}` } : undefined}>
                  <Field field={field} value={editor[field.name]} onChange={(v) => set(field.name, v)} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="adm-modal-foot">
          <button className="adm-btn ghost" type="button" onClick={onCancel}>
            Batal
          </button>
          <button className="adm-btn" type="button" disabled={saving} onClick={save}>
            {saving ? 'Menyimpan…' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  )
}
