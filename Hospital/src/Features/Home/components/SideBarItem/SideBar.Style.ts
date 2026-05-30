import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 6px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
`;

export const IconContainer = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Title = styled.div`
  flex: 1;
  font-size: 13px;
  color: white;
`;

export const DropDownIcon = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

