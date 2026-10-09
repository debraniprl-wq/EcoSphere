import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Filler, Tooltip, Legend
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import { lastNMonths } from '../lib/utils'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler, Tooltip, Legend)

const MONTHS = lastNMonths(12)
const SHORT_MONTHS = lastNMonths(6)

const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4A6080', font: { size: 11 } } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4A6080', font: { size: 11 } } }
  }
}

const emissionsChart = {
  labels: MONTHS,
  datasets: [{
    label: 'Scope 1 (tCO₂e)',
    data: [1800, 1750, 1700, 1680, 1640, 1600, 1560, 1520, 1490, 1460, 1430, 1400],
    borderColor: '#00C896', backgroundColor: 'rgba(0,200,150,0.08)',
    borderWidth: 2, fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 5
  }, {
    label: 'Scope 2 (tCO₂e)',
    data: [2200, 2150, 2100, 2000, 1950, 1900, 1850, 1820, 1790, 1760, 1730, 1700],
    borderColor: '#00A8FF', backgroundColor: 'rgba(0,168,255,0.06)',
    borderWidth: 2, fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 5
  }]
}

const energyChart = {
  labels: SHORT_MONTHS,
  datasets: [{
    label: 'Solar (MWh)',
    data: [420, 480, 520, 560, 600, 640],
    backgroundColor: 'rgba(245,158,11,0.75)', borderRadius: 4
  }, {
    label: 'Wind (MWh)',
    data: [380, 420, 460, 500, 540, 580],
    backgroundColor: 'rgba(0,200,150,0.75)', borderRadius: 4
  }, {
    label: 'Grid (MWh)',
    data: [3100, 2900, 2700, 2500, 2300, 2100],
    backgroundColor: 'rgba(244,63,94,0.45)', borderRadius: 4
  }]
}

const waterChart = {
  labels: SHORT_MONTHS,
  datasets: [{
    label: 'Water Used (m³)',
    data: [22000, 21500, 21000, 20600, 20200, 19800],
    borderColor: '#00A8FF', backgroundColor: 'rgba(0,168,255,0.08)',
    borderWidth: 2, fill: true, tension: 0.4, pointRadius: 3
  }]
}

const wasteChart = {
  labels: SHORT_MONTHS,
  datasets: [{
    label: 'Recycled (tons)',
    data: [42, 46, 50, 54, 58, 63],
    backgroundColor: 'rgba(0,200,150,0.75)', borderRadius: 4
  }, {
    label: 'Landfill (tons)',
    data: [35, 32, 29, 26, 24, 22],
    backgroundColor: 'rgba(244,63,94,0.5)', borderRadius: 4
  }]
}

const EMISSION_SOURCES = [
  { name: 'Natural Gas', scope: 'Scope 1', amount: '820 tCO₂e', pct: 58 },
  { name: 'Fleet Vehicles', scope: 'Scope 1', amount: '380 tCO₂e', pct: 27 },
  { name: 'Fugitive Emissions', scope: 'Scope 1', amount: '200 tCO₂e', pct: 14 },
  { name: 'Purchased Electricity', scope: 'Scope 2', amount: '1,400 tCO₂e', pct: 82 },
  { name: 'Purchased Heat', scope: 'Scope 2', amount: '300 tCO₂e', pct: 18 },
]

export default function EnvironmentalPage() {
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">🌿 Environmental Metrics</h2>
        <p className="page-description">
          Track carbon emissions, energy consumption, water usage, and waste management across your operations.
        </p>
      </div>

      {/* KPI Row */}
      <div className="metric-grid fade-in-up" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="metric-card env">
          <div className="metric-card-header">
            <div className="metric-icon env">🌍</div>
            <div className="metric-change down">↓ 8.2%</div>
          </div>
          <div className="metric-value">3,280</div>
          <div className="metric-label">Total GHG Emissions (tCO₂e)</div>
          <div className="metric-sub">Scope 1 + 2 combined</div>
        </div>

        <div className="metric-card env">
          <div className="metric-card-header">
            <div className="metric-icon env">⚡</div>
            <div className="metric-change up">↑ 12.5%</div>
          </div>
          <div className="metric-value">46.9%</div>
          <div className="metric-label">Renewable Energy Share</div>
          <div className="metric-sub">Target: 60% by 2026</div>
        </div>

        <div className="metric-card env">
          <div className="metric-card-header">
            <div className="metric-icon env">💧</div>
            <div className="metric-change down">↓ 4.6%</div>
          </div>
          <div className="metric-value">128K</div>
          <div className="metric-label">Water Usage (m³)</div>
          <div className="metric-sub">Intensity: 45 m³/employee</div>
        </div>

        <div className="metric-card env">
          <div className="metric-card-header">
            <div className="metric-icon env">♻️</div>
            <div className="metric-change up">↑ 6.8%</div>
          </div>
          <div className="metric-value">67.3%</div>
          <div className="metric-label">Waste Recycled</div>
          <div className="metric-sub">285 tons total waste</div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">📉 GHG Emissions by Scope</div>
              <div className="card-subtitle">12-month trend · tCO₂e</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge badge-success">Scope 1</span>
              <span className="badge badge-info">Scope 2</span>
            </div>
          </div>
          <div style={{ height: 220 }}>
            <Line data={emissionsChart} options={{
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
              <div className="card-title">⚡ Energy Mix</div>
              <div className="card-subtitle">Solar · Wind · Grid (MWh)</div>
            </div>
          </div>
          <div style={{ height: 220 }}>
            <Bar data={energyChart} options={{
              ...CHART_OPTS,
              plugins: {
                ...CHART_OPTS.plugins,
                legend: { display: true, position: 'top', labels: { color: '#8BA3C7', font: { size: 11 } } }
              }
            }} />
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid-2" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">💧 Water Consumption</div>
              <div className="card-subtitle">Monthly usage (m³)</div>
            </div>
            <div className="badge badge-info">↓ 4.6% QoQ</div>
          </div>
          <div style={{ height: 200 }}>
            <Line data={waterChart} options={CHART_OPTS} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">♻️ Waste Management</div>
              <div className="card-subtitle">Recycled vs Landfill (tons)</div>
            </div>
          </div>
          <div style={{ height: 200 }}>
            <Bar data={wasteChart} options={{
              ...CHART_OPTS,
              plugins: {
                ...CHART_OPTS.plugins,
                legend: { display: true, position: 'top', labels: { color: '#8BA3C7', font: { size: 11 } } }
              }
            }} />
          </div>
        </div>
      </div>

      {/* Emission Sources Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">🔍 Emission Sources Breakdown</div>
            <div className="card-subtitle">Top emission contributors by source</div>
          </div>
          <button id="env-add-source-btn" className="btn btn-secondary btn-sm">+ Add Source</button>
        </div>
        <table className="data-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Source</th>
              <th>Classification</th>
              <th>Amount</th>
              <th style={{ width: 200 }}>Contribution</th>
            </tr>
          </thead>
          <tbody>
            {EMISSION_SOURCES.map((s, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{s.name}</td>
                <td>
                  <span className={`badge ${s.scope === 'Scope 1' ? 'badge-success' : 'badge-info'}`}>
                    {s.scope}
                  </span>
                </td>
                <td style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{s.amount}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="progress-bar" style={{ flex: 1 }}>
                      <div className="progress-fill env" style={{ width: `${s.pct}%` }} />
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', width: 32, textAlign: 'right' }}>{s.pct}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
