import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { RESOURCES } from '../../admin/resources'
import { api, clearToken } from '../../api/client'

export default function AdminLayout() {
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await api.post('/logout')
    } catch {
      /* ignore */
    }
    clearToken()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="adm adm-shell">
      <aside className="adm-side">
        <div className="adm-side-brand">
          <img src="/storage/media/img01.webp" alt="Logo" />
          <span>
            MJA CMS
            <br />
            <small style={{ color: '#8fA7c3', fontSize: 10 }}>Admin Panel</small>
          </span>
        </div>
        <nav className="adm-nav">
          <NavLink to="/admin" end>
            Dashboard
          </NavLink>
          <div className="adm-nav-group">Konten</div>
          {RESOURCES.map((r) => (
            <NavLink key={r.slug} to={`/admin/${r.slug}`}>
              {r.label}
            </NavLink>
          ))}
          <div className="adm-nav-group">Pengaturan</div>
          <NavLink to="/admin/settings">Pengaturan Situs</NavLink>
        </nav>
        <div style={{ padding: '14px 12px 0', marginTop: 16, borderTop: '1px solid rgba(255,255,255,.1)', display: 'grid', gap: 8 }}>
          <a className="adm-btn ghost sm" href="/" target="_blank" rel="noopener noreferrer" style={{ justifyContent: 'center' }}>
            Lihat Situs
          </a>
          <button className="adm-btn danger sm" type="button" onClick={logout} style={{ justifyContent: 'center' }}>
            Keluar
          </button>
        </div>
      </aside>
      <div className="adm-main">
        <Outlet />
      </div>
    </div>
  )
}
