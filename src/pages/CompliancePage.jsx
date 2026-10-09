const COMPLIANCE_ITEMS = [
  { id: 1, framework: 'GRI Standards 2021',       area: 'Environmental', req: 'GRI 305: Emissions', status: 'Compliant',       due: 'Dec 31, 2026', score: 92 },
  { id: 2, framework: 'TCFD',                      area: 'Governance',    req: 'Climate Risk Disclosure', status: 'In Progress', due: 'Nov 15, 2026', score: 68 },
  { id: 3, framework: 'EU CSRD',                   area: 'Social',        req: 'ESRS S1: Own Workforce', status: 'Action Required', due: 'Oct 31, 2026', score: 44 },
  { id: 4, framework: 'CDP',                       area: 'Environmental', req: 'CDP Climate Questionnaire', status: 'Compliant', due: 'Jul 31, 2026', score: 79 },
  { id: 5, framework: 'ISO 14001',                 area: 'Environmental', req: 'Environmental Management System', status: 'Compliant', due: 'Ongoing', score: 88 },
  { id: 6, framework: 'SASB',                      area: 'Governance',    req: 'Industry-Specific Metrics', status: 'In Progress', due: 'Jan 31, 2027', score: 61 },
  { id: 7, framework: 'UN Global Compact',         area: 'Social',        req: 'Human Rights Principles', status: 'Compliant', due: 'Ongoing', score: 95 },
  { id: 8, framework: 'Science Based Targets',     area: 'Environmental', req: 'SBTi Net-Zero Target', status: 'Action Required', due: 'Dec 1, 2026', score: 37 },
]

const statusBadge = (s) => {
  if (s === 'Compliant')         return 'badge-success'
  if (s === 'In Progress')       return 'badge-info'
  if (s === 'Action Required')   return 'badge-danger'
  return 'badge-muted'
}

export default function CompliancePage() {
  const compliant   = COMPLIANCE_ITEMS.filter(c => c.status === 'Compliant').length
  const inProgress  = COMPLIANCE_ITEMS.filter(c => c.status === 'In Progress').length
  const action      = COMPLIANCE_ITEMS.filter(c => c.status === 'Action Required').length
  const avgScore    = Math.round(COMPLIANCE_ITEMS.reduce((a, c) => a + c.score, 0) / COMPLIANCE_ITEMS.length)

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">✅ Compliance</h2>
        <p className="page-description">
          Track regulatory compliance across ESG frameworks and standards.
        </p>
      </div>

      {/* KPI */}
      <div className="metric-grid fade-in-up" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="metric-card gov">
          <div className="metric-card-header"><div className="metric-icon gov">📊</div></div>
          <div className="metric-value">{avgScore}%</div>
          <div className="metric-label">Avg Compliance Score</div>
        </div>
        <div className="metric-card env">
          <div className="metric-card-header"><div className="metric-icon env">✅</div></div>
          <div className="metric-value">{compliant}</div>
          <div className="metric-label">Compliant</div>
        </div>
        <div className="metric-card info">
          <div className="metric-card-header"><div className="metric-icon info">🔄</div></div>
          <div className="metric-value">{inProgress}</div>
          <div className="metric-label">In Progress</div>
        </div>
        <div className="metric-card gov">
          <div className="metric-card-header"><div className="metric-icon gov">⚠️</div></div>
          <div className="metric-value">{action}</div>
          <div className="metric-label">Action Required</div>
        </div>
      </div>

      {action > 0 && (
        <div className="alert-banner danger" style={{ marginBottom: 'var(--space-6)' }}>
          <span>🚨</span>
          <span>
            <strong>{action} compliance item{action > 1 ? 's' : ''} require{action === 1 ? 's' : ''} immediate action.</strong>{' '}
            Review and address the items below before their deadlines.
          </span>
        </div>
      )}

      {/* Compliance Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">📋 Compliance Tracker</div>
            <div className="card-subtitle">All active regulatory requirements</div>
          </div>
          <button id="compliance-export-btn" className="btn btn-secondary btn-sm">📥 Export</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Framework</th>
              <th>Area</th>
              <th>Requirement</th>
              <th>Score</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {COMPLIANCE_ITEMS.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 700 }}>{c.framework}</td>
                <td><span className="badge badge-muted">{c.area}</span></td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{c.req}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="progress-bar" style={{ width: 70 }}>
                      <div className="progress-fill gov" style={{ width: `${c.score}%` }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: c.score >= 80 ? 'var(--color-success)' : c.score >= 60 ? 'var(--color-warning)' : 'var(--color-danger)', fontWeight: 700 }}>{c.score}%</span>
                  </div>
                </td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.due}</td>
                <td><span className={`badge ${statusBadge(c.status)}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
