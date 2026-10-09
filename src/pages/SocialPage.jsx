import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, ArcElement,
  PointElement, LineElement, Filler, Tooltip, Legend, RadialLinearScale
} from 'chart.js'
import { Bar, Doughnut, Radar } from 'react-chartjs-2'
import { lastNMonths } from '../lib/utils'

ChartJS.register(
  CategoryScale, LinearScale, BarElement, ArcElement,
  PointElement, LineElement, Filler, Tooltip, Legend, RadialLinearScale
)

const MONTHS = lastNMonths(6)

const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4A6080', font: { size: 11 } } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4A6080', font: { size: 11 } } }
  }
}

const genderChart = {
  labels: ['Male', 'Female', 'Non-binary / Other'],
  datasets: [{
    data: [58, 38, 4],
    backgroundColor: ['rgba(0,168,255,0.8)', 'rgba(167,139,250,0.8)', 'rgba(0,200,150,0.8)'],
    borderWidth: 0,
    hoverOffset: 6
  }]
}

const trainingChart = {
  labels: MONTHS,
  datasets: [{
    label: 'Avg. Hours',
    data: [36, 38, 40, 41, 43, 42],
    backgroundColor: 'rgba(167,139,250,0.75)',
    borderRadius: 4
  }]
}

const turnoverChart = {
  labels: MONTHS,
  datasets: [{
    label: 'Voluntary',
    data: [1.2, 1.0, 1.3, 0.9, 1.1, 0.8],
    backgroundColor: 'rgba(245,158,11,0.75)', borderRadius: 4
  }, {
    label: 'Involuntary',
    data: [0.4, 0.3, 0.5, 0.4, 0.3, 0.3],
    backgroundColor: 'rgba(244,63,94,0.5)', borderRadius: 4
  }]
}

const radarData = {
  labels: ['Pay Equity', 'Diversity', 'Safety', 'Training', 'Benefits', 'Engagement'],
  datasets: [{
    label: 'Score',
    data: [75, 68, 88, 72, 82, 77],
    borderColor: '#A78BFA',
    backgroundColor: 'rgba(167,139,250,0.12)',
    borderWidth: 2,
    pointBackgroundColor: '#A78BFA',
    pointRadius: 4
  }]
}

const EMPLOYEES = [
  { dept: 'Engineering', total: 842, women: '31%', minority: '28%', safety: '0 incidents' },
  { dept: 'Operations',  total: 657, women: '22%', minority: '34%', safety: '2 incidents' },
  { dept: 'Sales',       total: 543, women: '48%', minority: '31%', safety: '0 incidents' },
  { dept: 'HR & Legal',  total: 231, women: '62%', minority: '26%', safety: '0 incidents' },
  { dept: 'Finance',     total: 318, women: '44%', minority: '22%', safety: '0 incidents' },
  { dept: 'Executive',   total: 56,  women: '36%', minority: '18%', safety: '0 incidents' },
]

export default function SocialPage() {
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">🤝 Social Metrics</h2>
        <p className="page-description">
          Workforce diversity, employee wellbeing, health & safety, and community engagement data.
        </p>
      </div>

      {/* KPIs */}
      <div className="metric-grid fade-in-up" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="metric-card soc">
          <div className="metric-card-header">
            <div className="metric-icon soc">👥</div>
            <div className="metric-change up">↑ 3.1%</div>
          </div>
          <div className="metric-value">2,847</div>
          <div className="metric-label">Total Employees</div>
          <div className="metric-sub">Across 14 locations</div>
        </div>

        <div className="metric-card soc">
          <div className="metric-card-header">
            <div className="metric-icon soc">👩‍💼</div>
            <div className="metric-change up">↑ 2.5%</div>
          </div>
          <div className="metric-value">38%</div>
          <div className="metric-label">Women in Leadership</div>
          <div className="metric-sub">Target: 40% by 2026</div>
        </div>

        <div className="metric-card soc">
          <div className="metric-card-header">
            <div className="metric-icon soc">🎓</div>
            <div className="metric-change up">↑ 2.4%</div>
          </div>
          <div className="metric-value">42h</div>
          <div className="metric-label">Avg. Training per Employee</div>
          <div className="metric-sub">Industry avg: 31h</div>
        </div>

        <div className="metric-card soc">
          <div className="metric-card-header">
            <div className="metric-icon soc">🦺</div>
            <div className="metric-change down">↓ 40%</div>
          </div>
          <div className="metric-value">0.6</div>
          <div className="metric-label">TRIR (Safety Rate)</div>
          <div className="metric-sub">Industry avg: 2.1</div>
        </div>

        <div className="metric-card soc">
          <div className="metric-card-header">
            <div className="metric-icon soc">💬</div>
            <div className="metric-change up">↑ 4.0%</div>
          </div>
          <div className="metric-value">78%</div>
          <div className="metric-label">Employee Satisfaction</div>
          <div className="metric-sub">Based on Q3 survey</div>
        </div>

        <div className="metric-card soc">
          <div className="metric-card-header">
            <div className="metric-icon soc">🌍</div>
            <div className="metric-change up">↑ 15%</div>
          </div>
          <div className="metric-value">$2.4M</div>
          <div className="metric-label">Community Investment</div>
          <div className="metric-sub">23 active programs</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-6)', gridTemplateColumns: '1fr 1fr 1fr' }}>
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">⚧ Gender Diversity</div>
              <div className="card-subtitle">All employees</div>
            </div>
          </div>
          <div style={{ height: 200 }}>
            <Doughnut data={genderChart} options={{
              responsive: true, maintainAspectRatio: false, cutout: '65%',
              plugins: {
                legend: { position: 'bottom', labels: { color: '#8BA3C7', font: { size: 11 }, padding: 12 } },
                tooltip: {}
              }
            }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">🎓 Training Hours</div>
              <div className="card-subtitle">Avg. hours / employee / month</div>
            </div>
          </div>
          <div style={{ height: 200 }}>
            <Bar data={trainingChart} options={CHART_OPTS} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">📊 Social KPI Radar</div>
              <div className="card-subtitle">Current quarter scores (/100)</div>
            </div>
          </div>
          <div style={{ height: 200 }}>
            <Radar data={radarData} options={{
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { display: false }, tooltip: {} },
              scales: {
                r: {
                  grid: { color: 'rgba(255,255,255,0.06)' },
                  ticks: { color: '#4A6080', backdropColor: 'transparent', font: { size: 10 } },
                  pointLabels: { color: '#8BA3C7', font: { size: 11 } },
                  min: 0, max: 100
                }
              }
            }} />
          </div>
        </div>
      </div>

      {/* Turnover + Table */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">📉 Employee Turnover</div>
              <div className="card-subtitle">Monthly turnover rate (%)</div>
            </div>
          </div>
          <div style={{ height: 200 }}>
            <Bar data={turnoverChart} options={{
              ...CHART_OPTS,
              plugins: {
                ...CHART_OPTS.plugins,
                legend: { display: true, position: 'top', labels: { color: '#8BA3C7', font: { size: 11 } } }
              }
            }} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">🏢 Workforce by Department</div>
              <div className="card-subtitle">Diversity & safety snapshot</div>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Headcount</th>
                  <th>Women</th>
                  <th>Minority</th>
                  <th>Safety</th>
                </tr>
              </thead>
              <tbody>
                {EMPLOYEES.map((e, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{e.dept}</td>
                    <td>{e.total.toLocaleString()}</td>
                    <td><span className="badge badge-soc">{e.women}</span></td>
                    <td>{e.minority}</td>
                    <td>
                      <span className={`badge ${e.safety === '0 incidents' ? 'badge-success' : 'badge-warning'}`}>
                        {e.safety}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
