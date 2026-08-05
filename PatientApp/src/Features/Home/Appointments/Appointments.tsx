import React from "react"
import {
  AppointmentsBackButton,
  AppointmentsCard,
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
}

type AppointmentsProps = { appointments: Appointment[]; onBack: () => void }

const Appointments = ({ appointments, onBack }: AppointmentsProps) => (
  <AppointmentsList>
    <AppointmentsHeader>
      <AppointmentsBackButton type="button" onClick={onBack}>← Back to home</AppointmentsBackButton>
      <h1>My appointments</h1>
      <p>View your upcoming consultations at our hospital.</p>
    </AppointmentsHeader>
    <section>
      <h2>Upcoming appointments</h2>
      {appointments.length ? appointments.map((appointment) => (
        <AppointmentsCard key={appointment.id}>
          <AppointmentsPhoto src={appointment.image} alt={appointment.doctorName} />
          <div>
            <AppointmentStatus>Confirmed</AppointmentStatus>
            <h3>{appointment.doctorName}</h3>
            <p>{appointment.specialty}</p>
            <strong>{appointment.date} · {appointment.slot}</strong>
            <span>Consultation fee: {appointment.fee}</span>
          </div>
        </AppointmentsCard>
      )) : <AppointmentsEmpty><h3>No upcoming appointments</h3><p>Your confirmed appointments will appear here.</p></AppointmentsEmpty>}
    </section>
  </AppointmentsList>
)

export default Appointments
