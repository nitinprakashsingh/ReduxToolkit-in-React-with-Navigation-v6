import { Bed, ListChecks, Plus, Save } from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";

import {
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
import { SelectInput, StatusBadge, TableScroll } from "../PackageManagement/PackageManagement.Style";
import {
  BedPayload,
  Bed as BedRecord,
  createBedApi,
  fetchBedsApi,
  updateBedApi,
} from "./bedApi";

type BedManagementProps = {
  view: "list" | "add";
  onViewChange: (view: "list" | "add") => void;
};

const initialFormState: BedPayload = {
  bedNo: "",
  ward: "",
  roomNo: "",
  bedType: "General",
  status: "Available",
  patientName: "",
  notes: "",
};

const statusOptions = ["Available", "Occupied", "Reserved", "Maintenance"];

const getErrorMessage = (apiError: any, fallback: string) =>
  apiError.response?.data?.message ?? apiError.message ?? fallback;

const BedManagement = ({ view, onViewChange }: BedManagementProps) => {
  const [beds, setBeds] = useState<BedRecord[]>([]);
  const [formData, setFormData] = useState<BedPayload>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadBeds = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const bedList = await fetchBedsApi();
      setBeds(bedList);
    } catch (apiError: any) {
      setError(getErrorMessage(apiError, "Failed to load beds"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBeds();
  }, [loadBeds]);

  const handleChange = (field: keyof BedPayload, value: string) => {
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
      const response = await createBedApi(formData);
      setSuccessMessage(response.message);
      setFormData(initialFormState);
      await loadBeds();
      onViewChange("list");
    } catch (apiError: any) {
      setError(getErrorMessage(apiError, "Failed to create bed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (bed: BedRecord, status: string) => {
    try {
      setError(null);
      const response = await updateBedApi(bed.id, { status });
      setBeds((current) =>
        current.map((item) => (item.id === bed.id ? response.data : item))
      );
    } catch (apiError: any) {
      setError(getErrorMessage(apiError, "Failed to update bed status"));
    }
  };

  return (
    <>
      <div>
        <SectionTitle>{view === "add" ? "Add Bed" : "Manage Bed"}</SectionTitle>
        <HelperText>Track ward beds, availability, and assigned patients.</HelperText>
      </div>

      <ActionBar>
        <ActionButton $active={view === "list"} onClick={() => onViewChange("list")}>
          <ListChecks size={16} />
          Bed List
        </ActionButton>
        <ActionButton $active={view === "add"} onClick={() => onViewChange("add")}>
          <Plus size={16} />
          Add Bed
        </ActionButton>
      </ActionBar>

      {error && <HelperText style={{ color: "#dc2626" }}>{error}</HelperText>}
      {successMessage && <HelperText style={{ color: "#15803d" }}>{successMessage}</HelperText>}

      {view === "add" ? (
        <FormGrid onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldLabel htmlFor="bedNo">Bed No</FieldLabel>
            <TextInput
              id="bedNo"
              value={formData.bedNo}
              placeholder="B-101"
              onChange={(event) => handleChange("bedNo", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="ward">Ward</FieldLabel>
            <TextInput
              id="ward"
              value={formData.ward}
              placeholder="General Ward"
              onChange={(event) => handleChange("ward", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="roomNo">Room No</FieldLabel>
            <TextInput
              id="roomNo"
              value={formData.roomNo}
              placeholder="Room 12"
              onChange={(event) => handleChange("roomNo", event.target.value)}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="bedType">Bed Type</FieldLabel>
            <TextInput
              id="bedType"
              value={formData.bedType}
              placeholder="General, ICU, Private"
              onChange={(event) => handleChange("bedType", event.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="bedStatus">Status</FieldLabel>
            <SelectInput
              id="bedStatus"
              value={formData.status}
              onChange={(event) => handleChange("status", event.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </SelectInput>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="patientName">Patient Name</FieldLabel>
            <TextInput
              id="patientName"
              value={formData.patientName}
              placeholder="Optional"
              onChange={(event) => handleChange("patientName", event.target.value)}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="bedNotes">Notes</FieldLabel>
            <TextInput
              id="bedNotes"
              value={formData.notes}
              placeholder="Optional notes"
              onChange={(event) => handleChange("notes", event.target.value)}
            />
          </FieldGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            <Save size={16} />
            {isSubmitting ? "Saving..." : "Save Bed"}
          </SubmitButton>
        </FormGrid>
      ) : (
        <TableScroll>
          <StyledTable>
            <thead>
              <tr>
                <TableHeadCell>Bed No</TableHeadCell>
                <TableHeadCell>Ward</TableHeadCell>
                <TableHeadCell>Room No</TableHeadCell>
                <TableHeadCell>Type</TableHeadCell>
                <TableHeadCell>Patient</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Update Status</TableHeadCell>
              </tr>
            </thead>

            <tbody>
              {beds.map((bed) => (
                <TableRow key={bed.id}>
                  <TableDataCell>
                    <Bed size={15} style={{ marginRight: 6, verticalAlign: "middle" }} />
                    {bed.bedNo}
                  </TableDataCell>
                  <TableDataCell>{bed.ward}</TableDataCell>
                  <TableDataCell>{bed.roomNo || "-"}</TableDataCell>
                  <TableDataCell>{bed.bedType}</TableDataCell>
                  <TableDataCell>{bed.patientName || "-"}</TableDataCell>
                  <TableDataCell>
                    <StatusBadge $variant={bed.status === "Available" ? "active" : "expired"}>
                      {bed.status}
                    </StatusBadge>
                  </TableDataCell>
                  <TableDataCell>
                    <SelectInput
                      value={bed.status}
                      onChange={(event) => handleStatusChange(bed, event.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </SelectInput>
                  </TableDataCell>
                </TableRow>
              ))}

              {!isLoading && beds.length === 0 && (
                <TableRow>
                  <TableDataCell colSpan={7}>No beds found.</TableDataCell>
                </TableRow>
              )}

              {isLoading && (
                <TableRow>
                  <TableDataCell colSpan={7}>Loading beds...</TableDataCell>
                </TableRow>
              )}
            </tbody>
          </StyledTable>
        </TableScroll>
      )}
    </>
  );
};

export default BedManagement;
