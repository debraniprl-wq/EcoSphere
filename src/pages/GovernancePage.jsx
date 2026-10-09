import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, ArcElement,
  PointElement, LineElement, Tooltip, Legend
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend)

const CHART_OPTS = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: {} },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4A6080', font: { size: 11 } } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4A6080', font: { size: 11 } } }
  }
}

const boardCompositionChart = {
  labels: ['Independent', 'Executive', 'Non-Exec'],
  datasets: [{
    data: [7, 2, 3],
    backgroundColor: ['rgba(245,158,11,0.85)', 'rgba(0,200,150,0.75)', 'rgba(167,139,250,0.75)'],
    borderWidth: 0, hoverOffset: 6
  }]
}

const complianceChart = {
  labels: ['GRI', 'TCFD', 'SASB', 'CDP', 'UN SDG', 'ISO 14001'],
  datasets: [{
    label: 'Compliance %',
    data: [88, 72, 65, 79, 91, 84],
    backgroundColor: [
      'rgba(0,200,150,0.8)', 'rgba(0,168,255,0.8)', 'rgba(167,139,250,0.8)',
      'rgba(245,158,11,0.8)', 'rgba(0,200,150,0.6)', 'rgba(244,63,94,0.6)'
    ],
    borderRadius: 6
  }]
}

const RISKS = [
  { name: 'Climate Physical Risk', category: 'Environmental', level: 'High', score: 72, status: 'Monitoring' },
  { name: 'Supply Chain ESG Risk', category: 'Social', level: 'Medium', score: 55, status: 'Action Required' },
  { name: 'Board Independence', category: 'Governance', level: 'Low', score: 88, status: 'Compliant' },
  { name: 'Data Privacy Exposure', category: 'Governance', level: 'Medium', score: 61, status: 'Under Review' },
  { name: 'Labour Relations', category: 'Social', level: 'Low', score: 82, status: 'Compliant' },
  { name: 'Carbon Regulation Risk', category: 'Environmental', level: 'High', score: 47, status: 'Action Required' },
]

const POLICIES = [
  { name: 'Anti-Corruption Policy', version: 'v3.2', lastReview: 'Aug 2026', status: 'Active', coverage: 100 },
  { name: 'Whistleblower Protection', version: 'v2.1', lastReview: 'Jul 2026', status: 'Active', coverage: 100 },
  { name: 'Supplier Code of Conduct', version: 'v4.0', lastReview: 'Sep 2026', status: 'Active', coverage: 87 },
  { name: 'Data Governance Framework', version: 'v1.8', lastReview: 'Jun 2026', status: 'Under Review', coverage: 74 },
  { name: 'Human Rights Policy', version: 'v2.5', lastReview: 'May 2026', status: 'Active', coverage: 100 },
  { name: 'Climate Risk Management', version: 'v1.3', lastReview: 'Mar 2026', status: 'Outdated', coverage: 62 },
]

const riskColor = (level) => {
  if (level === 'High')   return { color: 'var(--color-danger)',  bg: 'rgba(244,63,94,0.12)' }
  if (level === 'Medium') return { color: 'var(--color-warning)', bg: 'rgba(245,158,11,0.12)' }
  return { color: 'var(--color-success)', bg: 'rgba(0,200,150,0.12)' }
}

const statusBadge = (s) => {
  if (s === 'Compliant') return 'badge-success'
  if (s === 'Action Required') return 'badge-danger'
  if (s === 'Under Review' || s === 'Outdated') return 'badge-warning'
  return 'badge-muted'
}

export default function GovernancePage() {
  const boardSize = 12
  const women = 4

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">⚖️ Governance Metrics</h2>
        <p className="page-description">
          Board composition, risk management, compliance frameworks, and corporate policies.
        </p>
      </div>

      {/* KPIs */}
      <div className="metric-grid fade-in-up" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="metric-card gov">
          <div className="metric-card-header">
            <div className="metric-icon gov">🏛️</div>
            <div className="metric-change neutral">→ 0</div>
          </div>
          <div className="metric-value">{boardSize}</div>
          <div className="metric-label">Board Members</div>
          <div className="metric-sub">58% independent directors</div>
        </div>

        <div className="metric-card gov">
          <div className="metric-card-header">
            <div className="metric-icon gov">👩‍⚖️</div>
            <div className="metric-change up">↑ 1 seat</div>
          </div>
          <div className="metric-value">{women}/{boardSize}</div>
          <div className="metric-label">Women on Board</div>
          <div className="metric-sub">33% — Target: 40%</div>
        </div>

        <div className="metric-card gov">
          <div className="metric-card-header">
            <div className="metric-icon gov">✅</div>
            <div className="metric-change up">↑ 5.0%</div>
          </div>
          <div className="metric-value">94.2%</div>
          <div className="metric-label">Overall Compliance Rate</div>
          <div className="metric-sub">3 items need attention</div>
        </div>

        <div className="metric-card gov">
          <div className="metric-card-header">
            <div className="metric-icon gov">⚠️</div>
            <div className="metric-change down">↓ 2</div>
          </div>
          <div className="metric-value">6</div>
          <div className="metric-label">Active Risks Tracked</div>
          <div className="metric-sub">2 high, 2 medium, 2 low</div>
        </div>

        <div className="metric-card gov">
          <div className="metric-card-header">
            <div className="metric-icon gov">📋</div>
            <div className="metric-change up">↑ 2</div>
          </div>
          <div className="metric-value">6</div>
          <div className="metric-label">Active Policies</div>
          <div className="metric-sub">1 outdated, 1 under review</div>
        </div>

        <div className="metric-card gov">
          <div className="metric-card-header">
            <div className="metric-icon gov">🔍</div>
            <div className="metric-change up">↑ 3</div>
          </div>
          <div className="metric-value">6</div>
          <div className="metric-label">Frameworks Tracked</div>
          <div className="metric-sub">GRI, TCFD, SASB, CDP…</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">🏛️ Board Composition</div>
              <div className="card-subtitle">By director type</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
            <div style={{ height: 200, width: 200, flexShrink: 0 }}>
              <Doughnut data={boardCompositionChart} options={{
                responsive: true, maintainAspectRatio: false, cutout: '65%',
                plugins: {
                  legend: { position: 'right', labels: { color: '#8BA3C7', font: { size: 11 }, padding: 12 } },
                  tooltip: {}
                }
              }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Board Gender Split</div>
                  <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                    <div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{women}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Women</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{boardSize - women}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Men</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Avg. Tenure</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>6.2 years</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>ESG Committee</div>
                  <span className="badge badge-success">✓ Established</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">📐 Framework Compliance</div>
              <div className="card-subtitle">% completion by standard</div>
            </div>
          </div>
          <div style={{ height: 220 }}>
            <Bar data={complianceChart} options={CHART_OPTS} />
          </div>
        </div>
      </div>

      {/* Risk Register */}
      <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card-header">
          <div>
            <div className="card-title">⚠️ Risk Register</div>
            <div className="card-subtitle">Active ESG risk tracking</div>
          </div>
          <button id="gov-add-risk-btn" className="btn btn-secondary btn-sm">+ Add Risk</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Risk</th>
              <th>Category</th>
              <th>Level</th>
              <th>Risk Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {RISKS.map((r, i) => {
              const rc = riskColor(r.level)
              return (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{r.name}</td>
                  <td><span className="badge badge-muted">{r.category}</span></td>
                  <td>
                    <span className="badge" style={{ background: rc.bg, color: rc.color }}>{r.level}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="progress-bar" style={{ width: 80 }}>
                        <div className="progress-fill gov" style={{ width: `${r.score}%` }} />
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{r.score}</span>
                    </div>
                  </td>
                  <td><span className={`badge ${statusBadge(r.status)}`}>{r.status}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Policies */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">📋 Corporate Policies</div>
            <div className="card-subtitle">Policy coverage and review status</div>
          </div>
          <button id="gov-add-policy-btn" className="btn btn-secondary btn-sm">+ Add Policy</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Policy</th>
              <th>Version</th>
              <th>Last Review</th>
              <th>Coverage</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {POLICIES.map((p, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>{p.version}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{p.lastReview}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="progress-bar" style={{ width: 80 }}>
                      <div className="progress-fill gov" style={{ width: `${p.coverage}%` }} />
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{p.coverage}%</span>
                  </div>
                </td>
                <td><span className={`badge ${statusBadge(p.status)}`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
