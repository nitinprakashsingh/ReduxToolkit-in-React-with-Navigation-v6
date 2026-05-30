import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

/* Sidebar */
export const Sidebar = styled.div`
  background-color: #5d44a2;
  padding: 16px;
  margin-top: -10px;
  margin-left: -10px;
  width: 260px;
  box-sizing: border-box;
  flex-shrink: 0;
`;

export const Logo = styled.img`
  width: 90px;
  height: 90px;
  object-fit: contain;
  margin-bottom: 12px;
`;

/* Main Content Area */
export const Content = styled.div`
  flex: 1;
  padding: 16px;
  min-width: 0;
`;

/* Card Wrapper */
export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

/* Generic Card */
export const Card = styled.div`
  flex: 1 1 100%;
  min-width: 250px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

/* Header Text */
export const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  padding: 15px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Subtitle = styled.div`
  font-size: 14px;
`;

export const SubMenuContainer = styled.div`
  margin-left: 40px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SubMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1e3a8a;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #1d4ed8;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeadCell = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid #e5e7eb;
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
`;

export const TableDataCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  color: #4b5563;
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: 600;
  color: #111827;
`;

/* ==========================================
   Edit Button
========================================== */
export const EditButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #1d4ed8;
  }
`;
