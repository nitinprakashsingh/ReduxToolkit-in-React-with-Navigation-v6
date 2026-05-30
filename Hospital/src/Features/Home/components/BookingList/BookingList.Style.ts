import styled from "styled-components";

export const BookingHeader = styled.div`
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

export const BookingGroup = styled.div`
  margin-top: 24px;

  &:first-of-type {
    margin-top: 0;
  }
`;

export const BookingGroupTitle = styled.h3`
  margin: 0 0 12px 0;
  color: #1f2937;
  font-size: 18px;
  font-weight: 600;
`;

export const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StatusBadge = styled.span<{ $variant?: "paid" | "pending" | "confirmed" | "scheduled" }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ $variant }) =>
    $variant === "paid" || $variant === "confirmed"
      ? "#166534"
      : $variant === "pending"
      ? "#92400e"
      : "#1d4ed8"};
  background-color: ${({ $variant }) =>
    $variant === "paid" || $variant === "confirmed"
      ? "#dcfce7"
      : $variant === "pending"
      ? "#fef3c7"
      : "#dbeafe"};
`;
