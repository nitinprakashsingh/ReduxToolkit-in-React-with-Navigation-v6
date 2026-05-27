import { ArrowLeft, Plus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import {
  SectionTitle,
} from "../../screens/Dashboard/Dashboard.style";
import {
  ActionIconButton,
  AddButton,
  BackButton,
  CancelButton,
  DepartmentHeader,
  FieldGroup,
  FieldLabel,
  FormActions,
  FormFields,
  FormGrid,
  FormPanel,
  HeaderLeft,
  SelectInput,
  TextInput,
} from "../DepartmentList/DepartmentList.Style";
import { createBooking, CreateBookingPayload } from "../../../../api/bookingApi";
import { fetchDoctorsApi, Doctor } from "../DoctorForm/doctorApi";
import { fetchPatients, PatientCreatePayload } from "../../../../api/patientApi";

type Patient = {
  id: string;
  name: string;
  phone: string;
  email?: string;
};

type CreateBookingProps = {
  onBookingCreated?: () => void;
  onBack?: () => void;
};

const CreateBooking = ({ onBookingCreated, onBack }: CreateBookingProps) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [formState, setFormState] = useState({
    patientId: "",
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    doctorId: "",
    doctorName: "",
    department: "",
    appointmentDate: "",
    appointmentTime: "",
    consultancyFees: "",
    paymentMethod: "Cash",
    paymentReceived: false,
    paymentAmount: "",
    notes: "",
  });

  useEffect(() => {
    const loadData = async () => {
      setLoadingDoctors(true);
      setLoadingPatients(true);
      try {
        const [doctorList, patientList] = await Promise.all([
          fetchDoctorsApi(),
          fetchPatients(),
        ]);
        setDoctors(doctorList);
        if (patientList.data && patientList.data.data) {
          const mappedPatients: Patient[] = patientList.data.data.map((p: any) => ({
            id: p.id,
            name: p.name,
            phone: p.phone || "",
            email: p.email,
          }));
          setPatients(mappedPatients);
        }
        if (doctorList.length > 0) {
          setFormState((current) => ({
            ...current,
            doctorName: doctorList[0].name,
            doctorId: doctorList[0].id,
          }));
        }
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoadingDoctors(false);
        setLoadingPatients(false);
      }
    };

    loadData();
  }, []);

  const handleFormChange = (field: string, value: string | boolean) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handlePatientSelect = (patientId: string) => {
    const selected = patients.find((p) => p.id === patientId);
    if (selected) {
      setFormState((current) => ({
        ...current,
        patientId,
        patientName: selected.name,
        patientPhone: selected.phone,
        patientEmail: selected.email || "",
      }));
    }
  };

  const handleDoctorSelect = (doctorName: string) => {
    const selected = doctors.find((d) => d.name === doctorName);
    if (selected) {
      setFormState((current) => ({
        ...current,
        doctorName,
        doctorId: selected.id,
      }));
    }
  };

  const handleSaveBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      const payload: CreateBookingPayload = {
        patientName: formState.patientName,
        patientEmail: formState.patientEmail,
        patientPhone: formState.patientPhone,
        patientId: formState.patientId || undefined,
        doctorName: formState.doctorName,
        doctorId: formState.doctorId || undefined,
        department: formState.department,
        appointmentDate: formState.appointmentDate,
        appointmentTime: formState.appointmentTime,
        consultancyFees: formState.consultancyFees ? Number(formState.consultancyFees) : 0,
        paymentMethod: formState.paymentMethod,
        paymentReceived: formState.paymentReceived,
        paymentAmount: formState.paymentAmount ? Number(formState.paymentAmount) : 0,
        notes: formState.notes,
      };

      await createBooking(payload);

      setFormState({
        patientId: "",
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        doctorId: "",
        doctorName: doctors[0]?.name || "",
        department: "",
        appointmentDate: "",
        appointmentTime: "",
        consultancyFees: "",
        paymentMethod: "Cash",
        paymentReceived: false,
        paymentAmount: "",
        notes: "",
      });

      if (onBookingCreated) {
        onBookingCreated();
      }
    } catch (error) {
      console.error("Failed to create booking", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormPanel>
      <DepartmentHeader>
        <HeaderLeft>
          {onBack && (
            <BackButton onClick={onBack} title="Back">
              <ArrowLeft size={16} />
            </BackButton>
          )}
          <SectionTitle>Create Booking</SectionTitle>
        </HeaderLeft>
      </DepartmentHeader>

      <FormGrid onSubmit={handleSaveBooking}>
        <FormFields>
          <FieldGroup>
            <FieldLabel>Select Patient</FieldLabel>
            <SelectInput
              value={formState.patientId}
              onChange={(event) => handlePatientSelect(event.target.value)}
              disabled={loadingPatients || patients.length === 0}
            >
              <option value="">{loadingPatients ? "Loading patients..." : "Select a patient"}</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} - {patient.phone}
                </option>
              ))}
            </SelectInput>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Patient Name</FieldLabel>
            <TextInput
              value={formState.patientName}
              onChange={(event) => handleFormChange("patientName", event.target.value)}
              placeholder="Patient name"
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Patient Email</FieldLabel>
            <TextInput
              type="email"
              value={formState.patientEmail}
              onChange={(event) => handleFormChange("patientEmail", event.target.value)}
              placeholder="Patient email"
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Patient Phone</FieldLabel>
            <TextInput
              value={formState.patientPhone}
              onChange={(event) => handleFormChange("patientPhone", event.target.value)}
              placeholder="Patient phone"
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Select Doctor</FieldLabel>
            <SelectInput
              value={formState.doctorName}
              onChange={(event) => handleDoctorSelect(event.target.value)}
              disabled={loadingDoctors || doctors.length === 0}
              required
            >
              <option value="">{loadingDoctors ? "Loading doctors..." : "Select a doctor"}</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.name}>
                  {doctor.name} - {doctor.speciality}
                </option>
              ))}
            </SelectInput>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Department</FieldLabel>
            <TextInput
              value={formState.department}
              onChange={(event) => handleFormChange("department", event.target.value)}
              placeholder="Department"
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Appointment Date</FieldLabel>
            <TextInput
              type="date"
              value={formState.appointmentDate}
              onChange={(event) => handleFormChange("appointmentDate", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Appointment Time</FieldLabel>
            <TextInput
              type="time"
              value={formState.appointmentTime}
              onChange={(event) => handleFormChange("appointmentTime", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Consultancy Fees</FieldLabel>
            <TextInput
              type="number"
              value={formState.consultancyFees}
              onChange={(event) => handleFormChange("consultancyFees", event.target.value)}
              placeholder="Consultancy fees"
              step="0.01"
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Payment Method</FieldLabel>
            <SelectInput
              value={formState.paymentMethod}
              onChange={(event) => handleFormChange("paymentMethod", event.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Online">Online Transfer</option>
              <option value="Check">Check</option>
            </SelectInput>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Payment Amount</FieldLabel>
            <TextInput
              type="number"
              value={formState.paymentAmount}
              onChange={(event) => handleFormChange("paymentAmount", event.target.value)}
              placeholder="Payment amount"
              step="0.01"
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>
              <input
                type="checkbox"
                checked={formState.paymentReceived}
                onChange={(event) => handleFormChange("paymentReceived", event.target.checked)}
              />
              Payment Received
            </FieldLabel>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Notes</FieldLabel>
            <TextInput
              value={formState.notes}
              onChange={(event) => handleFormChange("notes", event.target.value)}
              placeholder="Additional notes"
              style={{ minHeight: "100px" }}
            />
          </FieldGroup>

          <FormActions>
            {onBack && (
              <CancelButton type="button" onClick={onBack}>
                Cancel
              </CancelButton>
            )}
            <AddButton type="submit" disabled={loading}>
              <Plus size={14} />
              {loading ? "Creating..." : "Create Booking"}
            </AddButton>
          </FormActions>
        </FormFields>
      </FormGrid>
    </FormPanel>
  );
};

export default CreateBooking;
