import styled from "styled-components"
import { ErrorText as SharedErrorText } from "../Login/Login.style"

export * from "../Auth.styles"
export { InputFiled, InputWrapper } from "../Login/Login.style"

export const SuccessText = styled.div`
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  padding: 10px 12px;
`

export const ErrorText = styled(SharedErrorText)`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 7px;
  padding: 10px 12px;
`


