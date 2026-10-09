import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/admin/LoginPage'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import ResourcePage from './pages/admin/ResourcePage'
import SettingsPage from './pages/admin/SettingsPage'
import RequireAuth from './components/admin/RequireAuth'
import { RESOURCES } from './admin/resources'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        {RESOURCES.map((resource) => (
          <Route key={resource.slug} path={resource.slug} element={<ResourcePage resource={resource} />} />
        ))}
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
