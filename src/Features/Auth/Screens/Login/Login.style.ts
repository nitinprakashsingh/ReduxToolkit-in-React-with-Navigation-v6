import styled from "styled-components"
import {
  Container,
  BrandPanel,
  BrandTop,
  LogoMark,
  BrandName,
  BrandSubText,
  BrandContent,
  BrandTitle,
  BrandDescription,
  LoginPanel,
  LoginCard,
  Title,
  HelperText,
  Form,
  FieldGroup,
  Button,
  LinkRow,
  ForgetButton,
} from "../Auth.styles"

export {
  Container,
  BrandPanel,
  BrandTop,
  LogoMark,
  BrandName,
  BrandSubText,
  BrandContent,
  BrandTitle,
  BrandDescription,
  LoginPanel,
  LoginCard,
  Title,
  HelperText,
  Form,
  FieldGroup,
  Button,
  LinkRow,
  ForgetButton,
}

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 28px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

export const StatItem = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 8px;
  padding: 14px;
`

export const StatValue = styled.div`
  font-size: 21px;
  font-weight: 800;
`

export const StatLabel = styled.div`
  margin-top: 4px;
  color: #ddd6fe;
  font-size: 12px;
`

export const InputWrapper = styled.div`
  position: relative;
`

export const InputFiled = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  color: #111827;
  font-size: 14px;
  padding: 11px 42px 11px 12px;
  outline: none;

  &:focus {
    border-color: #14b8a6;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.12);
  }
`

export const IconButton = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #6b7280;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }
`

export const ErrorText = styled.div`
  color: #dc2626;
  font-size: 13px;
  line-height: 1.5;
`

