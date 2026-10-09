import { useEffect, useRef, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Filler, Tooltip, Legend
} from 'chart.js'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import { useAuthStore } from '../store/authStore'
import { formatNumber, formatTons, lastNMonths, scoreGrade } from '../lib/utils'

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Filler, Tooltip, Legend
)

// ─── Demo data generators ─────────────────────────────────────────────────────
const MONTHS = lastNMonths(6)

const emissionsData = {
  labels: MONTHS,
  datasets: [{
    label: 'tCO₂e',
    data: [4200, 3980, 3750, 3600, 3420, 3280],
    borderColor: '#00C896',
    backgroundColor: 'rgba(0,200,150,0.08)',
    borderWidth: 2,
    fill: true,
    tension: 0.4,
    pointBackgroundColor: '#00C896',
    pointRadius: 4,
    pointHoverRadius: 6
  }]
}

const esgPillarsData = {
  labels: ['Environmental', 'Social', 'Governance'],
  datasets: [{
    data: [78, 72, 65],
    backgroundColor: [
      'rgba(0,200,150,0.85)',
      'rgba(167,139,250,0.85)',
      'rgba(245,158,11,0.85)'
    ],
    borderWidth: 0,
    hoverOffset: 6
  }]
}

const energyData = {
  labels: MONTHS,
  datasets: [
    {
      label: 'Renewable (MWh)',
      data: [1200, 1350, 1480, 1600, 1720, 1850],
      backgroundColor: 'rgba(0,200,150,0.75)',
      borderRadius: 4,
    },
    {
      label: 'Non-Renewable (MWh)',
      data: [3100, 2900, 2700, 2500, 2300, 2100],
      backgroundColor: 'rgba(244,63,94,0.5)',
      borderRadius: 4,
    }
  ]
}

const CHART_OPTS_BASE = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4A6080', font: { size: 11 } } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4A6080', font: { size: 11 } } }
  }
}

const DONUT_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '72%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: { color: '#8BA3C7', padding: 16, font: { size: 12 } }
    },
    tooltip: { mode: 'index' }
  }
}

const ACTIVITIES = [
  { text: <><strong>Carbon report Q3</strong> submitted for review</>, time: '2h ago', color: '#00C896' },
  { text: <><strong>Renewable energy</strong> target reached 55%</>, time: '5h ago', color: '#00A8FF' },
  { text: <><strong>Board diversity</strong> data updated for October</>, time: '1d ago', color: '#A78BFA' },
  { text: <><strong>Water usage</strong> exceeded monthly limit — review needed</>, time: '1d ago', color: '#F59E0B' },
  { text: <><strong>GRI report</strong> auto-generated and saved</>, time: '2d ago', color: '#00C896' },
  { text: <><strong>ISO 14001</strong> compliance check scheduled for Nov 15</>, time: '3d ago', color: '#F43F5E' },
]

const GOALS = [
  { icon: '🌿', name: 'Net Zero Emissions by 2035', type: 'env', progress: 52, target: '2035' },
  { icon: '♻️', name: 'Zero Waste to Landfill', type: 'env', progress: 68, target: '2027' },
  { icon: '🤝', name: '40% Women in Leadership', type: 'soc', progress: 35, target: '2026' },
  { icon: '⚖️', name: 'Ethics Training Coverage 100%', type: 'gov', progress: 87, target: '2025' },
]

// ─── ESG Score Ring ────────────────────────────────────────────────────────────
function ScoreRing({ score, color, label, size = 100 }) {
  const r = (size - 16) / 2
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ

  return (
    <div className="esg-score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div className="score-ring-text">
        <div className="score-ring-value" style={{ color }}>{score}</div>
        <div className="score-ring-label">{label}</div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { profile, user } = useAuthStore()
  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'there'
  const [activeTab, setActiveTab] = useState('overview')

  const overallScore = 72
  const envScore = 78
  const socScore = 72
  const govScore = 65

  return (
    <div>
      {/* Welcome banner */}
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h2 className="page-title">
              Welcome back, {displayName.split(' ')[0]} 👋
            </h2>
            <p className="page-description">
              Your ESG performance at a glance. Overall score is <strong style={{ color: '#00C896' }}>{overallScore}/100</strong> — <strong style={{ color: '#00C896' }}>{scoreGrade(overallScore)}</strong> rating this quarter.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexShrink: 0 }}>
            <button id="dashboard-export-btn" className="btn btn-secondary btn-sm">
              📥 Export Report
            </button>
            <button id="dashboard-add-data-btn" className="btn btn-primary btn-sm">
              ✚ Add Data
            </button>
          </div>
        </div>
      </div>

      {/* ─── Metric Cards ─────────────────────────────────────────────────── */}
      <div className="metric-grid fade-in-up" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="metric-card env fade-in-up-delay-1 fade-in-up">
          <div className="metric-card-header">
            <div className="metric-icon env">🌿</div>
            <div className="metric-change down">↓ 8.2%</div>
          </div>
          <div className="metric-value">3,280</div>
          <div className="metric-label">Total Emissions (tCO₂e)</div>
          <div className="metric-sub">vs 3,570 last quarter</div>
        </div>

        <div className="metric-card info fade-in-up-delay-2 fade-in-up">
          <div className="metric-card-header">
            <div className="metric-icon info">⚡</div>
            <div className="metric-change up">↑ 12.5%</div>
          </div>
          <div className="metric-value">46.9%</div>
          <div className="metric-label">Renewable Energy Share</div>
          <div className="metric-sub">1,850 MWh renewable</div>
        </div>

        <div className="metric-card soc fade-in-up-delay-3 fade-in-up">
          <div className="metric-card-header">
            <div className="metric-icon soc">👥</div>
            <div className="metric-change up">↑ 3.1%</div>
          </div>
          <div className="metric-value">2,847</div>
          <div className="metric-label">Total Employees</div>
          <div className="metric-sub">38% women in leadership</div>
        </div>

        <div className="metric-card gov fade-in-up-delay-4 fade-in-up">
          <div className="metric-card-header">
            <div className="metric-icon gov">✅</div>
            <div className="metric-change up">↑ 5.0%</div>
          </div>
          <div className="metric-value">94.2%</div>
          <div className="metric-label">Compliance Rate</div>
          <div className="metric-sub">3 items need attention</div>
        </div>

        <div className="metric-card env">
          <div className="metric-card-header">
            <div className="metric-icon env">💧</div>
            <div className="metric-change down">↓ 4.6%</div>
          </div>
          <div className="metric-value">128K</div>
          <div className="metric-label">Water Usage (m³)</div>
          <div className="metric-sub">vs 134K last quarter</div>
        </div>

        <div className="metric-card info">
          <div className="metric-card-header">
            <div className="metric-icon info">♻️</div>
            <div className="metric-change up">↑ 6.8%</div>
          </div>
          <div className="metric-value">67.3%</div>
          <div className="metric-label">Waste Recycled</div>
          <div className="metric-sub">Target: 80% by 2026</div>
        </div>

        <div className="metric-card soc">
          <div className="metric-card-header">
            <div className="metric-icon soc">🎓</div>
            <div className="metric-change up">↑ 2.4%</div>
          </div>
          <div className="metric-value">42h</div>
          <div className="metric-label">Avg. Training / Employee</div>
          <div className="metric-sub">vs 41h last year</div>
        </div>

        <div className="metric-card gov">
          <div className="metric-card-header">
            <div className="metric-icon gov">📋</div>
            <div className="metric-change neutral">→ 0%</div>
          </div>
          <div className="metric-value">7</div>
          <div className="metric-label">Active Policies</div>
          <div className="metric-sub">2 under review</div>
        </div>
      </div>

      {/* ─── Main Grid ────────────────────────────────────────────────────── */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-6)', gridTemplateColumns: '1fr 1fr 360px' }}>

        {/* Emissions Trend */}
        <div className="card col-span-2">
          <div className="card-header">
            <div>
              <div className="card-title">📉 Carbon Emissions Trend</div>
              <div className="card-subtitle">Last 6 months · tCO₂e</div>
            </div>
            <div className="badge badge-success">↓ 21.9% YoY</div>
          </div>
          <div style={{ height: 220 }}>
            <Line data={emissionsData} options={CHART_OPTS_BASE} />
          </div>
        </div>

        {/* ESG Score Rings */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">🎯 ESG Scores</div>
              <div className="card-subtitle">Current quarter</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
            <ScoreRing score={overallScore} color="#00C896" label="Overall" size={120} />
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
              <ScoreRing score={envScore} color="#00C896" label="ENV" size={72} />
              <ScoreRing score={socScore} color="#A78BFA" label="SOC" size={72} />
              <ScoreRing score={govScore} color="#F59E0B" label="GOV" size={72} />
            </div>
            <div className="badge badge-success" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
              {scoreGrade(overallScore)} Rating
            </div>
          </div>
        </div>
      </div>

      {/* ─── Second Row ───────────────────────────────────────────────────── */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-6)' }}>

        {/* Energy Mix Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">⚡ Energy Consumption Mix</div>
              <div className="card-subtitle">Renewable vs Non-renewable (MWh)</div>
            </div>
            <div className="badge badge-info">6-month view</div>
          </div>
          <div style={{ height: 200 }}>
            <Bar data={energyData} options={{
              ...CHART_OPTS_BASE,
              plugins: {
                ...CHART_OPTS_BASE.plugins,
                legend: { display: true, position: 'top', labels: { color: '#8BA3C7', font: { size: 11 } } }
              },
              scales: { ...CHART_OPTS_BASE.scales, x: { ...CHART_OPTS_BASE.scales.x, stacked: false }, y: { ...CHART_OPTS_BASE.scales.y, stacked: false } }
            }} />
          </div>
        </div>

        {/* ESG Pillars Donut */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">📊 Score Breakdown</div>
              <div className="card-subtitle">By ESG pillar</div>
            </div>
          </div>
          <div style={{ height: 200 }}>
            <Doughnut data={esgPillarsData} options={DONUT_OPTS} />
          </div>
        </div>
      </div>

      {/* ─── Third Row ────────────────────────────────────────────────────── */}
      <div className="grid-2">

        {/* Goals */}
        <div className="card">
          <div className="section-header">
            <div>
              <div className="section-title">🎯 Active Goals</div>
              <div className="section-subtitle">Top commitments progress</div>
            </div>
            <button id="view-all-goals-btn" className="btn btn-ghost btn-sm">View all →</button>
          </div>
          {GOALS.map((g, i) => (
            <div key={i} className="goal-item">
              <div className={`goal-icon metric-icon ${g.type}`}>{g.icon}</div>
              <div className="goal-info">
                <div className="goal-name">{g.name}</div>
                <div className="goal-meta">Target: {g.target}</div>
              </div>
              <div className="goal-progress">
                <div className="goal-pct">{g.progress}%</div>
                <div className="progress-bar">
                  <div className={`progress-fill ${g.type}`} style={{ width: `${g.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="card">
          <div className="section-header">
            <div>
              <div className="section-title">📋 Recent Activity</div>
              <div className="section-subtitle">Latest updates across modules</div>
            </div>
          </div>
          {ACTIVITIES.map((a, i) => (
            <div key={i} className="activity-item">
              <div className="activity-dot" style={{ background: a.color }} />
              <div className="activity-content">
                <div className="activity-text">{a.text}</div>
                <div className="activity-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
