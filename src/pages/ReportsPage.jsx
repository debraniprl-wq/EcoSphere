import { useState } from 'react'

const REPORTS = [
  {
    id: 1, name: 'ESG Annual Report 2025', framework: 'GRI', type: 'Annual',
    date: 'Oct 1, 2026', status: 'Published', pages: 48, size: '2.4 MB'
  },
  {
    id: 2, name: 'TCFD Climate Disclosure', framework: 'TCFD', type: 'Quarterly',
    date: 'Sep 15, 2026', status: 'Draft', pages: 22, size: '1.1 MB'
  },
  {
    id: 3, name: 'Carbon Inventory Q3 2026', framework: 'GHG Protocol', type: 'Quarterly',
    date: 'Sep 30, 2026', status: 'Published', pages: 14, size: '0.8 MB'
  },
  {
    id: 4, name: 'CDP Climate Response', framework: 'CDP', type: 'Annual',
    date: 'Aug 20, 2026', status: 'Published', pages: 36, size: '1.9 MB'
  },
  {
    id: 5, name: 'Diversity & Inclusion Report', framework: 'SASB', type: 'Semi-annual',
    date: 'Jul 10, 2026', status: 'Review', pages: 18, size: '0.9 MB'
  },
  {
    id: 6, name: 'Supplier Sustainability Assessment', framework: 'Internal', type: 'Annual',
    date: 'Jun 30, 2026', status: 'Published', pages: 28, size: '1.6 MB'
  },
]

const FRAMEWORKS = [
  { name: 'GRI Standards', icon: '📗', coverage: 88, desc: 'Global Reporting Initiative' },
  { name: 'TCFD',          icon: '🌡️', coverage: 72, desc: 'Task Force on Climate Disclosures' },
  { name: 'SASB',          icon: '📘', coverage: 65, desc: 'Sustainability Accounting Standards' },
  { name: 'CDP',           icon: '🌱', coverage: 79, desc: 'Carbon Disclosure Project' },
  { name: 'UN SDGs',       icon: '🌍', coverage: 91, desc: '17 Sustainable Development Goals' },
  { name: 'ISO 14001',     icon: '⚙️',  coverage: 84, desc: 'Environmental Management System' },
]

const statusBadge = (s) => {
  if (s === 'Published') return 'badge-success'
  if (s === 'Draft')     return 'badge-warning'
  if (s === 'Review')    return 'badge-info'
  return 'badge-muted'
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('reports')
  const [search, setSearch] = useState('')

  const filtered = REPORTS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.framework.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h2 className="page-title">📊 Reports</h2>
            <p className="page-description">
              Generate, manage, and export ESG reports across all major sustainability frameworks.
            </p>
          </div>
          <button id="reports-generate-btn" className="btn btn-primary">
            ✚ Generate Report
          </button>
        </div>
      </div>

      {/* Framework Coverage Cards */}
      <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card-header">
          <div>
            <div className="card-title">📐 Framework Coverage</div>
            <div className="card-subtitle">Your alignment across reporting standards</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
          {FRAMEWORKS.map((f, i) => (
            <div key={i} style={{
              background: 'var(--bg-700)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                <span style={{ fontSize: '1.25rem' }}>{f.icon}</span>
                <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{f.name}</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>{f.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Coverage</span>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: f.coverage >= 80 ? 'var(--color-success)' : f.coverage >= 60 ? 'var(--color-warning)' : 'var(--color-danger)' }}>
                  {f.coverage}%
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill gov" style={{ width: `${f.coverage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')} id="tab-all-reports">
          All Reports ({REPORTS.length})
        </button>
        <button className={`tab-btn ${activeTab === 'scheduled' ? 'active' : ''}`} onClick={() => setActiveTab('scheduled')} id="tab-scheduled">
          Scheduled
        </button>
        <button className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')} id="tab-templates">
          Templates
        </button>
      </div>

      {activeTab === 'reports' && (
        <>
          {/* Search */}
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <div className="form-input-icon">
              <span className="input-icon">🔍</span>
              <input
                id="reports-search-input"
                className="form-input"
                placeholder="Search reports by name or framework…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Report Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {filtered.map(r => (
              <div key={r.id} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-5)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-5)',
                transition: 'border-color var(--transition-fast)',
                cursor: 'pointer'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-muted)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-600)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0
                }}>
                  📄
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>{r.name}</div>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                    <span className="badge badge-muted">{r.framework}</span>
                    <span className="badge badge-muted">{r.type}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📅 {r.date}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📃 {r.pages} pages</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>💾 {r.size}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
                  <span className={`badge ${statusBadge(r.status)}`}>{r.status}</span>
                  <button id={`report-download-${r.id}`} className="btn btn-ghost btn-sm">📥 Download</button>
                  <button id={`report-view-${r.id}`} className="btn btn-secondary btn-sm">View →</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'scheduled' && (
        <div className="card">
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>📅</div>
            <div style={{ fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>No scheduled reports</div>
            <div style={{ fontSize: '0.875rem' }}>Set up automated report generation on a schedule.</div>
            <button id="schedule-report-btn" className="btn btn-primary" style={{ marginTop: 'var(--space-5)' }}>
              Schedule a Report
            </button>
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="grid-3">
          {['GRI Standards Template', 'TCFD Disclosure Template', 'CDP Climate Template', 'SASB Industry Template', 'Integrated ESG Template', 'Carbon Inventory Template'].map((t, i) => (
            <div key={i} className="card" style={{ cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>📋</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 'var(--space-2)' }}>{t}</div>
              <button id={`template-use-${i}`} className="btn btn-secondary btn-sm btn-full">Use Template</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
