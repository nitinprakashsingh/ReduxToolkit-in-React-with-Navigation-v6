import { ArrowLeft, Building2, Cross } from "lucide-react";
import { useState } from "react";

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
                  <TextInput defaultValue="Medanta the medicity" />
                </FieldGroup>
              </FullWidth>

              <FieldGroup>
                <FieldLabel>License Number</FieldLabel>
                <TextInput defaultValue="ASB128DW735NIT82" />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Year of Commencement</FieldLabel>
                <TextInput defaultValue="2012" />
              </FieldGroup>

              <FullWidth>
                <FieldGroup>
                  <FieldLabel>Hospital Ownership</FieldLabel>
                  <CheckGroup>
                    {["Gov", "Pvt", "Gov"].map((label, index) => (
                      <CheckboxLabel key={`${label}-${index}`}>
                        <input defaultChecked={index === 0} type="checkbox" />
                        {label}
                      </CheckboxLabel>
                    ))}
                  </CheckGroup>
                </FieldGroup>
              </FullWidth>

              <FieldGroup>
                <FieldLabel>No. of Ambulance</FieldLabel>
                <TextInput defaultValue="50 Ambulance" />
              </FieldGroup>

              <FullWidth>
                <FieldGroup>
                  <FieldLabel>Organs Operated</FieldLabel>
                  <CheckGroup>
                    {organs.map((organ, index) => (
                      <CheckboxLabel key={organ}>
                        <input defaultChecked={index < 2} type="checkbox" />
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
                        <input defaultChecked={index < 2} type="checkbox" />
                        {organ}
                      </CheckboxLabel>
                    ))}
                  </CheckGroup>
                </FieldGroup>
              </FullWidth>

              <SubSectionTitle>Facility Available</SubSectionTitle>

              <FieldGroup>
                <FieldLabel>Bed Type</FieldLabel>
                <TextInput defaultValue="Rs500" />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Semi Electric</FieldLabel>
                <TextInput defaultValue="Rs1000" />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Fully Electric</FieldLabel>
                <TextInput defaultValue="Rs2000" />
              </FieldGroup>

              <FullWidth>
                <FieldGroup>
                  <FieldLabel>Parking Area</FieldLabel>
                  <TextInput defaultValue="270 square feet" />
                </FieldGroup>
              </FullWidth>

              <FieldGroup>
                <FieldLabel>Waiting Hall</FieldLabel>
                <TextInput defaultValue="05" />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Labs</FieldLabel>
                <TextInput defaultValue="02" />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Pharmacy</FieldLabel>
                <TextInput defaultValue="01" />
              </FieldGroup>

              <FullWidth>
                <FieldGroup>
                  <FieldLabel>Total Area of Premises</FieldLabel>
                  <TextInput defaultValue="270 square feet" />
                </FieldGroup>
              </FullWidth>

              <FullWidth>
                <FieldGroup>
                  <FieldLabel>Emergency Service Availability</FieldLabel>
                  <SelectInput defaultValue="">
                    <option value="" disabled>
                      Select
                    </option>
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
                  <EditButton type="submit">Save</EditButton>
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
              <HospitalName>Medanta the medicity</HospitalName>
              <MutedText>Address - Subhash Chowk Gurugram Sector 38, Gurgaon</MutedText>
            </div>
          </HospitalInfo>

          <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
        </HospitalSummary>

        <DetailTable>
          <DetailRow>
            <DetailLabel>License number</DetailLabel>
            <DetailValue>ASB128DW735NIT82</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Year of commencement</DetailLabel>
            <DetailValue>2012</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Hospital Ownership</DetailLabel>
            <DetailValue>Gov + Private</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>No. of Ambulance</DetailLabel>
            <DetailValue>50 Ambulance</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Organs Operated</DetailLabel>
            <DetailValue>Heart + Lung + Kidney + 5 Others</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Speciality Operations</DetailLabel>
            <DetailValue>Heart + Lung + Kidney + 5 Others</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Facility Available</DetailLabel>
            <DetailValue>
              <FacilitiesGrid>
                {facilities.map(([label, value]) => (
                  <span key={label}>
                    {label}: {value}
                  </span>
                ))}
              </FacilitiesGrid>
            </DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Total Area of Premises</DetailLabel>
            <DetailValue>270 square feet</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Emergency</DetailLabel>
            <DetailValue>Yes</DetailValue>
          </DetailRow>
        </DetailTable>
      </ProfilePanel>
    </>
  );
};

export default HospitalProfile;
