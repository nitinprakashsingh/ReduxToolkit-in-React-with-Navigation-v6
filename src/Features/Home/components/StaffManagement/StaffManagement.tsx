import { FormEvent, useEffect, useState } from "react";
import { ListChecks, Pencil, UserPlus } from "lucide-react";

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
  FieldGroup,
  FieldLabel,
  FormGrid,
  HelperText,
  SubmitButton,
  TextInput,
} from "../DoctorForm/DoctorForm.Style";
import {
  CreateStaffPayload,
  Staff,
  createStaffApi,
  fetchStaffListApi,
} from "./staffApi";

type StaffManagementProps = {
  view: "list" | "add";
  onViewChange: (view: "list" | "add") => void;
};

const initialFormState: CreateStaffPayload = {
  name: "",
  email: "",
  phone: "",
  relationship: "",
};

const StaffManagement = ({ view, onViewChange }: StaffManagementProps) => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [formData, setFormData] = useState<CreateStaffPayload>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadStaffList = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const staff = await fetchStaffListApi();
      setStaffList(staff);
    } catch (apiError: any) {
      setError(apiError.response?.data?.message ?? apiError.message ?? "Failed to load staff");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (view === "list") {
      loadStaffList();
    }
  }, [view]);

  const handleChange = (field: keyof CreateStaffPayload, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);
      const response = await createStaffApi(formData);
      setSuccessMessage(response.message);
      setFormData(initialFormState);
      await loadStaffList();
      onViewChange("list");
    } catch (apiError: any) {
      setError(apiError.response?.data?.message ?? apiError.message ?? "Failed to create staff");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <SectionTitle>{view === "add" ? "Add New Staff" : "Staff List"}</SectionTitle>
        <HelperText>Manage staff members and their roles in the hospital team.</HelperText>
      </div>

      <ActionBar>
        <ActionButton $active={view === "list"} onClick={() => onViewChange("list")}>
          <ListChecks size={16} />
          Staff List
        </ActionButton>
        <ActionButton $active={view === "add"} onClick={() => onViewChange("add")}>
          <UserPlus size={16} />
          Add New Staff
        </ActionButton>
      </ActionBar>

      {error && <HelperText style={{ color: "#dc2626" }}>{error}</HelperText>}
      {successMessage && <HelperText style={{ color: "#15803d" }}>{successMessage}</HelperText>}

      {view === "add" ? (
        <FormGrid onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldLabel htmlFor="staffName">Name</FieldLabel>
            <TextInput
              id="staffName"
              value={formData.name}
              placeholder="Enter staff name"
              onChange={(event) => handleChange("name", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="staffEmail">Email</FieldLabel>
            <TextInput
              id="staffEmail"
              type="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={(event) => handleChange("email", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="staffPhone">Phone Number</FieldLabel>
            <TextInput
              id="staffPhone"
              type="tel"
              value={formData.phone}
              placeholder="Enter phone number"
              onChange={(event) => handleChange("phone", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="staffRelationship">Relationship</FieldLabel>
            <TextInput
              id="staffRelationship"
              value={formData.relationship}
              placeholder="Manager, Receptionist, Nurse"
              onChange={(event) => handleChange("relationship", event.target.value)}
              required
            />
          </FieldGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Staff"}
          </SubmitButton>
        </FormGrid>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone No</TableHeadCell>
              <TableHeadCell>Relationship</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </tr>
          </thead>

          <tbody>
            {staffList.map((staff) => (
              <TableRow key={staff.id}>
                <TableDataCell>{staff.name}</TableDataCell>
                <TableDataCell>{staff.email}</TableDataCell>
                <TableDataCell>{staff.phone}</TableDataCell>
                <TableDataCell>{staff.relationship}</TableDataCell>
                <TableDataCell>{staff.status}</TableDataCell>
                <TableDataCell>
                  <EditButton onClick={() => alert(`Edit ${staff.name}`)}>
                    <Pencil size={16} />
                    Edit
                  </EditButton>
                </TableDataCell>
              </TableRow>
            ))}

            {!isLoading && staffList.length === 0 && (
              <TableRow>
                <TableDataCell colSpan={6}>No staff members found.</TableDataCell>
              </TableRow>
            )}

            {isLoading && (
              <TableRow>
                <TableDataCell colSpan={6}>Loading staff...</TableDataCell>
              </TableRow>
            )}
          </tbody>
        </StyledTable>
      )}
    </>
  );
};

export default StaffManagement;
