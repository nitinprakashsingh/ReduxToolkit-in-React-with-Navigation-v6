import styled from "styled-components";

export const DepartmentHeader = styled.div`
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

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const EntriesControl = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 13px;
`;

export const SmallSelect = styled.select`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #111827;
  padding: 7px 28px 7px 10px;
  font-size: 13px;
  background: #ffffff;
`;

export const SearchGroup = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 13px;
`;

export const SearchInput = styled.input`
  width: 220px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 13px;
  outline: none;

  &:focus {
    border-color: #14b8a6;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.12);
  }
`;

export const TabBar = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 0;
  overflow-x: auto;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  border: none;
  border-bottom: 3px solid ${({ $active }) => ($active ? "#14b8a6" : "transparent")};
  background: transparent;
  color: ${({ $active }) => ($active ? "#111827" : "#4b5563")};
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  padding: 14px 4px 12px;
  white-space: nowrap;
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 7px;
  background: #14b8a6;
  color: #ffffff;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  padding: 9px 13px;

  &:hover {
    background: #0f766e;
  }
`;

export const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const ActionIconButton = styled.button`
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: #14b8a6;
  color: #ffffff;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background: #0f766e;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ $active }) => ($active ? "#14b8a6" : "#e5e7eb")};
  border-radius: 6px;
  background: ${({ $active }) => ($active ? "#14b8a6" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#4b5563")};
  cursor: pointer;
  font-size: 12px;
  padding: 6px 9px;
`;

export const FormPanel = styled.div`
  max-width: 980px;
`;

export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: minmax(220px, 1fr) auto;
  align-items: end;
  gap: 16px 20px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const FormFields = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
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

  &:focus {
    border-color: #14b8a6;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.12);
  }
`;

export const FormActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
