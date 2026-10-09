import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { getInitials } from '../lib/utils'

export default function SettingsPage() {
  const { user, profile, updateProfile, signOut } = useAuthStore()
  const [name, setName]       = useState(profile?.full_name || '')
  const [company, setCompany] = useState(profile?.company   || '')
  const [role, setRole]       = useState(profile?.role      || 'ESG Manager')
  const [saved, setSaved]     = useState(false)
  const [saving, setSaving]   = useState(false)

  const [notifications, setNotifications] = useState({
    weeklyDigest:    true,
    complianceAlerts: true,
    goalMilestones:  true,
    reportGenerated: false,
    systemUpdates:   true,
  })

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile({ full_name: name, company, role })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {}
    setSaving(false)
  }

  const toggleNotif = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const initials = getInitials(name || user?.email || 'U')

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">⚙️ Settings</h2>
        <p className="page-description">Manage your account, notification preferences, and platform settings.</p>
      </div>

      <div className="grid-2" style={{ alignItems: 'flex-start' }}>
        {/* Profile Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">👤 Profile</div>
            </div>

            {saved && <div className="alert-banner success" style={{ marginBottom: 'var(--space-4)' }}><span>✅</span> Profile saved successfully!</div>}

            {/* Avatar */}
            <div style={{ display: 'flex', align: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <div style={{
                width: 64, height: 64, borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', fontWeight: 800, color: '#060B18', flexShrink: 0
              }}>
                {initials}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{name || 'Your Name'}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{user?.email}</div>
                <span className="badge badge-success" style={{ marginTop: '6px' }}>✓ Email Verified</span>
              </div>
            </div>

            <form id="settings-profile-form" onSubmit={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="settings-name">Full Name</label>
                  <input id="settings-name" className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="settings-email">Email Address</label>
                  <input id="settings-email" className="form-input" value={user?.email || ''} disabled style={{ opacity: 0.6 }} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="settings-company">Company / Organization</label>
                  <input id="settings-company" className="form-input" value={company} onChange={e => setCompany(e.target.value)} placeholder="Acme Corp" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="settings-role">Job Title / Role</label>
                  <select id="settings-role" className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                    <option>ESG Manager</option>
                    <option>Sustainability Director</option>
                    <option>Chief Sustainability Officer</option>
                    <option>Environmental Analyst</option>
                    <option>Compliance Officer</option>
                    <option>Data Analyst</option>
                    <option>Other</option>
                  </select>
                </div>
                <button
                  id="settings-save-profile-btn"
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? <><div className="spinner" style={{ width: 16, height: 16 }} /> Saving…</> : '💾 Save Profile'}
                </button>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="card" style={{ borderColor: 'rgba(244,63,94,0.2)' }}>
            <div className="card-title" style={{ color: 'var(--color-danger)', marginBottom: 'var(--space-4)' }}>🚨 Danger Zone</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
              These actions are permanent and cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button id="settings-signout-btn" className="btn btn-danger" onClick={() => signOut()}>
                Sign Out
              </button>
              <button id="settings-delete-btn" className="btn btn-danger">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Notifications */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🔔 Notifications</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                ['weeklyDigest',     '📊', 'Weekly ESG Digest',        'Summary of KPIs and progress every Monday'],
                ['complianceAlerts', '⚠️',  'Compliance Alerts',        'Notifications for upcoming deadlines and violations'],
                ['goalMilestones',   '🎯', 'Goal Milestones',           'Alerts when you hit or miss a goal milestone'],
                ['reportGenerated',  '📄', 'Report Generated',          'Notify when auto-reports are ready for review'],
                ['systemUpdates',    '🔧', 'System Updates',            'Product updates and new feature announcements'],
              ].map(([key, icon, label, desc]) => (
                <div key={key} style={{
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                  padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-700)', gap: 'var(--space-3)'
                }}>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.1rem', marginTop: 2 }}>{icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{label}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{desc}</div>
                    </div>
                  </div>
                  {/* Toggle */}
                  <button
                    id={`notif-toggle-${key}`}
                    onClick={() => toggleNotif(key)}
                    aria-checked={notifications[key]}
                    role="switch"
                    style={{
                      width: 42, height: 24, borderRadius: 12, flexShrink: 0,
                      background: notifications[key] ? 'var(--color-primary)' : 'var(--bg-500)',
                      border: 'none', cursor: 'pointer', position: 'relative',
                      transition: 'background var(--transition-fast)'
                    }}
                  >
                    <span style={{
                      position: 'absolute', top: 3, left: notifications[key] ? 21 : 3,
                      width: 18, height: 18, borderRadius: '50%', background: 'white',
                      transition: 'left var(--transition-fast)',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
                    }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🔗 Integrations</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                { name: 'Supabase Database', icon: '🗄️', status: 'Connected', color: 'badge-success' },
                { name: 'Slack Alerts',       icon: '💬', status: 'Not Connected', color: 'badge-muted' },
                { name: 'Microsoft Teams',    icon: '🟦', status: 'Not Connected', color: 'badge-muted' },
                { name: 'Power BI Export',    icon: '📈', status: 'Not Connected', color: 'badge-muted' },
              ].map((int, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 'var(--space-3)', background: 'var(--bg-700)', borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span style={{ fontSize: '1.1rem' }}>{int.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{int.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span className={`badge ${int.color}`}>{int.status}</span>
                    {int.status === 'Not Connected' && (
                      <button id={`connect-${i}`} className="btn btn-secondary btn-sm">Connect</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Info */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: 'var(--space-4)' }}>ℹ️ Platform Information</div>
            {[
              ['Version', 'EcoSphere v1.0.0'],
              ['Database', 'Supabase (PostgreSQL)'],
              ['Region', 'us-east-1'],
              ['Support', 'support@ecosphere.io'],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: 'var(--space-2) 0',
                borderBottom: '1px solid var(--border-subtle)',
                fontSize: '0.82rem'
              }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
