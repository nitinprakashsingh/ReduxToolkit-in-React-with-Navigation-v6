import { ArrowLeft, Building2, Cross } from "lucide-react";
import { useEffect, useState } from "react";
import axiosClient from "../../../../api/axiosClient";

import { SectionTitle } from "../../screens/Dashboard/Dashboard.style";
import {
  BackButton,
  CancelButton,
  CheckboxLabel,
  CheckGroup,
  DetailLabel,
  DetailRow,
  DetailTable,
  DetailValue,
  EditButton,
  FacilitiesGrid,
  FieldGroup,
  FieldLabel,
  FormActions,
  FormFields,
  FormLayout,
  FullWidth,
  HeaderLeft,
  HospitalInfo,
  HospitalName,
  HospitalSummary,
  ImageBox,
  ImagePreview,
  LinkButton,
  LogoCircle,
  MutedText,
  ProfileHeader,
  ProfilePanel,
  SelectInput,
  SubSectionTitle,
  TextInput,
} from "./HospitalProfile.Style";

type HospitalProfileProps = {
  onBack?: () => void;
};

const organs = ["Heart", "Lung", "Kidney", "Others"];
const facilities = [
  ["Bed Type", "Manual Rs500"],
  ["Semi Electric", "Rs1000"],
  ["Fully Electric", "Rs2000"],
  ["Parking area", "270 square feet"],
  ["Waiting hall", "06"],
  ["Labs", "02"],
  ["Pharmacy", "01"],
];

const HospitalProfile = ({ onBack }: HospitalProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hospital, setHospital] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/hospital");
        if (!mounted) return;
        setHospital(res.data.data);
      } catch (err) {
        // ignore if not found
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (isEditing) {
    return (
      <>
        <ProfileHeader>
          <HeaderLeft>
            <BackButton onClick={() => setIsEditing(false)} title="Back">
              <ArrowLeft size={16} />
            </BackButton>
            <SectionTitle>Edit Profile</SectionTitle>
          </HeaderLeft>
        </ProfileHeader>

        <ProfilePanel>
          <FormLayout onSubmit={(event) => event.preventDefault()}>
            <ImageBox>
              <ImagePreview>
                <Cross size={52} />
              </ImagePreview>
              <LinkButton type="button">Change Image</LinkButton>
            </ImageBox>

            <FormFields>
                <FullWidth>
                  <FieldGroup>
                    <FieldLabel>Hospital Name</FieldLabel>
                    <TextInput
                      value={hospital?.name ?? ""}
                      onChange={(e) => setHospital((h: any) => ({ ...(h || {}), name: e.target.value }))}
                    />
                  </FieldGroup>
                </FullWidth>

              <FieldGroup>
                <FieldLabel>License Number</FieldLabel>
                <TextInput
                  value={hospital?.licenseNumber ?? ""}
                  onChange={(e) => setHospital((h: any) => ({ ...(h || {}), licenseNumber: e.target.value }))}
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Year of Commencement</FieldLabel>
                <TextInput
                  value={hospital?.yearOfCommencement ?? ""}
                  onChange={(e) => setHospital((h: any) => ({ ...(h || {}), yearOfCommencement: e.target.value }))}
                />
              </FieldGroup>

              <FullWidth>
                <FieldGroup>
                  <FieldLabel>Hospital Ownership</FieldLabel>
                  <CheckGroup>
                    {["Gov", "Pvt", "Gov"].map((label, index) => (
                      <CheckboxLabel key={`${label}-${index}`}>
                        <input
                          type="checkbox"
                          checked={hospital?.ownership?.includes(label) ?? index === 0}
                          onChange={(e) => {
                            const current = hospital?.ownership ?? "";
                            const parts = current ? current.split(" + ") : [];
                            if (e.target.checked) {
                              parts.push(label);
                            } else {
                              const i = parts.indexOf(label);
                              if (i > -1) parts.splice(i, 1);
                            }
                            setHospital((h: any) => ({ ...(h || {}), ownership: parts.join(" + ") }));
                          }}
                        />
                        {label}
                      </CheckboxLabel>
                    ))}
                  </CheckGroup>
                </FieldGroup>
              </FullWidth>

              <FieldGroup>
                <FieldLabel>No. of Ambulance</FieldLabel>
                <TextInput
                  value={hospital?.noOfAmbulance ?? ""}
                  onChange={(e) => setHospital((h: any) => ({ ...(h || {}), noOfAmbulance: e.target.value }))}
                />
              </FieldGroup>

              <FullWidth>
                <FieldGroup>
                  <FieldLabel>Organs Operated</FieldLabel>
                  <CheckGroup>
                    {organs.map((organ, index) => (
                      <CheckboxLabel key={organ}>
                        <input
                          type="checkbox"
                          checked={hospital?.organsOperated?.includes(organ) ?? index < 2}
                          onChange={(e) => {
                            const cur = hospital?.organsOperated ?? "";
                            const parts = cur ? cur.split(" + ") : [];
                            if (e.target.checked) parts.push(organ);
                            else {
                              const i = parts.indexOf(organ);
                              if (i > -1) parts.splice(i, 1);
                            }
                            setHospital((h: any) => ({ ...(h || {}), organsOperated: parts.join(" + ") }));
                          }}
                        />
                        {organ}
                      </CheckboxLabel>
                    ))}
                  </CheckGroup>
                </FieldGroup>
              </FullWidth>

              <FullWidth>
                <FieldGroup>
                  <FieldLabel>Speciality Operations</FieldLabel>
                  <CheckGroup>
                    {organs.map((organ, index) => (
                      <CheckboxLabel key={organ}>
                        <input
                          type="checkbox"
                          checked={hospital?.specialityOperations?.includes(organ) ?? index < 2}
                          onChange={(e) => {
                            const cur = hospital?.specialityOperations ?? "";
                            const parts = cur ? cur.split(" + ") : [];
                            if (e.target.checked) parts.push(organ);
                            else {
                              const i = parts.indexOf(organ);
                              if (i > -1) parts.splice(i, 1);
                            }
                            setHospital((h: any) => ({ ...(h || {}), specialityOperations: parts.join(" + ") }));
                          }}
                        />
                        {organ}
                      </CheckboxLabel>
                    ))}
                  </CheckGroup>
                </FieldGroup>
              </FullWidth>

              <SubSectionTitle>Facility Available</SubSectionTitle>

              <FieldGroup>
                <FieldLabel>Bed Type</FieldLabel>
                <TextInput
                  value={hospital?.facilities?.[0] ?? ""}
                  onChange={(e) => setHospital((h: any) => ({ ...(h || {}), facilities: [e.target.value, ...(h?.facilities?.slice(1) ?? [])] }))}
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Semi Electric</FieldLabel>
                <TextInput
                  value={hospital?.facilities?.[1] ?? ""}
                  onChange={(e) => setHospital((h: any) => ({ ...(h || {}), facilities: [h?.facilities?.[0], e.target.value, ...(h?.facilities?.slice(2) ?? [])] }))}
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Fully Electric</FieldLabel>
                <TextInput
                  value={hospital?.facilities?.[2] ?? ""}
                  onChange={(e) => setHospital((h: any) => ({ ...(h || {}), facilities: [h?.facilities?.[0], h?.facilities?.[1], e.target.value, ...(h?.facilities?.slice(3) ?? [])] }))}
                />
              </FieldGroup>

              <FullWidth>
                <FieldGroup>
                  <FieldLabel>Parking Area</FieldLabel>
                  <TextInput
                    value={hospital?.facilities?.[3] ?? ""}
                    onChange={(e) => {
                      const f = hospital?.facilities ?? [];
                      const next = [...f];
                      next[3] = e.target.value;
                      setHospital((h: any) => ({ ...(h || {}), facilities: next }));
                    }}
                  />
                </FieldGroup>
              </FullWidth>

              <FieldGroup>
                <FieldLabel>Waiting Hall</FieldLabel>
                <TextInput
                  value={hospital?.facilities?.[4] ?? ""}
                  onChange={(e) => {
                    const f = hospital?.facilities ?? [];
                    const next = [...f];
                    next[4] = e.target.value;
                    setHospital((h: any) => ({ ...(h || {}), facilities: next }));
                  }}
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Labs</FieldLabel>
                <TextInput
                  value={hospital?.facilities?.[5] ?? ""}
                  onChange={(e) => {
                    const f = hospital?.facilities ?? [];
                    const next = [...f];
                    next[5] = e.target.value;
                    setHospital((h: any) => ({ ...(h || {}), facilities: next }));
                  }}
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Pharmacy</FieldLabel>
                <TextInput
                  value={hospital?.facilities?.[6] ?? ""}
                  onChange={(e) => {
                    const f = hospital?.facilities ?? [];
                    const next = [...f];
                    next[6] = e.target.value;
                    setHospital((h: any) => ({ ...(h || {}), facilities: next }));
                  }}
                />
              </FieldGroup>

              <FullWidth>
                <FieldGroup>
                  <FieldLabel>Total Area of Premises</FieldLabel>
                  <TextInput
                    value={hospital?.totalArea ?? ""}
                    onChange={(e) => setHospital((h: any) => ({ ...(h || {}), totalArea: e.target.value }))}
                  />
                </FieldGroup>
              </FullWidth>

              <FullWidth>
                <FieldGroup>
                  <FieldLabel>Emergency Service Availability</FieldLabel>
                  <SelectInput
                    value={hospital?.emergencyAvailable ? "yes" : "no"}
                    onChange={(e) => setHospital((h: any) => ({ ...(h || {}), emergencyAvailable: e.target.value === "yes" }))}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </SelectInput>
                </FieldGroup>
              </FullWidth>

              <FullWidth>
                <FormActions>
                  <CancelButton type="button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </CancelButton>
                  <EditButton
                    type="submit"
                    onClick={async () => {
                      try {
                        setLoading(true);
                        const res = await axiosClient.put("/hospital", hospital || {});
                        setHospital(res.data.data);
                        setIsEditing(false);
                      } catch (err) {
                        console.error(err);
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    Save
                  </EditButton>
                </FormActions>
              </FullWidth>
            </FormFields>
          </FormLayout>
        </ProfilePanel>
      </>
    );
  }

  return (
    <>
      <ProfileHeader>
        <HeaderLeft>
          {onBack && (
            <BackButton onClick={onBack} title="Back">
              <ArrowLeft size={16} />
            </BackButton>
          )}
          <SectionTitle>Hospital Profile</SectionTitle>
        </HeaderLeft>
      </ProfileHeader>

      <ProfilePanel>
        <HospitalSummary>
          <HospitalInfo>
            <LogoCircle>
              <Building2 size={30} />
            </LogoCircle>
            <div>
              <HospitalName>{hospital?.name ?? "Medanta the medicity"}</HospitalName>
                <MutedText>Address - {hospital?.address ?? "Subhash Chowk Gurugram Sector 38, Gurgaon"}</MutedText>
            </div>
          </HospitalInfo>

          <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
        </HospitalSummary>

        <DetailTable>
          <DetailRow>
            <DetailLabel>License number</DetailLabel>
            <DetailValue>{hospital?.licenseNumber ?? "ASB128DW735NIT82"}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Year of commencement</DetailLabel>
            <DetailValue>{hospital?.yearOfCommencement ?? "2012"}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Hospital Ownership</DetailLabel>
            <DetailValue>{hospital?.ownership ?? "Gov + Private"}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>No. of Ambulance</DetailLabel>
            <DetailValue>{hospital?.noOfAmbulance ?? "50 Ambulance"}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Organs Operated</DetailLabel>
            <DetailValue>{hospital?.organsOperated ?? "Heart + Lung + Kidney + 5 Others"}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Speciality Operations</DetailLabel>
            <DetailValue>{hospital?.specialityOperations ?? "Heart + Lung + Kidney + 5 Others"}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Facility Available</DetailLabel>
              <DetailValue>
              <FacilitiesGrid>
                {(hospital?.facilities ?? facilities).map((item: any, idx: number) => {
                  if (Array.isArray(item)) return <span key={idx}>{item[0]}: {item[1]}</span>;
                  // if facilities stored as array of strings
                  return <span key={idx}>{item}</span>;
                })}
              </FacilitiesGrid>
            </DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Total Area of Premises</DetailLabel>
            <DetailValue>{hospital?.totalArea ?? "270 square feet"}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Emergency</DetailLabel>
            <DetailValue>{hospital?.emergencyAvailable ? "Yes" : "No"}</DetailValue>
          </DetailRow>
        </DetailTable>
      </ProfilePanel>
    </>
  );
};

export default HospitalProfile;
