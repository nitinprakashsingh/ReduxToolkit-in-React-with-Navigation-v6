import { CalendarCheck, ImagePlus, ListChecks } from "lucide-react";
import { type FormEvent, useState } from "react";

import { SectionTitle } from "../../screens/Dashboard/Dashboard.style";
import {
  ActionBar,
  ActionButton,
  DoctorHeader,
  FeedbackText,
  FieldGroup,
  FieldLabel,
  FormGrid,
  FormLayout,
  FullWidthField,
  HelperText,
  HiddenFileInput,
  SubmitButton,
  TextInput,
  UploadContainer,
  UploadTitle,
} from "./DoctorForm.Style";
import {
  createDoctorApi,
  updateDoctorApi,
  type CreateDoctorPayload,
  type Doctor,
} from "./doctorApi";

type DoctorFormProps = {
  onDoctorList: () => void;
  doctor?: Doctor | null;
};

const initialFormState: CreateDoctorPayload = {
  name: "",
  speciality: "",
  phone: "",
  email: "",
  startCareerDate: "",
  registrationNumber: "",
  consultancyFees: "",
  availableDays: "",
  startTime: "",
  endTime: "",
};

const getFormStateFromDoctor = (doctor?: Doctor | null): CreateDoctorPayload => {
  if (!doctor) {
    return initialFormState;
  }

  return {
    name: doctor.name,
    speciality: doctor.speciality,
    phone: doctor.phone,
    email: doctor.email,
    startCareerDate: doctor.startCareerDate.slice(0, 10),
    registrationNumber: doctor.registrationNumber,
    consultancyFees: doctor.consultancyFees,
    availableDays: doctor.availableDays,
    startTime: doctor.startTime,
    endTime: doctor.endTime,
  };
};

const DoctorForm = ({ onDoctorList, doctor }: DoctorFormProps) => {
  const isEditMode = Boolean(doctor);
  const [formData, setFormData] = useState(() => getFormStateFromDoctor(doctor));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const updateField = (field: keyof CreateDoctorPayload, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = isEditMode && doctor
        ? await updateDoctorApi(doctor.id, formData)
        : await createDoctorApi(formData);

      setFeedback({ type: "success", message: response.message });
      if (!isEditMode) {
        setFormData(initialFormState);
      }
      window.setTimeout(onDoctorList, 700);
    } catch (error: any) {
      setFeedback({
        type: "error",
        message: error?.response?.data?.message || "Unable to save doctor schedule.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <DoctorHeader>
        <div>
          <SectionTitle>{isEditMode ? "Edit Doctor Schedule" : "Add Doctor Schedule"}</SectionTitle>
          <HelperText>
            {isEditMode
              ? "Update doctor profile details, schedule, and consultancy fee."
              : "Add doctor profile details, registration information, and consultancy fee."}
          </HelperText>
        </div>
      </DoctorHeader>

      <ActionBar>
        <ActionButton onClick={onDoctorList}>
          <ListChecks size={16} />
          Doctor List
        </ActionButton>
        <ActionButton $active>
          <CalendarCheck size={16} />
          {isEditMode ? "Edit Schedule" : "Add Schedule"}
        </ActionButton>
      </ActionBar>

      <FormLayout>
        <UploadContainer>
          <ImagePlus size={42} color="#4f46e5" />
          <UploadTitle>Upload Doctor Image</UploadTitle>
          <span>Choose a clear profile photo for the doctor.</span>
          <HiddenFileInput type="file" accept="image/*" />
        </UploadContainer>

        <FormGrid onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldLabel htmlFor="doctorName">Name</FieldLabel>
            <TextInput
              id="doctorName"
              placeholder="Enter doctor name"
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorSpeciality">Speciality</FieldLabel>
            <TextInput
              id="doctorSpeciality"
              placeholder="Enter speciality"
              value={formData.speciality}
              onChange={(event) => updateField("speciality", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorPhone">Phone Number</FieldLabel>
            <TextInput
              id="doctorPhone"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorEmail">Email ID</FieldLabel>
            <TextInput
              id="doctorEmail"
              type="email"
              placeholder="Enter email id"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorStartDate">Start Career Date</FieldLabel>
            <TextInput
              id="doctorStartDate"
              type="date"
              value={formData.startCareerDate}
              onChange={(event) => updateField("startCareerDate", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorRegistration">Registration Number</FieldLabel>
            <TextInput
              id="doctorRegistration"
              placeholder="Enter registration number"
              value={formData.registrationNumber}
              onChange={(event) => updateField("registrationNumber", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorFees">Consultancy Fees</FieldLabel>
            <TextInput
              id="doctorFees"
              type="number"
              min="1"
              placeholder="Enter fees"
              value={formData.consultancyFees}
              onChange={(event) => updateField("consultancyFees", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorAvailableDays">Available Days</FieldLabel>
            <TextInput
              id="doctorAvailableDays"
              placeholder="Mon, Wed, Fri"
              value={formData.availableDays}
              onChange={(event) => updateField("availableDays", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorStartTime">Start Time</FieldLabel>
            <TextInput
              id="doctorStartTime"
              type="time"
              value={formData.startTime}
              onChange={(event) => updateField("startTime", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorEndTime">End Time</FieldLabel>
            <TextInput
              id="doctorEndTime"
              type="time"
              value={formData.endTime}
              onChange={(event) => updateField("endTime", event.target.value)}
              required
            />
          </FieldGroup>

          {feedback ? (
            <FeedbackText $type={feedback.type}>{feedback.message}</FeedbackText>
          ) : null}

          <FullWidthField>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Update Schedule"
                  : "Save Schedule"}
            </SubmitButton>
          </FullWidthField>
        </FormGrid>
      </FormLayout>
    </>
  );
};

export default DoctorForm;

