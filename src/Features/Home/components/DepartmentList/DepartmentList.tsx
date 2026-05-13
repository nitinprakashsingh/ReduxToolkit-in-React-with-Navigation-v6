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
} from "./DepartmentList.Style";

type DiseaseType = "Top disease" | "Seasonal disease" | "Regional Disease";

type Disease = {
  id: number;
  name: string;
  organ: string;
  type: DiseaseType;
};

const diseases: Disease[] = [
  {
    id: 1,
    name: "Malaria",
    organ: "Liver",
    type: "Top disease",
  },
  {
    id: 2,
    name: "Chikungunya",
    organ: "Joints",
    type: "Top disease",
  },
  {
    id: 3,
    name: "Dengue",
    organ: "Blood",
    type: "Seasonal disease",
  },
  {
    id: 4,
    name: "Typhoid",
    organ: "Intestine",
    type: "Seasonal disease",
  },
  {
    id: 5,
    name: "Flu",
    organ: "Respiratory System",
    type: "Regional Disease",
  },
];

const diseaseTypes: DiseaseType[] = [
  "Top disease",
  "Seasonal disease",
  "Regional Disease",
];

const DepartmentList = () => {
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
              <TextInput defaultValue="Malaria" placeholder="Disease name" />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Organ Related</FieldLabel>
              <SelectInput defaultValue="">
                <option value="" disabled>
                  Select organ
                </option>
                <option value="liver">Liver</option>
                <option value="joints">Joints</option>
                <option value="blood">Blood</option>
                <option value="respiratory">Respiratory System</option>
              </SelectInput>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Disease Type</FieldLabel>
              <SelectInput defaultValue="">
                <option value="" disabled>
                  Seasonal disease
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

          <AddButton type="button">
            <Plus size={14} />
            Add More Disease
          </AddButton>
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
              <TableHeadCell>Action</TableHeadCell>
            </tr>
          </thead>

          <tbody>
            {filteredDiseases.map((disease) => (
              <TableRow key={disease.id}>
                <TableDataCell>{disease.name}</TableDataCell>
                <TableDataCell>{disease.organ}</TableDataCell>
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
