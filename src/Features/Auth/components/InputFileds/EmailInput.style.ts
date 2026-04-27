import styled from "styled-components";

export const InputField = styled.input`
  width:  "200px";
  height:  "50px";
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  margin-bottom: 16px;
  &:focus {
    border-color: #007bff;
  }
`;