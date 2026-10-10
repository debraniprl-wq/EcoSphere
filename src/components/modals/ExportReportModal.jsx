import { useState } from 'react'

export default function ExportReportModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('EcoSphere ESG Performance Report Q3 2026')
  const [framework, setFramework] = useState('GRI')
  const [period, setPeriod] = useState('Q3 2026')
  const [format, setFormat] = useState('pdf')
  const [includeEnv, setIncludeEnv] = useState(true)
  const [includeSoc, setIncludeSoc] = useState(true)
  const [includeGov, setIncludeGov] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [success, setSuccess] = useState('')

  if (!isOpen) return null

  const handleExport = (e) => {
    e.preventDefault()
    setExporting(true)
    setSuccess('')

    setTimeout(() => {
      let content = ''
      let mimeType = 'text/plain'
      let ext = 'txt'

      if (format === 'pdf') {
        // Create printable PDF window
        const printWindow = window.open('', '_blank')
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 40px; color: #1e293b; max-width: 850px; margin: 0 auto; line-height: 1.6; }
              .header { border-bottom: 2px solid #00C896; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
              .logo { font-size: 24px; font-weight: 800; color: #059669; }
              .title { font-size: 22px; font-weight: 700; color: #0f172a; margin-top: 5px; }
              .meta { font-size: 13px; color: #64748b; }
              .badge { display: inline-block; padding: 4px 12px; background: #e6f4ea; color: #047857; font-weight: 700; border-radius: 20px; font-size: 12px; }
              .section { margin-bottom: 30px; }
              .section-title { font-size: 16px; font-weight: 700; color: #047857; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th, td { padding: 10px; text-align: left; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
              th { background: #f8fafc; font-weight: 600; color: #475569; }
              .footer { margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; color: #94a3b8; text-align: center; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <div class="logo">🌿 EcoSphere ESG Platform</div>
                <div class="title">${title}</div>
              </div>
              <div style="text-align: right;">
                <span class="badge">${framework} Standard</span>
                <div class="meta" style="margin-top: 6px;">Period: ${period} | Date: ${new Date().toLocaleDateString()}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Executive Summary</div>
              <p>Overall ESG Performance Score: <strong>72/100 (Grade A)</strong> — Fully compliant with ${framework} sustainability reporting standards for ${period}.</p>
            </div>

            ${includeEnv ? `
            <div class="section">
              <div class="section-title">🌿 Environmental Performance Metrics</div>
              <table>
                <thead>
                  <tr><th>Metric Name</th><th>Measured Value</th><th>Target</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>Total GHG Emissions</td><td>3,280 tCO₂e</td><td>3,570 tCO₂e</td><td>↓ 8.2% (On Track)</td></tr>
                  <tr><td>Renewable Energy Share</td><td>46.9% (1,850 MWh)</td><td>60.0%</td><td>↑ 12.5% (In Progress)</td></tr>
                  <tr><td>Water Consumption</td><td>128,000 m³</td><td>134,000 m³</td><td>↓ 4.6% (On Track)</td></tr>
                  <tr><td>Waste Recycled Share</td><td>67.3%</td><td>80.0%</td><td>↑ 6.8% (In Progress)</td></tr>
                </tbody>
              </table>
            </div>` : ''}

            ${includeSoc ? `
            <div class="section">
              <div class="section-title">👥 Social Metrics</div>
              <table>
                <thead>
                  <tr><th>Metric Name</th><th>Measured Value</th><th>Target</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>Total Workforce</td><td>2,847 employees</td><td>3,000</td><td>↑ 3.1% (On Track)</td></tr>
                  <tr><td>Women in Leadership</td><td>38.0%</td><td>40.0%</td><td>Near Target</td></tr>
                  <tr><td>Avg Training Hours</td><td>42 hrs / employee</td><td>40 hrs</td><td>Target Achieved</td></tr>
                </tbody>
              </table>
            </div>` : ''}

            ${includeGov ? `
            <div class="section">
              <div class="section-title">⚖️ Governance & Compliance</div>
              <table>
                <thead>
                  <tr><th>Metric Name</th><th>Measured Value</th><th>Target</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>Regulatory Compliance Rate</td><td>94.2%</td><td>98.0%</td><td>Review Needed</td></tr>
                  <tr><td>Active Corporate Policies</td><td>7 policies</td><td>7 policies</td><td>Target Achieved</td></tr>
                  <tr><td>Ethics Training Coverage</td><td>87.0%</td><td>100.0%</td><td>In Progress</td></tr>
                </tbody>
              </table>
            </div>` : ''}

            <div class="footer">
              EcoSphere ESG Management System — Verified Report Document — Page 1 of 1
            </div>
            <script>
              window.onload = function() {
                window.print();
              }
            </script>
          </body>
          </html>
        `
        printWindow.document.write(htmlContent)
        printWindow.document.close()

        setExporting(false)
        setSuccess('PDF report window opened! Select "Save as PDF" to save file.')
        setTimeout(() => { setSuccess(''); onClose(); }, 2000)
        return
      }

      if (format === 'csv') {
        mimeType = 'text/csv;charset=utf-8;'
        ext = 'csv'
        content = `Pillar,Metric,Value,Unit,Target,Status,Period\n`
        if (includeEnv) {
          content += `Environmental,Total Emissions,3280,tCO2e,3570,On Track,${period}\n`
          content += `Environmental,Renewable Energy Share,46.9,%,60,In Progress,${period}\n`
          content += `Environmental,Water Usage,128000,m3,134000,On Track,${period}\n`
          content += `Environmental,Waste Recycled,67.3,%,80,In Progress,${period}\n`
        }
        if (includeSoc) {
          content += `Social,Total Employees,2847,count,3000,On Track,${period}\n`
          content += `Social,Women in Leadership,38,%,40,Near Target,${period}\n`
          content += `Social,Avg Training per Employee,42,hours,40,Achieved,${period}\n`
        }
        if (includeGov) {
          content += `Governance,Compliance Rate,94.2,%,98,Review Needed,${period}\n`
          content += `Governance,Active Policies,7,count,7,Achieved,${period}\n`
          content += `Governance,Ethics Training Coverage,87,%,100,In Progress,${period}\n`
        }
      } else if (format === 'json') {
        mimeType = 'application/json'
        ext = 'json'
        const data = {
          title,
          framework,
          period,
          generatedAt: new Date().toISOString(),
          overallScore: 72,
          rating: 'A',
          pillars: {
            environmental: includeEnv ? { score: 78, emissions: '3,280 tCO2e', renewableEnergy: '46.9%', waterUsage: '128K m3', wasteRecycled: '67.3%' } : null,
            social: includeSoc ? { score: 72, totalEmployees: 2847, womenInLeadership: '38%', avgTrainingHours: '42h' } : null,
            governance: includeGov ? { score: 65, complianceRate: '94.2%', activePolicies: 7, ethicsTraining: '87%' } : null,
          }
        }
        content = JSON.stringify(data, null, 2)
      } else {
        mimeType = 'text/markdown;charset=utf-8;'
        ext = 'md'
        content = `# ${title}\n`
        content += `**Framework:** ${framework} | **Period:** ${period} | **Export Date:** ${new Date().toLocaleDateString()}\n\n`
        content += `## Executive Summary\n`
        content += `- **Overall ESG Score:** 72/100 (Grade A)\n`
        content += `- **Reporting Status:** Fully Compliant\n\n`
        if (includeEnv) {
          content += `### 🌿 Environmental Performance\n`
          content += `- Total Emissions: 3,280 tCO2e (↓ 8.2% vs last quarter)\n`
          content += `- Renewable Energy Share: 46.9% (1,850 MWh renewable)\n`
          content += `- Water Usage: 128,000 m3\n`
          content += `- Waste Recycled: 67.3% (Target: 80%)\n\n`
        }
        if (includeSoc) {
          content += `### 👥 Social Metrics\n`
          content += `- Total Workforce: 2,847 employees\n`
          content += `- Female Leadership: 38%\n`
          content += `- Training Hours: 42 hours/employee\n\n`
        }
        if (includeGov) {
          content += `### ⚖️ Governance & Compliance\n`
          content += `- Compliance Rate: 94.2%\n`
          content += `- Active Corporate Policies: 7\n`
          content += `- Ethics Training Coverage: 87%\n\n`
        }
      }

      // Download file blob
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${ext}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setExporting(false)
      setSuccess(`Exported report file successfully as .${ext}!`)
      setTimeout(() => {
        setSuccess('')
        onClose()
      }, 1500)
    }, 500)
  }

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 540 }}>
        <div className="modal-header">
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📥</span> Export ESG Report
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleExport}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {success && (
              <div className="alert-banner success">
                <span>✅</span> {success}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="export-title">Report Title</label>
              <input
                id="export-title"
                className="form-input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid-2" style={{ gap: 'var(--space-3)' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="export-framework">Framework Standard</label>
                <select id="export-framework" className="form-select" value={framework} onChange={e => setFramework(e.target.value)}>
                  <option value="GRI">GRI (Global Reporting Initiative)</option>
                  <option value="TCFD">TCFD (Climate Disclosures)</option>
                  <option value="SASB">SASB Industry Standards</option>
                  <option value="CDP">CDP Disclosure</option>
                  <option value="GHG Protocol">GHG Protocol</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="export-period">Reporting Period</label>
                <select id="export-period" className="form-select" value={period} onChange={e => setPeriod(e.target.value)}>
                  <option value="Q3 2026">Q3 2026 (Latest)</option>
                  <option value="Q2 2026">Q2 2026</option>
                  <option value="YTD 2026">Year-to-Date 2026</option>
                  <option value="Annual 2025">Annual 2025</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Export Format</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                {[
                  ['pdf', '📕 PDF Document', 'Opens in Adobe Acrobat / Print'],
                  ['csv', '📊 Excel / CSV', 'Opens in Microsoft Excel'],
                  ['md', '📄 Text Summary', 'Opens in Notepad / Word'],
                  ['json', '⚙️ Raw JSON', 'Structured API format'],
                ].map(([f, label, sub]) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormat(f)}
                    style={{
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid',
                      borderColor: format === f ? 'var(--color-primary)' : 'var(--border-subtle)',
                      background: format === f ? 'rgba(74, 222, 128, 0.12)' : 'var(--bg-700)',
                      color: format === f ? 'var(--color-primary)' : 'var(--text-secondary)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>{label}</div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>{sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Included ESG Pillars</label>
              <div style={{ display: 'flex', gap: 'var(--space-4)', background: 'var(--bg-700)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', cursor: 'pointer', color: 'var(--color-env)' }}>
                  <input type="checkbox" checked={includeEnv} onChange={e => setIncludeEnv(e.target.checked)} /> 🌿 Environmental
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', cursor: 'pointer', color: 'var(--color-soc)' }}>
                  <input type="checkbox" checked={includeSoc} onChange={e => setIncludeSoc(e.target.checked)} /> 👥 Social
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', cursor: 'pointer', color: 'var(--color-gov)' }}>
                  <input type="checkbox" checked={includeGov} onChange={e => setIncludeGov(e.target.checked)} /> ⚖️ Governance
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button id="modal-export-download-btn" type="submit" className="btn btn-primary" disabled={exporting}>
              {exporting ? <><div className="spinner" style={{ width: 14, height: 14 }} /> Exporting…</> : format === 'pdf' ? '🖨️ Generate PDF Report' : '📥 Download Report File'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
