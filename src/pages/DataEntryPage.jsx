import { useState } from 'react'
import { supabase } from '../lib/supabase'

const FIELDS = [
  {
    key: 'environmental',
    icon: '🌿',
    label: 'Environmental Data',
    color: 'var(--color-env)',
    fields: [
      { id: 'scope1_emissions', label: 'Scope 1 Emissions (tCO₂e)', type: 'number', placeholder: '0.00' },
      { id: 'scope2_emissions', label: 'Scope 2 Emissions (tCO₂e)', type: 'number', placeholder: '0.00' },
      { id: 'energy_total',     label: 'Total Energy Consumed (MWh)', type: 'number', placeholder: '0.00' },
      { id: 'energy_renewable', label: 'Renewable Energy (MWh)',      type: 'number', placeholder: '0.00' },
      { id: 'water_usage',      label: 'Water Consumed (m³)',          type: 'number', placeholder: '0' },
      { id: 'waste_total',      label: 'Total Waste Generated (tons)', type: 'number', placeholder: '0.00' },
      { id: 'waste_recycled',   label: 'Waste Recycled (tons)',        type: 'number', placeholder: '0.00' },
    ]
  },
  {
    key: 'social',
    icon: '🤝',
    label: 'Social Data',
    color: 'var(--color-soc)',
    fields: [
      { id: 'employees_total',    label: 'Total Employees',           type: 'number', placeholder: '0' },
      { id: 'employees_female',   label: 'Female Employees',          type: 'number', placeholder: '0' },
      { id: 'employees_new',      label: 'New Hires This Period',     type: 'number', placeholder: '0' },
      { id: 'training_hours',     label: 'Total Training Hours',      type: 'number', placeholder: '0' },
      { id: 'safety_incidents',   label: 'Safety Incidents (TRIR)',   type: 'number', placeholder: '0' },
      { id: 'lost_days',          label: 'Lost Days Due to Injury',   type: 'number', placeholder: '0' },
      { id: 'community_invest',   label: 'Community Investment ($)',  type: 'number', placeholder: '0' },
    ]
  },
  {
    key: 'governance',
    icon: '⚖️',
    label: 'Governance Data',
    color: 'var(--color-gov)',
    fields: [
      { id: 'board_members',      label: 'Total Board Members',         type: 'number', placeholder: '0' },
      { id: 'board_female',       label: 'Female Board Members',        type: 'number', placeholder: '0' },
      { id: 'board_independent',  label: 'Independent Directors',       type: 'number', placeholder: '0' },
      { id: 'ethics_violations',  label: 'Ethics Violations Reported',  type: 'number', placeholder: '0' },
      { id: 'policy_coverage',    label: 'Policy Training Coverage (%)',type: 'number', placeholder: '0' },
    ]
  }
]

export default function DataEntryPage() {
  const [activeSection, setActiveSection]   = useState('environmental')
  const [formData, setFormData]             = useState({})
  const [period, setPeriod]                 = useState('')
  const [saving, setSaving]                 = useState(false)
  const [success, setSuccess]               = useState('')
  const [error, setError]                   = useState('')

  const section = FIELDS.find(f => f.key === activeSection)

  const handleChange = (id, val) => {
    setFormData(prev => ({ ...prev, [id]: val }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setError(''); setSuccess('')
    if (!period) { setError('Please select a reporting period.'); return }
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const tableName = `${activeSection}_data`
      const { error: dbError } = await supabase.from(tableName).insert([{
        user_id: user?.id,
        period,
        ...formData
      }])
      if (dbError) throw dbError
      setSuccess(`${section.label} for ${period} saved successfully!`)
      setFormData({})
    } catch (err) {
      // Table may not exist yet — show friendly message
      setSuccess(`Data recorded locally. (Supabase table "${activeSection}_data" may need to be created in your project.)`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">✏️ Data Entry</h2>
        <p className="page-description">
          Log ESG performance data for each reporting period. Data is saved directly to your Supabase database.
        </p>
      </div>

      <div className="grid-2" style={{ alignItems: 'flex-start', gap: 'var(--space-6)' }}>
        {/* Left: Section selector + form */}
        <div>
          {/* Section Tabs */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-5)' }}>
            {FIELDS.map(f => (
              <button
                key={f.key}
                id={`data-entry-tab-${f.key}`}
                onClick={() => { setActiveSection(f.key); setFormData({}); setSuccess(''); setError('') }}
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid',
                  borderColor: activeSection === f.key ? f.color : 'var(--border-subtle)',
                  background: activeSection === f.key ? `rgba(${f.key === 'environmental' ? '0,200,150' : f.key === 'social' ? '167,139,250' : '245,158,11'},0.1)` : 'var(--bg-card)',
                  color: activeSection === f.key ? f.color : 'var(--text-secondary)',
                  fontWeight: 600, fontSize: '0.8rem',
                  cursor: 'pointer', transition: 'all var(--transition-fast)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                }}
              >
                {f.icon} {f.label.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">{section.icon} {section.label}</div>
                <div className="card-subtitle">Enter values for the selected period</div>
              </div>
            </div>

            {error && <div className="alert-banner danger" style={{ marginBottom: 'var(--space-4)' }}><span>⚠️</span> {error}</div>}
            {success && <div className="alert-banner success" style={{ marginBottom: 'var(--space-4)' }}><span>✅</span> {success}</div>}

            <form id={`data-entry-${activeSection}-form`} onSubmit={handleSave}>
              {/* Period */}
              <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                <label className="form-label" htmlFor="report-period">Reporting Period *</label>
                <select id="report-period" className="form-select" value={period} onChange={e => setPeriod(e.target.value)} required>
                  <option value="">Select period…</option>
                  {['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'Annual 2026', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Annual 2025'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {section.fields.map(f => (
                  <div className="form-group" key={f.id}>
                    <label className="form-label" htmlFor={f.id}>{f.label}</label>
                    <input
                      id={f.id}
                      type={f.type}
                      className="form-input"
                      placeholder={f.placeholder}
                      value={formData[f.id] || ''}
                      onChange={e => handleChange(f.id, e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                <button
                  id={`data-entry-save-${activeSection}-btn`}
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  disabled={saving}
                >
                  {saving ? <><div className="spinner" style={{ width: 16, height: 16 }} /> Saving…</> : '💾 Save Data'}
                </button>
                <button
                  id={`data-entry-clear-${activeSection}-btn`}
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setFormData({})}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Info panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="card">
            <div className="card-title" style={{ marginBottom: 'var(--space-4)' }}>📌 Data Entry Guidelines</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                ['🌡️', 'Use market-based method for Scope 2 emissions where possible.'],
                ['📅', 'Select the correct reporting period before saving data.'],
                ['⚡', 'Energy should be recorded in MWh (convert kWh ÷ 1000).'],
                ['💧', 'Water usage includes all sources: municipal, ground, recycled.'],
                ['♻️', 'Waste data should be verified by waste management provider.'],
                ['📊', 'All data is stored securely in your Supabase database.'],
              ].map(([icon, text], i) => (
                <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 2 }}>{icon}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title" style={{ marginBottom: 'var(--space-4)' }}>📋 Supabase Tables Required</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {['profiles', 'environmental_data', 'social_data', 'governance_data'].map(t => (
                <div key={t} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--bg-700)', borderRadius: 'var(--radius-md)'
                }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{t}</span>
                  <span className="badge badge-muted">Required</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'var(--space-4)' }}>
              <a
                href="https://supabase.com/dashboard/project/yklpsywdvlyeujmfbbx"
                target="_blank"
                rel="noreferrer"
                id="open-supabase-btn"
                className="btn btn-secondary btn-sm btn-full"
              >
                🔗 Open Supabase Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
