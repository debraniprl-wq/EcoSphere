import { useEffect, Component } from 'react'
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

// ─── Error Boundary ───────────────────────────────────────────────────────────
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('[EcoSphere] Runtime error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-900)', flexDirection: 'column', gap: '1.5rem',
          padding: '2rem', textAlign: 'center'
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent-dark))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
            boxShadow: 'var(--shadow-glow-green)'
          }}>🌿</div>
          <div>
            <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              Something went wrong
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: 400 }}>
              EcoSphere encountered an error. This is usually caused by missing environment variables in Vercel.
              Please add <code style={{ color: 'var(--color-primary)', fontSize: '0.8rem' }}>VITE_SUPABASE_URL</code> and{' '}
              <code style={{ color: 'var(--color-primary)', fontSize: '0.8rem' }}>VITE_SUPABASE_ANON_KEY</code> to your Vercel project settings and redeploy.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 2rem', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              color: 'var(--text-inverse)', fontWeight: 700, fontSize: '0.9rem'
            }}
          >
            Try Again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

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
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent-dark))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, boxShadow: 'var(--shadow-glow-green)',
          animation: 'pulse-dot 1.5s infinite'
        }}>🌿</div>
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
    <ErrorBoundary>
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
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
