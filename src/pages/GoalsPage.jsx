import { useState } from 'react'

const INITIAL_GOALS = [
  { id: 1, name: 'Achieve Net Zero Emissions', pillar: 'env', target: 100, current: 52, unit: '%', deadline: '2035', status: 'On Track' },
  { id: 2, name: 'Zero Waste to Landfill',     pillar: 'env', target: 100, current: 68, unit: '%', deadline: '2027', status: 'On Track' },
  { id: 3, name: 'Renewable Energy: 100%',      pillar: 'env', target: 100, current: 47, unit: '%', deadline: '2030', status: 'At Risk' },
  { id: 4, name: 'Reduce Water Intensity 30%',  pillar: 'env', target: 30,  current: 14, unit: '%', deadline: '2028', status: 'On Track' },
  { id: 5, name: '40% Women in Leadership',     pillar: 'soc', target: 40,  current: 38, unit: '%', deadline: '2026', status: 'On Track' },
  { id: 6, name: 'Zero Fatalities',             pillar: 'soc', target: 0,   current: 0,  unit: 'incidents', deadline: 'Ongoing', status: 'Achieved' },
  { id: 7, name: 'Ethics Training: 100% Staff', pillar: 'gov', target: 100, current: 87, unit: '%', deadline: '2025', status: 'On Track' },
  { id: 8, name: 'GRI Full Compliance',         pillar: 'gov', target: 100, current: 88, unit: '%', deadline: '2026', status: 'On Track' },
  { id: 9, name: 'Pay Equity Certification',    pillar: 'soc', target: 1,   current: 0,  unit: 'cert', deadline: '2027', status: 'At Risk' },
  { id: 10, name: 'Supply Chain Audit 100%',    pillar: 'gov', target: 100, current: 65, unit: '%', deadline: '2026', status: 'At Risk' },
]

const pillarLabel = { env: 'Environmental', soc: 'Social', gov: 'Governance' }
const pillarColor = { env: 'env', soc: 'soc', gov: 'gov' }

const statusBadge = (s) => {
  if (s === 'Achieved') return 'badge-success'
  if (s === 'On Track') return 'badge-info'
  if (s === 'At Risk')  return 'badge-warning'
  return 'badge-danger'
}

export default function GoalsPage() {
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [goals, setGoals]  = useState(INITIAL_GOALS)

  // New goal form
  const [newName, setNewName] = useState('')
  const [newPillar, setNewPillar] = useState('env')
  const [newTarget, setNewTarget] = useState('')
  const [newCurrent, setNewCurrent] = useState('')
  const [newUnit, setNewUnit] = useState('%')
  const [newDeadline, setNewDeadline] = useState('')

  const filtered = filter === 'all' ? goals : goals.filter(g => g.pillar === filter)

  const summary = {
    total:    goals.length,
    achieved: goals.filter(g => g.status === 'Achieved').length,
    onTrack:  goals.filter(g => g.status === 'On Track').length,
    atRisk:   goals.filter(g => g.status === 'At Risk').length,
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const g = {
      id: Date.now(),
      name: newName,
      pillar: newPillar,
      target: Number(newTarget),
      current: Number(newCurrent),
      unit: newUnit,
      deadline: newDeadline,
      status: 'On Track'
    }
    setGoals(prev => [...prev, g])
    setShowModal(false)
    setNewName(''); setNewTarget(''); setNewCurrent(''); setNewDeadline('')
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h2 className="page-title">🎯 Goals &amp; Targets</h2>
            <p className="page-description">
              Track your sustainability commitments and progress toward long-term ESG goals.
            </p>
          </div>
          <button id="add-goal-btn" className="btn btn-primary" onClick={() => setShowModal(true)}>
            ✚ Add Goal
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="metric-grid fade-in-up" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="metric-card env">
          <div className="metric-card-header"><div className="metric-icon env">🎯</div></div>
          <div className="metric-value">{summary.total}</div>
          <div className="metric-label">Total Goals</div>
        </div>
        <div className="metric-card env">
          <div className="metric-card-header"><div className="metric-icon env">✅</div></div>
          <div className="metric-value">{summary.achieved}</div>
          <div className="metric-label">Achieved</div>
        </div>
        <div className="metric-card info">
          <div className="metric-card-header"><div className="metric-icon info">📈</div></div>
          <div className="metric-value">{summary.onTrack}</div>
          <div className="metric-label">On Track</div>
        </div>
        <div className="metric-card gov">
          <div className="metric-card-header"><div className="metric-icon gov">⚠️</div></div>
          <div className="metric-value">{summary.atRisk}</div>
          <div className="metric-label">At Risk</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="tabs">
        {[['all','All Goals'], ['env','Environmental'], ['soc','Social'], ['gov','Governance']].map(([v, l]) => (
          <button
            key={v}
            id={`goals-filter-${v}`}
            className={`tab-btn ${filter === v ? 'active' : ''}`}
            onClick={() => setFilter(v)}
          >
            {l} {filter !== v && `(${v === 'all' ? goals.length : goals.filter(g => g.pillar === v).length})`}
          </button>
        ))}
      </div>

      {/* Goals List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {filtered.map(g => {
          const pct = g.unit === 'incidents' ? (g.current === 0 ? 100 : 0) :
                      g.unit === 'cert'      ? (g.current >= 1 ? 100 : 0) :
                      Math.min((g.current / g.target) * 100, 100)
          return (
            <div key={g.id} className="card" style={{ padding: 'var(--space-5)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                    <span className={`badge badge-${pillarColor[g.pillar]}`}>{pillarLabel[g.pillar]}</span>
                    <span className={`badge ${statusBadge(g.status)}`}>{g.status}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>🏁 {g.deadline}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
                    {g.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div className="progress-bar" style={{ flex: 1 }}>
                      <div className={`progress-fill ${g.pillar}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', width: 40, textAlign: 'right' }}>
                      {Math.round(pct)}%
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-6)', textAlign: 'center', flexShrink: 0 }}>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                      {g.current}{g.unit !== 'cert' && g.unit !== 'incidents' ? g.unit : ''}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Current</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>
                      {g.target}{g.unit !== 'cert' && g.unit !== 'incidents' ? g.unit : ''}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Goal Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">Add New Goal</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAdd}>
              <div className="modal-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="goal-name">Goal Name *</label>
                    <input id="goal-name" className="form-input" placeholder="e.g. Reduce water intensity 20%" value={newName} onChange={e => setNewName(e.target.value)} required />
                  </div>
                  <div className="grid-2" style={{ gap: 'var(--space-3)' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="goal-pillar">ESG Pillar</label>
                      <select id="goal-pillar" className="form-select" value={newPillar} onChange={e => setNewPillar(e.target.value)}>
                        <option value="env">Environmental</option>
                        <option value="soc">Social</option>
                        <option value="gov">Governance</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="goal-unit">Unit</label>
                      <input id="goal-unit" className="form-input" placeholder="%, tCO₂e, m³…" value={newUnit} onChange={e => setNewUnit(e.target.value)} />
                    </div>
                  </div>
                  <div className="grid-2" style={{ gap: 'var(--space-3)' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="goal-target">Target Value *</label>
                      <input id="goal-target" className="form-input" type="number" placeholder="100" value={newTarget} onChange={e => setNewTarget(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="goal-current">Current Value *</label>
                      <input id="goal-current" className="form-input" type="number" placeholder="0" value={newCurrent} onChange={e => setNewCurrent(e.target.value)} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="goal-deadline">Target Deadline</label>
                    <input id="goal-deadline" className="form-input" placeholder="2030" value={newDeadline} onChange={e => setNewDeadline(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button id="goal-submit-btn" type="submit" className="btn btn-primary">Add Goal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
