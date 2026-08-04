import React, { useMemo, useState } from "react"
import {
  DoctorBookButton,
  DoctorCard,
  DoctorCardSpecialties,
  DoctorDetails,
  DoctorHeader,
  DoctorHeaderContent,
  DoctorHeaderTitle,
  DoctorList,
  DoctorPhoto,
  DoctorRating,
  DoctorSearchBox,
  DoctorSearchInput,
  DoctorSummary,
  ResultBackButton,
} from "../HomeStyle"
import { doctors } from "./doctorData"
import type { Doctor } from "./doctorData"

type DoctorResultsProps = {
  department?: string
  initialSearch: string
  onBack: () => void
  onSelectDoctor: (doctor: Doctor) => void
}

const DoctorResults = ({ department, initialSearch, onBack, onSelectDoctor }: DoctorResultsProps) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const visibleDoctors = useMemo(
    () =>
      doctors.filter(
        (doctor) =>
          (!department || doctor.departments.includes(department)) &&
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [department, searchTerm]
  )
  const heading = department === "General Checkup" ? "General Physicians" : department ? `${department} doctors` : "Find your doctor"

  return (
    <DoctorList>
      <DoctorHeader>
        <DoctorHeaderContent>
          <ResultBackButton type="button" onClick={onBack} aria-label="Back to home">←</ResultBackButton>
          <DoctorHeaderTitle>{heading}</DoctorHeaderTitle>
          <DoctorSearchBox>
            <span aria-hidden="true">⌕</span>
            <DoctorSearchInput
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search doctor by name"
              aria-label="Search doctor by name"
            />
          </DoctorSearchBox>
        </DoctorHeaderContent>
      </DoctorHeader>

      <DoctorSummary>{visibleDoctors.length} doctor{visibleDoctors.length === 1 ? "" : "s"} available</DoctorSummary>
      <DoctorDetails>
        {visibleDoctors.map((doctor) => (
          <DoctorCard key={doctor.name}>
            <DoctorPhoto src={doctor.image} alt={doctor.name} />
            <DoctorRating>4.8 ★</DoctorRating>
            <div>
              <h2>{doctor.name}</h2>
              <p>{doctor.specialty}</p>
              <DoctorCardSpecialties>
                <strong>Speciality</strong>
                <span>{doctor.departments.join("  ·  ")}</span>
                <span>{doctor.experience} · Consultation {doctor.fee}</span>
              </DoctorCardSpecialties>
              <DoctorBookButton type="button" onClick={() => onSelectDoctor(doctor)}>View detail</DoctorBookButton>
            </div>
          </DoctorCard>
        ))}
        {!visibleDoctors.length && <DoctorSummary>No doctor found with this name.</DoctorSummary>}
      </DoctorDetails>
    </DoctorList>
  )
}

export default DoctorResults
