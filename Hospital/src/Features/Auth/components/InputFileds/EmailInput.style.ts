import styled from "styled-components"

export const InputField = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 44px;
  padding: 11px 12px;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  color: #111827;
  font-size: 14px;
  background: #ffffff;
  outline: none;
  margin-bottom: 16px;

  &:focus {
    border-color: #14b8a6;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.12);
  }
`
