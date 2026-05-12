import styled from "styled-components";

export const DoctorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const HelperText = styled.p`
  margin: -12px 0 20px 0;
  color: #6b7280;
  font-size: 14px;
`;

export const ActionBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
`;

export const ActionButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${({ $active }) => ($active ? "#2563eb" : "#d1d5db")};
  background: ${({ $active }) => ($active ? "#2563eb" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#374151")};
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: #2563eb;
    background: ${({ $active }) => ($active ? "#1d4ed8" : "#eff6ff")};
  }
`;

export const FormLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 320px) 1fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const UploadContainer = styled.label`
  min-height: 280px;
  border: 2px dashed #c7d2fe;
  border-radius: 8px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 24px;
  color: #4b5563;
  cursor: pointer;
  text-align: center;
`;

export const UploadTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
`;

export const TextInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 11px 12px;
  color: #111827;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }
`;

export const SubmitButton = styled.button`
  justify-self: flex-start;
  border: none;
  border-radius: 8px;
  background: #16a34a;
  color: #ffffff;
  padding: 11px 18px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background: #15803d;
  }
`;

