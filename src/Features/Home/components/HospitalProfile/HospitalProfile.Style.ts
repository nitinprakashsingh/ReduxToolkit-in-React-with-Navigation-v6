import styled from "styled-components";

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BackButton = styled.button`
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #ffffff;
  color: #374151;
  cursor: pointer;

  &:hover {
    border-color: #14b8a6;
    color: #0f766e;
  }
`;

export const ProfilePanel = styled.div`
  background: #ffffff;
  border: 1px solid #eef0f4;
  border-radius: 12px;
  padding: 20px;
`;

export const HospitalSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

export const HospitalInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const LogoCircle = styled.div`
  width: 52px;
  height: 52px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6d56c9;
  background: #f9fafb;
`;

export const HospitalName = styled.h3`
  margin: 0 0 4px 0;
  color: #111827;
  font-size: 18px;
  font-weight: 700;
`;

export const MutedText = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 13px;
`;

export const EditButton = styled.button`
  border: none;
  border-radius: 7px;
  background: #14b8a6;
  color: #ffffff;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  padding: 9px 16px;

  &:hover {
    background: #0f766e;
  }
`;

export const DetailTable = styled.div`
  border-top: 1px solid #e5e7eb;
`;

export const DetailRow = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 260px) 1fr;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailLabel = styled.div`
  color: #6b7280;
  font-size: 13px;
  padding: 11px 12px 11px 0;
`;

export const DetailValue = styled.div`
  color: #111827;
  font-size: 13px;
  font-weight: 600;
  padding: 11px 0;
`;

export const FacilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  gap: 8px 16px;

  @media (max-width: 840px) {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  }
`;

export const FormLayout = styled.form`
  display: grid;
  grid-template-columns: 170px minmax(260px, 1fr);
  gap: 24px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ImagePreview = styled.div`
  width: 112px;
  height: 112px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6d56c9;
  background: #f9fafb;
`;

export const LinkButton = styled.button`
  border: none;
  background: transparent;
  color: #14b8a6;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
`;

export const FormFields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const FieldLabel = styled.label`
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
`;

export const TextInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  color: #111827;
  font-size: 14px;
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: #14b8a6;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.12);
  }
`;

export const SelectInput = styled.select`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  color: #6b7280;
  font-size: 14px;
  padding: 10px 12px;
  outline: none;
  background: #ffffff;
`;

export const CheckGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
`;

export const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #374151;
  font-size: 13px;
`;

export const SubSectionTitle = styled.h4`
  grid-column: 1 / -1;
  margin: 8px 0 0 0;
  color: #111827;
  font-size: 14px;
`;

export const FormActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const CancelButton = styled.button`
  border: none;
  border-radius: 7px;
  background: #f3f4f6;
  color: #4b5563;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  padding: 10px 14px;
`;
