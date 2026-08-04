import React, { useState } from "react"
import type { Doctor } from "../DoctorResults/doctorData"
import {
  BookingBackButton,
  BookingBody,
  BookingChoice,
  BookingChoices,
  BookingConfirmButton,
  BookingDateButton,
  BookingDates,
  BookingDoctorCard,
  BookingDoctorPhoto,
  BookingField,
  BookingFields,
  BookingHeader,
  BookingPage,
  BookingSection,
  BookingSidebar,
  BookingSlot,
  BookingSlots,
  BookingSummaryFee,
  BookingSummaryTitle,
} from "../HomeStyle"

type AppointmentBookingProps = {
  doctor: Doctor
  onBack: () => void
}

const dates = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"]
const slots = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM"]

const AppointmentBooking = ({ doctor, onBack }: AppointmentBookingProps) => {
  const [bookingFor, setBookingFor] = useState<"self" | "other">("self")
  const [selectedDate, setSelectedDate] = useState(dates[1])
  const [selectedSlot, setSelectedSlot] = useState(slots[2])

  return (
    <BookingPage>
      <BookingHeader>
        <BookingBackButton type="button" onClick={onBack}>← Back to doctor profile</BookingBackButton>
        <h1>Book an appointment</h1>
        <p>Choose patient details and a convenient consultation time.</p>
      </BookingHeader>

      <BookingBody>
        <div>
          <BookingDoctorCard>
            <BookingDoctorPhoto src={doctor.image} alt={doctor.name} />
            <div>
              <span>Consultation with</span>
              <h2>{doctor.name}</h2>
              <p>{doctor.specialty} · {doctor.experience}</p>
            </div>
          </BookingDoctorCard>

          <BookingSection>
            <h2>Who is this appointment for?</h2>
            <BookingChoices>
              <BookingChoice type="button" $active={bookingFor === "self"} onClick={() => setBookingFor("self")}>For myself</BookingChoice>
              <BookingChoice type="button" $active={bookingFor === "other"} onClick={() => setBookingFor("other")}>For someone else</BookingChoice>
            </BookingChoices>
            <BookingFields>
              <BookingField><label>Patient name</label><input defaultValue={bookingFor === "self" ? "Your name" : ""} placeholder="Enter patient name" /></BookingField>
              <BookingField><label>Age</label><input type="number" placeholder="Age" /></BookingField>
              <BookingField><label>Gender</label><select defaultValue=""><option value="" disabled>Select gender</option><option>Female</option><option>Male</option><option>Prefer not to say</option></select></BookingField>
              <BookingField $wide><label>Concern (optional)</label><textarea placeholder="Briefly describe your concern" /></BookingField>
            </BookingFields>
          </BookingSection>

          <BookingSection>
            <h2>Select date and time</h2>
            <h3>Available dates</h3>
            <BookingDates>
              {dates.map((date) => <BookingDateButton key={date} type="button" $active={selectedDate === date} onClick={() => setSelectedDate(date)}>{date}</BookingDateButton>)}
            </BookingDates>
            <h3>Available time slots</h3>
            <BookingSlots>
              {slots.map((slot) => <BookingSlot key={slot} type="button" $active={selectedSlot === slot} onClick={() => setSelectedSlot(slot)}>{slot}</BookingSlot>)}
            </BookingSlots>
          </BookingSection>
        </div>

        <BookingSidebar>
          <BookingSummaryTitle>Appointment summary</BookingSummaryTitle>
          <p><span>Doctor</span><strong>{doctor.name}</strong></p>
          <p><span>Date</span><strong>{selectedDate}</strong></p>
          <p><span>Time</span><strong>{selectedSlot}</strong></p>
          <BookingSummaryFee>Consultation fee <strong>{doctor.fee}</strong></BookingSummaryFee>
          <BookingConfirmButton type="button">Confirm appointment</BookingConfirmButton>
        </BookingSidebar>
      </BookingBody>
    </BookingPage>
  )
}

export default AppointmentBooking
