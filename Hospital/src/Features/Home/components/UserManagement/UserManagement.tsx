import { FormEvent, useEffect, useState } from "react";
import { ListChecks, UserPlus } from "lucide-react";

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
  SelectInput,
} from "../DoctorForm/DoctorForm.Style";
import { createUserApi, fetchUserListApi, type CreateUserPayload, type User } from "./userApi";

type UserManagementProps = {
  view: "list" | "add";
  onViewChange: (view: "list" | "add") => void;
};

const initialFormState: CreateUserPayload = {
  name: "",
  email: "",
  mobile: "",
  address: "",
  role: "user",
  password: "",
};

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "live_responsist", label: "Live Responist" },
  { value: "user", label: "Patient User" },
];

const UserManagement = ({ view, onViewChange }: UserManagementProps) => {
  const [userList, setUserList] = useState<User[]>([]);
  const [formData, setFormData] = useState<CreateUserPayload>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const users = await fetchUserListApi();
      setUserList(users);
    } catch (apiError: any) {
      setError(apiError.response?.data?.message ?? apiError.message ?? "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (view === "list") {
      loadUsers();
    }
  }, [view]);

  const handleChange = (field: keyof CreateUserPayload, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      setIsSubmitting(true);
      await createUserApi(formData);
      setSuccessMessage("User created successfully.");
      setFormData(initialFormState);
      await loadUsers();
      onViewChange("list");
    } catch (apiError: any) {
      setError(apiError.response?.data?.message ?? apiError.message ?? "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <SectionTitle>{view === "add" ? "Create New User" : "User Management"}</SectionTitle>
        <HelperText>Manage hospital users, assign roles, and create patient app accounts.</HelperText>
      </div>

      <ActionBar>
        <ActionButton $active={view === "list"} onClick={() => onViewChange("list")}>
          <ListChecks size={16} />
          User List
        </ActionButton>
        <ActionButton $active={view === "add"} onClick={() => onViewChange("add")}>
          <UserPlus size={16} />
          Add New User
        </ActionButton>
      </ActionBar>

      {error && <HelperText style={{ color: "#dc2626" }}>{error}</HelperText>}
      {successMessage && <HelperText style={{ color: "#15803d" }}>{successMessage}</HelperText>}

      {view === "add" ? (
        <FormGrid onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldLabel htmlFor="userName">Name</FieldLabel>
            <TextInput
              id="userName"
              value={formData.name}
              placeholder="Enter user name"
              onChange={(event) => handleChange("name", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="userEmail">Email</FieldLabel>
            <TextInput
              id="userEmail"
              type="email"
              value={formData.email}
              placeholder="Enter email address"
              onChange={(event) => handleChange("email", event.target.value)}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="userMobile">Mobile Number</FieldLabel>
            <TextInput
              id="userMobile"
              type="tel"
              value={formData.mobile}
              placeholder="Enter mobile number"
              onChange={(event) => handleChange("mobile", event.target.value)}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="userRole">Role</FieldLabel>
            <SelectInput
              id="userRole"
              value={formData.role}
              onChange={(event) => handleChange("role", event.target.value)}
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectInput>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="userAddress">Address</FieldLabel>
            <TextInput
              id="userAddress"
              value={formData.address}
              placeholder="Enter address"
              onChange={(event) => handleChange("address", event.target.value)}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="userPassword">Password</FieldLabel>
            <TextInput
              id="userPassword"
              type="password"
              value={formData.password}
              placeholder="Set password (optional)"
              onChange={(event) => handleChange("password", event.target.value)}
            />
          </FieldGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Create User"}
          </SubmitButton>
        </FormGrid>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Mobile</TableHeadCell>
              <TableHeadCell>Role</TableHeadCell>
              <TableHeadCell>Address</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </tr>
          </thead>

          <tbody>
            {userList.map((user) => (
              <TableRow key={user.id}>
                <TableDataCell>{user.name}</TableDataCell>
                <TableDataCell>{user.email || "-"}</TableDataCell>
                <TableDataCell>{user.mobile || "-"}</TableDataCell>
                <TableDataCell>{user.role}</TableDataCell>
                <TableDataCell>{user.address || "-"}</TableDataCell>
                <TableDataCell>
                  <EditButton onClick={() => alert(`Edit ${user.name}`)}>
                    Edit
                  </EditButton>
                </TableDataCell>
              </TableRow>
            ))}

            {!isLoading && userList.length === 0 && (
              <TableRow>
                <TableDataCell colSpan={6}>No users created yet.</TableDataCell>
              </TableRow>
            )}

            {isLoading && (
              <TableRow>
                <TableDataCell colSpan={6}>Loading users...</TableDataCell>
              </TableRow>
            )}
          </tbody>
        </StyledTable>
      )}
    </>
  );
};

export default UserManagement;
