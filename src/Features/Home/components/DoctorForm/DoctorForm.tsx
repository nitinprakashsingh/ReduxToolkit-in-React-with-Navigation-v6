import { CalendarCheck, ImagePlus, ListChecks } from "lucide-react";

import { SectionTitle } from "../../screens/Dashboard/Dashboard.style";
import {
  ActionBar,
  ActionButton,
  DoctorHeader,
  FieldGroup,
  FieldLabel,
  FormGrid,
  FormLayout,
  HelperText,
  HiddenFileInput,
  SubmitButton,
  TextInput,
  UploadContainer,
  UploadTitle,
} from "./DoctorForm.Style";

type DoctorFormProps = {
  onDoctorList: () => void;
};

const DoctorForm = ({ onDoctorList }: DoctorFormProps) => {
  return (
    <>
      <DoctorHeader>
        <div>
          <SectionTitle>Add Doctor Schedule</SectionTitle>
          <HelperText>
            Add doctor profile details, registration information, and consultancy fee.
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
          Add Schedule
        </ActionButton>
      </ActionBar>

      <FormLayout>
        <UploadContainer>
          <ImagePlus size={42} color="#4f46e5" />
          <UploadTitle>Upload Doctor Image</UploadTitle>
          <span>Choose a clear profile photo for the doctor.</span>
          <HiddenFileInput type="file" accept="image/*" />
        </UploadContainer>

        <FormGrid onSubmit={(event) => event.preventDefault()}>
          <FieldGroup>
            <FieldLabel htmlFor="doctorName">Name</FieldLabel>
            <TextInput id="doctorName" placeholder="Enter doctor name" />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorSpeciality">Speciality</FieldLabel>
            <TextInput id="doctorSpeciality" placeholder="Enter speciality" />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorPhone">Phone Number</FieldLabel>
            <TextInput id="doctorPhone" type="tel" placeholder="Enter phone number" />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorEmail">Email ID</FieldLabel>
            <TextInput id="doctorEmail" type="email" placeholder="Enter email id" />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorStartDate">Start Career Date</FieldLabel>
            <TextInput id="doctorStartDate" type="date" />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorRegistration">Registration Number</FieldLabel>
            <TextInput id="doctorRegistration" placeholder="Enter registration number" />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="doctorFees">Consultancy Fees</FieldLabel>
            <TextInput id="doctorFees" type="number" placeholder="Enter fees" />
          </FieldGroup>

          <SubmitButton type="submit">Save Schedule</SubmitButton>
        </FormGrid>
      </FormLayout>
    </>
  );
};

export default DoctorForm;

