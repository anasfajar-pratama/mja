import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, setToken } from '../../api/client'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@mja.local')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post<{ token: string }>('/login', { email, password })
      setToken(data.token)
      navigate('/admin', { replace: true })
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Email atau kata sandi tidak sesuai.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="adm-login">
      <form className="adm-login-card" onSubmit={submit}>
        <div className="adm-brand-row">
          <img src="/storage/media/img01.webp" alt="Logo" />
          <div>
            <b>PT. MAGALI JAYA ABADI</b>
            <small>CMS ADMIN PANEL</small>
          </div>
        </div>
        <h1>Masuk</h1>
        <p>Kelola konten landing page.</p>
        {error && <div className="adm-alert error">{error}</div>}
        <div className="adm-form">
          <div className="adm-field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="adm-field">
            <label>Kata Sandi</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="adm-btn" type="submit" disabled={loading}>
            {loading ? 'Memproses…' : 'Masuk'}
          </button>
        </div>
      </form>
    </div>
  )
}
