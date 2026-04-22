import styled from "styled-components";

export const InputFiled = styled.input`
  width: ${(props) => props.width || "200px"};
  height: ${(props) => props.height || "40px"};
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;