import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { getInitials } from '../../lib/utils'

const NAV_SECTIONS = [
  {
    label: null,
    items: [
      { to: '/dashboard',     icon: '⬡', label: 'Dashboard' },
    ]
  },
  {
    label: 'ESG Pillars',
    items: [
      { to: '/environmental', icon: '🌿', label: 'Environmental' },
      { to: '/social',        icon: '🤝', label: 'Social' },
      { to: '/governance',    icon: '⚖️',  label: 'Governance' },
    ]
  },
  {
    label: 'Management',
    items: [
      { to: '/reports',       icon: '📊', label: 'Reports' },
      { to: '/goals',         icon: '🎯', label: 'Goals & Targets' },
      { to: '/data-entry',    icon: '✏️',  label: 'Data Entry' },
      { to: '/compliance',    icon: '✅', label: 'Compliance' },
    ]
  },
  {
    label: 'Settings',
    items: [
      { to: '/settings',      icon: '⚙️',  label: 'Settings' },
    ]
  }
]

export default function Sidebar() {
  const { user, profile, signOut } = useAuthStore()
  const navigate = useNavigate()

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User'
  const role        = profile?.role || 'ESG Manager'
  const company     = profile?.company || 'Organization'

  const handleSignOut = async () => {
    await signOut()
    navigate('/auth')
  }

  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon" aria-hidden="true">🌍</div>
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-name">EcoSphere</span>
          <span className="sidebar-logo-sub">ESG Platform</span>
        </div>
      </div>

      {/* Company badge */}
      <div style={{ padding: '8px 16px' }}>
        <div style={{
          background: 'var(--bg-600)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ fontSize: '0.7rem' }}>🏢</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, truncate: 'nowrap' }}>
            {company}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_SECTIONS.map((section, i) => (
          <div key={i}>
            {section.label && (
              <div className="sidebar-section-label">{section.label}</div>
            )}
            {section.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                id={`nav-${item.to.replace('/', '')}`}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="nav-item-icon" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user" onClick={handleSignOut} title="Click to sign out" role="button" tabIndex={0}>
          <div className="sidebar-avatar">{getInitials(displayName)}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{displayName}</div>
            <div className="sidebar-user-role">{role} · Sign out</div>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>→</span>
        </div>
      </div>
    </aside>
  )
}
