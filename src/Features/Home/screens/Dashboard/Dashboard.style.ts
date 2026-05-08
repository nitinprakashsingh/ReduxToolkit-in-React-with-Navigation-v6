import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

/* Sidebar */
export const Sidebar = styled.div`
  background-color: #5D44A2;
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
  flex: 1; /* take remaining space */
  padding: 16px;
  min-width: 0;
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
