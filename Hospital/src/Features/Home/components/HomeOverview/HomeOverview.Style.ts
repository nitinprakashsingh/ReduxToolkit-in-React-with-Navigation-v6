import styled from "styled-components";

export const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(170px, 1fr));
  gap: 24px;
  max-width: 820px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(170px, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const OverviewCard = styled.button<{ $active?: boolean }>`
  min-height: 150px;
  border: 1px solid ${({ $active }) => ($active ? "#6d56c9" : "#d1d5db")};
  border-radius: 12px;
  background: ${({ $active }) => ($active ? "#6d56c9" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#111827")};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  text-align: left;

  &:hover {
    border-color: #6d56c9;
    box-shadow: 0 8px 22px rgba(109, 86, 201, 0.14);
  }
`;

export const CardIcon = styled.div`
  color: inherit;
`;

export const CardTitle = styled.span`
  align-self: flex-end;
  color: inherit;
  font-size: 16px;
  font-weight: 700;
`;

export const AvailabilityOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-self: flex-end;
  color: #374151;
  font-size: 13px;
`;

export const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const HelpButton = styled.button`
  margin-top: 180px;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  background: #ffffff;
  color: #111827;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  padding: 16px 34px;

  &:hover {
    border-color: #6d56c9;
    color: #6d56c9;
  }
`;
