import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import NotificationModal, { INITIAL_NOTIFICATIONS } from '../modals/NotificationModal'
import HelpModal from '../modals/HelpModal'

export default function Layout() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [showNotificationsModal, setShowNotificationsModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header
          onNotificationClick={() => setShowNotificationsModal(true)}
          onHelpClick={() => setShowHelpModal(true)}
          unreadCount={unreadCount}
        />
        <main className="page-wrapper">
          <Outlet />
        </main>
      </div>

      {/* Global Modals accessible from Header */}
      <NotificationModal
        isOpen={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
        notifications={notifications}
        setNotifications={setNotifications}
      />

      <HelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </div>
  )
}
