import { ArrowLeft, Eye, Pencil, Plus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

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
import { createPatient, fetchPatients } from "../../../../api/patientApi";
import { fetchDoctorsApi, Doctor } from "../DoctorForm/doctorApi";

type PatientStatus = "Active" | "Follow-up" | "Discharged";

type Patient = {
  id: string;
  name: string;
  phone: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  lastVisit: string;
  assignedDoctor: string;
  status: PatientStatus;
  dob?: string;
};

const defaultPatients: Patient[] = [
  {
    id: "1",
    name: "Suresh Yadav",
    phone: "9876543201",
    age: 42,
    gender: "Male",
    lastVisit: "2026-05-13",
    assignedDoctor: "Dr. Anil Mehta",
    status: "Active",
  },
  {
    id: "2",
    name: "Meena Verma",
    phone: "9123456702",
    age: 35,
    gender: "Female",
    lastVisit: "2026-05-13",
    assignedDoctor: "Dr. Neha Sharma",
    status: "Follow-up",
  },
  {
    id: "3",
    name: "Ravi Patel",
    phone: "9012345678",
    age: 51,
    gender: "Male",
    lastVisit: "2026-05-10",
    assignedDoctor: "Dr. Anil Mehta",
    status: "Discharged",
  },
  {
    id: "4",
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

const getAgeFromDob = (dob?: string) => {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return 0;
  const diff = Date.now() - birthDate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

const mapApiPatient = (patient: any): Patient => ({
  id: patient.id,
  name: patient.name,
  phone: patient.phone ?? "",
  age: patient.age ?? getAgeFromDob(patient.dob),
  gender: (patient.gender as Patient["gender"]) ?? "Other",
  lastVisit: patient.lastVisit ?? patient.createdAt ?? new Date().toISOString(),
  assignedDoctor: patient.assignedDoctor ?? "Not assigned",
  status: (patient.status as PatientStatus) ?? "Active",
  dob: patient.dob,
});

const PatientManagement = () => {
  const [view, setView] = useState<"list" | "add">("list");
  const [selectedStatus, setSelectedStatus] = useState<PatientStatus>("Active");
  const [searchText, setSearchText] = useState("");
  const [patients, setPatients] = useState<Patient[]>(defaultPatients);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "Male",
    assignedDoctor: "",
    status: "Active" as PatientStatus,
  });

  const loadDoctors = async () => {
    setLoadingDoctors(true);
    try {
      const doctorList = await fetchDoctorsApi();
      setDoctors(doctorList);
      if (doctorList.length > 0) {
        setFormState((current) => ({
          ...current,
          assignedDoctor: current.assignedDoctor || doctorList[0].name,
        }));
      }
    } catch (error) {
      console.error("Failed to load doctors", error);
    } finally {
      setLoadingDoctors(false);
    }
  };

  useEffect(() => {
    const loadPatients = async () => {
      setLoading(true);
      try {
        const result = await fetchPatients();
        const apiPatients = result.data.data.map(mapApiPatient);
        setPatients(apiPatients);
      } catch (error) {
        console.error("Failed to load patients", error);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
    loadDoctors();
  }, []);

  useEffect(() => {
    if (view === "add" && doctors.length === 0 && !loadingDoctors) {
      loadDoctors();
    }
  }, [view, doctors.length, loadingDoctors]);

  useEffect(() => {
    if (doctors.length > 0 && !formState.assignedDoctor) {
      setFormState((current) => ({
        ...current,
        assignedDoctor: current.assignedDoctor || doctors[0].name,
      }));
    }
  }, [doctors, formState.assignedDoctor]);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.status === selectedStatus &&
      patient.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleFormChange = (field: string, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleSavePatient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const payload = {
        name: formState.name,
        phone: formState.phone,
        gender: formState.gender,
        status: formState.status,
        assignedDoctor: formState.assignedDoctor,
        age: formState.age ? Number(formState.age) : undefined,
        lastVisit: new Date().toISOString(),
      };

      const response = await createPatient(payload);
      const newPatient = mapApiPatient(response.data.data);
      setPatients((current) => [newPatient, ...current]);
      setView("list");
      setFormState({
        name: "",
        phone: "",
        age: "",
        gender: "Male",
        assignedDoctor: doctors[0]?.name ?? "",
        status: "Active",
      });
    } catch (error) {
      console.error("Failed to create patient", error);
    }
  };

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

        <FormGrid onSubmit={handleSavePatient}>
          <FormFields>
            <FieldGroup>
              <FieldLabel>Patient Name</FieldLabel>
              <TextInput
                value={formState.name}
                onChange={(event) => handleFormChange("name", event.target.value)}
                placeholder="Patient name"
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Phone Number</FieldLabel>
              <TextInput
                value={formState.phone}
                onChange={(event) => handleFormChange("phone", event.target.value)}
                placeholder="Phone number"
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Age</FieldLabel>
              <TextInput
                type="number"
                value={formState.age}
                onChange={(event) => handleFormChange("age", event.target.value)}
                placeholder="Age"
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Gender</FieldLabel>
              <SelectInput
                value={formState.gender}
                onChange={(event) => handleFormChange("gender", event.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </SelectInput>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Assigned Doctor</FieldLabel>
              <SelectInput
                value={formState.assignedDoctor}
                onChange={(event) => handleFormChange("assignedDoctor", event.target.value)}
                disabled={loadingDoctors || doctors.length === 0}
              >
                <option value="" disabled>
                  {loadingDoctors ? "Loading doctors..." : doctors.length > 0 ? "Select a doctor" : "No doctors available"}
                </option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name}
                  </option>
                ))}
              </SelectInput>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Status</FieldLabel>
              <SelectInput
                value={formState.status}
                onChange={(event) => handleFormChange("status", event.target.value)}
              >
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
