import { CalendarCheck, ListChecks, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import {
  EditButton,
  SectionTitle,
  StyledTable,
  TableDataCell,
  TableHeadCell,
  TableRow,
} from "../../screens/Dashboard/Dashboard.style";
import {
  ActionBar,
  ActionButton,
  DoctorHeader,
  HelperText,
  StatusText,
} from "./DoctorList.Style";
import { fetchDoctorsApi, type Doctor } from "../DoctorForm/doctorApi";

type DoctorListProps = {
  onAddSchedule: () => void;
  onEditDoctor: (doctor: Doctor) => void;
};

const DoctorList = ({ onAddSchedule, onEditDoctor }: DoctorListProps) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDoctors = async () => {
      setIsLoading(true);
      setError("");

      try {
        const doctorList = await fetchDoctorsApi();
        setDoctors(doctorList);
      } catch (loadError: any) {
        setError(loadError?.response?.data?.message || "Unable to load doctor list.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDoctors();
  }, []);

  return (
    <>
      <DoctorHeader>
        <div>
          <SectionTitle>Doctor List</SectionTitle>
          <HelperText>Manage doctors, specialities, fees, and registration details.</HelperText>
        </div>
      </DoctorHeader>

      <ActionBar>
        <ActionButton $active>
          <ListChecks size={16} />
          Doctor List
        </ActionButton>
        <ActionButton onClick={onAddSchedule}>
          <CalendarCheck size={16} />
          Add Schedule
        </ActionButton>
      </ActionBar>

      {isLoading ? <StatusText>Loading doctors...</StatusText> : null}
      {error ? <StatusText $type="error">{error}</StatusText> : null}
      {!isLoading && !error && doctors.length === 0 ? (
        <StatusText $type="empty">No doctors found. Add a schedule to create the first doctor.</StatusText>
      ) : null}

      {doctors.length > 0 ? (
        <StyledTable>
          <thead>
            <tr>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Speciality</TableHeadCell>
              <TableHeadCell>Phone No</TableHeadCell>
              <TableHeadCell>Email ID</TableHeadCell>
              <TableHeadCell>Registration No</TableHeadCell>
              <TableHeadCell>Schedule</TableHeadCell>
              <TableHeadCell>Fees</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableDataCell>{doctor.name}</TableDataCell>
                <TableDataCell>{doctor.speciality}</TableDataCell>
                <TableDataCell>{doctor.phone}</TableDataCell>
                <TableDataCell>{doctor.email}</TableDataCell>
                <TableDataCell>{doctor.registrationNumber}</TableDataCell>
                <TableDataCell>
                  {doctor.availableDays}, {doctor.startTime} - {doctor.endTime}
                </TableDataCell>
                <TableDataCell>Rs. {doctor.consultancyFees}</TableDataCell>
                <TableDataCell>
                  <EditButton onClick={() => onEditDoctor(doctor)}>
                    <Pencil size={16} />
                    Edit
                  </EditButton>
                </TableDataCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      ) : null}
    </>
  );
};

export default DoctorList;

