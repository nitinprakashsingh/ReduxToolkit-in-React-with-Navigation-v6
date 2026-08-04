import React from "react"
import type { Doctor } from "../DoctorResults/doctorData"
import { doctors } from "../DoctorResults/doctorData"
import {
  DetailBackButton,
  DetailBookingCard,
  DetailBookingFee,
  DetailBookingHint,
  DetailBookingTitle,
  DetailContent,
  DetailFact,
  DetailFacts,
  DetailHeader,
  DetailIdentity,
  DetailMain,
  DetailPhoto,
  DetailSpeciality,
  DetailSpecialityTags,
  DetailSubheading,
  DetailTitle,
  DetailTopbar,
  DoctorBookButton,
  RelatedDoctorCard,
  RelatedDoctorGrid,
  RelatedDoctorSection,
} from "../HomeStyle"

type DoctorDetailProps = {
  doctor: Doctor
  onBack: () => void
  onSelectDoctor: (doctor: Doctor) => void
  onBookAppointment: (doctor: Doctor) => void
}

const DoctorDetail = ({ doctor, onBack, onSelectDoctor, onBookAppointment }: DoctorDetailProps) => {
  const specialityTags = [doctor.specialty, ...doctor.departments, "Patient care"]
  const relatedDoctors = doctors.filter(
    (candidate) => candidate.name !== doctor.name && candidate.departments.some((department) => doctor.departments.includes(department))
  )

  return (
    <DetailMain>
      <DetailTopbar>
        <DetailBackButton type="button" onClick={onBack}>← Back to doctors</DetailBackButton>
      </DetailTopbar>

      <DetailHeader>
        <DetailContent>
          <DetailPhoto src={doctor.image} alt={doctor.name} />
          <DetailIdentity>
            <p>{doctor.departments[0]}</p>
            <DetailTitle>{doctor.name}</DetailTitle>
            <DetailSubheading>{doctor.specialty}</DetailSubheading>
            <span>Available for consultation at our hospital</span>
          </DetailIdentity>
        </DetailContent>
      </DetailHeader>

      <DetailContent>
        <section>
          <DetailFacts>
            <DetailFact><span>Experience</span><strong>{doctor.experience}</strong></DetailFact>
            <DetailFact><span>Availability</span><strong>Mon - Sat, 10 AM - 8 PM</strong></DetailFact>
            <DetailFact><span>Consultation fee</span><strong>{doctor.fee}</strong></DetailFact>
          </DetailFacts>

          <DetailSpeciality>
            <h2>Speciality</h2>
            <p>Consultation and treatment tailored to your health needs, with guidance from an experienced specialist.</p>
            <DetailSpecialityTags>
              {specialityTags.map((tag) => <span key={tag}>{tag}</span>)}
            </DetailSpecialityTags>
          </DetailSpeciality>

          {relatedDoctors.length > 0 && (
            <RelatedDoctorSection>
              <h2>More doctors in this department</h2>
              <RelatedDoctorGrid>
                {relatedDoctors.map((relatedDoctor) => (
                  <RelatedDoctorCard key={relatedDoctor.name} type="button" onClick={() => onSelectDoctor(relatedDoctor)}>
                    <img src={relatedDoctor.image} alt={relatedDoctor.name} />
                    <span>{relatedDoctor.specialty}</span>
                    <strong>{relatedDoctor.name}</strong>
                    <small>{relatedDoctor.experience} · {relatedDoctor.fee}</small>
                    <em>View profile →</em>
                  </RelatedDoctorCard>
                ))}
              </RelatedDoctorGrid>
            </RelatedDoctorSection>
          )}
        </section>

        <DetailBookingCard>
          <DetailBookingTitle>Book an appointment</DetailBookingTitle>
          <DetailBookingHint>Choose a convenient time slot in the next step.</DetailBookingHint>
          <DetailBookingFee>Consultation fee <strong>{doctor.fee}</strong></DetailBookingFee>
          <DoctorBookButton type="button" onClick={() => onBookAppointment(doctor)}>Book appointment</DoctorBookButton>
        </DetailBookingCard>
      </DetailContent>
    </DetailMain>
  )
}

export default DoctorDetail
