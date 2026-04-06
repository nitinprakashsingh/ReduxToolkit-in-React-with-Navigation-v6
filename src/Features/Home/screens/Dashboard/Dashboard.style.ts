import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

/* Sidebar */
export const Sidebar = styled.div`
  width: 200px;
  background-color: #7258BC;
  min-height: 100vh;
`;

/* Main Content Area */
export const Content = styled.div`
  flex: 1; /* take remaining space */
  padding: 16px;
`;

/* Card Wrapper */
export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

/* Card */
export const Card = styled.div`
  flex: 1 1 calc(33.33% - 16px); /* 3 per row but flexible */
  min-width: 250px; /* prevents shrinking too much */
  max-width: calc(33.33% - 16px);

  background-color: #E0E0E0;
  border-radius: 8px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;