import React from "react"
import {
  AppointmentsBackButton,
  AppointmentsCard,
  AppointmentsCardActions,
  AppointmentsEmpty,
  AppointmentsHeader,
  AppointmentsList,
  AppointmentsPhoto,
  AppointmentStatus,
} from "../HomeStyle"

export type Appointment = {
  id: string
  doctorName: string
  specialty: string
  image: string
  date: string
  slot: string
  fee: string
  status: "Confirmed" | "Rescheduled" | "Cancelled" | "Completed"
  bookingId: string
}

type AppointmentsProps = {
  appointments: Appointment[]
  onBack: () => void
  onCancel: (appointmentId: string) => void
  onReschedule: (appointmentId: string) => void
}

const Appointments = ({ appointments, onBack, onCancel, onReschedule }: AppointmentsProps) => (
  <AppointmentsList>
    <AppointmentsHeader>
      <AppointmentsBackButton type="button" onClick={onBack}>Back to home</AppointmentsBackButton>
      <h1>My appointments</h1>
      <p>View consultations, booking IDs, status, and appointment actions.</p>
    </AppointmentsHeader>
    <section>
      <h2>Upcoming appointments</h2>
      {appointments.length ? appointments.map((appointment) => (
        <AppointmentsCard key={appointment.id}>
          <AppointmentsPhoto src={appointment.image} alt={appointment.doctorName} />
          <div>
            <AppointmentStatus $status={appointment.status}>{appointment.status}</AppointmentStatus>
            <h3>{appointment.doctorName}</h3>
            <p>{appointment.specialty}</p>
            <strong>{appointment.date} - {appointment.slot}</strong>
            <span>Booking ID: {appointment.bookingId}</span>
            <span>Consultation fee: {appointment.fee}</span>
            <AppointmentsCardActions>
              <button type="button" onClick={() => onReschedule(appointment.id)} disabled={appointment.status === "Cancelled"}>
                Reschedule
              </button>
              <button type="button" onClick={() => onCancel(appointment.id)} disabled={appointment.status === "Cancelled"}>
                Cancel
              </button>
            </AppointmentsCardActions>
          </div>
        </AppointmentsCard>
      )) : <AppointmentsEmpty><h3>No upcoming appointments</h3><p>Your confirmed appointments will appear here.</p></AppointmentsEmpty>}
    </section>
  </AppointmentsList>
)

export default Appointments
