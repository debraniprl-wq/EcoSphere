import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function QuickAddDataModal({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [pillar, setPillar] = useState('environmental')
  const [metricName, setMetricName] = useState('')
  const [value, setValue] = useState('')
  const [unit, setUnit] = useState('tCO₂e')
  const [period, setPeriod] = useState('Q3 2026')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  if (!isOpen) return null

  const handleSave = (e) => {
    e.preventDefault()
    setSaving(true)

    setTimeout(() => {
      setSaving(false)
      setSuccess(`Successfully logged ${metricName || 'metric entry'} (${value} ${unit}) for ${period}!`)
      setTimeout(() => {
        setSuccess('')
        setMetricName('')
        setValue('')
        setNotes('')
        onClose()
      }, 1400)
    }, 500)
  }

  const handleGoToDataEntryPage = () => {
    onClose()
    navigate('/data-entry')
  }

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 540 }}>
        <div className="modal-header">
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✚</span> Quick Add ESG Data
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSave}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {success && (
              <div className="alert-banner success">
                <span>✅</span> {success}
              </div>
            )}

            {/* Pillar Selector */}
            <div className="form-group">
              <label className="form-label">ESG Pillar</label>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                {[
                  ['environmental', '🌿 Environmental', 'var(--color-env)'],
                  ['social', '👥 Social', 'var(--color-soc)'],
                  ['governance', '⚖️ Governance', 'var(--color-gov)'],
                ].map(([p, label, color]) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPillar(p)
                      if (p === 'environmental') setUnit('tCO₂e')
                      else if (p === 'social') setUnit('employees')
                      else setUnit('%')
                    }}
                    style={{
                      flex: 1,
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid',
                      borderColor: pillar === p ? color : 'var(--border-subtle)',
                      background: pillar === p ? `rgba(${p === 'environmental' ? '0,200,150' : p === 'social' ? '167,139,250' : '245,158,11'},0.12)` : 'var(--bg-700)',
                      color: pillar === p ? color : 'var(--text-secondary)',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid-2" style={{ gap: 'var(--space-3)' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="quick-metric-name">Metric Name *</label>
                <input
                  id="quick-metric-name"
                  className="form-input"
                  placeholder={pillar === 'environmental' ? 'e.g. Scope 1 Emissions' : pillar === 'social' ? 'e.g. Total Training Hours' : 'e.g. Board Independence'}
                  value={metricName}
                  onChange={e => setMetricName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="quick-period">Reporting Period *</label>
                <select id="quick-period" className="form-select" value={period} onChange={e => setPeriod(e.target.value)}>
                  <option value="Q3 2026">Q3 2026</option>
                  <option value="Q2 2026">Q2 2026</option>
                  <option value="Q1 2026">Q1 2026</option>
                  <option value="Annual 2026">Annual 2026</option>
                </select>
              </div>
            </div>

            <div className="grid-2" style={{ gap: 'var(--space-3)' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="quick-metric-value">Measured Value *</label>
                <input
                  id="quick-metric-value"
                  type="number"
                  step="any"
                  className="form-input"
                  placeholder="0.00"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="quick-metric-unit">Unit of Measure</label>
                <input
                  id="quick-metric-unit"
                  className="form-input"
                  placeholder="tCO₂e, MWh, %, count…"
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="quick-notes">Notes / Data Source (Optional)</label>
              <textarea
                id="quick-notes"
                className="form-input"
                rows="2"
                placeholder="e.g. Utility bill reference #4920 or audit report tag…"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>
          </div>

          <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={handleGoToDataEntryPage}
              style={{ color: 'var(--color-primary)' }}
            >
              Go to Full Data Entry Page →
            </button>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
              <button id="quick-add-save-btn" type="submit" className="btn btn-primary btn-sm" disabled={saving}>
                {saving ? <><div className="spinner" style={{ width: 14, height: 14 }} /> Saving…</> : '💾 Save Metric Entry'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
