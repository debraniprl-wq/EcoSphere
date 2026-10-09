import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Layout from './components/layout/Layout'
import AuthPage        from './pages/AuthPage'
import DashboardPage   from './pages/DashboardPage'
import EnvironmentalPage from './pages/EnvironmentalPage'
import SocialPage      from './pages/SocialPage'
import GovernancePage  from './pages/GovernancePage'
import ReportsPage     from './pages/ReportsPage'
import GoalsPage       from './pages/GoalsPage'
import DataEntryPage   from './pages/DataEntryPage'
import CompliancePage  from './pages/CompliancePage'
import SettingsPage    from './pages/SettingsPage'

// ─── Route Guard ─────────────────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore()
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-900)', flexDirection: 'column', gap: '1rem'
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: 'linear-gradient(135deg, #00C896, #00A8FF)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, boxShadow: '0 0 24px rgba(0,200,150,0.3)',
          animation: 'pulse-dot 1.5s infinite'
        }}>🌍</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Loading EcoSphere…</div>
      </div>
    )
  }
  if (!user) return <Navigate to="/auth" replace />
  return children
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const initialize = useAuthStore(s => s.initialize)
  useEffect(() => { initialize() }, [initialize])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected — wrapped in Layout */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard"      element={<DashboardPage />} />
          <Route path="environmental"  element={<EnvironmentalPage />} />
          <Route path="social"         element={<SocialPage />} />
          <Route path="governance"     element={<GovernancePage />} />
          <Route path="reports"        element={<ReportsPage />} />
          <Route path="goals"          element={<GoalsPage />} />
          <Route path="data-entry"     element={<DataEntryPage />} />
          <Route path="compliance"     element={<CompliancePage />} />
          <Route path="settings"       element={<SettingsPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
