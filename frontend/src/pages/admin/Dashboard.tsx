import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/client'
import { RESOURCES } from '../../admin/resources'

export default function Dashboard() {
  const { data } = useQuery<Record<string, number>>({
    queryKey: ['summary'],
    queryFn: async () => (await api.get('/admin/summary')).data,
  })

  return (
    <>
      <div className="adm-top">
        <div>
          <h1>Dashboard</h1>
          <small>Ringkasan konten situs PT. Magali Jaya Abadi</small>
        </div>
        <a className="adm-btn ghost" href="/" target="_blank" rel="noopener noreferrer">
          Lihat Situs
        </a>
      </div>
      <div className="adm-content">
        <div className="adm-stats">
          {data &&
            Object.entries(data).map(([key, value]) => (
              <div className="adm-stat" key={key}>
                <b>{value}</b>
                <span>{key.replace(/_/g, ' ')}</span>
              </div>
            ))}
        </div>

        <div className="adm-card">
          <h3 style={{ marginTop: 0, color: 'var(--adm-navy)' }}>Kelola Konten</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {RESOURCES.map((r) => (
              <Link key={r.slug} className="adm-btn ghost sm" to={`/admin/${r.slug}`}>
                {r.label}
              </Link>
            ))}
            <Link className="adm-btn dark sm" to="/admin/settings">
              Pengaturan Situs
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
