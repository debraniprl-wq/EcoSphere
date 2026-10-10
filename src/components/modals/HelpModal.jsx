import { useState } from 'react'

const HELP_SECTIONS = [
  {
    id: 'quickstart',
    title: '🚀 Quick Start',
    icon: '🚀',
    content: [
      {
        q: '1. Log your ESG performance metrics',
        a: 'Navigate to "Data Entry" in the sidebar to enter quarterly or annual data for Environmental, Social, and Governance pillars.'
      },
      {
        q: '2. Track progress on ESG Goals',
        a: 'Visit "Goals & Targets" to manage commitments such as Net Zero, Zero Waste to Landfill, and Diversity targets.'
      },
      {
        q: '3. Generate & Export Compliance Reports',
        a: 'Go to "Reports" or click "Export Report" on the Dashboard to export standard frameworks like GRI, TCFD, SASB, or CDP.'
      },
      {
        q: '4. View ESG Scores & Breakdown',
        a: 'The Dashboard displays real-time score rings for overall ESG rating as well as individual Environmental, Social, and Governance breakdowns.'
      }
    ]
  },
  {
    id: 'frameworks',
    title: '📖 ESG Frameworks',
    icon: '📖',
    content: [
      {
        q: 'GRI (Global Reporting Initiative)',
        a: 'The gold standard for ESG sustainability reporting. Covers economic, environmental, and social impact metrics.'
      },
      {
        q: 'TCFD (Task Force on Climate-related Financial Disclosures)',
        a: 'Focuses on financial risks and opportunities related to climate change across Governance, Strategy, Risk Management, and Metrics.'
      },
      {
        q: 'SASB (Sustainability Accounting Standards Board)',
        a: 'Industry-specific standards identifying financially material ESG issues for investors.'
      },
      {
        q: 'CDP (Carbon Disclosure Project)',
        a: 'Global disclosure system for environmental impact focusing on Climate Change, Water Security, and Forests.'
      },
      {
        q: 'GHG Protocol',
        a: 'The most widely recognized international accounting standard for greenhouse gas emissions (Scope 1, Scope 2, Scope 3).'
      }
    ]
  },
  {
    id: 'faq',
    title: '❓ Frequently Asked Questions',
    icon: '❓',
    content: [
      {
        q: 'How is the overall ESG Score calculated?',
        a: 'EcoSphere computes a weighted average of Environmental (40%), Social (35%), and Governance (25%) metrics normalized on a 0–100 scale.'
      },
      {
        q: 'What is the difference between Scope 1 and Scope 2 emissions?',
        a: 'Scope 1 emissions are direct GHG emissions from owned or controlled sources (e.g. boilers, fleet vehicles). Scope 2 emissions are indirect GHG emissions from purchased electricity, steam, heating, and cooling.'
      },
      {
        q: 'Can I connect EcoSphere to external databases?',
        a: 'Yes, EcoSphere uses Supabase for live data storage. You can configure custom database tables in Settings.'
      },
      {
        q: 'How do I export data in CSV or PDF formats?',
        a: 'Click "Export Report" on the Dashboard or download directly from the Reports page to generate CSV datasets or formatted reports.'
      }
    ]
  },
  {
    id: 'shortcuts',
    title: '⚡ Tips & Shortcuts',
    icon: '⚡',
    content: [
      {
        q: 'Quick Navigation',
        a: 'Click any metric card or progress bar on the Dashboard to jump straight to that pillar’s detailed breakdown.'
      },
      {
        q: 'Data Validation',
        a: 'All metric values are automatically formatted and verified against industry averages before saving.'
      },
      {
        q: 'Support & Inquiries',
        a: 'Need technical assistance or custom framework integration? Contact our support team at support@ecosphere.esg'
      }
    ]
  }
]

export default function HelpModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('quickstart')
  const [search, setSearch] = useState('')

  if (!isOpen) return null

  const activeSection = HELP_SECTIONS.find(s => s.id === activeTab) || HELP_SECTIONS[0]
  
  const filteredContent = activeSection.content.filter(item => 
    !search || 
    item.q.toLowerCase().includes(search.toLowerCase()) || 
    item.a.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 640 }}>
        <div className="modal-header">
          <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>❓</span> EcoSphere Help & Documentation
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Search */}
        <div style={{ padding: 'var(--space-4) var(--space-6) var(--space-2)', background: 'var(--bg-700)' }}>
          <div className="form-input-icon">
            <span className="input-icon">🔍</span>
            <input
              className="form-input"
              placeholder="Search help topics, frameworks, or FAQs…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'var(--bg-card)' }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs" style={{ padding: 'var(--space-2) var(--space-6)', marginBottom: 0, borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-700)' }}>
          {HELP_SECTIONS.map(s => (
            <button
              key={s.id}
              className={`tab-btn ${activeTab === s.id ? 'active' : ''}`}
              onClick={() => setActiveTab(s.id)}
              style={{ fontSize: '0.78rem', padding: '6px 12px' }}
            >
              {s.icon} {s.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {filteredContent.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 'var(--space-6)' }}>
                No results found matching "{search}".
              </div>
            ) : (
              filteredContent.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-700)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>
                    {item.q}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item.a}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            EcoSphere ESG Knowledge Base v2.4
          </span>
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  )
}
