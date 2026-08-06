import React from "react"
import {
  CloseDrawerButton,
  DrawerFooter,
  DrawerHeader,
  DrawerNav,
  DrawerNavItem,
  DrawerOverlay,
  DrawerSubtitle,
  DrawerTitle,
  SideDrawer as SideDrawerPanel,
  SignOutButton,
} from "../HomeStyle"

type SideDrawerProps = {
  onClose: () => void
  onHome?: () => void
  onSignOut?: () => void
  onPaymentMethods?: () => void
  onAppointments?: () => void
  onMedicalRecords?: () => void
  onSupport?: () => void
  onProfile?: () => void
  onNotifications?: () => void
}

const SideDrawer = ({ onClose, onHome, onSignOut, onPaymentMethods, onAppointments, onMedicalRecords, onSupport, onProfile, onNotifications }: SideDrawerProps) => {
  const handleSignOut = () => {
    onClose()
    onSignOut?.()
  }

  const openPaymentMethods = () => {
    onClose()
    onPaymentMethods?.()
  }

  const openAppointments = () => {
    onClose()
    onAppointments?.()
  }

  const openHome = () => {
    onClose()
    onHome?.()
  }

  const openProfile = () => {
    onClose()
    onProfile?.()
  }

  const openNotifications = () => {
    onClose()
    onNotifications?.()
  }

  const openMedicalRecords = () => {
    onClose()
    onMedicalRecords?.()
  }

  const openSupport = () => {
    onClose()
    onSupport?.()
  }

  return (
    <DrawerOverlay onClick={onClose}>
      <SideDrawerPanel onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Main menu">
        <DrawerHeader>
          <div>
            <DrawerTitle>Patient App</DrawerTitle>
            <DrawerSubtitle>Manage your care and appointments</DrawerSubtitle>
          </div>
          <CloseDrawerButton type="button" onClick={onClose} aria-label="Close menu">
            x
          </CloseDrawerButton>
        </DrawerHeader>

        <DrawerNav>
          <DrawerNavItem type="button" onClick={openHome}>Home</DrawerNavItem>
          <DrawerNavItem type="button" onClick={openProfile}>Patient Profile</DrawerNavItem>
          <DrawerNavItem type="button" onClick={openNotifications}>Notifications</DrawerNavItem>
          <DrawerNavItem type="button" onClick={openAppointments}>Appointments</DrawerNavItem>
          <DrawerNavItem type="button" onClick={openPaymentMethods}>Payment methods</DrawerNavItem>
          <DrawerNavItem type="button" onClick={openMedicalRecords}>Medical Records</DrawerNavItem>
          <DrawerNavItem type="button" onClick={openSupport}>Support</DrawerNavItem>
        </DrawerNav>

        <DrawerFooter>
          <SignOutButton type="button" onClick={handleSignOut}>
            Sign out
          </SignOutButton>
        </DrawerFooter>
      </SideDrawerPanel>
    </DrawerOverlay>
  )
}

export default SideDrawer
