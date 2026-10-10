import { useState } from 'react'

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Carbon Report Q3 Ready',
    message: 'Q3 Carbon emissions report has been auto-generated and saved to Reports.',
    time: '10 min ago',
    type: 'success',
    read: false,
    icon: '🍃'
  },
  {
    id: 2,
    title: 'Water Usage Limit Exceeded',
    message: 'Monthly water consumption reached 128K m³, exceeding target by 4.2%.',
    time: '1 hour ago',
    type: 'warning',
    read: false,
    icon: '💧'
  },
  {
    id: 3,
    title: 'Renewable Energy Target Reached',
    message: 'Renewable energy share reached 46.9% for current quarter (Target: 60%).',
    time: '4 hours ago',
    type: 'info',
    read: false,
    icon: '⚡'
  },
  {
    id: 4,
    title: 'ISO 14001 Compliance Audit',
    message: 'Upcoming compliance check scheduled for November 15, 2026.',
    time: '1 day ago',
    type: 'info',
    read: true,
    icon: '📋'
  },
  {
    id: 5,
    title: 'Board Diversity Data Updated',
    message: 'Social & Governance metrics for female leadership updated to 38%.',
    time: '2 days ago',
    type: 'success',
    read: true,
    icon: '👥'
  }
]

export default function NotificationModal({ isOpen, onClose, notifications, setNotifications }) {
  const [filter, setFilter] = useState('all')

  if (!isOpen) return null

  const unreadCount = notifications.filter(n => !n.read).length
  const filteredList = filter === 'unread' ? notifications.filter(n => !n.read) : notifications

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const toggleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n))
  }

  const removeNotification = (id, e) => {
    e.stopPropagation()
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 560 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔔</span> Notifications
            </div>
            {unreadCount > 0 && (
              <span className="badge badge-danger" style={{ borderRadius: 'var(--radius-full)', padding: '2px 8px', fontSize: '0.72rem' }}>
                {unreadCount} unread
              </span>
            )}
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Filter bar */}
        <div style={{ padding: 'var(--space-3) var(--space-6)', background: 'var(--bg-700)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <button
              className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter('all')}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              All ({notifications.length})
            </button>
            <button
              className={`btn btn-sm ${filter === 'unread' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter('unread')}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              Unread ({unreadCount})
            </button>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {unreadCount > 0 && (
              <button className="btn btn-ghost btn-sm" onClick={markAllRead} style={{ fontSize: '0.75rem' }}>
                ✓ Mark all as read
              </button>
            )}
            {notifications.length > 0 && (
              <button className="btn btn-ghost btn-sm" onClick={clearAll} style={{ fontSize: '0.75rem', color: 'var(--color-danger)' }}>
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ maxHeight: '380px', overflowY: 'auto', padding: 'var(--space-4) var(--space-6)' }}>
          {filteredList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>🎉</div>
              <div style={{ fontWeight: 600 }}>No notifications</div>
              <div style={{ fontSize: '0.8rem' }}>You're all caught up!</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {filteredList.map(n => (
                <div
                  key={n.id}
                  onClick={() => toggleRead(n.id)}
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    background: n.read ? 'var(--bg-card)' : 'rgba(74, 222, 128, 0.06)',
                    border: '1px solid',
                    borderColor: n.read ? 'var(--border-subtle)' : 'rgba(74, 222, 128, 0.2)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-3)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span style={{ fontSize: '1.25rem', marginTop: 2, flexShrink: 0 }}>{n.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                      <span style={{ fontWeight: n.read ? 600 : 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                        {n.title}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', flexShrink: 0, marginLeft: 8 }}>
                        {n.time}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                      {n.message}
                    </p>
                  </div>
                  <button
                    onClick={(e) => removeNotification(n.id, e)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px 4px', fontSize: '0.85rem' }}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary btn-sm btn-full" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
export { INITIAL_NOTIFICATIONS }
