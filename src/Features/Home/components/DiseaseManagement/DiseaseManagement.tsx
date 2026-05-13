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

type DiseaseType = "Top disease" | "Seasonal disease" | "Regional disease";

type Disease = {
  id: number;
  name: string;
  organ: string;
  suggestedDepartment: string;
  type: DiseaseType;
};

const diseases: Disease[] = [
  {
    id: 1,
    name: "Malaria",
    organ: "Liver",
    suggestedDepartment: "General Medicine",
    type: "Top disease",
  },
  {
    id: 2,
    name: "Dengue",
    organ: "Blood",
    suggestedDepartment: "General Medicine",
    type: "Seasonal disease",
  },
  {
    id: 3,
    name: "Chikungunya",
    organ: "Joints",
    suggestedDepartment: "Orthopedic",
    type: "Seasonal disease",
  },
  {
    id: 4,
    name: "Typhoid",
    organ: "Intestine",
    suggestedDepartment: "General Medicine",
    type: "Regional disease",
  },
  {
    id: 5,
    name: "Flu",
    organ: "Respiratory System",
    suggestedDepartment: "General Medicine",
    type: "Top disease",
  },
];

const diseaseTypes: DiseaseType[] = [
  "Top disease",
  "Seasonal disease",
  "Regional disease",
];

const DiseaseManagement = () => {
  const [view, setView] = useState<"list" | "add">("list");
  const [selectedType, setSelectedType] = useState<DiseaseType>("Top disease");
  const [searchText, setSearchText] = useState("");

  const filteredDiseases = diseases.filter(
    (disease) =>
      disease.type === selectedType &&
      disease.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (view === "add") {
    return (
      <FormPanel>
        <DepartmentHeader>
          <HeaderLeft>
            <BackButton onClick={() => setView("list")} title="Back">
              <ArrowLeft size={16} />
            </BackButton>
            <SectionTitle>Add Disease</SectionTitle>
          </HeaderLeft>
        </DepartmentHeader>

        <FormGrid onSubmit={(event) => event.preventDefault()}>
          <FormFields>
            <FieldGroup>
              <FieldLabel>Disease Name</FieldLabel>
              <TextInput placeholder="Disease name" />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Organ Related</FieldLabel>
              <TextInput placeholder="Organ or body system" />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Suggested Department</FieldLabel>
              <SelectInput defaultValue="">
                <option value="" disabled>
                  Select department
                </option>
                <option value="General Medicine">General Medicine</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Pediatrics">Pediatrics</option>
              </SelectInput>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Disease Type</FieldLabel>
              <SelectInput defaultValue="">
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
        <SectionTitle>Disease Management</SectionTitle>
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
        {diseaseTypes.map((type) => (
          <TabButton
            key={type}
            $active={selectedType === type}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </TabButton>
        ))}
        <AddButton onClick={() => setView("add")} style={{ marginLeft: "auto" }}>
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
                    onClick={() => alert(`Edit ${disease.name}`)}
                  >
                    <Pencil size={16} />
                  </ActionIconButton>
                </TableDataCell>
              </TableRow>
            ))}
            {filteredDiseases.length === 0 && (
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
