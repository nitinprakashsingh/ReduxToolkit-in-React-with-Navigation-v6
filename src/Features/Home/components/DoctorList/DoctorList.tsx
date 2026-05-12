import { CalendarCheck, ListChecks, Pencil } from "lucide-react";

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
} from "./DoctorList.Style";

type Doctor = {
  id: number;
  name: string;
  speciality: string;
  phone: string;
  email: string;
  registrationNumber: string;
  consultancyFees: string;
};

type DoctorListProps = {
  doctors: Doctor[];
  onAddSchedule: () => void;
};

const DoctorList = ({ doctors, onAddSchedule }: DoctorListProps) => {
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

      <StyledTable>
        <thead>
          <tr>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Speciality</TableHeadCell>
            <TableHeadCell>Phone No</TableHeadCell>
            <TableHeadCell>Email ID</TableHeadCell>
            <TableHeadCell>Registration No</TableHeadCell>
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
              <TableDataCell>Rs. {doctor.consultancyFees}</TableDataCell>
              <TableDataCell>
                <EditButton onClick={() => alert(`Edit ${doctor.name}`)}>
                  <Pencil size={16} />
                  Edit
                </EditButton>
              </TableDataCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
};

export default DoctorList;

