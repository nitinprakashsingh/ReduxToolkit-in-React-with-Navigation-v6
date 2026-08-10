import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
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
import { createUserApi, deleteUserApi, fetchPatientUsersApi, fetchUserListApi, updateUserApi, type CreateUserPayload, type User } from "./userApi";

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
  const [userFilter, setUserFilter] = useState<"all" | "patients">("all");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const users = userFilter === "patients" ? await fetchPatientUsersApi() : await fetchUserListApi();
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
  }, [view, userFilter]);

  const handleChange = (field: keyof CreateUserPayload, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const setEditMode = (user: User) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email ?? "",
      mobile: user.mobile ?? "",
      address: user.address ?? "",
      role: user.role,
      password: "",
    });
    onViewChange("add");
  };

  const clearEditMode = () => {
    setEditingUserId(null);
    setFormData(initialFormState);
    setError(null);
    setSuccessMessage(null);
  };

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleDelete = async (userId: string) => {
    setDeleteTargetId(userId);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) {
      return;
    }

    setConfirmDeleteOpen(false);
    setIsLoading(true);

    try {
      await deleteUserApi(deleteTargetId);
      setSuccessMessage("User deleted successfully.");
      await loadUsers();
    } catch (apiError: any) {
      setError(apiError.response?.data?.message ?? apiError.message ?? "Failed to delete user");
    } finally {
      setIsLoading(false);
      setDeleteTargetId(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteOpen(false);
    setDeleteTargetId(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      setIsSubmitting(true);

      if (editingUserId) {
        await updateUserApi(editingUserId, formData);
        setSuccessMessage("User updated successfully.");
      } else {
        await createUserApi(formData);
        setSuccessMessage("User created successfully.");
      }

      clearEditMode();
      await loadUsers();
      onViewChange("list");
    } catch (apiError: any) {
      setError(apiError.response?.data?.message ?? apiError.message ?? (editingUserId ? "Failed to update user" : "Failed to create user"));
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
        <ActionButton $active={view === "add"} onClick={() => {
          clearEditMode();
          onViewChange("add");
        }}>
          <UserPlus size={16} />
          Add New User
        </ActionButton>
      </ActionBar>

      {view === "list" && (
        <ActionBar>
          <ActionButton $active={userFilter === "all"} onClick={() => setUserFilter("all")}>
            All Users
          </ActionButton>
          <ActionButton $active={userFilter === "patients"} onClick={() => setUserFilter("patients")}>
            Patient Users
          </ActionButton>
        </ActionBar>
      )}

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
            {isSubmitting ? (editingUserId ? "Updating..." : "Saving...") : editingUserId ? "Update User" : "Create User"}
          </SubmitButton>

          {editingUserId && (
            <SubmitButton
              type="button"
              style={{ background: "#6b7280", marginLeft: "12px" }}
              onClick={() => {
                clearEditMode();
                onViewChange("list");
              }}
            >
              Cancel
            </SubmitButton>
          )}
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
                  <EditButton onClick={() => setEditMode(user)}>
                    Edit
                  </EditButton>
                  <EditButton
                    style={{ background: "#dc2626", marginLeft: "8px" }}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
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

      {confirmDeleteOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Confirm deletion</ModalTitle>
            <ModalText>Are you sure you want to delete this user? This action cannot be undone.</ModalText>
            <ModalActions>
              <ModalButton type="button" onClick={cancelDelete} $variant="secondary">
                Cancel
              </ModalButton>
              <ModalButton type="button" onClick={confirmDelete} $variant="danger">
                Delete
              </ModalButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  width: min(420px, calc(100% - 32px));
  padding: 28px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.18);
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #111827;
`;

const ModalText = styled.p`
  margin: 16px 0 24px;
  color: #4b5563;
  line-height: 1.6;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const ModalButton = styled.button<{ $variant?: "primary" | "secondary" | "danger" }>`
  min-width: 100px;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 600;
  color: #ffffff;
  background: ${({ $variant }) =>
    $variant === "danger" ? "#dc2626" : $variant === "secondary" ? "#6b7280" : "#2563eb"};

  &:hover {
    opacity: 0.95;
  }
`;

export default UserManagement;
