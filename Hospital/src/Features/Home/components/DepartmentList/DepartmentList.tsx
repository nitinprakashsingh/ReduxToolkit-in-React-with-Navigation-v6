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
} from "./DepartmentList.Style";
import {
  Department,
  DepartmentPayload,
  createDepartmentApi,
  fetchDepartmentsApi,
  updateDepartmentApi,
} from "./departmentApi";

type DepartmentStatus = "Active" | "Inactive";

const departmentStatuses: DepartmentStatus[] = ["Active", "Inactive"];

const initialFormState: DepartmentPayload = {
  name: "",
  headDoctor: "",
  phone: "",
  roomNo: "",
  status: "Active",
};

const getErrorMessage = (apiError: any, fallback: string) =>
  apiError.response?.data?.message ?? apiError.message ?? fallback;

const DepartmentList = () => {
  const [view, setView] = useState<"list" | "form">("list");
  const [selectedStatus, setSelectedStatus] =
    useState<DepartmentStatus>("Active");
  const [searchText, setSearchText] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [formState, setFormState] = useState<DepartmentPayload>(initialFormState);
  const [editingDepartmentId, setEditingDepartmentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredDepartments = departments.filter(
    (department) =>
      department.status === selectedStatus &&
      department.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const loadDepartments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const departmentList = await fetchDepartmentsApi();
      setDepartments(departmentList);
    } catch (apiError: any) {
      setError(getErrorMessage(apiError, "Failed to load departments"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const resetForm = () => {
    setFormState(initialFormState);
    setEditingDepartmentId(null);
    setError(null);
  };

  const handleAddClick = () => {
    resetForm();
    setView("form");
  };

  const handleEditClick = (department: Department) => {
    setFormState({
      name: department.name,
      headDoctor: department.headDoctor ?? "",
      phone: department.phone ?? "",
      roomNo: department.roomNo ?? "",
      status: department.status,
    });
    setEditingDepartmentId(department.id);
    setView("form");
  };

  const handleFormChange = (field: keyof DepartmentPayload, value: string) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      if (editingDepartmentId) {
        const response = await updateDepartmentApi(editingDepartmentId, formState);
        setDepartments((current) =>
          current.map((department) =>
            department.id === editingDepartmentId ? response.data : department
          )
        );
      } else {
        const response = await createDepartmentApi(formState);
        setDepartments((current) => [response.data, ...current]);
      }

      setSelectedStatus(formState.status as DepartmentStatus);
      resetForm();
      setView("list");
    } catch (apiError: any) {
      setError(getErrorMessage(apiError, "Failed to save department"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = Boolean(editingDepartmentId);

  if (view === "form") {
    return (
      <FormPanel>
        <DepartmentHeader>
          <HeaderLeft>
            <BackButton
              onClick={() => {
                resetForm();
                setView("list");
              }}
              title="Back"
            >
              <ArrowLeft size={16} />
            </BackButton>
            <SectionTitle>{isEditing ? "Edit Department" : "Add Department"}</SectionTitle>
          </HeaderLeft>
        </DepartmentHeader>

        {error && <p style={{ color: "#dc2626", marginTop: 0 }}>{error}</p>}

        <FormGrid onSubmit={handleSubmit}>
          <FormFields>
            <FieldGroup>
              <FieldLabel htmlFor="department-name">Department Name</FieldLabel>
              <TextInput
                id="department-name"
                value={formState.name}
                onChange={(event) => handleFormChange("name", event.target.value)}
                placeholder="Department name"
                required
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="department-head-doctor">Head Doctor</FieldLabel>
              <TextInput
                id="department-head-doctor"
                value={formState.headDoctor}
                onChange={(event) =>
                  handleFormChange("headDoctor", event.target.value)
                }
                placeholder="Doctor name"
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="department-phone">Contact Number</FieldLabel>
              <TextInput
                id="department-phone"
                value={formState.phone}
                onChange={(event) => handleFormChange("phone", event.target.value)}
                placeholder="Phone number"
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="department-room">Room / OPD No</FieldLabel>
              <TextInput
                id="department-room"
                value={formState.roomNo}
                onChange={(event) => handleFormChange("roomNo", event.target.value)}
                placeholder="OPD-101"
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="department-status">Status</FieldLabel>
              <SelectInput
                id="department-status"
                value={formState.status}
                onChange={(event) => handleFormChange("status", event.target.value)}
              >
                <option value="" disabled>
                  Select status
                </option>
                {departmentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </SelectInput>
            </FieldGroup>

            <FormActions>
              <CancelButton
                type="button"
                onClick={() => {
                  resetForm();
                  setView("list");
                }}
              >
                Cancel
              </CancelButton>
              <AddButton type="submit" disabled={isSubmitting}>
                <Plus size={14} />
                {isSubmitting ? "Saving..." : "Save"}
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
        <SectionTitle>Department Management</SectionTitle>
      </DepartmentHeader>

      {error && <p style={{ color: "#dc2626", marginTop: 0 }}>{error}</p>}

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
        {departmentStatuses.map((status) => (
          <TabButton
            key={status}
            $active={selectedStatus === status}
            onClick={() => setSelectedStatus(status)}
          >
            {status}
          </TabButton>
        ))}
        <AddButton onClick={handleAddClick} style={{ marginLeft: "auto" }}>
          <Plus size={14} />
          Add Department
        </AddButton>
      </TabBar>

      <TableScroll>
        <StyledTable>
          <thead>
            <tr>
              <TableHeadCell>Department Name</TableHeadCell>
              <TableHeadCell>Head Doctor</TableHeadCell>
              <TableHeadCell>Phone No</TableHeadCell>
              <TableHeadCell>Room / OPD</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </tr>
          </thead>

          <tbody>
            {filteredDepartments.map((department) => (
              <TableRow key={department.id}>
                <TableDataCell>{department.name}</TableDataCell>
                <TableDataCell>{department.headDoctor}</TableDataCell>
                <TableDataCell>{department.phone}</TableDataCell>
                <TableDataCell>{department.roomNo}</TableDataCell>
                <TableDataCell>{department.status}</TableDataCell>
                <TableDataCell>
                  <ActionIconButton
                    title="View department"
                    onClick={() => alert(`View ${department.name}`)}
                  >
                    <Eye size={16} />
                  </ActionIconButton>
                  <ActionIconButton
                    title="Edit department"
                    onClick={() => handleEditClick(department)}
                  >
                    <Pencil size={16} />
                  </ActionIconButton>
                </TableDataCell>
              </TableRow>
            ))}
            {isLoading && (
              <TableRow>
                <TableDataCell colSpan={6}>Loading departments...</TableDataCell>
              </TableRow>
            )}
            {!isLoading && filteredDepartments.length === 0 && (
              <TableRow>
                <TableDataCell colSpan={6}>No departments found.</TableDataCell>
              </TableRow>
            )}
          </tbody>
        </StyledTable>
      </TableScroll>

      <Pagination>
        <PageButton>Previous</PageButton>
        <PageButton $active>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <PageButton>4</PageButton>
        <PageButton>5</PageButton>
        <PageButton>Next</PageButton>
      </Pagination>
    </>
  );
};

export default DepartmentList;
