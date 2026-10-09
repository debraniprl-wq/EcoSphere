import { useLocation } from 'react-router-dom'

const PAGE_META = {
  '/dashboard':     { title: 'Dashboard',        subtitle: 'ESG performance overview' },
  '/environmental': { title: 'Environmental',     subtitle: 'Carbon, energy & resource metrics' },
  '/social':        { title: 'Social',            subtitle: 'People, diversity & community data' },
  '/governance':    { title: 'Governance',        subtitle: 'Board, risk & compliance overview' },
  '/reports':       { title: 'Reports',           subtitle: 'Generate & export ESG reports' },
  '/goals':         { title: 'Goals & Targets',   subtitle: 'Track your sustainability commitments' },
  '/data-entry':    { title: 'Data Entry',        subtitle: 'Log environmental and social data' },
  '/compliance':    { title: 'Compliance',        subtitle: 'Regulatory frameworks & requirements' },
  '/settings':      { title: 'Settings',          subtitle: 'Account, preferences & integrations' },
}

export default function Header({ onNotificationClick }) {
  const { pathname } = useLocation()
  const meta = PAGE_META[pathname] || { title: 'EcoSphere', subtitle: 'ESG Management Platform' }
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <header className="header" role="banner">
      <div className="header-left">
        <h1 className="header-title">{meta.title}</h1>
        <p className="header-subtitle">{meta.subtitle}</p>
      </div>

      <div className="header-right">
        {/* Live status */}
        <div className="header-stat" title="Data is live">
          <div className="header-stat-dot" aria-hidden="true" />
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>Live</span>
        </div>

        {/* Date */}
        <div className="header-stat">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>📅 {dateStr}</span>
        </div>

        {/* Notifications */}
        <button
          id="header-notifications-btn"
          className="header-icon-btn"
          aria-label="Notifications"
          onClick={onNotificationClick}
        >
          🔔
          <span className="notification-badge" aria-hidden="true" />
        </button>

        {/* Help */}
        <button
          id="header-help-btn"
          className="header-icon-btn"
          aria-label="Help"
        >
          ❓
        </button>
      </div>
    </header>
  )
}
