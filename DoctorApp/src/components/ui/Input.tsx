import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  min-height: 48px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  color: #0f172a;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.12);
  }
`;

export default Input;
