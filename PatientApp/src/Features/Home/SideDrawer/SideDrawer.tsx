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
  onSignOut?: () => void
  onPaymentMethods?: () => void
  onAppointments?: () => void
}

const SideDrawer = ({ onClose, onSignOut, onPaymentMethods, onAppointments }: SideDrawerProps) => {
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
          <DrawerNavItem type="button">Home</DrawerNavItem>
          <DrawerNavItem type="button" onClick={openAppointments}>Appointments</DrawerNavItem>
          <DrawerNavItem type="button" onClick={openPaymentMethods}>Payment methods</DrawerNavItem>
          <DrawerNavItem type="button">Medical Records</DrawerNavItem>
          <DrawerNavItem type="button">Support</DrawerNavItem>
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
