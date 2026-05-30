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
import { fetchDepartmentsApi } from "../DepartmentList/departmentApi";
import {
  Disease,
  DiseasePayload,
  createDiseaseApi,
  fetchDiseasesApi,
  updateDiseaseApi,
} from "./diseaseApi";

type DiseaseType = "Top disease" | "Seasonal disease" | "Regional disease";

const diseaseTypes: DiseaseType[] = [
  "Top disease",
  "Seasonal disease",
  "Regional disease",
];

const fallbackDepartments = [
  "General Medicine",
  "Cardiology",
  "Dermatology",
  "Orthopedic",
  "Pediatrics",
];

const initialFormState: DiseasePayload = {
  name: "",
  organ: "",
  suggestedDepartment: "",
  type: "Top disease",
};

const getErrorMessage = (apiError: any, fallback: string) =>
  apiError.response?.data?.message ?? apiError.message ?? fallback;

const DiseaseManagement = () => {
  const [view, setView] = useState<"list" | "form">("list");
  const [selectedType, setSelectedType] = useState<DiseaseType>("Top disease");
  const [searchText, setSearchText] = useState("");
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [departments, setDepartments] = useState<string[]>(fallbackDepartments);
  const [formState, setFormState] = useState<DiseasePayload>(initialFormState);
  const [editingDiseaseId, setEditingDiseaseId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredDiseases = diseases.filter(
    (disease) =>
      disease.type === selectedType &&
      disease.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const loadDiseases = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const diseaseList = await fetchDiseasesApi();
      setDiseases(diseaseList);
    } catch (apiError: any) {
      setError(getErrorMessage(apiError, "Failed to load diseases"));
    } finally {
      setIsLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const departmentList = await fetchDepartmentsApi();
      const departmentNames = departmentList.map((department) => department.name);

      if (departmentNames.length > 0) {
        setDepartments(departmentNames);
      }
    } catch (apiError) {
      console.error("Failed to load departments for disease form", apiError);
    }
  };

  useEffect(() => {
    loadDiseases();
    loadDepartments();
  }, []);

  useEffect(() => {
    setFormState((current) => ({
      ...current,
      suggestedDepartment:
        current.suggestedDepartment || departments[0] || "",
    }));
  }, [departments]);

  const resetForm = () => {
    setFormState({
      ...initialFormState,
      suggestedDepartment: departments[0] || "",
    });
    setEditingDiseaseId(null);
    setError(null);
  };

  const handleAddClick = () => {
    resetForm();
    setView("form");
  };

  const handleEditClick = (disease: Disease) => {
    setFormState({
      name: disease.name,
      organ: disease.organ,
      suggestedDepartment: disease.suggestedDepartment,
      type: disease.type,
    });
    setEditingDiseaseId(disease.id);
    setView("form");
  };

  const handleFormChange = (field: keyof DiseasePayload, value: string) => {
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

      if (editingDiseaseId) {
        const response = await updateDiseaseApi(editingDiseaseId, formState);
        setDiseases((current) =>
          current.map((disease) =>
            disease.id === editingDiseaseId ? response.data : disease
          )
        );
      } else {
        const response = await createDiseaseApi(formState);
        setDiseases((current) => [response.data, ...current]);
      }

      setSelectedType(formState.type as DiseaseType);
      resetForm();
      setView("list");
    } catch (apiError: any) {
      setError(getErrorMessage(apiError, "Failed to save disease"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = Boolean(editingDiseaseId);

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
            <SectionTitle>{isEditing ? "Edit Disease" : "Add Disease"}</SectionTitle>
          </HeaderLeft>
        </DepartmentHeader>

        {error && <p style={{ color: "#dc2626", marginTop: 0 }}>{error}</p>}

        <FormGrid onSubmit={handleSubmit}>
          <FormFields>
            <FieldGroup>
              <FieldLabel htmlFor="disease-name">Disease Name</FieldLabel>
              <TextInput
                id="disease-name"
                value={formState.name}
                onChange={(event) => handleFormChange("name", event.target.value)}
                placeholder="Disease name"
                required
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="disease-organ">Organ Related</FieldLabel>
              <TextInput
                id="disease-organ"
                value={formState.organ}
                onChange={(event) => handleFormChange("organ", event.target.value)}
                placeholder="Organ or body system"
                required
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="disease-department">Suggested Department</FieldLabel>
              <SelectInput
                id="disease-department"
                value={formState.suggestedDepartment}
                onChange={(event) =>
                  handleFormChange("suggestedDepartment", event.target.value)
                }
                required
              >
                <option value="" disabled>
                  Select department
                </option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </SelectInput>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="disease-type">Disease Type</FieldLabel>
              <SelectInput
                id="disease-type"
                value={formState.type}
                onChange={(event) => handleFormChange("type", event.target.value)}
                required
              >
                <option value="" disabled>
                  Select disease type
                </option>
                {diseaseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
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
        <SectionTitle>Disease Management</SectionTitle>
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
        {diseaseTypes.map((type) => (
          <TabButton
            key={type}
            $active={selectedType === type}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </TabButton>
        ))}
        <AddButton onClick={handleAddClick} style={{ marginLeft: "auto" }}>
          <Plus size={14} />
          Add Disease
        </AddButton>
      </TabBar>

      <TableScroll>
        <StyledTable>
          <thead>
            <tr>
              <TableHeadCell>Disease Name</TableHeadCell>
              <TableHeadCell>Organ Related</TableHeadCell>
              <TableHeadCell>Suggested Department</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </tr>
          </thead>

          <tbody>
            {filteredDiseases.map((disease) => (
              <TableRow key={disease.id}>
                <TableDataCell>{disease.name}</TableDataCell>
                <TableDataCell>{disease.organ}</TableDataCell>
                <TableDataCell>{disease.suggestedDepartment}</TableDataCell>
                <TableDataCell>
                  <ActionIconButton
                    title="View disease"
                    onClick={() => alert(`View ${disease.name}`)}
                  >
                    <Eye size={16} />
                  </ActionIconButton>
                  <ActionIconButton
                    title="Edit disease"
                    onClick={() => handleEditClick(disease)}
                  >
                    <Pencil size={16} />
                  </ActionIconButton>
                </TableDataCell>
              </TableRow>
            ))}
            {isLoading && (
              <TableRow>
                <TableDataCell colSpan={4}>Loading diseases...</TableDataCell>
              </TableRow>
            )}
            {!isLoading && filteredDiseases.length === 0 && (
              <TableRow>
                <TableDataCell colSpan={4}>No diseases found.</TableDataCell>
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

export default DiseaseManagement;
