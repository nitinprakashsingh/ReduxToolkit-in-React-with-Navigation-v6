import React from "react"
import {
  NotificationCard,
  NotificationsPage,
  ScreenBackButton,
  ScreenHeader,
  ScreenSection,
} from "../HomeStyle"

const notifications = [
  {
    title: "Appointment reminder",
    detail: "Your consultation with Dr. Aditi Sharma is tomorrow at 11:00 AM.",
    time: "Today, 8:30 AM",
  },
  {
    title: "Report uploaded",
    detail: "A demo blood test report is now available in Medical records.",
    time: "Yesterday, 6:10 PM",
  },
  {
    title: "Payment receipt ready",
    detail: "Your last appointment receipt can be downloaded from payment confirmation.",
    time: "12 Aug 2026",
  },
]

const Notifications = ({ onBack }: { onBack: () => void }) => (
  <NotificationsPage>
    <ScreenHeader>
      <ScreenBackButton type="button" onClick={onBack}>
        Back to home
      </ScreenBackButton>
      <h1>Notifications</h1>
      <p>Demo alerts for appointment reminders, report updates, payments, and hospital messages.</p>
    </ScreenHeader>

    <ScreenSection>
      {notifications.map((notification) => (
        <NotificationCard key={notification.title}>
          <span>{notification.time}</span>
          <h2>{notification.title}</h2>
          <p>{notification.detail}</p>
        </NotificationCard>
      ))}
    </ScreenSection>
  </NotificationsPage>
)

export default Notifications
