import styled from "styled-components";

export const PackageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 18px;
`;

export const HelperText = styled.p`
  margin: -12px 0 20px 0;
  color: #6b7280;
  font-size: 14px;
`;

export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
`;

export const ActionButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${({ $active }) => ($active ? "#2563eb" : "#d1d5db")};
  border-radius: 8px;
  background: ${({ $active }) => ($active ? "#eff6ff" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#1d4ed8" : "#374151")};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 9px 14px;

  &:hover {
    border-color: #2563eb;
    color: #1d4ed8;
  }
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 14px;

  &:hover {
    background: #1d4ed8;
  }
`;

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  background: #f3f4f6;
  color: #4b5563;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 14px;

  &:hover {
    background: #e5e7eb;
  }
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #374151;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    border-color: #2563eb;
    color: #2563eb;
  }
`;

export const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const SubscribePanel = styled.div`
  max-width: 760px;
`;

export const SubscribeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const SubscribeFormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 16px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
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
  border-radius: 8px;
  color: #111827;
  font-size: 14px;
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }
`;

export const SelectInput = styled.select`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #111827;
  font-size: 14px;
  padding: 10px 12px;
  outline: none;
  background: #ffffff;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }
`;

export const SubscribeFormActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const TierGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 18px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const TierButton = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ $active }) => ($active ? "#2563eb" : "#d1d5db")};
  border-radius: 8px;
  background: ${({ $active }) => ($active ? "#eff6ff" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#1d4ed8" : "#374151")};
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  padding: 14px;
  text-align: center;

  &:hover {
    border-color: #2563eb;
    color: #1d4ed8;
  }
`;

export const StatusBadge = styled.span<{ $variant?: "active" | "expired" }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ $variant }) => ($variant === "expired" ? "#991b1b" : "#166534")};
  background-color: ${({ $variant }) =>
    $variant === "expired" ? "#fee2e2" : "#dcfce7"};
`;
