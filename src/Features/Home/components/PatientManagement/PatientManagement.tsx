import { ArrowLeft, Eye, Pencil, Plus } from "lucide-react";
import { useState } from "react";

import {
  SectionTitle,
  StyledTable,
  TableDataCell,
  TableHeadCell,
  TableRow,
} from "../../screens/Dashboard/Dashboard.style";
import {
  ActionIconButton,
  AddButton,
  BackButton,
  CancelButton,
  DepartmentHeader,
  EntriesControl,
  FieldGroup,
  FieldLabel,
  FormActions,
  FormFields,
  FormGrid,
  FormPanel,
  HeaderLeft,
  PageButton,
  Pagination,
  SearchGroup,
  SearchInput,
  SelectInput,
  SmallSelect,
  TabBar,
  TabButton,
  TableScroll,
  TextInput,
  Toolbar,
} from "../DepartmentList/DepartmentList.Style";

type PatientStatus = "Active" | "Follow-up" | "Discharged";

type Patient = {
  id: number;
  name: string;
  phone: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  lastVisit: string;
  assignedDoctor: string;
  status: PatientStatus;
};

const patients: Patient[] = [
  {
    id: 1,
    name: "Suresh Yadav",
    phone: "9876543201",
    age: 42,
    gender: "Male",
    lastVisit: "2026-05-13",
    assignedDoctor: "Dr. Anil Mehta",
    status: "Active",
  },
  {
    id: 2,
    name: "Meena Verma",
    phone: "9123456702",
    age: 35,
    gender: "Female",
    lastVisit: "2026-05-13",
    assignedDoctor: "Dr. Neha Sharma",
    status: "Follow-up",
  },
  {
    id: 3,
    name: "Ravi Patel",
    phone: "9012345678",
    age: 51,
    gender: "Male",
    lastVisit: "2026-05-10",
    assignedDoctor: "Dr. Anil Mehta",
    status: "Discharged",
  },
  {
    id: 4,
    name: "Pooja Mishra",
    phone: "9876501234",
    age: 29,
    gender: "Female",
    lastVisit: "2026-05-12",
    assignedDoctor: "Dr. Neha Sharma",
    status: "Active",
  },
];

const patientStatuses: PatientStatus[] = ["Active", "Follow-up", "Discharged"];

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const PatientManagement = () => {
  const [view, setView] = useState<"list" | "add">("list");
  const [selectedStatus, setSelectedStatus] = useState<PatientStatus>("Active");
  const [searchText, setSearchText] = useState("");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.status === selectedStatus &&
      patient.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (view === "add") {
    return (
      <FormPanel>
        <DepartmentHeader>
          <HeaderLeft>
            <BackButton onClick={() => setView("list")} title="Back">
              <ArrowLeft size={16} />
            </BackButton>
            <SectionTitle>Add Patient</SectionTitle>
          </HeaderLeft>
        </DepartmentHeader>

        <FormGrid onSubmit={(event) => event.preventDefault()}>
          <FormFields>
            <FieldGroup>
              <FieldLabel>Patient Name</FieldLabel>
              <TextInput placeholder="Patient name" />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Phone Number</FieldLabel>
              <TextInput placeholder="Phone number" />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Age</FieldLabel>
              <TextInput type="number" placeholder="Age" />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Gender</FieldLabel>
              <SelectInput defaultValue="">
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </SelectInput>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Assigned Doctor</FieldLabel>
              <SelectInput defaultValue="">
                <option value="" disabled>
                  Select doctor
                </option>
                <option value="Dr. Anil Mehta">Dr. Anil Mehta</option>
                <option value="Dr. Neha Sharma">Dr. Neha Sharma</option>
              </SelectInput>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Status</FieldLabel>
              <SelectInput defaultValue="Active">
                {patientStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </SelectInput>
            </FieldGroup>

            <FormActions>
              <CancelButton type="button" onClick={() => setView("list")}>
                Cancel
              </CancelButton>
              <AddButton type="submit">
                <Plus size={14} />
                Save
              </AddButton>
            </FormActions>
          </FormFields>
        </FormGrid>
      </FormPanel>
    );
  }

  return (
    <>
      <DepartmentHeader>
        <SectionTitle>Patient Management</SectionTitle>
      </DepartmentHeader>

      <Toolbar>
        <EntriesControl>
          Shows
          <SmallSelect defaultValue="10">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </SmallSelect>
          entries
        </EntriesControl>

        <SearchGroup>
          Search
          <SearchInput
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </SearchGroup>
      </Toolbar>

      <TabBar>
        {patientStatuses.map((status) => (
          <TabButton
            key={status}
            $active={selectedStatus === status}
            onClick={() => setSelectedStatus(status)}
          >
            {status}
          </TabButton>
        ))}
        <AddButton onClick={() => setView("add")} style={{ marginLeft: "auto" }}>
          <Plus size={14} />
          Add Patient
        </AddButton>
      </TabBar>

      <TableScroll>
        <StyledTable>
          <thead>
            <tr>
              <TableHeadCell>Patient Name</TableHeadCell>
              <TableHeadCell>Phone No</TableHeadCell>
              <TableHeadCell>Age / Gender</TableHeadCell>
              <TableHeadCell>Last Visit</TableHeadCell>
              <TableHeadCell>Assigned Doctor</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableDataCell>{patient.name}</TableDataCell>
                <TableDataCell>{patient.phone}</TableDataCell>
                <TableDataCell>
                  {patient.age} / {patient.gender}
                </TableDataCell>
                <TableDataCell>{formatDate(patient.lastVisit)}</TableDataCell>
                <TableDataCell>{patient.assignedDoctor}</TableDataCell>
                <TableDataCell>{patient.status}</TableDataCell>
                <TableDataCell>
                  <ActionIconButton
                    title="View patient"
                    onClick={() => alert(`View ${patient.name}`)}
                  >
                    <Eye size={16} />
                  </ActionIconButton>
                  <ActionIconButton
                    title="Edit patient"
                    onClick={() => alert(`Edit ${patient.name}`)}
                  >
                    <Pencil size={16} />
                  </ActionIconButton>
                </TableDataCell>
              </TableRow>
            ))}
            {filteredPatients.length === 0 && (
              <TableRow>
                <TableDataCell colSpan={7}>No patients found.</TableDataCell>
              </TableRow>
            )}
          </tbody>
        </StyledTable>
      </TableScroll>

      <Pagination>
        <PageButton>Previous</PageButton>
        <PageButton $active>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>Next</PageButton>
      </Pagination>
    </>
  );
};

export default PatientManagement;
